import React from 'react';
import type { AudioSourcesPanelProps } from '../types';
import { getAudioSourceDescription } from '../utils/audioUtils';

const AudioSourcesPanel: React.FC<AudioSourcesPanelProps> = ({
    screenStream,
    micStream,
    vadActive
}) => {
    // Debug logging - only when there are changes
    React.useEffect(() => {
        console.log("🔍 AudioSourcesPanel state update:", {
            hasScreenStream: Boolean(screenStream),
            hasMicStream: Boolean(micStream),
            vadActive: vadActive,
            screenStreamAudioTracks: screenStream?.getAudioTracks().length || 0,
            micStreamAudioTracks: micStream?.getAudioTracks().length || 0
        });
    }, [screenStream, micStream, vadActive]);

    const getStatusIndicator = (isActive: boolean) => (
        <div className={`w-2 h-2 rounded-full mr-2 ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
    );

    return (
        <div className="mb-4">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Audio Sources</h4>
            <div className="space-y-2">
                <div className="flex items-center text-sm">
                    {getStatusIndicator(Boolean(screenStream))}
                    <span>Screen Share: {screenStream ? 'Active' : 'Inactive'}</span>
                </div>
                <div className="flex items-center text-sm">
                    {getStatusIndicator(Boolean(micStream))}
                    <span>
                        Audio Source: {getAudioSourceDescription(screenStream, micStream)}
                    </span>
                </div>
                <div className="flex items-center text-sm">
                    {getStatusIndicator(vadActive)}
                    <span>Voice Detection: {vadActive ? 'Active' : 'Inactive'}</span>
                </div>
            </div>
        </div>
    );
};

export default AudioSourcesPanel; 