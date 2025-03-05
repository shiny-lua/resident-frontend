import React from 'react';

const InterviewerSection = ({ isCameraOn }: { isCameraOn: boolean }) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
        let stream: MediaStream | null = null;

        if (isCameraOn) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((mediaStream) => {
                    stream = mediaStream;
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                })
                .catch((err) => {
                    console.error("Error accessing camera:", err);
                });
        }

        // Cleanup function to stop all tracks when component unmounts or camera is turned off
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        };
    }, [isCameraOn]); // Add isCameraOn as dependency

    return (
        <div className="min-w-[150px] w-1/4">
            <div className="relative flex h-full flex-1 flex-col justify-center items-center bg-slate-900 rounded-xl">
                <video
                    src='/video/avatar.mp4'
                    className="w-full h-full rounded-xl"
                    autoPlay
                    playsInline
                    muted
                    loop
                />
                {isCameraOn && (
                    <div className="absolute bottom-3 w-[40%] right-2">
                        <video
                            ref={videoRef}
                            className="w-full h-full rounded-xl"
                            autoPlay
                            playsInline
                            muted
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default InterviewerSection;
