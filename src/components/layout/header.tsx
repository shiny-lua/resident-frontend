import React from "react";
import { Link, useLocation } from "react-router-dom";

import { useGlobalContext } from "../../context";
import Hamburger from "./hamburger";

const Header = () => {
    const [state, { dispatch }]: GlobalContextType = useGlobalContext();

    const location = useLocation();

    return (
        <header className="flex justify-between px-5 2xl:px-20 py-5">
            <Link to={"/"} className="flex gap-2 px-0 sm:px-5 items-center cursor-pointer">
                <div className="text-lg md:text-xl text-primary">Final Round</div>
                <div>
                    <img src="/image/icons/logo.png" alt="logo" />
                </div>
            </Link>
            <div className="gap-2 hidden 2xl:flex items-center">
                <Link to="/interview-copilot" className="text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-2 px-3 rounded-md">Interview Copllot™</Link>
                <Link to="" className="text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-2 px-3 rounded-md">AI Resume Builder</Link>
                <Link to="" className="text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-2 px-3 rounded-md">AI Mock Interview</Link>
                <Link to="" className="text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-2 px-3 rounded-md">Pricing</Link>
                <Link to="" className="text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-2 px-3 rounded-md">Resources</Link>
                <Link to="" className="text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-2 px-3 rounded-md">Question Bank</Link>
            </div>
            <div className="flex gap-3 sm:gap-6 items-center">
                <Link to="/sign-in" className="text-md hidden sm:block hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-2 px-3 rounded-md">Sign In</Link>
                <Link to="/sign-up" className="text-white px-4 py-2 text-md hover:bg-sky-200 hover:text-primary p-2 rounded-md bg-primary">Sign Up</Link>
                <Hamburger />
            </div>
        </header>
    );
};

export default Header;
