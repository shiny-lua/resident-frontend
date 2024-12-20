import React from "react";

const INIT_STATE: InitStateObject = {
    isLoggedIn: false,
    isOpenedMenu: false
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
    return window.localStorage.setItem("isLoggedIn", value)
}

const getData = async () => {
    return window.localStorage.getItem("isLoggedIn")
}

const GlobalContextProvider = ({ children }: any) => {
    const [state, dispatch] = React.useReducer(reducer, INIT_STATE);
    
    React.useEffect(() => {
        initSessionSetting()
    }, [])

    const initSessionSetting = async () => {
        try {
            const isLoggedIn = await getData();

            if (!!isLoggedIn) {
                // const loginStatus = await
                dispatch({ type: 'isLoggedIn', payload: isLoggedIn })
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
