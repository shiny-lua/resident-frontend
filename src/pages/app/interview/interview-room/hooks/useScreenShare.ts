import { useState, useCallback } from 'react';
import type { UseScreenShareReturn } from '../types';

// Helper function to detect Mac OS
const isMacOS = (): boolean => {
    return navigator.platform.toLowerCase().includes('mac') || 
           navigator.userAgent.toLowerCase().includes('mac');
};

// Helper function to detect Chrome on Mac
const isChromeOnMac = (): boolean => {
    return isMacOS() && navigator.userAgent.toLowerCase().includes('chrome');
};

// Helper function to check if we're on HTTPS
const isSecureContext = (): boolean => {
    return window.isSecureContext || location.protocol === 'https:';
};

export const useScreenShare = (): UseScreenShareReturn => {
    const [screenStream, setScreenStream] = useState<MediaStream | null>(null);

    const startScreenShare = useCallback(async (): Promise<MediaStream | null> => {
        try {
            console.log("🚀 Starting screen sharing with audio...");
            console.log("🔍 Environment check:", {
                isMacOS: isMacOS(),
                isChromeOnMac: isChromeOnMac(),
                isSecureContext: isSecureContext(),
                userAgent: navigator.userAgent,
                platform: navigator.platform
            });
            
            // Check if getDisplayMedia is supported
            if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
                throw new Error("Screen sharing is not supported in this browser");
            }

            // Check HTTPS requirement (especially important for Mac)
            if (!isSecureContext()) {
                throw new Error("Screen sharing requires HTTPS. Please use a secure connection.");
            }

            // Mac-specific checks and warnings
            if (isMacOS()) {
                console.log("🍎 Detected macOS - applying Mac-specific handling");
                
                // Check if Chrome on Mac (most reliable for screen sharing)
                if (isChromeOnMac()) {
                    console.log("✅ Chrome on Mac detected - should work well");
                } else {
                    console.log("⚠️ Not Chrome on Mac - may have permission issues");
                }
            }
            
            // Try to get screen share with audio first
            let mediaStream: MediaStream;
            
            try {
                console.log("🎯 Attempting screen share with audio...");
                mediaStream = await navigator.mediaDevices.getDisplayMedia({
                    video: {
                        // cursor: "always",
                        displaySurface: "monitor"
                    },
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        sampleRate: 44100
                    }
                });
            } catch (audioError) {
                console.log("⚠️ Audio capture failed, trying video only:", audioError);
                
                // If audio fails, try video only (common on Mac)
                try {
                    mediaStream = await navigator.mediaDevices.getDisplayMedia({
                        video: {
                            // cursor: "always",
                            displaySurface: "monitor"
                        },
                        audio: false
                    });
                } catch (videoError) {
                    console.error("❌ Video-only screen share also failed:", videoError);
                    throw videoError;
                }
            }

            console.log("✅ Screen sharing granted by user");
            setScreenStream(mediaStream);

            console.log("📊 Screen sharing started successfully");
            const audioTracks = mediaStream.getAudioTracks();
            const videoTracks = mediaStream.getVideoTracks();
            console.log("🎵 Screen share audio tracks:", audioTracks.length);
            console.log("📹 Screen share video tracks:", videoTracks.length);

            // Log track details for debugging
            audioTracks.forEach((track, index) => {
                console.log(`🎵 Audio track ${index}:`, {
                    id: track.id,
                    label: track.label,
                    enabled: track.enabled,
                    readyState: track.readyState,
                    muted: track.muted
                });
            });

            videoTracks.forEach((track, index) => {
                console.log(`📹 Video track ${index}:`, {
                    id: track.id,
                    label: track.label,
                    enabled: track.enabled,
                    readyState: track.readyState
                });
            });

            // Set up track ended handlers
            mediaStream.getTracks().forEach(track => {
                track.onended = () => {
                    console.log(`🛑 Track ended: ${track.kind} - ${track.id}`);
                    if (track.kind === 'video') {
                        console.log("📺 Screen share ended by user");
                        setScreenStream(null);
                    }
                };
            });

            return mediaStream;

        } catch (error) {
            console.error("❌ Error starting screen share:", error);
            
            // Enhanced error handling for Mac-specific issues
            if (error instanceof Error && error.name === 'NotAllowedError') {
                if (isMacOS()) {
                    throw new Error("Screen sharing permission denied. Please check System Preferences > Security & Privacy > Privacy > Screen Recording and ensure your browser has permission.");
                } else {
                    throw new Error("Screen sharing permission denied. Please allow screen sharing when prompted.");
                }
            } else if (error instanceof Error && error.name === 'NotSupportedError') {
                throw new Error("Screen sharing is not supported in this browser. Please use Chrome, Firefox, or Edge.");
            } else if (error instanceof Error && error.name === 'NotFoundError') {
                throw new Error("No screen or window found to share. Please try again.");
            } else if (error instanceof Error && error.name === 'AbortError') {
                throw new Error("Screen sharing was cancelled.");
            } else if (error instanceof Error && error.message.includes('HTTPS')) {
                throw new Error("Screen sharing requires HTTPS. Please use a secure connection.");
            } else {
                // Generic error with more context
                const errorMessage = isMacOS() 
                    ? `Screen sharing failed: ${error instanceof Error ? error.message : 'Unknown error'}. On macOS, please check System Preferences > Security & Privacy > Privacy > Screen Recording.`
                    : `Screen sharing failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
                throw new Error(errorMessage);
            }
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