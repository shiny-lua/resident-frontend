import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Icon from "../../components/icon";
import { useGlobalContext } from "../../context";
import { restApi } from "../../context/restApi";
import { showToast } from "../../context/helper";
import Loader from "../../components/loader";

const SetPassword = () => {

    const navigate = useNavigate()
    const [state, { dispatch }]: GlobalContextType = useGlobalContext()
    const [isLoading, setIsLoading] = useState(false)

    const onVerifyCode = async () => {
        if (isLoading) return
        dispatch({ type: "verifyCodeType", payload: "forgotPassword" })
        setIsLoading(true)
        const res = await restApi.postRequest("send-code", { email: state.userEmail })
        if (res === undefined) {
            showToast('An error has occurred during communication with backend.', 'warning')
            setIsLoading(false)
        } else if (res.status === 200) {
            navigate("/auth/verify-code")
            setIsLoading(false)
        }
    }
    return (
        <div className="flex w-full h-full relative bg-slate-50 ">
            <Link to="/" className="hidden lg:flex gap-2 items-center absolute top-5 left-5 sm:left-10 2xl:left-20 cursor-pointer">
                <div className="text-lg md:text-xl text-primary">Final Round</div>
                <div>
                    <img src="/image/icons/logo.png" alt="logo" />
                </div>
            </Link>
            <div className="hidden bg-slate-200 w-full h-[100vh] lg:flex justify-center items-center">
                <img src="/image/auth/login.png" alt="login" />
            </div>
            <div className="w-full flex flex-col items-center mt-20 lg:mt-50">
                <Link to="/" className="flex lg:hidden gap-2 top-5 left-5 sm:left-10 2xl:left-20 cursor-pointer">
                    <div className="text-2xl text-primary">Final Round</div>
                    <div>
                        <img src="/image/icons/logo.png" alt="logo" />
                    </div>
                </Link>
                <div className="pt-10">
                    <div className="text-title-md font-semibold text-center mb-2">Forgot Password?</div>
                </div>

                <div className="w-full sm:w-[430px] px-5 mt-5">
                    {/* <button className="flex justify-center items-center gap-2 my-4 border-2 border-slate-200 rounded-lg p-3 w-full">
                        <Icon icon="Chain" />
                        <div>Email link to {state.userEmail}</div>
                    </button> */}
                    <button onClick={onVerifyCode} className="flex justify-center items-center gap-2 my-4 border-2 border-slate-200 rounded-lg p-3 w-full hover:bg-slate-200 ">
                        {isLoading ?
                            <Loader color="border-slate-500" />
                            : (<div className="flex items-center gap-2">
                                <Icon icon="Email" />
                                <div>Email code to {state.userEmail}</div>
                            </div>)}

                    </button>
                    <div className="text-sm text-center pt-3 font-semibold text-slate-500">Or, sign in with another method</div>
                    <div className="flex gap-2 mt-10 justify-center">
                        <button className="bg-white border border-slate-200 hover:bg-slate-200 rounded-md flex items-center justify-center w-full py-4"><img src="/image/icons/facebook.png" className="w-6 h-6" alt="logo" /></button>
                        <button className="bg-white border border-slate-200 hover:bg-slate-200 rounded-md flex items-center justify-center w-full py-4"><img src="/image/icons/google.png" className="w-6 h-6" alt="logo" /></button>
                        <button className="bg-white border border-slate-200 hover:bg-slate-200 rounded-md flex items-center justify-center w-full py-4"><img src="/image/icons/linkedin.png" className="w-6 h-6" alt="logo" /></button>
                        <button className="bg-white border border-slate-200 hover:bg-slate-200 rounded-md flex items-center justify-center w-full py-4"><img src="/image/icons/microsoft.svg" className="w-6 h-6" alt="logo" /></button>
                    </div>

                    <Link to={"/auth/sign-in"} className="flex justify-center font-semibold text-slate-500 mt-6">Back</Link>
                    <div className="flex justify-center gap-4 pt-3">
                        <span className="text-slate-500">Don't have any of these?</span>
                        <button className="text-primary font-semibold">Get help</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SetPassword