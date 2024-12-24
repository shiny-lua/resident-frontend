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
            <div className="w-full h-[100vh] flex flex-col items-center mt-20 lg:mt-50">
                <Link to="/" className="flex lg:hidden gap-2 top-5 left-5 sm:left-10 2xl:left-20 cursor-pointer">
                    <div className="text-2xl text-primary">Final Round</div>
                    <div>
                        <img src="/image/icons/logo.png" alt="logo" />
                    </div>
                </Link>
                <div className="pt-10">
                    <div className="text-title-md font-semibold text-center mb-2">Set up Password</div>
                    <div className="text-center opacity-60 text-sm">password keeps you safe.</div>
                </div>

                <div className="w-full sm:w-[430px] px-5 mt-10">
                    <div className="flex flex-col gap-2 mb-4">
                        <label className="" htmlFor="email">Password</label>
                        <input className="bg-white rounded-md outline-none focus:border-primary border p-3 " type="text" name="" id="email" />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label className="" htmlFor="email">Confirm Password</label>
                        <input className="bg-white rounded-md outline-none focus:border-primary border p-3 " type="text" name="" id="email" />
                    </div>
                    <button
                        onClick={() => navigate("/app/onboarding")}
                        className="w-full bg-[linear-gradient(90deg,_#0090FF_0%,_#00F7FF_100%)] hover:bg-[linear-gradient(90deg,_#0091ffa2_0%,_#00f7ff7f_100%)] text-center text-white text-lg py-3 rounded-md mt-8"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SetPassword