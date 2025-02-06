import React from "react";

import { config } from "../config/config";
import { restApi } from "./restApi";

export { config }

const INIT_STATE: InitStateObject = {
    authToken: "",
    userEmail: "",
    verifyCodeType: "",
    authType: "",
    user: {
        email: "",
        fullName: "",
        pfp: "",
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

const storeData = async (value: string) => {
    return window.localStorage.setItem("authToken", value)
}

const getData = async () => {
    return window.localStorage.getItem("authToken")
}

const GlobalContextProvider = ({ children }: any) => {
    const [state, dispatch] = React.useReducer(reducer, INIT_STATE);

    React.useEffect(() => {
        initSessionSetting()
    }, [])

    const initSessionSetting = async () => {
        try {
            const authToken = await getData();

            if (!!authToken) {
                // const loginStatus = await
                const res = await restApi.postRequest("get-user");
                const data = res.data.data;

                // console.log("userData::", userData)
                dispatch({ type: "authToken", payload: authToken });
                dispatch({ type: "user", payload: data });
            } else {
                // throw new ValidateError("Invalid authToken!")
            }

        } catch (error: any) {
            console.error(error)
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
