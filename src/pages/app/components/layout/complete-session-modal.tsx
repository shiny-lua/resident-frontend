import React from "react";
import Modal from "../../../../components/modal";
import Icon from "../../../../components/icon";
import { restApi } from "../../../../context/restApi";
import { showToast } from "../../../../context/helper";
import { useGlobalContext } from "../../../../context";

const CompleteSessionModal = ({ isOpen, onClose, interviewId }: { 
    isOpen: boolean; 
    onClose: VoidFunction;
    interviewId?: string;
}) => {
    const [_, { dispatch }] = useGlobalContext();
    const modalRef = React.useRef<HTMLDivElement>(null);
    const [isCompletingSession, setIsCompletingSession] = React.useState(false);

    React.useEffect(() => {

        const onModal = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose()
            }
        };

        document.addEventListener("mousedown", onModal);

        return () => {
            document.removeEventListener("mousedown", onModal);
        };
    })

    const handleCompleteSession = async () => {
        const currentInterview = localStorage.getItem('currentInterview');
        if (currentInterview) {
            const _currentInterview = JSON.parse(currentInterview);
            let res;
            if (_currentInterview.link.includes('mock')) {
                res = await restApi.leaveMockInterview(_currentInterview.interviewId, 'leave');
            } else if (_currentInterview.link.includes('live')) {
                res = await restApi.leaveInterview(_currentInterview.interviewId, 'leave');
            }
            if (res.status === 200) {
                localStorage.removeItem('currentInterview');
                dispatch({
                    type: "isLeaveInterview",
                    payload: {
                        status: false,
                        link: ""
                    }
                });
            }
            window.location.reload();
        }
    };

    return (
        <Modal>
            <div
                className="grid place-items-center fixed w-screen h-screen bg-black bg-opacity-70 backdrop-blur-sm fade-in">
                <div
                    ref={modalRef}
                    className="fixed left-[50%] top-[50%] z-50 grid max-w-[500px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 pb-0 shadow-lg duration-200 sm:rounded-lg rounded-lg max-h-[calc(100dvh-48px)] w-[95%] sm:w-5/6 grid-rows-[auto_1fr_auto] pt-8"
                >
                    <div className="relative">
                        
                        <button onClick={onClose} className="border absolute -top-2 right-0 rounded-md p-1">
                            <Icon icon="Close" className="text-slate-700" />
                        </button>
                        <div className="flex flex-col gap-2">
                            <div className="font-bold flex items-center gap-2">
                                <div className="bg-red-100 rounded-full p-2">
                                    <Icon icon="Alert" className="text-red-800" />
                                </div>
                                <div className="text-xl text-black font-bold">Complete Session</div>
                            </div>
                            <div className="text-lg text-gray-500">Are you sure you want to end this interview session?</div>
                            <div className="flex justify-end gap-4 mt-4">
                                <button onClick={onClose} className="border border-slate-300 text-black text-md font-semibold px-4 py-3 rounded-md">Cancel</button>
                                <button 
                                    onClick={handleCompleteSession}
                                    disabled={isCompletingSession}
                                    className={`bg-sky-500 text-white text-md font-semibold px-4 py-3 rounded-md ${
                                        isCompletingSession ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {isCompletingSession ? 'Completing...' : 'Complete'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CompleteSessionModal;
