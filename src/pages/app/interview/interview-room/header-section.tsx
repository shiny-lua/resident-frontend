import React, { useState, useEffect, useRef } from "react";

import Icon from "../../../../components/icon";
import SettingModal from "../../components/setting-modal";
import { useGlobalContext } from "../../../../context";
import EndSessionModal from "../../components/end-sesion-modal";
import { useLocation, useNavigate } from "react-router-dom";
import { restApi } from "../../../../context/restApi";
import { showToast } from "../../../../context/helper";

interface AudioDevice {
    deviceId: string;
    label: string;
}

const HeaderSection = ({ setEndInterview, interviewId }: { setEndInterview: Function; interviewId?: string }) => {
    const [state, { dispatch }] = useGlobalContext();

    const navigate = useNavigate();
    const location = useLocation();
    const audioDevicesDropdownRef = useRef<HTMLDivElement>(null);
    const leaveDropdownRef = useRef<HTMLDivElement>(null);

    const [isShowSettingModal, setIsShowSettingModal] = useState(false);
    const [audioDevices, setAudioDevices] = useState<AudioDevice[]>([]);
    const [showAudioDevices, setShowAudioDevices] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<AudioDevice | null>(null);
    const [timer, setTimer] = useState(0);
    const [showLeaveDropdown, setShowLeaveDropdown] = useState(false);
    const [isEndSession, setIsEndSession] = useState(false);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (audioDevicesDropdownRef.current && !audioDevicesDropdownRef.current.contains(event.target as Node)) {
            setShowAudioDevices(false);
        }
        if (leaveDropdownRef.current && !leaveDropdownRef.current.contains(event.target as Node)) {
            setShowLeaveDropdown(false);
        }
    }

    const handleTimer = () => {
        setTimer(timer + 1);
    }

    useEffect(() => {
        if (state.isSharedScreen) {
            const interval = setInterval(handleTimer, 1000);
            return () => clearInterval(interval);
        }
    }, [timer, state.isSharedScreen]);

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);


    const onLeaveRoom = async () => {
        if (!interviewId) {
            console.error("No interview ID provided");
            return;
        }

        setShowLeaveDropdown(false);
        
        try {
            const response = await restApi.leaveInterview(interviewId, 'in_progress');
            
            if (response.status === 200) {
              // Store interview state in localStorage
              localStorage.setItem('currentInterview', JSON.stringify({
                interviewId: interviewId,
                link: `/app/live-interview/live/${interviewId}`,
                status: true,
                timestamp: new Date().toISOString()
              }));
              
              dispatch({
                  type: "isLeaveInterview",
                  payload: {
                      status: true,
                      link: `/app/live-interview/live/${interviewId}`
                  }
              });
              navigate("/app/live-interview");
              return;
            } else {
                console.error('Failed to leave interview:', response.data?.msg || response.msg);
                showToast(response.data?.msg || response.msg || 'Failed to leave interview', 'error');
            }
        } catch (error) {
            console.error('Error leaving interview:', error);
            showToast('An error occurred while leaving the interview', 'error');
        }
    }

    const getAudioDevices = async () => {
        try {
            // Request permission to access audio devices
            await navigator.mediaDevices.getUserMedia({ audio: true });

            const devices = await navigator.mediaDevices.enumerateDevices();
            const audioInputs = devices
                .filter(device => device.kind === 'audioinput')
                .map(device => ({
                    deviceId: device.deviceId,
                    label: device.label || `Microphone ${device.deviceId}`
                }));

            setAudioDevices(audioInputs);
            // Set first device as default if none selected
            if (!selectedDevice && audioInputs.length > 0) {
                setSelectedDevice(audioInputs[0]);
            }
        } catch (err) {
            console.error('Error getting audio devices:', err);
        }
    };

    useEffect(() => {
        getAudioDevices();

        // Listen for device changes
        navigator.mediaDevices.addEventListener('devicechange', getAudioDevices);

        return () => {
            navigator.mediaDevices.removeEventListener('devicechange', getAudioDevices);
        };
    }, []);

    return (
        <div className="flex flex-row items-center justify-between bg-white border-b border-slate-200 px-6 py-4">
            <div className="flex flex-row items-center gap-4">
                <div className="flex flex-row items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="text-sm font-medium text-slate-700">Live</div>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <Icon icon="Timer" className="w-4 h-4 text-slate-500" />
                    <div className="text-sm font-medium text-slate-700">{formatTime(timer)}</div>
                </div>
            </div>
            <div className="flex flex-row items-center gap-2">
                <div className="relative" ref={audioDevicesDropdownRef}>
                    <button
                        onClick={() => setShowAudioDevices(!showAudioDevices)}
                        className="inline-flex gap-1 items-center justify-center whitespace-nowrap rounded-md text-md font-medium px-4 py-2.5 bg-slate-100 text-slate-700 focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-0"
                    >
                        <Icon icon="Microphone" className="text-slate-700" />
                        <div>Audio</div>
                        <Icon
                            icon="ChevronDown"
                            className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${showAudioDevices ? 'rotate-180' : ''}`}
                        />
                    </button>
                    {showAudioDevices && (
                        <div className="absolute top-full right-0 mt-1 w-full bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                            {audioDevices.map((device, index) => (
                                <button
                                    key={index}
                                    className="w-full px-4 py-2 text-left hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                                    onClick={() => {
                                        setSelectedDevice(device);
                                        setShowAudioDevices(false);
                                    }}
                                >
                                    <span>{device.label}</span>
                                    {selectedDevice?.deviceId === device.deviceId && (
                                        <Icon icon="Check" className="text-sky-500" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <button
                    onClick={() => setIsShowSettingModal(true)}
                    className="inline-flex gap-1 items-center justify-center whitespace-nowrap rounded-md text-md font-medium px-4 py-2.5 bg-slate-100 text-slate-700 focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-0"
                >
                    <Icon icon="Settings" className="text-slate-700" />
                    <div>Settings</div>
                </button>
                <div className="flex flex-col items-center mr-0 relative" ref={leaveDropdownRef}>
                    <button
                        onClick={() => setShowLeaveDropdown(!showLeaveDropdown)}
                        className="inline-flex gap-1 items-center justify-center whitespace-nowrap rounded-md text-md font-medium px-4 py-2.5 ml-2 bg-red-600 text-white focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-0"
                    >
                        <Icon icon="Leave" className="text-white" />
                        <div>Leave</div>
                        <Icon
                            icon="ChevronDown"
                            className={`w-5 h-5 text-white transition-transform duration-200 ${showLeaveDropdown ? 'rotate-180' : ''}`}
                        />
                    </button>
                    {showLeaveDropdown && (
                        <div className="absolute top-full right-0 mt-1 w-full bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                            <button
                                className="w-full px-4 py-2 text-left hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                                onClick={onLeaveRoom}
                            >
                                <span>Leave Room</span>
                            </button>
                            <button
                                className="w-full px-4 py-2 text-left hover:bg-slate-50 text-red-600 flex items-center gap-2"
                                onClick={() => {
                                    // Handle end interview
                                    setIsEndSession(true);
                                    setShowLeaveDropdown(false);
                                }}
                            >
                                <span>End Interview</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {isShowSettingModal && <SettingModal isOpen={isShowSettingModal} onClose={() => setIsShowSettingModal(false)} />}
            {isEndSession && <EndSessionModal isOpen={isEndSession} setEndInterview={setEndInterview} interviewId={interviewId} onClose={() => setIsEndSession(false)} />}
        </div>
    )
}

export default HeaderSection;
