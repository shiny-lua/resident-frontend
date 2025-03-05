import React from "react";
import InterviewerSection from "./interviewer-section";

const ModelResponseSection = () => {
    const [isAutoScroll, setIsAutoScroll] = React.useState(false);
    return (
        <div className="flex gap-5 w-4/5 justify-center">
            <div
                className="min-w-[400px] rounded-t-lg"
                style={{ flex: "40 1 0px", overflow: "hidden" }}
            >
                <div className="relative flex flex-1 flex-col border border-slate-100 bg-white h-full">
                    <div className="items-center justify-between border-b border-slate-100 px-4 md:flex md:px-6">
                        <div className="flex items-center h-16 gap-3">
                            <div className="flex h-auto flex-1 flex-col">
                                <div className="flex items-center justify-between gap-2 text-sm font-semibold text-slate-900">
                                    Interview Copilot w/ GPT4o
                                    <div className="inline-flex items-center gap-1 align-top">
                                        <input
                                            id="auto-gpt4o-pip"
                                            type="checkbox"
                                            className="h-4 w-4 text-sky-500 focus:ring-sky-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="auto-gpt4o-pip">Auto PIP</label>
                                    </div>
                                </div>
                                <div className="flex items-center mt-1">
                                    <div className="flex items-center rounded-full border border-slate-100 px-2.5 py-1 bg-[#D9F1CD]">
                                        <span className="relative me-2 flex h-2 w-2">
                                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#129F42]" />
                                        </span>
                                        <span className="text-xs font-medium text-[#129F42]">
                                            Ready
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 gap-2 text-slate-700">
                            <label className="inline-flex items-center me-5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={isAutoScroll}
                                    onChange={() => setIsAutoScroll(!isAutoScroll)}
                                />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-teal-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600 dark:peer-checked:bg-teal-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Auto Scroll
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-center overflow-y-hidden">
                        <div className="flex w-full flex-col items-center justify-center overflowscroll text-slate-500">
                            <h4 className="text-center text-sm font-medium">
                                The Interview Copilot™ is ready and waiting for the
                            </h4>
                            <h4 className="text-center text-sm font-medium">
                                interviewer's questions.
                            </h4>
                        </div>
                        <div
                            className="flex flex-1 flex-col gap-1 pl-4 lg:pl-0 lg:pr-1 overflow-y-scroll md:gap-0 md:px-0"
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
            </div>
            <div
                className="min-w-[0px] rounded-t-lg"
                style={{ flex: "40 1 0px", overflow: "hidden" }}
            >
                <div className="relative flex flex-1 flex-col border border-slate-100 bg-white h-full">
                    <div className="items-center justify-between border-b border-slate-100 px-4 md:flex md:px-6">
                        <div className="flex items-center h-16 gap-3">
                            <div className="flex h-auto flex-1 flex-col">
                                <div className="flex items-center justify-between gap-2 text-sm font-semibold text-slate-900">
                                    Interview Copilot w/ Gemini 2.0 Flash
                                    <div className="inline-flex items-center gap-1 align-top">
                                        <input
                                            id="auto-pip"
                                            type="checkbox"
                                            className="h-4 w-4 text-sky-500 focus:ring-sky-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="auto-pip">Auto PIP</label>
                                    </div>
                                </div>
                                <div className="flex items-center mt-1">
                                    <div className="flex items-center rounded-full border border-slate-100 px-2.5 py-1 bg-[#D9F1CD]">
                                        <span className="relative me-2 flex h-2 w-2">
                                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#129F42]" />
                                        </span>
                                        <span className="text-xs font-medium text-[#129F42]">
                                            Ready
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-center overflow-y-hidden">
                        <div className="flex w-full flex-col items-center justify-center overflowscroll text-slate-500">
                            <h4 className="text-center text-sm font-medium">
                                The Interview Copilot™ is ready and waiting for the
                            </h4>
                            <h4 className="text-center text-sm font-medium">interviewer's questions.</h4>
                        </div>
                        <div
                            className="flex flex-1 flex-col gap-1 pl-4 lg:pl-0 lg:pr-1 overflow-y-scroll md:gap-0 md:px-0"
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModelResponseSection;
