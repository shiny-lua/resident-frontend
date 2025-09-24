import { useRef, useState, useCallback } from 'react';
// @ts-ignore
import { MicVAD } from "@ricky0123/vad-web";
import { VAD_CONFIG, MESSAGES } from '../../../interview/interview-room/constants';
import type { VADStatus } from '../../../interview/interview-room/types';

interface MockInterviewVADCallbacks {
    onSpeechStart: () => void;
    onSpeechEnd: (audio: Float32Array) => void;
    onVADMisfire: () => void;
    onStatusUpdate: (status: VADStatus, message: string) => void;
}

interface UseMockInterviewVADOptions {
    isPlaying?: boolean;
}

interface UseMockInterviewVADReturn {
    vadRef: React.MutableRefObject<any>;
    vadStatus: VADStatus;
    isVADActive: boolean;
    initializeVAD: (audioStream: MediaStream | null) => Promise<void>;
    cleanup: () => void;
    pause: () => void;
    resume: () => void;
    updatePlayingState: (isPlaying: boolean) => void;
}

export const useMockInterviewVAD = (
    callbacks: MockInterviewVADCallbacks, 
    options: UseMockInterviewVADOptions = {}
): UseMockInterviewVADReturn => {
    const { isPlaying = false } = options;
    const vadRef = useRef<any>(null);
    const [vadStatus, setVADStatus] = useState<VADStatus>('idle');
    const processingRef = useRef<boolean>(false);
    const lastSpeechEndTimeRef = useRef<number>(0);

    const updateStatus = useCallback((status: VADStatus, message?: string) => {
        setVADStatus(status);
        if (message) {
            callbacks.onStatusUpdate(status, message);
        }
    }, [callbacks]);

    const initializeVAD = useCallback(async (audioStream: MediaStream | null): Promise<void> => {
        try {
            if (!audioStream) {
                updateStatus('idle', '⚠️ No audio stream available');
                return;
            }

            updateStatus('requesting-permission', MESSAGES.INITIALIZING);

            const vadConfig = {
                ...VAD_CONFIG,
                positiveSpeechThreshold: 0.35,
                negativeSpeechThreshold: 0.20,
                minSpeechFrames: 12,
                redemptionFrames: 20,
                preSpeechPadFrames: 3,
                stream: audioStream,
                onSpeechStart: () => {
                    // ✅ ENHANCED: More specific blocking during AI playback
                    if (isPlaying) {
                        updateStatus('listening', '🎵 AI is speaking - please wait...');
                        console.log('🚫 VAD onSpeechStart blocked - AI is currently playing');
                        return;
                    }
                    
                    console.log(' ================================================🎤 User started speaking in real-time mock interview');
                    processingRef.current = false;
                    updateStatus('speaking', '🎤 User started speaking...');
                    callbacks.onSpeechStart();
                },
                onSpeechEnd: (audio: Float32Array) => {
                    // ✅ ENHANCED: More specific blocking during AI playback
                    if (isPlaying) {
                        updateStatus('listening', '🎵 AI is speaking - please wait...');
                        console.log('🚫 VAD onSpeechEnd blocked - AI is currently playing');
                        return;
                    }
                    
                    if (processingRef.current) {
                        console.log('🚫 VAD onSpeechEnd blocked - already processing');
                        return;
                    }
                    
                    const now = Date.now();
                    const timeSinceLastSpeech = now - lastSpeechEndTimeRef.current;
                    if (timeSinceLastSpeech < 1000) { // Reduced from 2000ms to 1000ms
                        console.log('🚫 VAD onSpeechEnd blocked - too soon after last speech');
                        return;
                    }
                    
                    const audioLengthMs = (audio.length / 16000) * 1000;
                    if (audioLengthMs < 500) {
                        console.log('🚫 VAD onSpeechEnd blocked - audio too short');
                        return;
                    }
                    
                    processingRef.current = true;
                    lastSpeechEndTimeRef.current = now;
                    
                    updateStatus('processing', '🔄 Processing user\'s answer...');
                    callbacks.onSpeechEnd(audio);
                },
                onVADMisfire: () => {
                    updateStatus('listening', '🎯 Listening for user\'s answer...');
                    callbacks.onVADMisfire();
                }
            };

            const vad = await MicVAD.new(vadConfig);
            vadRef.current = vad;
            
            await vad.start();
            
            if (isPlaying) {
                updateStatus('listening', '🎵 AI is speaking - please wait...');
            } else {
                updateStatus('listening', '🎯 Ready to detect user\'s voice...');
            }
            
        } catch (error) {
            console.error("Error initializing VAD:", error);
            updateStatus('idle', MESSAGES.ERROR_VOICE_DETECTION);
            throw error;
        }
    }, [callbacks, updateStatus, isPlaying]);

    const cleanup = useCallback((): void => {
        if (vadRef.current) {
            try {
                vadRef.current.destroy();
            } catch (error) {
                console.error("Error destroying VAD:", error);
            } finally {
                vadRef.current = null;
            }
        }
        processingRef.current = false;
        lastSpeechEndTimeRef.current = 0;
        setVADStatus('idle');
    }, []);

    const pause = useCallback((): void => {
        if (vadRef.current) {
            try {
                vadRef.current.pause();
            } catch (error) {
                console.error("Error pausing VAD:", error);
            }
        }
    }, []);

    const resume = useCallback((): void => {
        if (vadRef.current) {
            try {
                vadRef.current.start();
            } catch (error) {
                console.error("Error resuming VAD:", error);
            }
        }
    }, []);

    const updatePlayingState = useCallback((newIsPlaying: boolean): void => {
        if (newIsPlaying) {
            processingRef.current = false;
            updateStatus('listening', '🎵 AI is speaking - please wait...');
        } else {
            updateStatus('listening', '🎯 Ready to detect user\'s voice...');
        }
    }, [updateStatus]);

    return {
        vadRef,
        vadStatus,
        isVADActive: Boolean(vadRef.current),
        initializeVAD,
        cleanup,
        pause,
        resume,
        updatePlayingState,
    };
};
