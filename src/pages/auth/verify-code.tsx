import React from "react";
import { Link, useNavigate } from "react-router-dom";
import VerificationInput from "react-verification-input";
import Icon from "../../components/icon";

const VerifyCode = () => {
    const navigate = useNavigate()

    const onSend = () => {
        // navigate("/login")
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
                        <div className="opacity-60">bh066078@gmail.com</div>
                        <button className="opacity-70" onClick={() => navigate("/sign-up")}><Icon icon="Edit" /></button>
                    </div>
                    <div className="w-full">
                        <VerificationInput
                            onComplete={onSend}
                            placeholder=""
                            autoFocus={true}
                            classNames={{
                                container: "mt-3 w-full",
                                character: "bg-white border-none rounded-md mx-1",
                                characterInactive: "character--inactive",
                                characterSelected: "character--selected",
                                characterFilled: "character--filled",
                            }}
                        />

                        <div className="text-md mt-3 flex justify-between">
                            <div className="opacity-60">Resend code</div>
                            <div className="opacity-60">30s</div>
                        </div>
                    </div>
                    <div className="mt-15">
                        <button
                            onClick={() => navigate("/set-password")}
                            className="w-full bg-[linear-gradient(90deg,_#0090FF_0%,_#00F7FF_100%)] hover:bg-[linear-gradient(90deg,_#0091ffa2_0%,_#00f7ff7f_100%)] text-center text-white text-lg py-3 rounded-md"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyCode