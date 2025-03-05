import { useState, useEffect, useRef } from "react";

import Icon from "../../../../components/icon";
import SettingModal from "../../components/setting-modal";
import EndSessionModal from "../../components/end-sesion-modal";
import { useGlobalContext } from "../../../../context";
import { useLocation, useNavigate } from "react-router-dom";

interface AudioDevice {
    deviceId: string;
    label: string;
}

const HeaderSection = ({ setEndInterview, isCameraOn, setIsCameraOn }: { setEndInterview: Function, isCameraOn: boolean, setIsCameraOn: Function }) => {
    const [_, { dispatch }] = useGlobalContext();
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
        const interval = setInterval(handleTimer, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

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

    const onLeaveRoom = () => {
        setShowLeaveDropdown(false);
        dispatch({
            type: "isLeaveInterview",
            payload: {
                status: true,
                link: location.pathname
            }
        })
        navigate("/app/mock-interview")
    }

    return (
        <div className="flex flex-nowrap items-center justify-between bg-slate-50 p-4 md:p-6">
            <div className="flex min-w-[150px] flex-col gap-1 items-start overflow-hidden md:h-full">
                <div className="h-7 max-h-7 w-full overflow-hidden text-ellipsis whitespace-nowrap text-xl font-semibold text-slate-900">
                    Mock Interview
                </div>
                <div className="flex h-7 items-center text-sm text-slate-400">
                    <div className="mr-2 flex items-center justify-center rounded-3xl text-sm text-white">
                        <span className="text-sm font-medium leading-[26px] bg-[linear-gradient(90deg,_#0090FF_0%,_#00F7FF_100%)] text-white px-3 rounded-full">
                            Beta
                        </span>
                    </div>
                    <Icon icon="Timer" className="w-5 h-5 text-slate-700" />
                    <span className="ml-1 font-normal text-slate-700">{formatTime(timer)}</span>
                </div>
            </div>
            <div className="z-20 inline-flex items-center gap-4 bg-slate-50">
                <button onClick={() => setIsCameraOn(!isCameraOn)} className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium h-11 w-11 rounded-full p-0 ${!isCameraOn ? 'bg-white border border-slate-300' : 'bg-sky-400'}`} >
                    <Icon icon={isCameraOn ? "CameraOn" : "CameraOff"} className={`${!isCameraOn ? 'text-slate-600' : 'text-white'}`} />
                </button>

                <button onClick={() => setIsShowSettingModal(true)} className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium h-11 w-11 rounded-full border border-slate-300 bg-slate-50 p-0" >
                    <Icon icon="Setting" className="w-6 h-6 text-slate-700" />
                </button>
                <div ref={audioDevicesDropdownRef} className="flex-col items-center hidden md:flex relative">
                    <div
                        className="flex gap-1 items-center justify-between rounded-3xl p-0 pr-1.5 shadow-s cursor-pointer"
                        onClick={() => setShowAudioDevices(!showAudioDevices)}
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-3xl bg-sky-400">
                            <Icon icon="Microphone" />
                        </div>
                        <button className={`bg-slate-50 transition-transform duration-200 ${showAudioDevices ? 'rotate-180' : ''}`}>
                            <Icon icon="ChevronDown" className="w-5 h-5 text-slate-700" />
                        </button>
                    </div>

                    {/* Audio devices dropdown */}
                    {showAudioDevices && (
                        <div className="absolute top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 py-2">
                            <div className="p-2 pl-8 text-sm text-slate-500">Select Microphone Source</div>
                            {audioDevices.map((device) => (
                                <button
                                    key={device.deviceId}
                                    className={`w-full px-2 py-1.5 text-left hover:bg-slate-50 ${selectedDevice?.deviceId === device.deviceId ? 'bg-slate-100' : ''
                                        }`}
                                    onClick={() => {
                                        setSelectedDevice(device);
                                        setShowAudioDevices(false);
                                    }}
                                >
                                    <div className={`flex items-center gap-2 ${device.label === selectedDevice?.label ? 'text-sky-500' : ''}`}>
                                        {device.label === selectedDevice?.label && <Icon icon="Check" className="w-4 h-4" />}
                                        <span className={`text-sm truncate ${device.label === selectedDevice?.label ? '' : 'pl-6'}`}>{device.label}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-center mr-0 relative" ref={leaveDropdownRef}>
                    <button
                        onClick={() => setShowLeaveDropdown(!showLeaveDropdown)}
                        className="inline-flex gap-1 items-center justify-center whitespace-nowrap rounded-md text-md font-medium px-4 py-2.5 ml-2 bg-red-600 text-white focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-0"
                    >
                        <Icon icon="Leave" className="text-white" />
                        <div>Leave</div>
                        <Icon
                            icon="ChevronDown"
                            className={`w-5 h-5 text-white transition-transform duration-200 ${showLeaveDropdown ? 'rotate-180' : ''
                                }`}
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
            {isEndSession && <EndSessionModal isOpen={isEndSession} setEndInterview={setEndInterview} onClose={() => setIsEndSession(false)} />}
        </div>
    )
}

export default HeaderSection;
