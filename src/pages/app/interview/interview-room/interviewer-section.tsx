import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

import Icon from '../../../../components/icon';
import { useGlobalContext } from '../../../../context';
import { restApi } from '../../../../context/restApi';

// Custom hooks
import { useInterviewSession } from './hooks/useInterviewSession';

// Components
import VoiceDetectionStatus from './components/VoiceDetectionStatus';
import AudioSourcesPanel from './components/AudioSourcesPanel';
import ConversationHistory from './components/ConversationHistory';
import CreateStripePaymentModal from './create-stripe-payment-modal';

/**
 * Optimized InterviewerSection component following senior developer practices:
 * - Separation of concerns
 * - Custom hooks for complex logic
 * - Reusable components
 * - Better type safety
 * - Centralized constants
 * - Clean error handling
 */
const InterviewerSection: React.FC = () => {
    const [state] = useGlobalContext();
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const [isPremium, setIsPremium] = React.useState(false);
    const [stripePromise, setStripePromise] = React.useState<any>(null);

    // Main interview session hook that combines all functionality
    const {
        vadStatus,
        isTranscribing,
        transcribedText,
        screenStream,
        micStream,
        conversationHistory,
        handleScreenShare,
        cleanup,
        isVADActive,
    } = useInterviewSession();

    // Initialize Stripe
    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
            const res = await restApi.postRequest('get-stripe-client-secret');
            if (res.data.publishableKey) {
                setStripePromise(loadStripe(res.data.publishableKey));
                }
            } catch (error) {
                console.error('Error fetching Stripe client secret:', error);
            }
        };

        fetchClientSecret();
    }, []);

    // Update premium status
    useEffect(() => {
        setIsPremium(state.user.isPremium);
    }, [state.user]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            cleanup();
        };
    }, [cleanup]); // Now safe to include cleanup dependency since it's stable

    // Get status display configuration
    const getStatusDisplay = () => {
        const statusConfig = {
            'idle': { text: 'Ready', color: 'bg-gray-400' },
            'requesting-permission': { text: 'Requesting Microphone', color: 'bg-orange-500' },
            'listening': { text: 'Listening for Speech', color: 'bg-blue-500' },
            'speaking': { text: 'Recording Speech', color: 'bg-green-500' },
            'processing': { text: 'Processing Speech', color: 'bg-yellow-500' },
            'accumulating': { text: 'Accumulating Speech', color: 'bg-purple-500' },
        };

        return statusConfig[vadStatus] || statusConfig.idle;
    };

    const statusDisplay = getStatusDisplay();

    const handleScreenShareClick = async () => {
        console.log('🔘 Screen share button clicked');
        console.log('Current state:', {
            hasScreenStream: !!screenStream,
            vadStatus: vadStatus,
            hasNavigator: !!navigator,
            hasMediaDevices: !!navigator?.mediaDevices,
            hasGetDisplayMedia: !!navigator?.mediaDevices?.getDisplayMedia
        });

        // Uncomment if premium check is needed
            // if (!isPremium) {
            //     setIsOpenModal(true);
            //     return;
            // }

        // Check browser support first
        if (!navigator?.mediaDevices?.getDisplayMedia) {
            console.error('❌ getDisplayMedia not supported');
            alert('Screen sharing is not supported in this browser. Please use Chrome, Firefox, or Edge.');
            return;
        }

        try {
            console.log('🚀 Calling handleScreenShare...');
            await handleScreenShare();
            console.log('✅ handleScreenShare completed');
        } catch (error) {
            console.error('❌ Error handling screen share:', error);
            alert(`Screen sharing failed: ${error.message}`);
        }
    };

    return (
        <div className="min-w-[150px] w-1/5">
            <div className="flex h-full flex-1 flex-col bg-slate-100">
                {/* Header Section */}
                <div className="flex h-12 items-center rounded-t-lg border border-slate-100 bg-white px-4">
                    <div className="flex min-h-7 flex-1 items-center justify-between">
                        <div className="flex flex-row items-center text-sm font-semibold text-slate-900">
                            <p className="mr-2 flex-1">Interviewer says:</p>
                        </div>
                        <div className="flex items-center rounded-full border border-slate-100 px-2.5 py-1.5">
                            <span className="relative me-2 flex h-2 w-2">
                                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${statusDisplay.color}`} />
                                <span className={`relative inline-flex h-2 w-2 rounded-full ${statusDisplay.color}`} />
                            </span>
                            <span className="text-sm font-medium text-slate-700">
                                {statusDisplay.text}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Video Section */}
                <div className="relative flex items-center justify-center bg-black lg:h-44 lg:max-h-44 2xl:h-56 2xl:max-h-56 min-h-32">
                    {screenStream ? (
                        <div className="flex max-h-full w-full justify-center lg:h-44 lg:max-h-44 2xl:h-56 2xl:max-h-56">
                            <video
                                className="max-h-full object-contain"
                                autoPlay
                                ref={video => {
                                    if (video) {
                                        video.srcObject = screenStream;
                                    }
                                }}
                            />
                        </div>
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-2">
                            <p className="text-center text-md font-semibold text-slate-50">
                                Connect to your interview meeting room
                            </p>
                            <p className="text-center text-sm text-slate-300">
                                Screen sharing (with audio if available) for voice detection
                            </p>
                            <button
                                className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium text-white px-5 py-2.5 bg-sky-600 hover:bg-sky-700"
                                onClick={handleScreenShareClick}
                            >
                                <Icon icon={screenStream ? "Close" : "Cursor"} className="w-5 h-5 text-white" />
                                <span className="text-[#f8fafc]">
                                    {screenStream ? 'Stop Sharing' : 'Start'}
                                </span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="flex min-h-52 h-full flex-col max-h-screen border border-slate-100 bg-white flex-[2]">
                    {screenStream ? (
                        <div className="flex h-full w-full flex-col p-4 overflow-y-auto">
                            {/* Voice Detection Status */}
                            <VoiceDetectionStatus
                                status={vadStatus}
                                isTranscribing={isTranscribing}
                                transcribedText={transcribedText}
                                screenStream={screenStream}
                            />

                            {/* Audio Sources Panel */}
                            <AudioSourcesPanel
                                screenStream={screenStream}
                                micStream={micStream}
                                vadActive={isVADActive}
                            />

                            {/* Conversation History */}
                            <ConversationHistory
                                conversations={conversationHistory}
                            />
                        </div>
                    ) : (
                        <div className="flex h-full w-full flex-col justify-center items-center text-slate-500 pt-2">
                            <div>
                                <h4 className="px-6 text-center text-sm font-medium">Once you start screen sharing</h4>
                                <h4 className="px-6 text-center text-sm font-medium">voice detection will use your screen share audio (if available)</h4>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Stripe Payment Modal */}
            {isOpenModal && (
                <CreateStripePaymentModal
                    setIsPremium={setIsPremium}
                    handleScreenShare={handleScreenShare}
                    isOpen={isOpenModal}
                    onClose={() => setIsOpenModal(false)}
                    stripePromise={stripePromise}
                />
            )}
        </div>
    );
};

export default InterviewerSection;