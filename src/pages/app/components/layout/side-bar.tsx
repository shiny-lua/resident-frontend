import { Link } from "react-router-dom"
import Icon from "../../../../components/icon"
import React from "react"

const SideBar = () => {

    const [isCollapse, setIsCollapse] = React.useState(false)

    return (
        <div className="sticky left-0 top-0 right-0 box-content h-full border-r border-slate-100 transition-[width] duration-300 max-h-screen w-[240px] sm:w-[65px] md:w-[240px]">
            <nav className="relative flex h-full w-full flex-col overflow-x-hidden py-5 transition-[width] duration-300">
                <button onClick={() => setIsCollapse(true)} className="absolute flex justify-center items-center top-5 right-5 rounded-lg border border-slate-400 p-1 text-slate-600"><Icon icon="ArrowLeft" /></button>
                <Link to={"/"} className="flex gap-2 px-0 mb-4 md:mb-0 sm:px-5 cursor-pointer">
                    <div className="inline-block sm:hidden md:inline-block md:text-2xl text-primary">Final Round</div>
                    <div className="flex justify-center md:justify-start w-full md:w-auto">
                        <img src="/image/icons/logo.png" className="w-6 h-6 md:w-8 md:h-8" alt="logo" />
                    </div>
                </Link>
                <div className="">
                    <div className="border-t border-slate-100 px-2 py-3">
                        <div className="hidden sm:hidden md:block text-nowrap pb-3 pl-3 font-medium text-slate-400">
                            Interview
                        </div>
                        <Link to="/app/v2/interview" className="flex justify-center md:justify-start min-h-10 items-center gap-3 text-nowrap rounded-md px-3 pb-3 font-medium hover:bg-sky-100">
                            <Icon icon="LiveInterview" />
                            <span className="hidden md:block">Live Interview</span>
                        </Link>
                        <Link to="/app/v2/mock-interview" className="flex justify-center md:justify-start min-h-10 items-center gap-3 text-nowrap rounded-md px-3 py-3 font-medium hover:bg-sky-100">
                            <Icon icon="MockInterview" />
                            <span className="hidden md:block">Mock Interview</span>
                        </Link>
                        <Link to="/app/v2/role" className="flex justify-center md:justify-start min-h-10 items-center gap-3 text-nowrap rounded-md px-3 py-3 font-medium hover:bg-sky-100">
                            <Icon icon="PreparationHub" />
                            <span className="hidden md:block">Preparation Hub</span>
                        </Link>
                        <Link to="/app/v2/resume" className="flex justify-center md:justify-start min-h-10 items-center gap-3 text-nowrap rounded-md px-3 py-3 font-medium hover:bg-sky-100">
                            <Icon icon="DocumentCenter" />
                            <span className="hidden md:block">Document Center</span>
                        </Link>
                        <Link to="/app/v2/store" className="flex justify-center md:justify-start min-h-10 items-center gap-3 text-nowrap rounded-md px-3 pt-3 font-medium hover:bg-sky-100" >
                            <Icon icon="Upgrade" />
                            <span className="hidden md:block">Upgrade Your Copilot</span>
                        </Link>
                    </div>
                    <div className="border-t border-slate-100 px-2 pt-3">
                        <div className="hidden sm:hidden md:block text-nowrap pb-3 pl-3 font-medium text-slate-400">Tools</div>
                        <Link to="/app/v2/ai-generator" className="flex justify-center md:justify-start min-h-10 items-center gap-3 text-nowrap rounded-md px-3 py-3 font-medium hover:bg-sky-100" >
                            <Icon icon="AiGenerator" />
                            <span className="hidden md:block">AI Material Generator</span>
                        </Link>
                        <Link to="/app/v2/interview-coach" className="flex justify-center md:justify-start min-h-10 items-center gap-3 text-nowrap rounded-md px-3 py-3 font-medium hover:bg-sky-100" >
                            <Icon icon="AiMagic" />
                            <span className="hidden md:block">AI Career Coach</span>
                        </Link>
                        <Link to="/app/v2/chat-with-recruiters" className="flex justify-center md:justify-start min-h-10 items-center gap-3 text-nowrap rounded-md px-3 py-3 font-medium hover:bg-sky-100" >
                            <Icon icon="Chat" />
                            <span className="hidden md:block">Speak with Recruiters</span>
                        </Link>
                        <Link to="/app/v2/question" className="flex justify-center md:justify-start min-h-10 items-center gap-3 text-nowrap rounded-md px-3 py-3 font-medium hover:bg-sky-100" >
                            <Icon icon="Question" />
                            <span className="hidden md:block">Interview Question Bank</span>
                        </Link>
                    </div>
                    <div className="border-t border-slate-100 mx-2 px-2 py-3">
                        <div className="hidden sm:hidden md:block text-nowrap pb-3 pl-3 font-medium text-slate-400">Education</div>
                        <Link className="flex justify-center min-h-10 items-center gap-3 py-3 text-nowrap rounded-md px-3 w-12 md:w-full font-medium bg-slate-900 text-white  hover:bg-primary/90" to="/app/v2/started">
                            <Icon icon="Rocket" />
                            <span className="hidden md:block">Get Started</span>
                        </Link>
                    </div>
                    <div className="border-t border-slate-100 px-2 pb-3">
                        <div className="hidden sm:hidden md:block text-nowrap pb-3 pl-3 font-medium text-slate-400">Other</div>
                        <Link className="flex justify-center md:justify-start min-h-10 items-center gap-3 text-nowrap rounded-md px-3 py-3 font-medium hover:bg-sky-100" to="/app/v2/download">
                            <Icon icon="Download" />
                            <span className="hidden md:block">Download Center</span>
                        </Link>
                        <Link className="flex justify-center md:justify-start min-h-10 items-center gap-3 text-nowrap rounded-md px-3 py-3 font-medium hover:bg-sky-100" to="/app/v2/permission-setting">
                            <Icon icon="Setting" />
                            <span className="hidden md:block">Settings</span>
                        </Link>
                        <Link className="flex justify-center md:justify-start min-h-10 items-center gap-3 text-nowrap rounded-md px-3 py-3 font-medium hover:bg-sky-100" to="/app/v2/help" >
                            <Icon icon="HelpCenter" />
                            <span className="hidden md:block">Help Center</span>
                        </Link>
                    </div>
                </div>
                <div className="hidden sm:hidden md:block sticky bottom-0 m-2 rounded-lg border bg-white p-3 shadow-md mt-auto px-2">
                    <div className="flex h-12 items-center gap-3 border-b border-slate-200 pb-3 text-slate-700">
                        <img src="/image/icons/lua.avif" className="rounded-full w-8 h-8" alt="lua" />
                        <div className="font-semibold transition-colors">
                            lua
                        </div>
                    </div>
                    <div className="my-2.5 rounded-md bg-slate-50 p-1">
                        <div className="flex w-full justify-between font-medium">
                            <div>
                                <div className="whitespace-nowrap">Live Interview</div>
                                <div className="text-xxs text-slate-400">Free Trial</div>
                            </div>
                            <div className="my-auto flex items-center rounded-md text-sky-600">0</div>
                        </div>
                    </div>
                    <div className="my-2.5 rounded-md bg-slate-50 p-1">
                        <div className="flex w-full justify-between font-medium">
                            <div>
                                <div className="whitespace-nowrap">Mock Interview</div>
                                <div className="text-xxs text-slate-400">Free Trial</div>
                            </div>
                            <div className="my-auto flex items-center rounded-md text-sky-600">
                                Free Trial
                            </div>
                        </div>
                    </div>
                    <Link to="/app/v2/subscription">
                        <button className="flex justify-center items-center w-full mt-4 bg-[linear-gradient(90deg,_#0090FF_0%,_#00F7FF_100%)] hover:bg-[linear-gradient(90deg,_#0091ffa2_0%,_#00f7ff7f_100%)] text-center text-white text-lg py-3 rounded-md">
                            <Icon icon="Diamond" />
                            Upgrade Now</button>
                    </Link>
                </div>
            </nav>
            <div className="flex justify-center md:hidden bottom-0 left-0 my-2"><img src="/image/icons/lua.avif" className="rounded-full w-8 h-8" alt="lua" /></div>
        </div>
    )
}

export default SideBar