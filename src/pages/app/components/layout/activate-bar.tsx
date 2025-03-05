import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Icon from "../../../../components/icon";
import CompleteSessionModal from "./complete-session-modal";
import { useGlobalContext } from "../../../../context";

const ActivateBar = () => {
    const [state, {dispatch}] = useGlobalContext();
    const navigate = useNavigate();

    const [isCompleteSessionModal, setIsCompleteSessionModal] = useState(false);

    const onEnd = () => {
        setIsCompleteSessionModal(true);
        dispatch({
            type: "isLeaveInterview",
            payload: {
                status: false,
                link: ""
            }
        });
    }
    return (
        <div className="hidden sm:block bg-[linear-gradient(90deg,_#00F7FF_0%,_#0090FF_50%,_#00F7FF_100%)] text-white text-sm font-medium py-2.5 px-2 m-2 rounded-lg">
            <div className="flex items-center justify-center gap-5">
                <div className="text-xl font-semibold">You are in an interview now.</div>
                <button onClick={() => navigate(state.isLeaveInterview.link)} className="flex items-center bg-lime-600 px-3 py-2.5 rounded-md gap-2">
                    <Icon icon="GoBack" />
                    <div>Go Back</div>
                </button>
                <button onClick={onEnd} className="flex items-center bg-amber-600 px-4 py-2.5 rounded-md gap-2">
                    <Icon icon="Leave" />
                    <div>End</div>
                </button>
            </div>
            {isCompleteSessionModal && <CompleteSessionModal isOpen={isCompleteSessionModal} onClose={() => setIsCompleteSessionModal(false)} /> }
        </div>
    )
}

export default ActivateBar; 
