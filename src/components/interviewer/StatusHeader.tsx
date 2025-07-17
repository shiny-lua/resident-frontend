import React from 'react';
import { VadStatus } from '../../hooks/useVoiceDetection';

interface StatusHeaderProps {
    vadStatus: VadStatus;
}

const StatusHeader: React.FC<StatusHeaderProps> = ({ vadStatus }) => {
    const getStatusDisplay = () => {
        switch (vadStatus) {
            case 'idle':
                return { text: 'Ready', color: 'bg-gray-400' };
            case 'requesting-permission':
                return { text: 'Requesting Microphone', color: 'bg-orange-500' };
            case 'listening':
                return { text: 'Listening for Speech', color: 'bg-blue-500' };
            case 'speaking':
                return { text: 'Recording Speech', color: 'bg-green-500' };
            case 'processing':
                return { text: 'Processing Speech', color: 'bg-yellow-500' };
            case 'accumulating':
                return { text: 'Accumulating Speech', color: 'bg-purple-500' };
            default:
                return { text: 'Ready', color: 'bg-gray-400' };
        }
    };

    const statusDisplay = getStatusDisplay();

    return (
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
    );
};

export default StatusHeader; 