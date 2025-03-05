import React from "react";
import Cookies from "js-cookie";

import { config } from "../config/config";
import { restApi } from "./restApi";

export { config }

const INIT_STATE: InitStateObject = {
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
        isPasswordSet: false
    }
}

const GlobalContext = React.createContext<any>(null);
const reducer = (state: InitStateObject, { type, payload }: ReducerObject) => {
    return { ...state, [type]: payload };
}

function useGlobalContext() {
    const context = React.useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalContextProvider");
    }
    return context;
}

const GlobalContextProvider = ({ children }: any) => {
    const [state, dispatch] = React.useReducer(reducer, INIT_STATE);

    React.useEffect(() => {
        initSessionSetting()
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
                    isPasswordSet: data.is_password_set
                } });
            } else {
                // throw new ValidateError("Invalid access_token!")
            }

        } catch (error: any) {
            console.error(error)
        }
    }

    return (
        <GlobalContext.Provider
            value={React.useMemo(() => [
                state, { dispatch }
            ], [state])}
        >
            {children}
        </GlobalContext.Provider>
    )

}

export { useGlobalContext, GlobalContextProvider };
