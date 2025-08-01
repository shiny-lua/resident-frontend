import React from "react";

import Modal from "../../../components/modal";
import Icon from "../../../components/icon";
import { languages } from "./data.d";
import { restApi } from "../../../context/restApi";
import { showToast } from "../../../context/helper";

const EndSessionModal = ({ isOpen, onClose, setEndInterview, interviewId }: { 
    isOpen: boolean; 
    onClose: VoidFunction; 
    setEndInterview: Function;
    interviewId?: string;
}) => {

    const modalRef = React.useRef<HTMLDivElement>(null);
    const [isLeavingInterview, setIsLeavingInterview] = React.useState(false);
    
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

    const handleEndInterview = async () => {
        if (!interviewId) {
            console.error("No interview ID provided");
            showToast("Error: No interview ID found", "error");
            return;
        }

        setIsLeavingInterview(true);
        
        try {
            const response = await restApi.leaveInterview(interviewId, 'leave');
            
            if (response.status === 200) {
              // Clear interview state from localStorage
              localStorage.removeItem('currentInterview');
              
              onClose();
              setEndInterview(true);
            } else {
                console.error('Failed to complete interview:', response.data?.msg || response.msg);
                showToast(response.data?.msg || response.msg || 'Failed to complete interview', 'error');
            }
        } catch (error) {
            console.error('Error completing interview:', error);
            showToast('An error occurred while completing the interview', 'error');
        } finally {
            setIsLeavingInterview(false);
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
                            <Icon icon="Close" />
                        </button>
                        <div className="flex flex-col gap-2">
                            <div className="text-2xl font-bold">End Session</div>
                            <div className="text-lg text-gray-500">Are you sure you want to end this interview session?</div>
                            <div className="flex justify-end gap-4 mt-4">
                                <button 
                                    onClick={handleEndInterview}
                                    disabled={isLeavingInterview}
                                    className={`border border-slate-500 text-black font-semibold px-4 py-2 rounded-md ${
                                        isLeavingInterview ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {isLeavingInterview ? 'Ending...' : 'Yes, End it'}
                                </button>
                                <button onClick={onClose} className="bg-sky-500 text-white font-semibold px-4 py-2 rounded-md">No, Continue this session</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default EndSessionModal;
