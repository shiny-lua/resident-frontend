import React from 'react';
import type { VoiceDetectionStatusProps } from '../types';
import { hasAudioTracks } from '../utils/audioUtils';

const VoiceDetectionStatus: React.FC<VoiceDetectionStatusProps> = ({
    status,
    isTranscribing,
    transcribedText,
    screenStream
}) => {
    const getStatusComponent = () => {
        switch (status) {
            case 'requesting-permission':
                return (
                    <div className="flex items-center text-orange-600">
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-orange-600 border-t-transparent rounded-full"></div>
                        Requesting microphone permission...
                    </div>
                );

            case 'processing':
                if (isTranscribing) {
                    return (
                        <div className="flex items-center text-blue-600">
                            <div className="animate-spin mr-2 h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                            Converting speech to text...
                        </div>
                    );
                }
                break;

            case 'accumulating':
                return (
                    <div className="flex items-center text-purple-600">
                        <div className="animate-pulse mr-2 h-3 w-3 bg-purple-500 rounded-full"></div>
                        <span className="font-semibold">🔄 Accumulating speech segments...</span>
                    </div>
                );

            case 'speaking':
                return (
                    <div className="flex items-center text-green-600">
                        <div className="animate-pulse mr-2 h-3 w-3 bg-green-500 rounded-full"></div>
                        <span className="font-semibold">
                            🎤 Recording speech from {
                                hasAudioTracks(screenStream) ? 'screen share audio' : 'microphone'
                            }...
                        </span>
                    </div>
                );

            case 'listening':
                return (
                    <div className="flex items-center text-blue-600">
                        <div className="animate-pulse mr-2 h-3 w-3 bg-blue-500 rounded-full"></div>
                        <span className="font-semibold">
                            🎧 Listening for speech via {
                                hasAudioTracks(screenStream) ? 'screen share audio' : 'microphone'
                            }...
                        </span>
                    </div>
                );

            default:
                if (transcribedText) {
                    return <p className="text-sm text-slate-700">{transcribedText}</p>;
                }
                if (status === 'idle') {
                    return <p className="text-sm text-slate-500 italic">Voice detection not active. Check audio setup.</p>;
                }
                return <p className="text-sm text-slate-500 italic">Voice detection ready...</p>;
        }
    };

    return (
        <div className="mb-4">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Real-time Voice Detection</h4>
            <div className="p-3 bg-slate-50 rounded-lg border min-h-20">
                {getStatusComponent()}
            </div>
        </div>
    );
};

export default VoiceDetectionStatus; 