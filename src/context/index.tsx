import React from "react";
import Cookies from "js-cookie";

import { config } from "../config/config";
import { restApi } from "./restApi";

export { config }

const INIT_STATE: any = {
    access_token: "",
    userEmail: "",
    verifyCodeType: "",
    isSharedScreen: false,
    authType: "",
    isLeaveInterview: {
        status: false,
        link: ""
    },
    user: {
        id: "",
        email: "",
        fullName: "",
        pfp: "",
        isPasswordSet: false,
        isPremium: false
    },
    currentQuestion: "",
    currentResponse: "",
    streamingResponse: "",
    isLoadingResponse: false,
    isStreamingResponse: false,
    conversationHistory: []
}

const GlobalContext = React.createContext<any>(null);
const reducer = (state: any, { type, payload }: any) => {
    // Special handling for conversationHistory to ensure proper array updates
    if (type === 'conversationHistory') {
        // Handle both direct payloads and functional updates
        const newHistory = typeof payload === 'function' ? payload(state.conversationHistory) : payload;
        return { ...state, conversationHistory: newHistory };
    }
    
    // For all other state updates, use the standard spread approach
    return { ...state, [type]: payload };
}

function useGlobalContext() {
    const context = React.useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalContextProvider");
    }
    return context;
}

const storeData = async (value: any) => {
    return window.localStorage.setItem("access_token", JSON.stringify(value))
}

const GlobalContextProvider = ({ children }: any) => {
    const [state, dispatch] = React.useReducer(reducer, INIT_STATE);

    React.useEffect(() => {
        initSessionSetting()
        initInterviewState()
    }, [])

    const initSessionSetting = async () => {
        try {
            const access_token = Cookies.get("access_token");

            if (!!access_token) {
                // const loginStatus = await
                const res = await restApi.postRequest("get-user");
                const data = res.data.data;

                dispatch({ type: "access_token", payload: access_token });
                dispatch({ type: "user", payload: {
                    id: data._id,
                    email: data.email,
                    fullName: data.full_name,
                    pfp: data.pfp,
                    isPasswordSet: data.is_password_set,
                    isPremium: data.is_premium
                } });
            } else {
                // throw new ValidateError("Invalid access_token!")
            }

        } catch (error: any) {
            console.error(error)
        }
    }

    const initInterviewState = () => {
        try {
            const savedInterview = localStorage.getItem('currentInterview');
            if (savedInterview) {
                const interviewData = JSON.parse(savedInterview);
                
                // Check if the interview data is still valid (not too old)
                const interviewTime = new Date(interviewData.timestamp);
                const currentTime = new Date();
                const timeDiff = currentTime.getTime() - interviewTime.getTime();
                const hoursDiff = timeDiff / (1000 * 60 * 60);
                
                // If interview data is older than 24 hours, remove it
                if (hoursDiff > 24) {
                    localStorage.removeItem('currentInterview');
                    return;
                }
                
                dispatch({ 
                    type: "isLeaveInterview", 
                    payload: {
                        status: interviewData.status,
                        link: interviewData.link
                    }
                });
            }
        } catch (error) {
            console.error('Error initializing interview state from localStorage:', error);
            // Clear invalid data
            localStorage.removeItem('currentInterview');
        }
    }

    return (
        <GlobalContext.Provider
            value={React.useMemo(() => [
                state, { dispatch, storeData }
            ], [state])}
        >
            {children}
        </GlobalContext.Provider>
    )

}

export { useGlobalContext, GlobalContextProvider };
