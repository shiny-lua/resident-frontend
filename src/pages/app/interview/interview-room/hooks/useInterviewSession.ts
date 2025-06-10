import { useState, useCallback, useRef, useEffect } from 'react';
import { useGlobalContext } from '../../../../../context';
import { generateInterviewResponseStream } from '../../../../../utils/openai';
import { restApi } from '../../../../../context/restApi';
import { useVAD } from './useVAD';
import { useSpeechAccumulation } from './useSpeechAccumulation';
import { useAudioRecording } from './useAudioRecording';
import { useScreenShare } from './useScreenShare';
import { float32ArrayToWav, requestMicrophoneAccess } from '../utils/audioUtils';
import { MESSAGES, TEXT_CONFIG, TIMING } from '../constants';
import type { VADStatus, ConversationEntry } from '../types';

export const useInterviewSession = () => {
    const [state, { dispatch }] = useGlobalContext();
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [transcribedText, setTranscribedText] = useState('');
    const [micStream, setMicStream] = useState<MediaStream | null>(null);

    // Custom hooks
    const speechAccumulation = useSpeechAccumulation();
    const audioRecording = useAudioRecording();
    const screenShare = useScreenShare();

    // VAD callbacks
    const vadCallbacks = {
        onSpeechStart: () => {
            audioRecording.startRecording(micStream!);
            dispatch({ type: 'currentQuestion', payload: MESSAGES.LISTENING });
            dispatch({ type: 'streamingResponse', payload: MESSAGES.SPEAKER_DETECTED });
            dispatch({ type: 'isStreamingResponse', payload: true });
        },
        onSpeechEnd: (audio: Float32Array) => {
            audioRecording.stopRecording();
            dispatch({ type: 'currentQuestion', payload: MESSAGES.PROCESSING });
            dispatch({ type: 'streamingResponse', payload: MESSAGES.SPEECH_ENDED });
            processVADAudio(audio);
        },
        onVADMisfire: () => {
            audioRecording.stopRecording();
        },
        onStatusUpdate: (status: VADStatus, message: string) => {
            dispatch({ type: 'currentQuestion', payload: message });
            dispatch({ type: 'streamingResponse', payload: message });
            dispatch({ type: 'isStreamingResponse', payload: true });
        }
    };

    const vad = useVAD(vadCallbacks);

    // Reset to listening state
    const resetToListening = useCallback((): void => {
        dispatch({ type: 'streamingResponse', payload: MESSAGES.READY_DETECT });
        dispatch({ type: 'isStreamingResponse', payload: true });
    }, [dispatch]);

    // Process audio from VAD
    const processVADAudio = useCallback(async (vadAudio: Float32Array): Promise<void> => {
        try {
            setIsTranscribing(true);

            const audioBlob = float32ArrayToWav(vadAudio, 16000);
            const formData = new FormData();
            formData.append('audio', audioBlob, 'audio.wav');

            const response = await restApi.postRequest('ai/speech-to-text', formData);

            if (response?.data?.success) {
                const text = response.data.transcribed_text;

                if (text?.trim()) {
                    if (speechAccumulation.shouldAccumulate(text)) {
                        speechAccumulation.addSpeechSegment(text);
                        const combinedText = speechAccumulation.getCombinedText();
                        dispatch({ type: 'streamingResponse', payload: `📝 Combined: "${combinedText}"` });
                        speechAccumulation.setAccumulationTimeout(() => {
                            processTranscribedText(speechAccumulation.processAccumulated());
                        });
                    } else {
                        speechAccumulation.addSpeechSegment(text);
                        setTranscribedText(text);
                        speechAccumulation.setAccumulationTimeout(() => {
                            processTranscribedText(speechAccumulation.getCombinedText());
                        });
                    }
                } else {
                    resetToListening();
                }
            } else {
                resetToListening();
            }
        } catch (error) {
            resetToListening();
        } finally {
            setIsTranscribing(false);
        }
    }, [dispatch, speechAccumulation, resetToListening]);

    // Process transcribed text
    const processTranscribedText = useCallback(async (text: string): Promise<void> => {
        if (!text.trim() || text.trim().length <= TEXT_CONFIG.MIN_SPEECH_LENGTH) {
            resetToListening();
            return;
        }

        speechAccumulation.reset();
        dispatch({ type: 'currentQuestion', payload: `🎤 Question: "${text}"` });
        dispatch({ type: 'streamingResponse', payload: MESSAGES.GENERATING_AI });

        try {
            let streamingText = '';
            await generateInterviewResponseStream(
                text,
                (chunk: string) => {
                    streamingText += chunk;
                    dispatch({ type: 'streamingResponse', payload: streamingText });
                },
                (fullResponse: string) => {
                    const conversationEntry: ConversationEntry = {
                        question: text,
                        answer: fullResponse,
                        timestamp: new Date()
                    };

                    dispatch({
                        type: 'conversationHistory',
                        payload: [...state.conversationHistory, conversationEntry]
                    });

                    setTimeout(() => {
                        dispatch({ type: 'currentQuestion', payload: '' });
                        dispatch({ type: 'currentResponse', payload: '' });
                        resetToListening();
                    }, TIMING.RESPONSE_CYCLE_DELAY);
                },
                () => {
                    setTimeout(resetToListening, TIMING.ERROR_RECOVERY_DELAY);
                },
                text
            );
        } catch (error) {
            setTimeout(resetToListening, TIMING.ERROR_RECOVERY_DELAY);
        }
    }, [dispatch, state.conversationHistory, speechAccumulation, resetToListening]);

    // Use ref to store cleanup function and create stable reference
    const cleanupRef = useRef<() => void>();

    // Update cleanup function when dependencies change
    useEffect(() => {
        cleanupRef.current = () => {
            vad.cleanup();
            audioRecording.cleanup();
            screenShare.stopScreenShare();
            speechAccumulation.reset();

            if (micStream) {
                micStream.getTracks().forEach(track => track.stop());
                setMicStream(null);
            }

            setTranscribedText('');
            setIsTranscribing(false);
        };
    }, [vad, audioRecording, screenShare, speechAccumulation, micStream]);

    // Stable cleanup function that always calls the latest version
    const cleanup = useCallback((): void => {
        if (cleanupRef.current) {
            cleanupRef.current();
        }
    }, []); // No dependencies - this function never changes

    // Initialize audio and VAD with optional MediaStream parameter
    const initializeAudioAndVAD = useCallback(async (providedMediaStream?: MediaStream): Promise<void> => {
        try {
            let audioStream: MediaStream | null = null;

            // Debug screen share audio detection
            console.log("🔍 Debugging audio detection:");
            console.log("- providedMediaStream:", !!providedMediaStream);
            console.log("- screenShare.screenStream:", !!screenShare.screenStream);
            console.log("- screenShare.hasAudio():", screenShare.hasAudio());

            // Use provided MediaStream first (from fresh screen share)
            const mediaStreamToCheck = providedMediaStream || screenShare.screenStream;

            if (mediaStreamToCheck) {
                const audioTracks = mediaStreamToCheck.getAudioTracks();
                console.log("- Direct audio tracks check:", audioTracks.length);
                console.log("- Audio tracks details:", audioTracks.map(track => ({
                    id: track.id,
                    label: track.label,
                    enabled: track.enabled,
                    readyState: track.readyState
                })));
            }

            // Try to use screen share audio directly
            if (mediaStreamToCheck && mediaStreamToCheck.getAudioTracks().length > 0) {
                console.log("✅ Using screen share audio for VAD");
                audioStream = new MediaStream(mediaStreamToCheck.getAudioTracks());
                console.log("Screen share audio stream created successfully");
            } else if (screenShare.hasAudio()) {
                console.log("✅ Using screen share audio via getAudioStream()");
                audioStream = screenShare.getAudioStream();
                if (audioStream) {
                    console.log("Screen share audio stream obtained successfully");
                } else {
                    console.warn("Failed to get audio stream from screen share via getAudioStream()");
                }
            }

            if (!audioStream) {
                console.log("📱 No audio in screen share, requesting separate microphone");
                audioStream = await requestMicrophoneAccess();

                if (!audioStream) {
                    console.warn("⚠️ No microphone access available - screen sharing will continue without voice detection");
                    dispatch({ type: 'streamingResponse', payload: '📺 Screen sharing active. No audio input available - voice detection disabled.' });
                    dispatch({ type: 'isStreamingResponse', payload: false });
                    return;
                }
            }

            console.log("🎙️ Initializing VAD with audio stream...");
            console.log("🎙️ Audio stream details:", {
                audioTracks: audioStream.getAudioTracks().length,
                videoTracks: audioStream.getVideoTracks().length,
                active: audioStream.active,
                id: audioStream.id
            });

            setMicStream(audioStream);
            console.log("✅ micStream set successfully");

            await vad.initializeVAD(audioStream);
            console.log("✅ VAD initialized successfully");
            console.log("✅ VAD active:", Boolean(vad.vadRef.current));

        } catch (error) {
            console.error("❌ Error initializing audio and VAD:", error);

            // Don't stop screen sharing on audio failure - just show warning
            if (error.name === 'NotFoundError') {
                dispatch({ type: 'streamingResponse', payload: '⚠️ Screen sharing active. No audio devices found - voice detection disabled.' });
            } else if (error.name === 'NotAllowedError') {
                dispatch({ type: 'streamingResponse', payload: '⚠️ Screen sharing active. Microphone access denied - voice detection disabled.' });
            } else if (error.name === 'NotReadableError') {
                dispatch({ type: 'streamingResponse', payload: '⚠️ Screen sharing active. Microphone in use by another app - voice detection disabled.' });
            } else {
                dispatch({ type: 'streamingResponse', payload: '⚠️ Screen sharing active. Audio setup failed - voice detection disabled.' });
            }

            dispatch({ type: 'isStreamingResponse', payload: false });
        }
    }, [screenShare, vad, dispatch]);

    // Handle screen sharing - simplified approach
    const handleScreenShare = useCallback(async (): Promise<void> => {
        console.log("🔄 handleScreenShare called, current state:", {
            hasScreenStream: !!screenShare.screenStream,
            vadStatus: vad.vadStatus
        });

        try {
            if (screenShare.screenStream) {
                // Stop screen sharing
                console.log("🛑 Stopping screen share...");

                // Clean up VAD and audio first
                vad.cleanup();
                if (micStream) {
                    micStream.getTracks().forEach(track => track.stop());
                    setMicStream(null);
                }

                // Stop screen sharing
                screenShare.stopScreenShare();

                // Reset UI state
                dispatch({ type: 'isSharedScreen', payload: false });
                dispatch({ type: 'currentQuestion', payload: '' });
                dispatch({ type: 'currentResponse', payload: '' });
                dispatch({ type: 'streamingResponse', payload: '' });
                dispatch({ type: 'isStreamingResponse', payload: false });

                console.log("✅ Screen sharing stopped successfully");
            } else {
                // Start screen sharing
                console.log("🚀 Starting screen share...");
                const mediaStream = await screenShare.startScreenShare();

                if (mediaStream) {
                    console.log("✅ Screen share started successfully");
                    console.log("Stream details:", {
                        videoTracks: mediaStream.getVideoTracks().length,
                        audioTracks: mediaStream.getAudioTracks().length
                    });

                    // Update UI state
                    dispatch({ type: 'isSharedScreen', payload: true });

                    // Set up stream end handler
                    const videoTrack = mediaStream.getVideoTracks()[0];
                    if (videoTrack) {
                        videoTrack.onended = () => {
                            console.log("📺 Screen share ended by user (video track ended)");
                            console.log("📺 This should only happen when user manually stops sharing from browser UI");
                            // Clean up when user stops sharing from browser UI
                            vad.cleanup();
                            if (micStream) {
                                micStream.getTracks().forEach(track => track.stop());
                                setMicStream(null);
                            }
                            dispatch({ type: 'isSharedScreen', payload: false });
                        };
                    }

                    // Try to initialize audio immediately with the MediaStream
                    console.log("🎤 Attempting to initialize audio...");
                    setTimeout(async () => {
                        try {
                            await initializeAudioAndVAD(mediaStream);
                        } catch (audioError) {
                            console.warn("⚠️ Audio initialization failed, but screen sharing will continue:", audioError);
                            // Don't show error message here - the initializeAudioAndVAD function already handles it
                        }
                    }, 100); // Reduced timeout since we're passing MediaStream directly

                } else {
                    console.error("❌ Failed to start screen sharing");
                    throw new Error("Screen sharing failed to start");
                }
            }
        } catch (error) {
            console.error("❌ Error in handleScreenShare:", error);

            // Provide specific error messages
            if (error.name === 'NotAllowedError') {
                dispatch({ type: 'streamingResponse', payload: '❌ Screen sharing permission denied. Please try again and allow access.' });
            } else if (error.name === 'NotSupportedError') {
                dispatch({ type: 'streamingResponse', payload: '❌ Screen sharing is not supported in this browser.' });
            } else if (error.message.includes('not supported')) {
                dispatch({ type: 'streamingResponse', payload: '❌ Screen sharing is not supported. Please use a modern browser.' });
            } else {
                dispatch({ type: 'streamingResponse', payload: MESSAGES.ERROR_SCREEN_SHARE });
            }

            dispatch({ type: 'isStreamingResponse', payload: false });
        }
    }, [screenShare, vad, micStream, dispatch, initializeAudioAndVAD]);

    const returnValue = {
        vadStatus: vad.vadStatus,
        isTranscribing,
        transcribedText,
        screenStream: screenShare.screenStream,
        micStream,
        conversationHistory: state.conversationHistory,
        handleScreenShare,
        cleanup,
        isVADActive: Boolean(vad.vadRef.current),
    };

    // Debug logging for critical state changes
    useEffect(() => {
        console.log("🔍 useInterviewSession state change:", {
            vadStatus: vad.vadStatus,
            hasScreenStream: Boolean(screenShare.screenStream),
            hasMicStream: Boolean(micStream),
            isVADActive: Boolean(vad.vadRef.current),
        });
    }, [vad.vadStatus, screenShare.screenStream, micStream, vad.vadRef.current]);

    return returnValue;
}; 