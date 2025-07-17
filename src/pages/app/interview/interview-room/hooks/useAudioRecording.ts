import { useRef, useState, useCallback } from 'react';
import { AUDIO_CONFIG } from '../constants';
import type { UseAudioRecordingReturn } from '../types';

export const useAudioRecording = (): UseAudioRecordingReturn => {
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const [isRecording, setIsRecording] = useState<boolean>(false);

    const startRecording = useCallback((stream: MediaStream): void => {
        if (isRecording) {
            console.warn('Recording already in progress');
            return;
        }

        try {
            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: AUDIO_CONFIG.mimeType
            });

            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event: BlobEvent) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                console.log('MediaRecorder stopped');
                setIsRecording(false);
            };

            mediaRecorder.onerror = (event) => {
                console.error('MediaRecorder error:', event);
                setIsRecording(false);
            };

            setIsRecording(true);
            mediaRecorder.start();
            console.log("📹 Recording started");

        } catch (error) {
            console.error("Error starting recording:", error);
            setIsRecording(false);
        }
    }, [isRecording]);

    const stopRecording = useCallback((): void => {
        if (!isRecording || !mediaRecorderRef.current) {
            return;
        }

        try {
            if (mediaRecorderRef.current.state === 'recording') {
                mediaRecorderRef.current.stop();
                console.log("⏹️ Recording stopped");
            }
        } catch (error) {
            console.error("Error stopping recording:", error);
        }
    }, [isRecording]);

    const getRecordedBlob = useCallback((): Blob | null => {
        if (audioChunksRef.current.length === 0) {
            return null;
        }

        return new Blob(audioChunksRef.current, { type: AUDIO_CONFIG.mimeType });
    }, []);

    const clearRecording = useCallback((): void => {
        audioChunksRef.current = [];
    }, []);

    const cleanup = useCallback((): void => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
        mediaRecorderRef.current = null;
        audioChunksRef.current = [];
        setIsRecording(false);
    }, []);

    return {
        isRecording,
        startRecording,
        stopRecording,
        cleanup,
        getRecordedBlob,
        clearRecording,
    };
}; 