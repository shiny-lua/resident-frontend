import React from "react"
import { Link, useLocation } from "react-router-dom"

import Icon from "../../../../components/icon"
import ProfileDropdown from "../../../../components/profile-dropdown"
import DropRight from "./drop-right"
import ManageAccountModal from "../../../../components/manage-account-modal"
import { useGlobalContext } from "../../../../context"

interface SideBarProps {
    smallSideBar: boolean
    isMobile: boolean
    onSideBar: VoidFunction
    showArrowButton: boolean
    onShowArrowButton: VoidFunction
    onSmallSideBar: VoidFunction
}

const SideBar = (props: SideBarProps) => {

    const { pathname } = useLocation();
    const [state]: GlobalContextType = useGlobalContext()


    const { smallSideBar, onSideBar, showArrowButton, onShowArrowButton, onSmallSideBar, isMobile } = props

    const profileDropdownRef = React.useRef<HTMLDivElement>(null)
    const dropRightRef = React.useRef<HTMLDivElement>(null)

    const [showProfileDropdown, setShowProfileDropdown] = React.useState(false)
    const [showDropRight, setShowDropRight] = React.useState(false)
    const [showManageAccountModal, setShowManageAccountModal] = React.useState(false)

    const onUpOutside = (event: MouseEvent) => {
        if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
            setShowProfileDropdown(false);
        }
    };

    const onRightOutside = (event: MouseEvent) => {
        if (dropRightRef.current && !dropRightRef.current.contains(event.target as Node)) {
            setShowDropRight(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("mousedown", onUpOutside);
        document.addEventListener("mousedown", onRightOutside);
        return () => {
            document.removeEventListener("mousedown", onUpOutside);
            document.removeEventListener("mousedown", onRightOutside);
        };
    }, []);

    return (
        <div className={`${smallSideBar ? "w-[55px]" : isMobile ? "w-full z-10 bg-black bg-opacity-75" : "w-[280px]"} z-1 sm:h-screen ${isMobile ? "absolute top-0 left-0" : "fixed"}`}>
            <nav className="hidden sm:flex relative max-w-[280px] h-full w-full flex-col pt-8 pb-5 transition-[width] duration-300 bg-sky-100">
                {!smallSideBar && <span onClick={onSideBar} className="absolute right-4 border rounded-md p-1 border-sky-300 bg-white pr-1.5">
                    <Icon icon="ArrowLeft" className="text-sky-600" />
                </span>}

                {!smallSideBar ? (
                    <Link to={"/"} className="flex w-full items-center gap-2 px-5 pb-5 cursor-pointer">
                        <div className="text-lg md:text-2xl text-primary" >Theresidentguy</div>
                        <div><img src="/image/icons/logo.png" alt="logo" width={30} height={30} /></div>
                    </Link>
                ) : (!showArrowButton ? (
                    <div onMouseEnter={onShowArrowButton} className="mx-5 mb-2"><img src="/image/icons/logo.png" alt="logo" width={22} height={22} /></div>
                ) : (
                    <span onMouseLeave={onShowArrowButton} onClick={onSmallSideBar} className="mx-4 mb-3 border rounded-md p-1 border-sky-300 bg-white pl-1.5">
                        <Icon icon="ChevronRight" className="text-sky-600" />
                    </span>
                ))}

                <div className="">
                    <div className={`border-t border-slate-100 p-2`}>
                        {!smallSideBar && <div className="text-nowrap pl-3 font-medium text-slate-400">Interview</div>}
                        <Link
                            to="/app/live-interview"
                            className={`flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 py-2 font-medium hover:bg-sky-200 ${pathname.includes("live-interview") ? "bg-sky-200" : "bg-transparent"}`}
                        >
                            <Icon icon="LiveInterview" />
                            {!smallSideBar && <span className="text-lg">Live Interview</span>}
                        </Link>
                        <Link
                            to="/app/mock-interview"
                            className={`flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 py-2 font-medium hover:bg-sky-200 ${pathname.includes("mock-interview") ? "bg-sky-200" : "bg-transparent"}`}
                        >
                            <Icon icon="MockInterview" />
                            {!smallSideBar && <span className="text-lg">Mock Interview</span>}
                        </Link>
                        {/* <Link
                            to="/app/role"
                            className={`flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 py-2 font-medium hover:bg-sky-200 ${pathname.includes("role") ? "bg-sky-200" : "bg-transparent"}`}
                        >
                            <Icon icon="PreparationHub" />
                            {!smallSideBar && <span className="text-lg">Preparation Hub</span>}
                        </Link> */}
                        <Link
                            to="/app/resume"
                            className={`flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 py-2  font-medium hover:bg-sky-200 ${pathname.includes("resume") ? "bg-sky-200" : "bg-transparent"}`}
                        >
                            <Icon icon="DocumentCenter" />
                            {!smallSideBar && <span className="text-lg">Document Center</span>}
                        </Link>
                    </div>
                    <div className={`border-t border-slate-100 p-2`}>
                        {!smallSideBar && <div className="text-nowrap pb-3 pl-3 font-medium text-slate-400">Tools</div>}
                        <Link
                            to="/app/question"
                            className={`flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 py-2 font-medium hover:bg-sky-200 ${pathname.includes("question") ? "bg-sky-200" : "bg-transparent"}`}
                        >
                            <Icon icon="Question" />
                            {!smallSideBar && <span className="text-lg">Interview Question Bank</span>}
                        </Link>
                    </div>
                    <div className="border-t border-slate-100 px-2 py-3">
                        {!smallSideBar && <div className="text-nowrap pb-3 pl-3 font-medium text-slate-400">Education</div>}
                        <Link
                            className="flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 py-2 font-medium bg-sky-600 text-white hover:bg-primary/90"
                            data-state="closed"
                            to="/app/started"
                        >
                            <Icon icon="Rocket" />
                            {!smallSideBar && <span className="text-lg">Get Started</span>}
                        </Link>
                    </div>
                </div>
                {!smallSideBar ? (
                    <div className="sticky bottom-0 m-2 rounded-lg border bg-slate-50 p-3 shadow-sm mt-auto px-2">
                        <div className="relative">
                            <div ref={profileDropdownRef}>
                                <div onClick={() => setShowProfileDropdown(!showProfileDropdown)} className={`flex h-12 cursor-pointer items-center justify-between border-b pb-3 text-slate-700`}>
                                    <div className="flex gap-1 items-center">
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
                                        <div className="items-center rounded-md border py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-black ml-[10px] inline-block w-[128px] overflow-hidden break-all bg-transparent px-0 text-sm hover:bg-transparent">
                                            {state.user.fullName ? state.user.fullName : state.user.email}
                                        </div>
                                    </div>
                                    <Icon className="text-black" icon="ChevronRight" />
                                </div>
                                {showProfileDropdown &&
                                    <div className="absolute -top-54 left-3 ">
                                        <ProfileDropdown onManageAccount={() => { setShowManageAccountModal(true); setShowProfileDropdown(false) }} />
                                    </div>
                                }
                            </div>
                        </div>
                        <div ref={dropRightRef}>
                            <div onClick={() => setShowDropRight(!showDropRight)} className="flex flex-row cursor-pointer justify-between items-center pt-2 pb-4">
                                <div className="flex items-center">
                                    <Icon icon="Plan" />
                                    <div className="items-center rounded-md border py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-black ml-[10px] inline-block w-[128px] overflow-hidden break-all bg-transparent px-0 text-sm hover:bg-transparent">
                                        Plan Usage Other
                                    </div>
                                </div>
                                <Icon className="text-black" icon="ChevronRight" />
                            </div>
                            {showDropRight && <DropRight />}
                        </div>
                        <Link to="/app/subscription">
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 px-4 py-2 w-full bg-gradient-to-r from-[#0090FF] to-[#00F7FF] text-white">
                                <Icon icon="Diamond" />
                                Upgrade Now
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="sticky bottom-0 flex justify-center items-center mt-auto bg-transparent cursor-pointer ">
                        <div onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
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
                        {showProfileDropdown &&
                            <div className="absolute -top-54 left-3 ">
                                <ProfileDropdown onManageAccount={() => { setShowManageAccountModal(true); setShowProfileDropdown(false) }} />
                            </div>
                        }
                    </div>)
                }
            </nav >
            {showManageAccountModal && <ManageAccountModal isOpen={showManageAccountModal} onClose={() => setShowManageAccountModal(false)} />}
        </div >
    )
}

export default SideBar