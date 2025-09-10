import React from 'react';
import Icon from '../../../../../components/icon';
import type { VADStatus } from '../../../interview/interview-room/types';

interface MockInterviewVoiceDetectionStatusProps {
    status: VADStatus;
    isVADActive: boolean;
    isRecording: boolean;
    recordingTime: number;
    transcribedText: string;
}

const MockInterviewVoiceDetectionStatus: React.FC<MockInterviewVoiceDetectionStatusProps> = ({
    status,
    isVADActive,
    isRecording,
    recordingTime,
    transcribedText
}) => {
    const getStatusConfig = () => {
        switch (status) {
            case 'idle':
                return {
                    icon: 'Microphone',
                    text: 'Voice Detection Inactive',
                    color: 'text-gray-500',
                    bgColor: 'bg-gray-100',
                    borderColor: 'border-gray-200'
                };
            case 'requesting-permission':
                return {
                    icon: 'Microphone',
                    text: 'Requesting Microphone Access',
                    color: 'text-orange-600',
                    bgColor: 'bg-orange-50',
                    borderColor: 'border-orange-200'
                };
            case 'listening':
                return {
                    icon: 'Microphone',
                    text: 'Listening for Your Answer',
                    color: 'text-blue-600',
                    bgColor: 'bg-blue-50',
                    borderColor: 'border-blue-200'
                };
            case 'speaking':
                return {
                    icon: 'Microphone',
                    text: 'Recording Your Answer',
                    color: 'text-green-600',
                    bgColor: 'bg-green-50',
                    borderColor: 'border-green-200'
                };
            case 'processing':
                return {
                    icon: 'Loader',
                    text: 'Processing Your Answer',
                    color: 'text-yellow-600',
                    bgColor: 'bg-yellow-50',
                    borderColor: 'border-yellow-200'
                };
            case 'accumulating':
                return {
                    icon: 'Microphone',
                    text: 'Accumulating Speech',
                    color: 'text-purple-600',
                    bgColor: 'bg-purple-50',
                    borderColor: 'border-purple-200'
                };
            default:
                return {
                    icon: 'Microphone',
                    text: 'Voice Detection Status',
                    color: 'text-gray-500',
                    bgColor: 'bg-gray-100',
                    borderColor: 'border-gray-200'
                };
        }
    };

    const statusConfig = getStatusConfig();

    return (
        <div className={`flex items-center gap-3 p-3 rounded-lg border ${statusConfig.bgColor} ${statusConfig.borderColor}`}>
            {/* Status Icon */}
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${statusConfig.bgColor}`}>
                <Icon 
                    icon={statusConfig.icon} 
                    className={`w-4 h-4 ${statusConfig.color}`}
                />
            </div>

            {/* Status Text */}
            <div className="flex-1">
                <div className={`text-sm font-medium ${statusConfig.color}`}>
                    {statusConfig.text}
                </div>
                {status === 'accumulating' && (
                    <div className="text-xs text-purple-600 mt-1 font-medium">
                        Processing in {recordingTime} seconds...
                    </div>
                )}
                {transcribedText && (
                    <div className="text-xs text-gray-600 mt-1">
                        "{transcribedText.substring(0, 50)}{transcribedText.length > 50 ? '...' : ''}"
                    </div>
                )}
            </div>

            {/* Active Indicator */}
            <div className={`w-2 h-2 rounded-full ${
                isVADActive ? 'bg-green-500' : 'bg-gray-400'
            }`}></div>
        </div>
    );
};

export default MockInterviewVoiceDetectionStatus;
