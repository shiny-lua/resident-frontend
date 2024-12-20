import React from "react";
import { Link, useLocation } from "react-router-dom";

import { useGlobalContext } from "../../context";

const Header = () => {
    const [state, { dispatch }]: GlobalContextType = useGlobalContext();

    const location = useLocation();

    return (
        <header className="flex justify-between px-20 py-5">
            <div className="flex gap-2 items-center">
                <label className="text-2xl">Final Round</label>
                <div>
                    <img src="/image/icons/logo.png" alt="" />
                </div>
            </div>
            <div className="flex gap-10 items-center">
                <Link to={""} className="text-lg">Interview Copllot™</Link>
                <Link to={""} className="text-lg">AI Resume Builder</Link>
                <Link to={""} className="text-lg">AI Mock Interview</Link>
                <Link to={""} className="text-lg">Pricing</Link>
                <Link to={""} className="text-lg">Resources</Link>
                <Link to={""} className="text-lg">Question Bank</Link>
            </div>
            <div className="flex gap-10 items-center">
                <Link to={""} className="text-lg">Sign In</Link>
                <Link to={""} className="text-white rounded-md px-4 py-2 text-lg bg-button">Sign Up</Link>
            </div>
        </header>
    );
};

export default Header;
