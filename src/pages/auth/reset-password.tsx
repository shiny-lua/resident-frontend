import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../components/icon";
import { emailValidator, passwordMatch, showToast, strongPasswordValidator } from "../../context/helper";
import { restApi } from "../../context/restApi";
import { useGlobalContext } from "../../context";
import Loader from "../../components/loader";

const ResetPassword = () => {

    const navigate = useNavigate()

    const [state, { dispatch, storeData }]: GlobalContextType = useGlobalContext()
    const [stepIndex, setStepIndex] = React.useState(0)
    const [isPwdVisible, setPwdVisible] = React.useState(false)

    const [status, setStatus] = React.useState({
        password: "",
        confPassword: "",
        isLoading: false
    })

    const [validate, setValidate] = React.useState({
        isStrongPassword: { status: false, msg: "" },
        isPasswordMatch: { status: false, msg: "" }
    })

    const onInput = (e: any, k: string, v: string) => {
        const value = e.target.value

        const validation = () => {
            if (k === 'password') return strongPasswordValidator(value)
            if (k === 'confPassword') return passwordMatch(status.password, value)
        }
        setStatus({ ...status, [k]: value })
        setValidate({ ...validate, [v]: validation() })
    }


    const onResetPassword = async () => {
        if (!!status.isLoading || !status.password) return showToast("Password is required!", "warning")
        const res = await restApi.postRequest("login", { email: state.userEmail, password: status.password })

        if (res === undefined) {
            showToast('An error has occurred during communication with backend.', 'warning')
            setStatus({ ...status, isLoading: false })
        } else if (res.status === 200) {
            dispatch({ type: "authToken", payload: res.data.token })
            storeData(res.data.token)
            navigate("/app/started")
        } else {
            showToast(res.msg, "error")
        }
        setStatus({ ...status, isLoading: false })

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
            <div className="w-full h-[100vh] flex flex-col items-center mt-20 lg:mt-50">
                <Link to="/" className="flex lg:hidden gap-2 top-5 left-5 sm:left-10 2xl:left-20 cursor-pointer">
                    <div className="text-2xl text-primary">Final Round</div>
                    <div>
                        <img src="/image/icons/logo.png" alt="logo" />
                    </div>
                </Link>

                <div className="w-full sm:w-[430px] px-5">
                    <div className="pt-10">
                        <div className="text-title-md font-semibold text-center mb-2">Reset Your Password</div>
                    </div>
                    <div className="mt-10">
                        <div className="flex flex-col gap-2 mb-4">
                            <label className="" htmlFor="password">Password</label>
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
                            {!validate.isStrongPassword.status && (
                                <div className="text-orange-500 text-[13px]">{validate.isStrongPassword.msg}</div>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 mb-4">
                            <label className="" htmlFor="confPassword">Password</label>
                            <div className="relative">
                                <input
                                    type={isPwdVisible ? "text" : "password"}
                                    id="confPassword"
                                    value={status.confPassword}
                                    onChange={e => onInput(e, "confPassword", "isPasswordMatch")}
                                    className="bg-white rounded-md w-full outline-none focus:border-primary border p-3 "
                                />
                            </div>
                            {!validate.isStrongPassword.status && (
                                <div className="text-orange-500 text-[13px]">{validate.isPasswordMatch.msg}</div>
                            )}
                        </div>
                        <button onClick={onResetPassword} className="w-full bg-[linear-gradient(90deg,_#0090FF_0%,_#00F7FF_100%)] hover:bg-[linear-gradient(90deg,_#0091ffa2_0%,_#00f7ff7f_100%)] text-center text-white text-lg py-3 rounded-md mt-2">Continue</button>
                        <div className="text-sm mt-4 flex gap-2 justify-center  ">
                            <div className="opacity-80">Don't have an account?</div>
                            <Link to={"/auth/sign-up"} className="text-primary font-semibold hover:text-black hover:underline" >Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword