import { useRef, useState, useCallback } from 'react';
// @ts-ignore
import { MicVAD } from "@ricky0123/vad-web";
import { VAD_CONFIG, MESSAGES } from '../constants';
import type { VADStatus, UseVADReturn, VADConfig } from '../types';

interface VADCallbacks {
    onSpeechStart: () => void;
    onSpeechEnd: (audio: Float32Array) => void;
    onVADMisfire: () => void;
    onStatusUpdate: (status: VADStatus, message: string) => void;
}

export const useVAD = (callbacks: VADCallbacks): UseVADReturn => {
    const vadRef = useRef<any>(null);
    const [vadStatus, setVADStatus] = useState<VADStatus>('idle');

    const updateStatus = useCallback((status: VADStatus, message?: string) => {
        setVADStatus(status);
        if (message) {
            callbacks.onStatusUpdate(status, message);
        }
    }, [callbacks]);

    const initializeVAD = useCallback(async (audioStream: MediaStream | null): Promise<void> => {
        try {
            if (!audioStream) {
                console.warn("No audio stream provided to VAD");
                updateStatus('idle', '⚠️ No audio stream available for voice detection');
                return;
            }

            console.log("Initializing VAD with audio stream...");
            updateStatus('requesting-permission', MESSAGES.INITIALIZING);

            const vadConfig: Partial<VADConfig> = {
                ...VAD_CONFIG,
                stream: audioStream,
                onSpeechStart: () => {
                    console.log("🎤 Speech started");
                    updateStatus('speaking', MESSAGES.LISTENING);
                    callbacks.onSpeechStart();
                },
                onSpeechEnd: (audio: Float32Array) => {
                    console.log("🔇 Speech ended");
                    updateStatus('processing', MESSAGES.PROCESSING);
                    callbacks.onSpeechEnd(audio);
                },
                onVADMisfire: () => {
                    console.log("🔇 VAD misfire - false positive");
                    updateStatus('listening');
                    callbacks.onVADMisfire();
                }
            };

            const vad = await MicVAD.new(vadConfig);
            vadRef.current = vad;
            
            await vad.start();
            updateStatus('listening', MESSAGES.READY_DETECT);
            
            console.log("VAD initialized and started successfully");
            
        } catch (error) {
            console.error("Error initializing VAD:", error);
            updateStatus('idle', MESSAGES.ERROR_VOICE_DETECTION);
            throw error;
        }
    }, [callbacks, updateStatus]);

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

    return {
        vadRef,
        vadStatus,
        initializeVAD,
        cleanup,
        pause,
        resume,
    };
}; 