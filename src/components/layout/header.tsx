import React from "react";
import { Link, useLocation } from "react-router-dom";

import { useGlobalContext } from "../../context";
import Hamburger from "./hamburger";

const Header = () => {
    const [state, { dispatch }]: GlobalContextType = useGlobalContext();
    const location = useLocation();
    const { pathname } = location;

    const [showNavbar, setShowNavbar] = React.useState(true);

    let lastScrollY = 0;

    const handleScroll = () => {
        if (window.scrollY > lastScrollY) {
            setShowNavbar(false);
        } else {
            setShowNavbar(true);
        }
        lastScrollY = window.scrollY;
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        <nav className={`fixed top-0 left-0 w-full z-99999 bg-cyan-100 bg-opacity-40 backdrop-blur-[50px] webkit-backdrop-blur-[50px] transition-transform duration-300 ${showNavbar ? "transform translate-y-0" : "transform -translate-y-full"}`}>
            <header className="flex justify-between px-5 2xl:px-20 py-5 bg-opacity-10">
                <Link to={"/"} className="flex gap-2 px-0 sm:px-5 items-center cursor-pointer">
                    <div className="text-lg md:text-xl text-primary">Final Round</div>
                    <div>
                        <img src="/image/icons/logo.png" alt="logo" />
                    </div>
                </Link>
                <div className="gap-2 hidden 2xl:flex items-center">
                    <Link to="/interview-copilot" className={`${pathname.includes("interview-copilot") && "bg-sky-200 bg-opacity-80 text-primary" } text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-2 px-4 rounded-md`}>Interview Copllot™</Link>
                    <Link to="/ai-resume-builder" className={`${pathname.includes("ai-resume-builder") && "bg-sky-200 bg-opacity-80 text-primary" } text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-2 px-4 rounded-md`}>AI Resume Builder</Link>
                    <Link to="/ai-mock-interview" className={`${pathname.includes("ai-mock-interview") && "bg-sky-200 bg-opacity-80 text-primary" } text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-2 px-4 rounded-md`}>AI Mock Interview</Link>
                    <Link to="" className={`${pathname.includes("interview-copilot") && "bg-sky-200 bg-opacity-80 text-primary" } text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-2 px-4 rounded-md`}>Pricing</Link>
                    <Link to="" className={`${pathname.includes("interview-copilot") && "bg-sky-200 bg-opacity-80 text-primary" } text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-2 px-4 rounded-md`}>Resources</Link>
                    <Link to="" className={`${pathname.includes("interview-copilot") && "bg-sky-200 bg-opacity-80 text-primary" } text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-2 px-4 rounded-md`}>Question Bank</Link>
                </div>
                <div className="flex gap-3 sm:gap-6 items-center">
                    <Link to="/auth/sign-in" className="text-md hidden sm:block hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-2 px-4 rounded-md">Sign In</Link>
                    <Link to="/auth/sign-up" className="text-white px-4 py-2 text-md hover:bg-sky-200 hover:text-primary p-2 rounded-md bg-primary">Sign Up</Link>
                    <Hamburger />
                </div>
            </header>
        </nav>
    );
};

export default Header;
