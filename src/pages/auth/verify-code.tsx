import React from "react";
import { Link, useNavigate } from "react-router-dom";
import VerificationInput from "react-verification-input";

import Icon from "../../components/icon";
import { restApi } from "../../context/restApi";
import { useGlobalContext } from "../../context";
import { showToast } from "../../context/helper";
import Loader from "../../components/loader";

const VerifyCode = () => {
    const navigate = useNavigate()
    const [state, { dispatch, storeData }]: GlobalContextType = useGlobalContext()
    const [status, setStatus] = React.useState({
        code: "",
        isWrongCode: false,
        isLoading: false,
        count: 30
    })

    React.useEffect(() => {
        if (status.count === 0) return

        const timer = setInterval(() => {
            setStatus(prev => ({ ...prev, count: prev.count - 1 }))
        }, 1000)
        return () => clearInterval(timer)
    }, [status.count])

    const onSend = async () => {
        if (status.isLoading || !status.code) return
        setStatus({ ...status, isLoading: true })
        const res = await restApi.postRequest("verify-email", { email: state.userEmail, code: status.code })
        if (res === undefined) {
            showToast('An error has occurred during communication with backend.', 'warning')
        } else if (res.status === 200) {
            dispatch({ type: "authToken", payload: res.data })
            storeData(res.data)
            navigate("/app/onboarding")
        } else {
            setStatus({ ...status, isWrongCode: true, isLoading: false })
            showToast(res.msg, "error")
            return
        }
        setStatus({ ...status, isLoading: false })
    }

    const onResend = async () => {
        // const res = await restApi.postRequest("send-code", { email: state.userEmail })
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
            <div className="w-full h-[100vh] flex flex-col items-center mt-20 lg:mt-50 px-5">
                <Link to="/" className="flex lg:hidden gap-2 top-5 left-5 sm:left-10 2xl:left-20 cursor-pointer">
                    <div className="text-2xl text-primary">Final Round</div>
                    <div>
                        <img src="/image/icons/logo.png" alt="logo" />
                    </div>
                </Link>
                <div className="pt-10 w-full sm:w-[430px]">
                    <div>
                        <div className="text-title-md font-semibold text-center mb-2">Let Verify you</div>
                        <div className="text-center opacity-60 text-sm">Verification code was sent to your email.</div>
                    </div>
                    <div className="flex justify-center items-center mb-10 gap-2 text-sm">
                        <div className="opacity-60">{state.userEmail}</div>
                        <button className="opacity-70" onClick={() => navigate("/auth/sign-up")}><Icon icon="Edit" /></button>
                    </div>
                    <div className="w-full">
                        <VerificationInput
                            value={status.code}
                            onChange={e => setStatus({ ...status, code: e, isWrongCode: false })}
                            placeholder=""
                            autoFocus={true}
                            classNames={{
                                container: "mt-3 w-full",
                                character: `bg-white ${status.isWrongCode ? "border border-red-500 text-red-500" : "border-none text-black"} rounded-md mx-1`,
                                characterInactive: "character--inactive",
                                characterSelected: "character--selected",
                                characterFilled: "character--filled",
                            }}
                        />

                        <div className="text-md mt-3 flex justify-between">
                            <button onClick={onResend} className={`${status.count === 0 ? "opacity-100" : "opacity-60"}`}>Resend code</button>
                            <div className="opacity-60">{status.count}s</div>
                        </div>
                    </div>
                    <div className="mt-15">
                        <button
                            onClick={onSend}
                            className="inline-flex justify-center items-center gap-2 w-full bg-[linear-gradient(90deg,_#0090FF_0%,_#00F7FF_100%)] hover:bg-[linear-gradient(90deg,_#0091ffa2_0%,_#00f7ff7f_100%)] text-center text-white text-lg py-3 rounded-md mt-8"
                        >
                            {status.isLoading && <Loader />}
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyCode