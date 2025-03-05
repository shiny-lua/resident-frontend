import React from "react";
import { Link, useLocation } from "react-router-dom";

import { useGlobalContext } from "../../context";
import Hamburger from "./hamburger";
import ProfileDropdown from "../profile-dropdown";
import ManageAccountModal from "../manage-account-modal";

const Header = () => {
    const [state, { dispatch }]: GlobalContextType = useGlobalContext();
    const location = useLocation();
    const { pathname } = location;

    const profileDropdownRef = React.useRef<HTMLDivElement>(null)
    const [showNavbar, setShowNavbar] = React.useState(true);
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [showResource, setShowResource] = React.useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = React.useState(false)
    const [showManageAccountModal, setShowManageAccountModal] = React.useState(false)

    let lastScrollY = 0;

    const onProfileDropdownOutside = (event: MouseEvent) => {
        if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
            setShowProfileDropdown(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("mousedown", onProfileDropdownOutside);
        return () => {
            document.removeEventListener("mousedown", onProfileDropdownOutside);
        };
    }, []);

    const handleScroll = () => {
        if (showDropdown) {
            if (window.scrollY > lastScrollY) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }
            lastScrollY = window.scrollY;
        }
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    React.useEffect(() => {
        // Conditionally set the overflow style based on the conditions
        if (showDropdown) {
            document.documentElement.style.overflow = 'hidden'; // Hide scrollbar
        } else {
            document.documentElement.style.overflow = 'auto'; // Allow scrollbar
        }
    }, [showDropdown]); // Re-run effect when these values change

    React.useEffect(() => {
        // Conditionally set the overflow style based on the conditions
        if (showManageAccountModal) {
            document.documentElement.style.overflow = 'hidden'; // Hide scrollbar
        } else {
            document.documentElement.style.overflow = 'auto'; // Allow scrollbar
        }
    }, [showManageAccountModal]); // Re-run effect when these values change


    return (
        <nav className={`fixed top-0 left-0 w-full z-99999 ${showDropdown ? "bg-white" : "bg-transparent bg-opacity-40"} backdrop-blur-[50px] webkit-backdrop-blur-[50px] transition-transform duration-300 ${showNavbar ? "transform translate-y-0" : "transform -translate-y-full"}`}>
            <header className="relative flex justify-between px-5 2xl:px-20 py-5 bg-opacity-10 z-999">
                <Link to={"/"} className="flex px-0 sm:px-5 items-center cursor-pointer">
                    <div className="text-lg md:text-xl text-primary mr-2">Theresidentguy</div>
                    <div className="flex items-end">
                        <img src="/image/icons/logo.png" width={30} height={30} alt="logo" />
                    </div>
                </Link>
                <div className="gap-2 hidden 2xl:flex items-center">
                    <Link to="/interview-copilot" className={`${pathname.includes("interview-copilot") && "bg-sky-200 bg-opacity-80 text-primary"} text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-2 px-4 rounded-md`}>Interview Copllot™</Link>
                    {/* <Link to="/ai-resume-builder" className={`${pathname.includes("ai-resume-builder") && "bg-sky-200 bg-opacity-80 text-primary"} text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-2 px-4 rounded-md`}>AI Resume Builder</Link> */}
                    <Link to="/ai-mock-interview" className={`${pathname.includes("ai-mock-interview") && "bg-sky-200 bg-opacity-80 text-primary"} text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-2 px-4 rounded-md`}>AI Mock Interview</Link>
                    <Link to="/app/subscription" className={`${pathname.includes("subscription") && "bg-sky-200 bg-opacity-80 text-primary"} text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-2 px-4 rounded-md`}>Pricing</Link>
                    <Link to="/guide" className={`${pathname.includes("guides") && "bg-sky-200 bg-opacity-80 text-primary"} text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-2 px-4 rounded-md`}>Guides</Link>
                    <Link to="/blog" className={`${pathname.includes("blog") && "bg-sky-200 bg-opacity-80 text-primary"} text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-2 px-4 rounded-md`}>Blog</Link>
                    {/* <button
                        onMouseOver={() => setShowResource(true)}
                        className={`group flex items-center bg-opacity-80 text-black text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-2 px-4 rounded-md`}
                    >
                        Resources
                        <Icon className="h-6 w-6" icon={!showResource ? "ChevronDown" : "ChevronUp"} />
                    </button> */}
                    <Link to="" className={`${pathname.includes("question-bank") && "bg-sky-200 bg-opacity-80 text-primary"} text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-2 px-4 rounded-md`}>Question Bank</Link>
                </div>
                <div className={`${showDropdown ? 'translate-y-0  min-h-[calc(100vh-70px)]' : '-translate-y-full -z-99 opacity-0'} h-[calc(100vh-70px)] overflow-y-scroll duration-200 ease-linear absolute top-20 left-0 bg-black block 2xl:hidden w-full bg-opacity-80`}>
                    <div className="flex flex-col px-5 2xl:px-20 bg-white border rounded-b-[30px] border-b-2 gap-2 pb-4">
                        <Link to="/interview-copilot" className={`${pathname.includes("interview-copilot") && "bg-sky-200 bg-opacity-80 text-primary"} text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-3 px-4 rounded-md`}>Interview Copllot™</Link>
                        {/* <Link to="/ai-resume-builder" className={`${pathname.includes("ai-resume-builder") && "bg-sky-200 bg-opacity-80 text-primary"} text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-3 px-4 rounded-md`}>AI Resume Builder</Link> */}
                        <Link to="/ai-mock-interview" className={`${pathname.includes("ai-mock-interview") && "bg-sky-200 bg-opacity-80 text-primary"} text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-3 px-4 rounded-md`}>AI Mock Interview</Link>
                        <Link to="/app/subscription" className={`${pathname.includes("subscription") && "bg-sky-200 bg-opacity-80 text-primary"} text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-3 px-4 rounded-md`}>Pricing</Link>
                        <Link to="/guide" className={`${pathname.includes("guides") && "bg-sky-200 bg-opacity-80 text-primary"} text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-3 px-4 rounded-md`}>Guides</Link>
                        <Link to="/blog" className={`${pathname.includes("blog") && "bg-sky-200 bg-opacity-80 text-primary"} text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-3 px-4 rounded-md`}>Blog</Link>
                        {/* <div>
                            <button
                                onClick={() => setShowResource(!showResource)}
                                className={`w-full group flex justify-between items-center bg-opacity-80 text-black text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-3 px-4 rounded-md`}
                            >
                                Resources
                                <Icon className="h-6 w-6" icon={!showResource ? "ChevronDown" : "ChevronUp"} />
                            </button>
                            {showResource && (
                                <div className="mt-2 rounded-[6px] bg-[#F7F8F9] pl-[28px] pt-2">
                                    <div>
                                        <div className="mt-2 pb-2 text-md dt:mt-0 dt:w-[300px]">
                                            <div className="flex flex-row text-lg font-[700] text-black">Resume Optimization Tools</div>
                                            <div className="mt-3">
                                                <Link to="/ai-tools/recruiters-hotline" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500">
                                                    <div className="text-md font-medium">Recruiters Hotline</div>
                                                </Link>
                                                <Link to="/ai-tools/resume-optimizer" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500">
                                                    <div className="text-md font-medium">Resume Optimizor</div>
                                                </Link>
                                                <Link to="/ai-tools/resume-grader" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500">
                                                    <div className="text-md font-medium">Resume Grader</div>
                                                </Link>
                                                <Link to="/ai-tools/resume-checker" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500">
                                                    <div className="text-md font-medium">Resume Checker</div>
                                                </Link>
                                                <Link to="/ai-tools/resume-score" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500">
                                                    <div className="text-md font-medium">Resume Score</div>
                                                </Link>
                                                <Link to="/ai-tools/resume-maker-for-ats" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500">
                                                    <div className="text-md font-medium">Resume Maker for ATS</div>
                                                </Link>
                                                <Link to="/ai-tools/ats-resume-maker" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500">
                                                    <div className="text-md font-medium">ATS Resume Maker</div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mt-8 pb-2 text-md dt:mt-0 dt:w-[300px]">
                                            <div className="flex flex-row text-lg font-[700] text-black">
                                                Resume Creation Tools
                                            </div>
                                            <div className="mt-3">
                                                <Link to="/ai-tools/resume-maker-for-students" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500">
                                                    <div className="text-md font-medium">Resume Maker for Students</div>
                                                </Link>
                                                <Link to="/ai-tools/usa-job-resume-builder" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500">
                                                    <div className="text-md font-medium">USA Job Resume Builder</div>
                                                </Link>
                                                <Link to="/ai-tools/resume-maker-for-veterans" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500">
                                                    <div className="text-md font-medium">Resume Maker for Veterans</div>
                                                </Link>
                                                <Link to="/ai-tools/resume-maker-by-chatgpt" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500">
                                                    <div className="text-md font-medium">ChatGPT Resume Maker</div>
                                                </Link>
                                                <Link to="/ai-tools/cover-letter-generator" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500">
                                                    <div className="text-md font-medium">Cover Letter Generator</div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mt-8 pb-2 text-md dt:mt-0 dt:w-[300px]">
                                            <div className="flex flex-row text-lg font-[700] text-black">
                                                Career Guidance Tools
                                            </div>
                                            <div className="mt-3">
                                                <Link to="/ai-tools/career-coach" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500">
                                                    <div className="text-md font-medium">AI Career Coach</div>
                                                </Link>
                                                <Link to="/ai-tools/linkedin-profile-optimizer" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500">
                                                    <div className="text-md font-medium">
                                                        LinkedIn Profile Optimizer
                                                    </div>
                                                </Link>
                                                <Link to="/ai-tools/linkedin-resume-builder" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500">
                                                    <div className="text-md font-medium">LinkedIn Resume Builder</div>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="mt-10 pb-2 text-md dt:w-[300px]">
                                            <div className="flex flex-row text-lg font-[700] text-black">
                                                Support
                                            </div>
                                            <div className="mt-3">
                                                <Link to="/guide" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500">
                                                    <div className="text-md font-medium">Guides</div>
                                                </Link>
                                                <Link to="/blog" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500">
                                                    <div className="text-md font-medium">Blog</div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div> */}
                        <Link to="" className={`${pathname.includes("question-bank") && "bg-sky-200 bg-opacity-80 text-primary"} text-md hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-3 px-4 rounded-md`}>Question Bank</Link>
                    </div>
                </div>
                <div className="flex items-center">
                    {!state.access_token ? (
                        <div className="flex gap-3 sm:gap-6 items-center">
                            <Link to="/auth/sign-in" className="text-md hidden sm:block hover:bg-sky-200 hover:bg-opacity-80 hover:text-primary py-2 px-4 rounded-md">Sign In</Link>
                            <Link to="/auth/sign-up" className="text-white px-4 py-2 text-md hover:bg-sky-200 hover:text-primary p-2 rounded-md bg-primary">Sign Up</Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/app/started" className={`flex items-center text-white px-4 py-2 text-md hover:bg-sky-200 hover:text-primary p-2 rounded-md bg-primary 2xl:mr-0 ${showDropdown ? "mr-0" : "mr-3"}`}>Dashboard</Link>
                            <div className={`relative ${showDropdown ? "block" : "hidden"} 2xl:flex`} ref={profileDropdownRef} >
                                <button onClick={() => setShowProfileDropdown(true)}>
                                    {state.user?.pfp ? <img
                                        crossOrigin="anonymous"
                                        src={state.user?.pfp ? state.user?.pfp : "/image/icons/user.avif"}
                                        className="rounded-full w-12 h-12"
                                        title={state.user?.fullName}
                                        alt={state.user?.fullName}
                                    /> : <div className="relative rounded-full w-12 h-12 flex items-center justify-center">
                                        <img src="/image/icons/user-bg.png" className="rounded-full w-full h-full" />
                                        <div className="absolute text-white text-xl">
                                            {state.user?.fullName?.charAt(0)}
                                        </div>
                                    </div>}
                                </button>
                                {showProfileDropdown && (
                                    <div className="absolute top-14 right-0">
                                        <ProfileDropdown onManageAccount={() => setShowManageAccountModal(true)} />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <div>
                        <Hamburger onHandle={() => setShowDropdown(!showDropdown)} />
                    </div>
                </div>
            </header>
            {showManageAccountModal && <ManageAccountModal isOpen={showManageAccountModal} onClose={() => setShowManageAccountModal(false)} />}
            <div
                onMouseOver={() => setShowResource(true)}
                onMouseOut={() => setShowResource(false)}
                className={`${showResource ? "2xl:flex" : "hidden"} hidden fixed left-[50%] h-[390px] w-screen max-w-[1398px] translate-x-[-50%] flex-row justify-center gap-x-[48px] rounded-[8px] border border-gray-border bg-white p-12 shadow-md top-[60px]`}
            >
                <div>
                    <div className="mt-2 pb-2 text-md dt:mt-0 dt:w-[300px]">
                        <div className="flex flex-row text-lg font-[700] text-black">
                            Resume Optimization Tools
                        </div>
                        <div className="mt-3">
                            <Link to="/ai-tools/recruiters-hotline" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500" >
                                <div className="text-md font-medium">Recruiters Hotline</div>
                            </Link>
                            <Link to="/ai-tools/resume-optimizer" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500" >
                                <div className="text-md font-medium">Resume Optimizor</div>
                            </Link>
                            <Link to="/ai-tools/resume-grader" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500" >
                                <div className="text-md font-medium">Resume Grader</div>
                            </Link>
                            <Link to="/ai-tools/resume-checker" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500" >
                                <div className="text-md font-medium">Resume Checker</div>
                            </Link>
                            <Link to="/ai-tools/resume-score" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500" >
                                <div className="text-md font-medium">Resume Score</div>
                            </Link>
                            <Link to="/ai-tools/resume-maker-for-ats" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500" >
                                <div className="text-md font-medium">Resume Maker for ATS</div>
                            </Link>
                            <Link to="/ai-tools/ats-resume-maker" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500" >
                                <div className="text-md font-medium">ATS Resume Maker</div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-2 pb-2 text-md dt:mt-0 dt:w-[300px]">
                    <div className="flex flex-row text-lg font-[700] text-black">
                        Resume Creation Tools
                    </div>
                    <div className="mt-3">
                        <Link to="/ai-tools/resume-maker-for-students" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500" >
                            <div className="text-md font-medium">Resume Maker for Students</div>
                        </Link>
                        <Link to="/ai-tools/usa-job-resume-builder" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500" >
                            <div className="text-md font-medium">USA Job Resume Builder</div>
                        </Link>
                        <Link to="/ai-tools/resume-maker-for-veterans" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500" >
                            <div className="text-md font-medium">Resume Maker for Veterans</div>
                        </Link>
                        <Link to="/ai-tools/resume-maker-by-chatgpt" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500" >
                            <div className="text-md font-medium">ChatGPT Resume Maker</div>
                        </Link>
                        <Link to="/ai-tools/cover-letter-generator" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500" >
                            <div className="text-md font-medium">Cover Letter Generator</div>
                        </Link>
                    </div>
                </div>
                <div>
                    <div className="mt-2 pb-2 text-md dt:mt-0 dt:w-[300px]">
                        <div className="flex flex-row text-lg font-[700] text-black">
                            Career Guidance Tools
                        </div>
                        <div className="mt-3">
                            <Link to="/ai-tools/career-coach" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500" >
                                <div className="text-md font-medium">AI Career Coach</div>
                            </Link>
                            <Link to="/ai-tools/linkedin-profile-optimizer" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500" >
                                <div className="text-md font-medium">
                                    LinkedIn Profile Optimizer
                                </div>
                            </Link>
                            <Link to="/ai-tools/linkedin-resume-builder" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500" >
                                <div className="text-md font-medium">LinkedIn Resume Builder</div>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-10 pb-2 text-md dt:w-[300px]">
                        <div className="flex flex-row text-lg font-[700] text-black">
                            Support
                        </div>
                        <div className="mt-3">
                            <Link to="/guide" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500" >
                                <div className="text-md font-medium">Guides</div>
                            </Link>
                            <Link to="/blog" className="flex h-[36px] cursor-pointer flex-row items-center text-slate-700 hover:text-sky-500" >
                                <div className="text-md font-medium">Blog</div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="relative w-[360px] dt:block">
                    <div className="absolute right-[-48px] top-[-42px] rounded-r-[8px] bg-[#F7F8F9]">
                        <div
                            className="flex h-[388px] w-[360px] flex-col items-center justify-center"
                            style={{ opacity: 1, visibility: "inherit" }}
                        >
                            <div className="flex flex-col items-center justify-start">
                                <div className="w-[296px] text-black">
                                    <img alt="quote" width={200} height={200} className="text-red-500" src="/image/icons/quote.svg" />
                                </div>
                                <div className="w-[248px] font-[Albra] text-lg">
                                    The AI Interview Copilot gave me the prep and confidence to
                                    navigate challenging interview questions, leading to my role in
                                    finance.
                                </div>
                                <div className="flex w-[296px] justify-end">
                                    <img alt="quote" width={200} height={200} className="text-red-500" src="/image/icons/dequote.svg" />
                                </div>
                            </div>
                            <div className="mt-6 flex w-[296px] flex-row items-center justify-start pl-6 gap-2">
                                {state.user?.pfp ? <img
                                    crossOrigin="anonymous"
                                    src={state.user?.pfp ? state.user?.pfp : "/image/icons/user.avif"}
                                    className="rounded-full w-12 h-12"
                                    title={state.user?.fullName}
                                    alt={state.user?.fullName}
                                /> : <div className="relative rounded-full w-12 h-12 flex items-center justify-center">
                                    <img src="/image/icons/user-bg.png" className="rounded-full w-full h-full" />
                                    <div className="absolute text-white text-xl">
                                        {state.user?.fullName?.charAt(0)}
                                    </div>
                                </div>}
                                <div className="ml-2">
                                    <div className="text-md font-medium text-gray-500">
                                        Ananya Sharma
                                    </div>
                                    <div className="text-md font-[400] text-gray-400">
                                        Financial Analyst of Morgan Stanley
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
