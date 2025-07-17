import React from 'react';
import { VadStatus } from '../../hooks/useVoiceDetection';
import { ConversationEntry } from '../../hooks/useSpeechProcessor';
import VoiceDetectionStatus from './VoiceDetectionStatus';
import AudioSourceStatus from './AudioSourceStatus';
import ConversationHistory from './ConversationHistory';

interface InterviewerContentProps {
    screenStream: MediaStream | null;
    vadStatus: VadStatus;
    isTranscribing: boolean;
    transcribedText: string;
    micStream: MediaStream | null;
    vadRef: React.RefObject<any>;
    conversationHistory: ConversationEntry[];
}

const InterviewerContent: React.FC<InterviewerContentProps> = ({
    screenStream,
    vadStatus,
    isTranscribing,
    transcribedText,
    micStream,
    vadRef,
    conversationHistory,
}) => {
    if (!screenStream) {
        return (
            <div className="flex h-full w-full flex-col justify-center items-center text-slate-500 pt-2">
                <div>
                    <h4 className="px-6 text-center text-sm font-medium">Once you start screen sharing</h4>
                    <h4 className="px-6 text-center text-sm font-medium">voice detection will use your screen share audio (if available)</h4>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full w-full flex-col p-4 overflow-y-auto">
            <VoiceDetectionStatus
                vadStatus={vadStatus}
                isTranscribing={isTranscribing}
                transcribedText={transcribedText}
                screenStream={screenStream}
            />
            
            <AudioSourceStatus
                screenStream={screenStream}
                micStream={micStream}
                vadRef={vadRef}
            />
            
            <ConversationHistory
                conversationHistory={conversationHistory}
            />
        </div>
    );
};

export default InterviewerContent; 