import React from 'react';
import Icon from '../icon';

interface ScreenShareControlProps {
    screenStream: MediaStream | null;
    onToggleScreenShare: () => void;
    isSharing: boolean;
}

const ScreenShareControl: React.FC<ScreenShareControlProps> = ({
    screenStream,
    onToggleScreenShare,
    isSharing,
}) => {
    return (
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
                        onClick={onToggleScreenShare}
                    >
                        <Icon icon={isSharing ? "Close" : "Cursor"} className="w-5 h-5 text-white" />
                        <span className="text-[#f8fafc]">
                            {isSharing ? 'Stop Sharing' : 'Start'}
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ScreenShareControl; 