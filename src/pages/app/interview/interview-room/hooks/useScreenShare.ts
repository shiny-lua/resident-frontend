import { useState, useCallback } from 'react';
import type { UseScreenShareReturn } from '../types';

export const useScreenShare = (): UseScreenShareReturn => {
    const [screenStream, setScreenStream] = useState<MediaStream | null>(null);

    const startScreenShare = useCallback(async (): Promise<MediaStream | null> => {
        try {
            console.log("Starting screen sharing with audio...");
            
            // Check if getDisplayMedia is supported
            if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
                throw new Error("Screen sharing is not supported in this browser");
            }
            
            const mediaStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true // Try to get audio from screen share
            });

            console.log("Screen sharing granted by user");
            setScreenStream(mediaStream);

            console.log("Screen sharing started successfully");
            const audioTracks = mediaStream.getAudioTracks();
            const videoTracks = mediaStream.getVideoTracks();
            console.log("Screen share audio tracks:", audioTracks.length);
            console.log("Screen share video tracks:", videoTracks.length);

            return mediaStream;

        } catch (error) {
            console.error("Error starting screen share:", error);
            if (error.name === 'NotAllowedError') {
                console.error("User denied screen sharing permission");
            } else if (error.name === 'NotSupportedError') {
                console.error("Screen sharing not supported");
            }
            setScreenStream(null);
            return null;
        }
    }, []);

    const stopScreenShare = useCallback((): void => {
        if (screenStream) {
            console.log("🛑 stopScreenShare called - stopping all tracks");
            console.log("🛑 Current tracks:", screenStream.getTracks().map(track => ({
                kind: track.kind,
                id: track.id,
                readyState: track.readyState
            })));
            screenStream.getTracks().forEach(track => track.stop());
            setScreenStream(null);
            console.log("🛑 Screen sharing stopped");
        } else {
            console.log("🛑 stopScreenShare called but no screenStream to stop");
        }
    }, [screenStream]);

    const hasAudio = useCallback((): boolean => {
        const result = screenStream ? screenStream.getAudioTracks().length > 0 : false;
        console.log("🔊 hasAudio() called:", {
            hasScreenStream: !!screenStream,
            audioTracksLength: screenStream ? screenStream.getAudioTracks().length : 0,
            result: result
        });
        return result;
    }, [screenStream]);

    const getAudioStream = useCallback((): MediaStream | null => {
        if (!screenStream) return null;
        
        const audioTracks = screenStream.getAudioTracks();
        if (audioTracks.length === 0) return null;

        return new MediaStream(audioTracks);
    }, [screenStream]);

    return {
        screenStream,
        startScreenShare,
        stopScreenShare,
        hasAudio,
        getAudioStream,
    };
}; 