import React from "react";
import { config } from "../config/config";

export { config }

const INIT_STATE: InitStateObject = {
    authToken: "",
    userEmail: ""
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
                dispatch({ type: 'authToken', payload: authToken })
            } else {
                // throw new ValidateError("Invalid authToken!")
            }

        } catch (error: any) {
            // setTimeout(() => { dispatch({ type: "showLoadingPage", payload: false }) }, 1000);
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
