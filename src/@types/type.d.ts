interface ReducerObject {
    type: string
    payload: any
}

interface InitStateObject {
    isLoggedIn: false
    isOpenedMenu: false
}

type GlobalContextType = [
    InitStateObject,

    {
        dispatch: (data: ReducerObject) => void
        storeData: (authToken: string) => void
    }
]
