import React from "react";
import Icon from "../../../../components/icon";
import { useGlobalContext } from "../../../../context";
const InterviewerSection = () => {
    const [_, { dispatch }] = useGlobalContext();

    const [screenStream, setScreenStream] = React.useState<MediaStream | null>(null);
    const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
    const chunksRef = React.useRef<Blob[]>([]);

    const handleScreenShare = async () => {
        try {
            if (screenStream) {
                // Stop recording if it's running
                if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                    mediaRecorderRef.current.stop();
                }
                screenStream.getTracks().forEach(track => track.stop());
                setScreenStream(null);
            } else {
                const mediaStream = await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                    audio: true
                    // {
                    //     suppressLocalAudioPlayback: false,
                    //     mediaSource: 'desktop'
                    // }
                });

                setScreenStream(mediaStream);

                dispatch({ type: 'isSharedScreen', payload: true });

                // Set up MediaRecorder for audio
                const audioStream = new MediaStream(mediaStream.getAudioTracks());
                const mediaRecorder = new MediaRecorder(audioStream, {
                    mimeType: 'audio/webm'
                });

                mediaRecorderRef.current = mediaRecorder;
                chunksRef.current = [];

                mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        chunksRef.current.push(event.data);
                    }
                };

                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
                    chunksRef.current = [];

                    const url = URL.createObjectURL(audioBlob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `interview-audio-${new Date().toISOString()}.webm`;
                    a.click();
                    URL.revokeObjectURL(url);
                };

                // Start recording
                mediaRecorder.start();

                // Handle stream stop from browser UI
                mediaStream.getVideoTracks()[0].onended = () => {
                    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                        mediaRecorderRef.current.stop();
                    }
                    setScreenStream(null);
                };

                // Play the audio
                const audioContext = new AudioContext();
                const source = audioContext.createMediaStreamSource(mediaStream);
                const audioDestination = audioContext.createMediaStreamDestination();
                source.connect(audioDestination);

                const audioElement = new Audio();
                audioElement.srcObject = mediaStream;
                audioElement.play();
            }
        } catch (err) {
            console.error("Error with screen share:", err);
        }
    };

    return (
        <div className="min-w-[150px] w-1/5">
            <div className="flex h-full flex-1 flex-col bg-slate-100">
                <div className="flex h-12 items-center rounded-t-lg border border-slate-100 bg-white px-4">
                    <div className="flex min-h-7 flex-1 items-center justify-between">
                        <div className="flex flex-row items-center text-sm font-semibold text-slate-900">
                            <p className="mr-2 flex-1">Interviewer says:</p>
                        </div>
                        <div className="flex items-center rounded-full border border-slate-100 px-2.5 py-1.5">
                            <span className="relative me-2 flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 bg-green-500" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                            </span>
                            <span className="text-sm font-medium text-slate-700">Ready</span>
                        </div>
                    </div>
                </div>
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
                            <button
                                className={`flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium text-white px-5 py-2.5 bg-sky-600 hover:bg-sky-700`}
                                onClick={handleScreenShare}
                            >
                                <Icon icon={screenStream ? "Close" : "Cursor"} className="w-5 h-5 text-white" />
                                <span className="text-[#f8fafc]">
                                    {screenStream ? 'Stop Sharing' : 'Select'}
                                </span>
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex min-h-52 h-full flex-col max-h-screen border border-slate-100 bg-white flex-[2]">
                    <div className="flex h-full w-full flex-col justify-center items-center text-slate-500 pt-2">
                        <div>
                            <h4 className="px-6 text-center text-sm font-medium">Once you have selected the interview meeting room</h4>
                            <h4 className="px-6 text-center text-sm font-medium">the transcript will be displayed here.</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default InterviewerSection;
