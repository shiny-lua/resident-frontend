import React from "react";

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

    React.useEffect(() => {
        const initializeCall = async () => {
            try {
                // For now, we'll use a placeholder implementation
                // In production, you would integrate the actual ZEGOCLOUD SDK
                console.log('Initializing call for session:', sessionCode);
                console.log('User role:', userRole);
                
                // Simulate successful connection
                setTimeout(() => {
                    setIsInitialized(true);
                    onCallStateChange(true);
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
            onCallStateChange(false);
        };
    }, [sessionCode, userRole]);

    return (
        <div className="w-full h-full relative">
            <div 
                id="zego-cloud-call-container" 
                className="w-full h-full bg-gray-900 flex items-center justify-center"
            >
                <div className="text-white text-center">
                    <div className="text-2xl font-bold mb-4">Voice Call Interface</div>
                    <div className="text-lg mb-2">Session: {sessionCode}</div>
                    <div className="text-sm mb-4">Role: {userRole}</div>
                    <div className="text-sm text-gray-400">
                        {isInitialized ? 'Connected' : 'Connecting...'}
                    </div>
                </div>
            </div>
            
            {/* Call Controls Overlay */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                <button
                    className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700"
                    onClick={() => {
                        // End call functionality
                        onCallStateChange(false);
                    }}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Role Indicator */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                {userRole === 'examiner' ? '👨‍⚕️ Examiner' : '👨‍🎓 Student'}
            </div>

            {/* Connection Status */}
            {!isInitialized && (
                <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                    <div className="text-white text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                        <p>Connecting to interview room...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ZegoCloudCall; 