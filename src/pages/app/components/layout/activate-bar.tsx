import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Icon from "../../../../components/icon";
import CompleteSessionModal from "./complete-session-modal";
import { useGlobalContext } from "../../../../context";
import { restApi } from "../../../../context/restApi";

const ActivateBar = () => {
    const [state, { dispatch }] = useGlobalContext();
    const navigate = useNavigate();
    const location = useLocation();

    const [isCompleteSessionModal, setIsCompleteSessionModal] = useState(false);

    // Extract interview ID from the current URL
    const getInterviewId = () => {
        const pathParts = location.pathname.split('/');
        // Look for the callId parameter in the URL
        const callIdIndex = pathParts.findIndex(part => part === 'live' || part === 'mock');
        if (callIdIndex !== -1 && callIdIndex + 1 < pathParts.length) {
            return pathParts[callIdIndex + 1];
        }
        return undefined;
    };

    const onEnd = async () => {
        setIsCompleteSessionModal(true);
    }

    const handleGoBack = () => {
        // Clear localStorage when going back
        localStorage.removeItem('currentInterview');
        dispatch({
            type: "isLeaveInterview",
            payload: {
                status: false,
                link: ""
            }
        });
        navigate(state.isLeaveInterview.link);
    }

    return (
        <div className="hidden sm:block bg-[linear-gradient(90deg,_#00F7FF_0%,_#0090FF_50%,_#00F7FF_100%)] text-white text-sm font-medium py-2.5 px-2 m-2 rounded-lg">
            <div className="flex items-center justify-center gap-5">
                <div className="text-xl font-semibold">You are in an interview now.</div>
                <button onClick={handleGoBack} className="flex items-center bg-lime-600 px-3 py-2.5 rounded-md gap-2">
                    <Icon icon="GoBack" />
                    <div>Go Back</div>
                </button>
                <button onClick={onEnd} className="flex items-center bg-amber-600 px-4 py-2.5 rounded-md gap-2">
                    <Icon icon="Leave" />
                    <div>End</div>
                </button>
            </div>
            {isCompleteSessionModal && <CompleteSessionModal isOpen={isCompleteSessionModal} onClose={() => setIsCompleteSessionModal(false)} interviewId={getInterviewId()} />}
        </div>
    )
}

export default ActivateBar; 
