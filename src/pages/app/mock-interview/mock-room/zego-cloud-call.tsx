import React, { useState, useEffect, useRef } from 'react';

interface ZegoCloudCallProps {
    sessionCode: string;
    userRole: 'examiner' | 'student';
    onCallStateChange: (isActive: boolean) => void;
    onTranscriptionUpdate: (text: string) => void;
}

const ZegoCloudCall: React.FC<ZegoCloudCallProps> = ({
    sessionCode,
    userRole,
    onCallStateChange,
    onTranscriptionUpdate
}) => {
    const [isInitialized, setIsInitialized] = React.useState(false);
    const [isConnected, setIsConnected] = React.useState(false);
    const [localStream, setLocalStream] = React.useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = React.useState<MediaStream | null>(null);
    const [isMuted, setIsMuted] = React.useState(false);
    const [isVideoOff, setIsVideoOff] = React.useState(false);

    // Essential environment variables
    const zegoConfig = {
        appId: import.meta.env.VITE_ZEGOCLOUD_APP_ID,
        appSign: import.meta.env.VITE_ZEGOCLOUD_APP_SIGN,
        serverUrl: import.meta.env.VITE_ZEGOCLOUD_SERVER_URL,
        backupServerUrl: import.meta.env.VITE_ZEGOCLOUD_BACKUP_SERVER_URL
    };

    const enableVideoCalling = import.meta.env.VITE_ENABLE_VIDEO_CALLING === 'true';
    const enableTranscription = import.meta.env.VITE_ENABLE_TRANSCRIPTION === 'true';
    const debugMode = import.meta.env.VITE_DEBUG_MODE === 'true';
    const pollingInterval = parseInt(import.meta.env.VITE_MOCK_INTERVIEW_POLLING_INTERVAL || '5000');

    React.useEffect(() => {
        const initializeCall = async () => {
            try {
                if (debugMode) {
                    console.log('Initializing ZegoCloud call for session:', sessionCode);
                    console.log('User role:', userRole);
                    console.log('ZegoCloud config:', zegoConfig);
                }
                
                // Request media permissions only if video calling is enabled
                if (enableVideoCalling) {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        audio: true,
                        video: true
                    });
                    
                    setLocalStream(stream);
                }
                
                // Initialize ZegoCloud connection
                await initializeZegoCloud();
                
                // Simulate successful connection for now
                // In production, this would be replaced with actual ZegoCloud SDK calls
                setTimeout(() => {
                    setIsInitialized(true);
                    setIsConnected(true);
                    onCallStateChange(true);
                    
                    // Start transcription simulation if enabled
                    if (enableTranscription) {
                        startTranscriptionSimulation();
                    }
                }, 2000);

            } catch (error) {
                console.error('Error initializing call:', error);
                onCallStateChange(false);
            }
        };

        if (sessionCode && userRole) {
            initializeCall();
        }

        return () => {
            // Cleanup
            cleanupCall();
        };
    }, [sessionCode, userRole]);

    const initializeZegoCloud = async () => {
        // This would be replaced with actual ZegoCloud SDK initialization
        if (debugMode) {
            console.log('Initializing ZegoCloud with config:', zegoConfig);
        }
        
        // Simulate ZegoCloud initialization
        return new Promise((resolve) => {
            setTimeout(() => {
                if (debugMode) {
                    console.log('ZegoCloud initialized successfully');
                }
                resolve(true);
            }, 1000);
        });
    };

    const startTranscriptionSimulation = () => {
        // Simulate real-time transcription
        const transcriptionInterval = setInterval(() => {
            if (isConnected && userRole === 'student' && enableTranscription) {
                // Simulate student speaking
                const sampleResponses = [
                    "I believe that effective communication is crucial in medical practice...",
                    "In my experience, when dealing with difficult patients...",
                    "I would approach this situation by first understanding the patient's concerns...",
                    "The key to successful teamwork is clear communication and mutual respect...",
                    "I learned from this experience that preparation and adaptability are essential..."
                ];
                
                const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
                onTranscriptionUpdate(randomResponse);
            }
        }, pollingInterval);

        return () => clearInterval(transcriptionInterval);
    };

    const cleanupCall = () => {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
        setIsConnected(false);
        onCallStateChange(false);
    };

    const toggleMute = () => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsMuted(!audioTrack.enabled);
            }
        }
    };

    const toggleVideo = () => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsVideoOff(!videoTrack.enabled);
            }
        }
    };

    const endCall = () => {
        cleanupCall();
    };

    return (
        <div className="w-full h-full relative bg-gray-900">
            {/* Video Display Area */}
            <div className="w-full h-full flex items-center justify-center relative">
                {/* Local Video */}
                {localStream && enableVideoCalling && (
                    <video
                        ref={(video) => {
                            if (video && localStream) {
                                video.srcObject = localStream;
                            }
                        }}
                        autoPlay
                        muted
                        playsInline
                        className={`absolute top-4 right-4 w-48 h-36 rounded-lg object-cover border-2 border-white ${
                            isVideoOff ? 'bg-gray-800' : ''
                        }`}
                    />
                )}

                {/* Remote Video (Main Display) */}
                <div className="w-full h-full flex items-center justify-center">
                    {remoteStream && enableVideoCalling ? (
                        <video
                            ref={(video) => {
                                if (video && remoteStream) {
                                    video.srcObject = remoteStream;
                                }
                            }}
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="text-white text-center">
                            <div className="text-2xl font-bold mb-4">
                                {isConnected ? 'Connected to Interview Room' : 'Connecting...'}
                            </div>
                            <div className="text-lg mb-2">Session: {sessionCode}</div>
                            <div className="text-sm mb-4">Role: {userRole}</div>
                            <div className="text-sm text-gray-400">
                                {isConnected ? 'Waiting for other participant...' : 'Establishing connection...'}
                            </div>
                            {!enableVideoCalling && (
                                <div className="text-sm text-yellow-400 mt-2">
                                    Video calling is disabled
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Connection Status */}
                {!isInitialized && (
                    <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                        <div className="text-white text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                            <p>Connecting to interview room...</p>
                            <p className="text-sm text-gray-400 mt-2">Initializing ZegoCloud</p>
                        </div>
                    </div>
                )}

                {/* Role Indicator */}
                <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                    {userRole === 'examiner' ? '👨‍⚕️ Examiner' : '👨‍🎓 Student'}
                </div>

                {/* Connection Status Indicator */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                    <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-sm">{isConnected ? 'Connected' : 'Connecting'}</span>
                    </div>
                </div>
            </div>
            
            {/* Call Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                {/* Mute Button */}
                {enableVideoCalling && (
                    <button
                        className={`p-3 rounded-full ${isMuted ? 'bg-red-600' : 'bg-gray-600'} text-white hover:opacity-80`}
                        onClick={toggleMute}
                    >
                        {isMuted ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        )}
                    </button>
                )}

                {/* Video Toggle Button */}
                {enableVideoCalling && (
                    <button
                        className={`p-3 rounded-full ${isVideoOff ? 'bg-red-600' : 'bg-gray-600'} text-white hover:opacity-80`}
                        onClick={toggleVideo}
                    >
                        {isVideoOff ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        )}
                    </button>
                )}

                {/* End Call Button */}
                <button
                    className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700"
                    onClick={endCall}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* ZegoCloud Status */}
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-xs">
                ZegoCloud {isConnected ? 'Connected' : 'Connecting'}
            </div>

            {/* Debug Information */}
            {debugMode && (
                <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded text-xs">
                    <div>App ID: {zegoConfig.appId}</div>
                    <div>Video: {enableVideoCalling ? 'ON' : 'OFF'}</div>
                    <div>Transcription: {enableTranscription ? 'ON' : 'OFF'}</div>
                </div>
            )}
        </div>
    );
};

export default ZegoCloudCall; 