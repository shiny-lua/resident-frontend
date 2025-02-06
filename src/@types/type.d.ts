interface ReducerObject {
    type: string
    payload: any
}

interface InitStateObject {
    authToken: string
    userEmail: string
    verifyCodeType: string
    authType: string
    user: { email: string, fullName: string, pfp: string }
}

type GlobalContextType = [
    InitStateObject,

    {
        dispatch: (data: ReducerObject) => void
        storeData: (authToken: string) => void
    }
]
