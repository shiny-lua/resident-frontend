import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SetPassword = () => {

    const navigate = useNavigate()

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
                    <button
                        onClick={() => { }}
                        className="w-full px-4 py-3 mb-3 text-sm font-medium text-white bg-[linear-gradient(180deg,_#414141_0%,_#000000_50%,_#414141_100%)] rounded-lg"
                    >
                        Reset your password
                    </button>
                </div>
                <div className="text-sm text-center py-3 font-semibold text-slate-500">Or, sign in with another method</div>
                <div className="flex gap-2 mt-10 justify-center">
                    <button className="bg-white border border-slate-200 rounded-md flex items-center justify-center px-4 py-2 md:px-7 md:py-4"><img src="/image/icons/facebook.png" className="w-8 h-8" alt="logo" /></button>
                    <button className="bg-white border border-slate-200 rounded-md flex items-center justify-center px-4 py-2 md:px-7 md:py-4"><img src="/image/icons/google.png" className="w-8 h-8" alt="logo" /></button>
                    <button className="bg-white border border-slate-200 rounded-md flex items-center justify-center px-4 py-2 md:px-7 md:py-4"><img src="/image/icons/linkedin.png" className="w-8 h-8" alt="logo" /></button>
                    <button className="bg-white border border-slate-200 rounded-md flex items-center justify-center px-4 py-2 md:px-7 md:py-4"><img src="/image/icons/microsoft.png" className="w-8 h-8" alt="logo" /></button>
                </div>
            </div>
        </div>
    )
}

export default SetPassword