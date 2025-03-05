import React from "react"
import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie";

import Icon from "../../../../components/icon"
import { useGlobalContext } from "../../../../context";
import ManageAccountModal from "../../../../components/manage-account-modal";
const Header = () => {
    const [showNav, setShowNav] = React.useState(false)
    const [showUserOption, setShowUserOption] = React.useState(false)
    const [showManageAccountModal, setShowManageAccountModal] = React.useState(false)
    const [showProfileDropdown, setShowProfileDropdown] = React.useState(false)

    const sideBarRef = React.useRef<HTMLDivElement>(null)
    const userOptionRef = React.useRef<HTMLDivElement>(null)
    const profileDropdownRef = React.useRef<HTMLDivElement>(null)
    const [state, { dispatch }]: GlobalContextType = useGlobalContext();
    const navigate = useNavigate();

    React.useEffect(() => {
        // Conditionally set the overflow style based on the conditions
        if (showNav) {
            document.documentElement.style.overflow = 'hidden'; // Hide scrollbar
        } else {
            document.documentElement.style.overflow = 'auto'; // Allow scrollbar
        }
    }, [showNav]); // Re-run effect when these values change


    const onLogout = () => {
        dispatch({ type: "access_token", payload: "" })
        Cookies.remove("access_token")
        navigate("/")
    }

    const onSideBar = (event: MouseEvent) => {
        if (sideBarRef.current && !sideBarRef.current.contains(event.target as Node)) {
            setShowNav(false);
        }
    };

    const onUserOption = (event: MouseEvent) => {
        if (userOptionRef.current && !userOptionRef.current.contains(event.target as Node)) {
            setShowUserOption(false);
        }
    };

    const onProfileDropdown = (event: MouseEvent) => {
        if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
            setShowProfileDropdown(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("mousedown", onSideBar);
        document.addEventListener("mousedown", onUserOption);
        document.addEventListener("mousedown", onProfileDropdown);
        return () => {
            document.removeEventListener("mousedown", onSideBar);
            document.removeEventListener("mousedown", onUserOption);
            document.removeEventListener("mousedown", onProfileDropdown);
        };
    }, []);


    return (
        <div className="fixed top-0 left-0 right-0 block sm:hidden px-5 py-4 bg-white z-99999" >
            {showNav ? (
                <div className={`w-full z-10 bg-black bg-opacity-75 h-screen top-0 left-0 fixed`}>
                    <nav ref={sideBarRef} className={`flex relative max-w-[250px] h-full w-full flex-col py-5 transition-[width] duration-300 bg-sky-100 ${showNav ? "transform translate-x-0" : "transform -translate-x-full"}`}>
                        <Link to={"/"} className="flex gap-2 px-5 pb-4 items-center cursor-pointer">
                            <div className="text-lg md:text-xl text-primary">Theresidentguy</div>
                            <div>
                                <img src="/image/icons/logo.png"  width={25} height={25} alt="logo" />
                            </div>
                        </Link>
                        <div className="">
                            <div className={`border-t border-slate-100 px-2 py-3}`}>
                                <div className="text-nowrap pl-3 font-medium text-slate-400">Interview</div>
                                <Link
                                    to="/app/live-interview"
                                    className="flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 font-medium hover:bg-sky-100"
                                >
                                    <Icon icon="LiveInterview" />
                                    <span>Live Interview</span>
                                </Link>
                                <Link
                                    to="/app/mock-interview"
                                    className="flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 font-medium hover:bg-sky-100"
                                >
                                    <Icon icon="MockInterview" />
                                    <span>Mock Interview</span>
                                </Link>
                                <Link
                                    to="/app/role"
                                    className="flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 font-medium hover:bg-sky-100"
                                >
                                    <Icon icon="PreparationHub" />
                                    <span>Preparation Hub</span>
                                </Link>
                                <Link
                                    to="/app/resume"
                                    className="flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 font-medium hover:bg-sky-100"
                                >
                                    <Icon icon="DocumentCenter" />
                                    <span>Document Center</span>
                                </Link>
                                {/* <Link
                                    to="/app/store"
                                    className="flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 font-medium hover:bg-sky-100"
                                >
                                    <Icon icon="Upgrade" />
                                    <span>Upgrade Your Copilot</span>
                                </Link> */}
                            </div>
                            <div className={`border-t border-slate-100 px-2 py-3}`}>
                                <div className="text-nowrap pb-3 pl-3 font-medium text-slate-400">Tools</div>
                                <Link
                                    to="/app/ai-generator"
                                    className="flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 font-medium hover:bg-sky-100"
                                >
                                    <Icon icon="AiGenerator" />
                                    <span>AI Material Generator</span>
                                </Link>
                                <Link
                                    to="/app/interview-coach"
                                    className="flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 font-medium hover:bg-sky-100"
                                >
                                    <Icon icon="AiMagic" />
                                    <span>AI Career Coach</span>
                                </Link>
                                <Link
                                    to="/app/chat-with-recruiters"
                                    className="flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 font-medium hover:bg-sky-100"
                                >
                                    <Icon icon="Chat" />
                                    <span>Speak with Recruiters</span>
                                </Link>
                                <Link
                                    to="/app/question"
                                    className="flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 font-medium hover:bg-sky-100"
                                >
                                    <Icon icon="Question" />
                                    <span>Interview Question Bank</span>
                                </Link>
                            </div>
                            <div className="border-t border-slate-100 px-2 py-3">
                                <div className="text-nowrap pb-3 pl-3 font-medium text-slate-400">Education</div>
                                <Link
                                    className="flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 font-medium bg-slate-900 text-white hover:bg-primary/90"
                                    data-state="closed"
                                    to="/app/started"
                                >
                                    <Icon icon="Rocket" />
                                    <span>Get Started</span>
                                </Link>
                            </div>
                        </div>

                    </nav>
                    <span onClick={() => setShowNav(false)} className="absolute top-2 right-2 cursor-pointer"><Icon className="text-white" icon="Cancel" /></span>
                </div>
            ) : (
                <div className="flex justify-between items-center">
                    <div onClick={() => setShowNav(!showNav)}><Icon icon="Menu" /></div>
                    <Link to={"/"} className="flex gap-2 justify-center items-center cursor-pointer">
                        <div className="text-xl text-primary">Theresidentguy</div>
                        <div>
                            <img src="/image/icons/logo.png"  width={25} height={25} alt="logo" />
                        </div>
                    </Link>
                    <div className="relative z-1" ref={userOptionRef}>
                        <div className="cursor-pointer" onClick={() => setShowUserOption(!showUserOption)}>
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
                        </div>
                        {showUserOption && (
                            <div className="absolute top-12 w-[250px] right-0 rounded-lg border bg-white p-3 shadow-sm mt-auto">
                                <div className="relative">
                                    <div onClick={() => setShowProfileDropdown(true)} className={`flex h-12 cursor-pointer items-center justify-between border-b pb-3 text-slate-700`}>
                                        <div className="flex gap-1 items-center">
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
                                                <div className="text-sm font-semibold">{state.user?.fullName}</div>
                                                <div className="text-sm text-slate-500">{state.user?.email}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div onClick={() => navigate("/app/live-interview")} className="px-2 py-[7px] cursor-pointer hover:bg-sky-50">
                                        <div className="flex w-full justify-between text-sm font-medium">
                                            <div className="whitespace-nowrap">Live Interview</div>
                                            <div className="my-auto flex items-center rounded-md text-[#007CEE]">Free Trial</div>
                                        </div>
                                    </div>
                                    <div onClick={() => navigate("/app/mock-interview")} className="px-2 py-[7px] cursor-pointer hover:bg-sky-50">
                                        <div className="flex w-full justify-between text-sm font-medium">
                                            <div className="whitespace-nowrap">Mock Interview</div>
                                            <div className="my-auto flex items-center rounded-md text-[#007CEE]">Free Trial</div>
                                        </div>
                                    </div>
                                    <Link to="/app/subscription">
                                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 px-4 py-2 w-full bg-gradient-to-r from-[#0090FF] to-[#00F7FF] text-white">
                                            <Icon icon="Diamond" />
                                            Upgrade Now
                                        </button>
                                    </Link>
                                    <div className="mt-2 w-full bg-[#F8FAFC] py-1 text-sm">
                                        <div className="flex w-full cursor-pointer flex-row items-center justify-start px-2 py-[6px] hover:bg-sky-100">
                                            <Icon icon="Download" />
                                            <span className="ml-3">Download Center</span>
                                        </div>
                                        <div className="flex w-full cursor-pointer flex-row items-center justify-start px-2 py-[6px] hover:bg-sky-100">
                                            <Icon icon="SettingOutLine" />
                                            <span className="ml-3">Settings</span>
                                        </div>
                                        <div className="flex w-full cursor-pointer flex-row items-center justify-start px-2 py-[6px] hover:bg-sky-100">
                                            <Icon icon="HelpCenter" />
                                            <span className="ml-3">Help Center</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {showProfileDropdown && (
                            <div ref={profileDropdownRef} className="absolute top-14 right-0 bg-white w-[330px] bg-opacity-100 shadow-4 border rounded-xl py-4 px-5">
                                <div className="flex gap-4 items-center border-b pb-3">
                                    <div className="">
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
                                    </div>
                                    <div className="text-md flex flex-col">
                                        <div className="text-md font-semibold text-slate-900">{state.user.email}</div>
                                        <div className="text-md text-slate-600">{state.user.fullName}</div>
                                    </div>
                                </div>
                                <button onClick={() => setShowManageAccountModal(true)} className="text-md text-slate-600 flex items-center gap-3">
                                    <Icon className="flex items-center px-3 w-12 h-12" icon="Setting" />
                                    <div>Manage Account</div>
                                </button>
                                <button onClick={onLogout} className="text-md text-slate-600 border-t flex items-center gap-3 w-full">
                                    <Icon className="flex items-center px-3 w-12 h-12" icon="Logout" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {showManageAccountModal && <ManageAccountModal isOpen={showManageAccountModal} onClose={() => setShowManageAccountModal(false)} />}
        </div>
    )
}

export default Header