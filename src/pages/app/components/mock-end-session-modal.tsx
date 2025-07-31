import React from "react";

import Modal from "../../../components/modal";
import Icon from "../../../components/icon";
import { restApi } from "../../../context/restApi";
import { showToast } from "../../../context/helper";

const MockEndSessionModal = ({ isOpen, onClose, setEndInterview, interviewId }: { 
    isOpen: boolean; 
    onClose: VoidFunction; 
    setEndInterview: Function;
    interviewId?: string;
}) => {

    const modalRef = React.useRef<HTMLDivElement>(null);
    const [isLeavingMockInterview, setIsLeavingMockInterview] = React.useState(false);
    
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

    const handleEndMockInterview = async () => {
        if (!interviewId) {
            console.error("No mock interview ID provided");
            showToast("Error: No mock interview ID found", "error");
            return;
        }

        setIsLeavingMockInterview(true);
        
        try {
            const response = await restApi.leaveMockInterview(interviewId, 'leave');
            
            if (response.status === 200) {
              // Clear mock interview state from localStorage
              localStorage.removeItem('currentInterview');
              
              onClose();
              setEndInterview(true);
            } else {
                console.error('Failed to complete mock interview:', response.data?.msg || response.msg);
                showToast(response.data?.msg || response.msg || 'Failed to complete mock interview', 'error');
            }
        } catch (error) {
            console.error('Error completing mock interview:', error);
            showToast('An error occurred while completing the mock interview', 'error');
        } finally {
            setIsLeavingMockInterview(false);
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
                            <div className="text-2xl font-bold">End Mock Interview</div>
                            <div className="text-lg text-gray-500">Are you sure you want to end this mock interview session?</div>
                            <div className="flex justify-end gap-4 mt-4">
                                <button 
                                    onClick={handleEndMockInterview}
                                    disabled={isLeavingMockInterview}
                                    className={`border border-slate-500 text-black font-semibold px-4 py-2 rounded-md ${
                                        isLeavingMockInterview ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {isLeavingMockInterview ? 'Ending...' : 'Yes, End it'}
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

export default MockEndSessionModal; 