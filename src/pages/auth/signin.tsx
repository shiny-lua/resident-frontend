import React from "react";

import { Link, useNavigate } from "react-router-dom";
import Icon from "../../components/icon";
import { emailValidator, showToast, strongPasswordValidator } from "../../context/helper";
import { restApi } from "../../context/restApi";
import { config, useGlobalContext } from "../../context";
import Loader from "../../components/loader";

const SignIn = () => {

    const navigate = useNavigate()

    const [state, { dispatch, storeData }]: GlobalContextType = useGlobalContext()
    const [stepIndex, setStepIndex] = React.useState(0)
    const [isPwdVisible, setPwdVisible] = React.useState(false)

    const [status, setStatus] = React.useState({
        email: "",
        password: "",
        isLoading: false
    })

    const [validate, setValidate] = React.useState({
        isValidEmail: { status: false, msg: "" },
    })

    const onNext = () => {
        if (validate.isValidEmail.status) {
            setStepIndex(1)
            dispatch({ type: "userEmail", payload: status.email })
        } else {
            showToast(!validate.isValidEmail.msg ? "Email is required!" : validate.isValidEmail.msg, "warning")
        }
    }

    const onInput = (e: any, k: string, v: string) => {
        const value = e.target.value

        const validation = () => {
            if (k === "email") return emailValidator(value)
            if (k === 'password') return strongPasswordValidator(value)
        }
        setStatus({ ...status, [k]: value })
        setValidate({ ...validate, [v]: validation() })
    }

    const onSignIn = async () => {
        if (!!status.isLoading || !status.password) return showToast("Password is required!", "warning")
        const res = await restApi.postRequest("login", { email: status.email, password: status.password })

        if (res === undefined) {
            showToast('An error has occurred during communication with backend.', 'warning')
            setStatus({ ...status, isLoading: false })
        } else if (res.status === 200) {
            dispatch({ type: "authToken", payload: res.data.token })
            storeData(res.data.token)
            navigate("/app/started")
        } else {
            showToast(res.msg, "error")
            setStatus({ ...status, isLoading: false })
        }

    }

    const onGoogle = () => {
        dispatch({type: "authType", payload: "signin"})
        window.location.href = `${config.BACKEND_URL}/api/google-login`
    }

    const onFacebook = () => {
        dispatch({type: "authType", payload: "signin"})
        window.location.href = `${config.BACKEND_URL}/api/facebook-login`
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
            <div className="w-full h-full flex flex-col items-center mt-20 lg:mt-50">
                <Link to="/" className="flex lg:hidden gap-2 top-5 left-5 sm:left-10 2xl:left-20 cursor-pointer">
                    <div className="text-2xl text-primary">Final Round</div>
                    <div>
                        <img src="/image/icons/logo.png" alt="logo" />
                    </div>
                </Link>

                {stepIndex === 0 && (
                    <div className="w-full sm:w-[430px] px-5">
                        <div className="pt-10">
                            <div className="text-title-md font-semibold text-center mb-2">Sign in to Final Round AI</div>
                            <div className="text-center opacity-60 text-sm">Welcome back! Please sign in to continue</div>
                        </div>
                        <div className="flex gap-2 mt-10 justify-center">
                            <button onClick={onFacebook} className="bg-white border border-slate-200 hover:bg-slate-200 rounded-md flex items-center justify-center w-full py-4"><img src="/image/icons/facebook.png" className="w-6 h-6" alt="logo" /></button>
                            <button onClick={onGoogle} className="bg-white border border-slate-200 hover:bg-slate-200 rounded-md flex items-center justify-center w-full py-4"><img src="/image/icons/google.png" className="w-6 h-6" alt="logo" /></button>
                            <button className="bg-white border border-slate-200 hover:bg-slate-200 rounded-md flex items-center justify-center w-full py-4"><img src="/image/icons/linkedin.png" className="w-6 h-6" alt="logo" /></button>
                            <button className="bg-white border border-slate-200 hover:bg-slate-200 rounded-md flex items-center justify-center w-full py-4"><img src="/image/icons/microsoft.svg" className="w-6 h-6" alt="logo" /></button>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex justif-center items-center gap-2 my-8">
                                <div className="ml-5 w-50 h-[0.2px] bg-slate-300"></div>
                                <div className="text-slate-400 text-md">OR</div>
                                <div className="mr-5 w-50 h-[0.2px] bg-slate-300"></div>
                            </div>
                        </div>
                        <div className="">
                            <div className="flex flex-col gap-2 mb-4">
                                <label htmlFor="email">Email address</label>
                                <input
                                    value={status.email}
                                    onChange={e => onInput(e, "email", "isValidEmail")}
                                    className="bg-white rounded-md outline-none border focus:border-primary p-3" type="text" name="" id="email"
                                />
                                {!validate.isValidEmail.status && (
                                    <div className="text-orange-500 text-[13px]">{validate.isValidEmail.msg}</div>
                                )}
                            </div>
                            <button onClick={onNext} className="w-full bg-[linear-gradient(90deg,_#0090FF_0%,_#00F7FF_100%)] hover:bg-[linear-gradient(90deg,_#0091ffa2_0%,_#00f7ff7f_100%)] text-center text-white text-lg py-3 rounded-md mt-2">Continue</button>
                            <div className="text-sm mt-4 flex gap-2 justify-center  ">
                                <div className="opacity-80">Don't have an account?</div>
                                <Link to={"/auth/sign-up"} className="text-primary font-semibold hover:text-black hover:underline" >Sign Up</Link>
                            </div>
                        </div>
                    </div>
                )}
                {stepIndex === 1 && (
                    <div className="w-full sm:w-[430px] px-5 pt-10">
                        <div>
                            <div className="text-title-md font-semibold text-center mb-2">Enter your password</div>
                            <div className="text-center opacity-60 text-sm">Enter the password associated with your account.</div>
                        </div>
                        <div className="flex justify-center items-center mb-10 gap-2 text-sm">
                            <div className="opacity-60">{status.email}</div>
                            <button className="opacity-70" onClick={() => setStepIndex(0)}><Icon icon="Edit" /></button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <label htmlFor="password">Password</label>
                                <button onClick={() => navigate("/auth/forgot-password")} className="text-slate-500 font-semibold text-sm">Forgot Password?</button>
                            </div>
                            <div className="relative">
                                <input
                                    type={isPwdVisible ? "text" : "password"}
                                    id="password"
                                    value={status.password}
                                    onChange={e => onInput(e, "password", "isStrongPassword")}
                                    className="bg-white rounded-md w-full outline-none focus:border-primary border p-3 "
                                />
                                <span onClick={() => setPwdVisible(!isPwdVisible)} className="absolute right-3 top-3"><img width={24} height={24} src={`/image/icons/${isPwdVisible ? "visible" : "invisible"}.svg`} alt="" /></span>
                            </div>
                        </div>
                        <button onClick={onSignIn}
                            className="inline-flex justify-center items-center gap-2 w-full bg-[linear-gradient(90deg,_#0090FF_0%,_#00F7FF_100%)] hover:bg-[linear-gradient(90deg,_#0091ffa2_0%,_#00f7ff7f_100%)] text-center text-white text-lg py-3 rounded-md mt-8"
                        >
                            {status.isLoading && <Loader />}
                            Continue
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SignIn