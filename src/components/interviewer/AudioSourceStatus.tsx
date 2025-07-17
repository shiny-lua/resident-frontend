import React from 'react';

interface AudioSourceStatusProps {
    screenStream: MediaStream | null;
    micStream: MediaStream | null;
    vadRef: React.RefObject<any>;
}

const AudioSourceStatus: React.FC<AudioSourceStatusProps> = ({
    screenStream,
    micStream,
    vadRef,
}) => {
    const getAudioSourceText = () => {
        if (!micStream) return 'Inactive';
        
        if (screenStream && screenStream.getAudioTracks().length > 0) {
            return 'Screen Share Audio';
        }
        
        return 'Microphone';
    };

    return (
        <div className="mb-4">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Audio Sources</h4>
            <div className="space-y-2">
                <div className="flex items-center text-sm">
                    <div className={`w-2 h-2 rounded-full mr-2 ${screenStream ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span>Screen Share: {screenStream ? 'Active' : 'Inactive'}</span>
                </div>
                <div className="flex items-center text-sm">
                    <div className={`w-2 h-2 rounded-full mr-2 ${micStream ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span>Audio Source: {getAudioSourceText()}</span>
                </div>
                <div className="flex items-center text-sm">
                    <div className={`w-2 h-2 rounded-full mr-2 ${vadRef.current ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span>Voice Detection: {vadRef.current ? 'Active' : 'Inactive'}</span>
                </div>
            </div>
        </div>
    );
};

export default AudioSourceStatus; 