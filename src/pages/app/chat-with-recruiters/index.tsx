import React from "react";
import Layout from "../components/layout";
import Icon from "../../../components/icon";
import { companies } from "../components/data.d";

const ChatWithRecruiters = () => {

    const [status, setStatus] = React.useState({
        companyIdx: 0,
        company: "",
        tabIdx: 0
    })

    return (
        <Layout>
            <div className="relative flex flex-1 flex-col h-[calc(100vh-60px)] sm:h-screen gap-3 overflow-auto p-4 pb-16 lg:gap-4 lg:p-6 lg:pb-6 md:max-h-screen">
                <div className="hidden sm:flex flex-col">
                    <h1 className="text-left text-2xl font-semibold leading-8">
                        Speak with Recruiters
                    </h1>
                    <h4 className="mb-6 mt-1 text-sm text-slate-700">
                        Unlock direct access to AI-powered recruiters from the world's leading
                        Fortune 500 companies. Whether you're seeking personalized interview tips,
                        exploring job openings, or getting insider insights on company culture, our
                        AI recruiters are here to guide you.
                    </h4>
                </div>
                <div className="hidden sm:flex flex-grow gap-4 overflow-hidden overflow-x-auto sm:gap-6">
                    <div className="min-w-[180px] flex-grow-[2] basis-[324px]">
                        <div className="flex h-full flex-col rounded-lg border border-[#E2E8F0] p-6">
                            <button className="flex w-full items-center justify-between whitespace-nowrap rounded-md border h-6 gap-2 border-none p-0 text-[20px] font-semibold" >
                                <span style={{ pointerEvents: "none" }}>Tech</span>
                                <Icon icon="Tech" />
                            </button>
                            <hr className="my-6" />
                            <ul
                                className="flex flex-col gap-3 overflow-auto"
                                style={{
                                    scrollbarColor: "rgb(204, 204, 204) transparent",
                                    scrollbarWidth: "thin"
                                }}
                            >
                                {companies.map((i, k) => (
                                    <li
                                        onClick={() => setStatus({ ...status, companyIdx: k, company: i.name })} key={k}
                                        className={`flex h-12 cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm ${k === status.companyIdx ? "border-sky-500 bg-sky-200/55 " : "border-slate-100 bg-white"} hover:bg-sky-200/55`}
                                    >
                                        <img src={i.logo} className="h-6 w-6 shrink-0 overflow-hidden" alt={i.name} />
                                        <span className="overflow-hidden text-ellipsis whitespace-nowrap">{i.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="relative min-w-[380px] flex-grow-[5] basis-[803px] rounded-lg border bg-white px-4 py-6">
                        <div className="flex h-full w-full flex-col overflow-hidden">
                            <div className="flex-grow overflow-auto px-2" >
                                <div className="mx-auto mb-10 flex flex-col justify-between">
                                    <div className="flex flex-col gap-6">
                                        <div className="flex gap-2 sm:gap-4">
                                            <div className="bg-white-background h-fit w-8 shrink-0 overflow-hidden rounded-lg shadow-sm">
                                                <img src="https://cdn.brandfetch.io/idnrCPuv87/w/400/h/400/theme/dark/icon.png?k=bfHSJFAPEG" alt="logo_avatar" />
                                            </div>
                                            <div className="flex flex-grow items-center sm:px-4 rounded-2xl rounded-tl-none bg-sky-200 p-3">
                                                <div className="prose max-w-none font-inter text-base font-normal text-slate-900">
                                                    <p>
                                                        Hello, I am a recruiter at Apple, and I am more than happy to
                                                        answer any questions you may have regarding our company's
                                                        recruitment, interviews, and workplace-related matters.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="absolute bottom-4 left-0 w-full mt-6">
                            <div className="mx-2">
                                <div>
                                    <div className="overflow-hidden rounded-full duration-200 mr-2 border border-sky-300 bg-sky-50 p-2 ">
                                        <div className="flex items-center">
                                            <textarea placeholder="Send a message to coach" className="mx-auto block w-full flex-grow resize-none border-none text-content-primary outline-none placeholder:text-content-tertiary bg-transparent px-2 py-0 text-lg placeholder:overflow-hidden placeholder:text-ellipsis placeholder:whitespace-nowrap empty:max-h-6" name=""></textarea>
                                            <div className="flex shrink-0 self-end">
                                                <button className="flex select-none appearance-none items-center justify-center rounded-full bg-cyan-500 text-white sm:text-xl sm:leading-10 h-8 w-8 text-lg leading-8 disabled:opacity-50" >
                                                    <Icon icon="ArrowUp" className="text-white" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {status.tabIdx === 0 ? (
                    <div className="flex flex-col sm:hidden overflow-autoen">
                        <h1 className="mt-4 text-2xl font-semibold">
                            Speak with Recruiters from Fortune 500 Companies. Choose one first
                        </h1>
                        <div className="mt-8 flex-grow">
                            <div>
                                <div className="flex w-full scroll-m-2 gap-6 overflow-auto pr-4" style={{ scrollbarWidth: "none" }} >
                                    <span className="whitespace-nowrap text-lg font-semibold">Tech</span>
                                    <span className="whitespace-nowrap text-lg text-slate-600 font-semibold">Startup</span>
                                    <span className="whitespace-nowrap text-lg text-slate-600 font-semibold">Consumer</span>
                                    <span className="whitespace-nowrap text-lg text-slate-600 font-semibold">Professional Services</span>
                                    <span className="whitespace-nowrap text-lg text-slate-600 font-semibold">Healthcare</span>
                                </div>
                                <div className="mb-20 mt-6 grid grid-cols-2 gap-4">
                                    {companies.map((i, k) => (
                                        <button onClick={() => setStatus({ ...status, company: i.name, companyIdx: k })} key={k} className={`flex items-center gap-2 rounded-lg border p-3 text-sm ${k === status.companyIdx ? "border-sky-500 bg-sky-200" : "border-slate-100 bg-white"}`}>
                                            <img src={i.logo} width={24} height={24} alt="logo" />
                                            <span>{i.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setStatus({...status, tabIdx: 1})} className="absolute bottom-6 left-0 right-0 mx-auto w-[calc(100%-32px)] rounded-lg bg-primary hover:bg-primary/90 bg-gradient-to-r from-[#0090FF] to-[#00F7FF] px-4 text-center text-md py-3 text-white">
                            Choose company
                        </button>
                    </div>
                ) : (
                    <div className="relative flex-grow-[5] rounded-lg py-6">
                        <div className="flex h-full w-full flex-col overflow-hidden">
                            <div className="flex-grow overflow-auto px-2" >
                                <div className="mx-auto mb-10 flex flex-col justify-between">
                                    <div className="flex flex-col gap-6">
                                        <div className="flex gap-2 sm:gap-4">
                                            <div className="bg-white-background h-fit w-8 shrink-0 overflow-hidden rounded-lg shadow-sm">
                                                <img src="https://cdn.brandfetch.io/idnrCPuv87/w/400/h/400/theme/dark/icon.png?k=bfHSJFAPEG" alt="logo_avatar" />
                                            </div>
                                            <div className="flex flex-grow items-center sm:px-4 rounded-2xl rounded-tl-none bg-sky-200 p-3">
                                                <div className="prose max-w-none font-inter text-base font-normal text-slate-900">
                                                    <p>
                                                        Hello, I am a recruiter at Apple, and I am more than happy to
                                                        answer any questions you may have regarding our company's
                                                        recruitment, interviews, and workplace-related matters.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="absolute bottom-4 left-0 w-full mt-6">
                            <div className="mx-2">
                                <div>
                                    <div className="overflow-hidden rounded-full duration-200 mr-2 border border-sky-300 bg-sky-50 p-2 ">
                                        <div className="flex items-center">
                                            <textarea placeholder="Send a message to coach" className="mx-auto block w-full flex-grow resize-none border-none text-content-primary outline-none placeholder:text-content-tertiary bg-transparent px-2 py-0 text-lg placeholder:overflow-hidden placeholder:text-ellipsis placeholder:whitespace-nowrap empty:max-h-6" name=""></textarea>
                                            <div className="flex shrink-0 self-end">
                                                <button className="flex select-none appearance-none items-center justify-center rounded-full bg-cyan-500 text-white sm:text-xl sm:leading-10 h-8 w-8 text-lg leading-8 disabled:opacity-50" >
                                                    <Icon icon="ArrowUp" className="text-white" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default ChatWithRecruiters