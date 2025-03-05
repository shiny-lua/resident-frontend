import React from "react";
import Cookies from "js-cookie";

import { useGlobalContext } from "../../context";
import { showToast } from "../../context/helper";
import { restApi } from "../../context/restApi";
import { useNavigate } from "react-router-dom";
import Loader from "../loader";

const DeleteAccount = () => {
    const [state, { dispatch }]: GlobalContextType = useGlobalContext();
    const navigate = useNavigate()

    const [isRemoveAccount, setIsRemoveAccount] = React.useState(false)
    const [deleteAccount, setDeleteAccount] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)

    const onDeleteAccount = async () => {
        if (isLoading) return

        if (deleteAccount !== "Delete account") {
            showToast("Please type 'Delete account' to continue.", "warning")
            return
        }

        setIsLoading(true)

        const res = await restApi.postRequest("delete-account")

        if (res.status === 200) {
            showToast(res.msg, "success")
            setIsRemoveAccount(false)
            dispatch({
                type: "user", payload: {
                    id: "",
                    email: "",
                    fullName: "",
                    pfp: "",
                    isPasswordSet: false
                }
            }),
                Cookies.set("access_token", "")
            navigate("/")
        } else {
            showToast(res.msg, "error")
        }

        setIsLoading(false)
    }

    return (
        <div className="">
            <div className="flex flex-row items-center gap-2 w-full">
                <div className="text-md text-slate-800 font-semibold w-full lg:w-1/3 lg:min-w-[200px] max-w-[200px]">Delete Account</div>
                <div className={`flex justify-between items-start w-full lg:w-2/3`}>
                    <div className="w-full">
                        {!isRemoveAccount && (
                            <div>
                                <button onClick={() => setIsRemoveAccount(true)} className="text-red-600 text-sm hover:bg-red-50 px-3 py-2 rounded-lg">Delete account</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {isRemoveAccount && (
                <div className="border w-full rounded-lg shadow-4 p-6 pb-4 mt-2">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <div className="text-xl font-bold text-black mb-2">Delete account</div>
                            <div className="text-sm text-slate-600 mb-1">Are you sure you want to delete your account?</div>
                            <div className="text-sm text-slate-600">This action is permanent and irreversible.</div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-sm text-red-600">Type "Delete account" below to continue.</div>
                            <input type="text" value={deleteAccount} onChange={(e) => setDeleteAccount(e.target.value)} placeholder="Delete account" className="border outline-none focus:border-sky-500 rounded-lg p-2 w-full" />
                        </div>
                        <div className="flex justify-end gap-2 items-center mt-1">
                            <button onClick={() => setIsRemoveAccount(false)} className="text-slate-600 text-sm hover:bg-slate-200 px-4 py-2 rounded-lg">Cancel</button>
                            <button onClick={onDeleteAccount} className="w-20 inline-flex justify-center items-center gap-2 bg-[linear-gradient(90deg,_#0090FF_0%,_#00F7FF_100%)] hover:bg-[linear-gradient(90deg,_#0091ffa2_0%,_#00f7ff7f_100%)] text-center text-white text-sm px-5 py-2 rounded-md">
                                {isLoading ? <Loader /> : "Remove"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DeleteAccount;