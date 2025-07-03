interface ReducerObject {
    type: string
    payload: any
}

interface InitStateObject {
    access_token: string
    userEmail: string
    verifyCodeType: string
    authType: string
    user: { id: string, email: string, fullName: string, pfp: string, isPasswordSet: boolean, isPremium: boolean }
    isSharedScreen: boolean
    isLeaveInterview: {
        status: boolean
        link: string
    }
    currentQuestion: string
    currentResponse: string
    streamingResponse: string
    isLoadingResponse: boolean
    isStreamingResponse: boolean
    conversationHistory: Array<{ question: string; answer: string; timestamp: Date }>
}

type GlobalContextType = [
    InitStateObject,

    {
        dispatch: (data: ReducerObject) => void
        storeData: (value: any) => void
    }
]

interface UploadedDocument {
    filename: string;
    url: string;
    type: string;
    uploaded_at: string;
}

interface UploadDocumentResponse {
    msg: string;
    data?: UploadedDocument;
}

interface GetDocumentsResponse {
    data: UploadedDocument[];
}
