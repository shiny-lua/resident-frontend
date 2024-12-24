import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SiginUp = () => {

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
            <div className="w-full h-[100vh] flex flex-col items-center mt-20 lg:mt-50">
                <Link to="/" className="flex lg:hidden gap-2 top-5 left-5 sm:left-10 2xl:left-20 cursor-pointer">
                    <div className="text-2xl text-primary">Final Round</div>
                    <div>
                        <img src="/image/icons/logo.png" alt="logo" />
                    </div>
                </Link>
                <div className="pt-10">
                    <div className="text-title-md font-semibold text-center mb-2">Create your account</div>
                    <div className="text-center opacity-60 text-sm">Welcome! Please fill in the details to get started.</div>
                </div>
                <div className="flex gap-2 mt-10">
                    <button className="bg-white rounded-md flex items-center justify-center px-4 py-2 md:px-7 md:py-4"><img src="/image/icons/facebook.png" className="w-8 h-8" alt="logo" /></button>
                    <button className="bg-white rounded-md flex items-center justify-center px-4 py-2 md:px-7 md:py-4"><img src="/image/icons/google.png" className="w-8 h-8" alt="logo" /></button>
                    <button className="bg-white rounded-md flex items-center justify-center px-4 py-2 md:px-7 md:py-4"><img src="/image/icons/linkedin.png" className="w-8 h-8" alt="logo" /></button>
                    <button className="bg-white rounded-md flex items-center justify-center px-4 py-2 md:px-7 md:py-4"><img src="/image/icons/microsoft.png" className="w-8 h-8" alt="logo" /></button>
                </div>
                <div className="flex justif-center items-center gap-2 my-8">
                    <div className="w-45 h-[0.2px] bg-slate-300"></div>
                    <div className="text-slate-400 text-md">OR</div>
                    <div className="w-45 h-[0.2px] bg-slate-300"></div>
                </div>
                <div className="w-full sm:w-[430px] px-5">
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="email">Email address</label>
                        <input className="bg-white rounded-md outline-none border focus:shadow-1 focus:border-primary p-3 " type="text" name="" id="email" />
                    </div>
                    <button
                        onClick={() => navigate("/verify-code")}
                        className="w-full bg-[linear-gradient(90deg,_#0090FF_0%,_#00F7FF_100%)] hover:bg-[linear-gradient(90deg,_#0091ffa2_0%,_#00f7ff7f_100%)] text-center text-white text-lg py-3 rounded-md mt-8"
                    >
                        Continue
                    </button>
                    <div className="text-sm mt-4 flex gap-2 justify-center  ">
                        <div className="opacity-80">Already have an account?</div>
                        <Link className="text-primary font-semibold hover:text-black hover:underline" to={"/sign-in"}>Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SiginUp