import React from "react";

import Icon from "../../../components/icon";
import CompareModal from "./components/compare-modal";

const LastStep = ({ onNext, onPrev }: { onNext: VoidFunction, onPrev: VoidFunction }) => {
    const [showCompareModal, setShowCompareModal] = React.useState(false)

    return (
        <div>
            <button onClick={onPrev} className="flex gap-2 items-center">
                <Icon icon="ArrowLeft" />
                <span>Back</span>
            </button>
            <div className="my-9">
                <div className="mb-2 text-sm font-medium text-slate-900">4/4</div>
                <p className="text-2xl font-semibold leading-8 text-slate-900">Last step</p>
                <div className="mt-2 text-sm font-medium leading-5 text-slate-500">
                    Select subscription to use Interview Copilot™ in real time.
                </div>
                <div>
                    <div className="flex flex-col items-center justify-center pt-4">
                        <div className="grid gap-2 w-full outline-none" >
                            <div className="flex items-start rounded-lg border p-4 border-sky-500">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full border border-primary dark:border-slate-300">
                                                <span className={`h-2.5 w-2.5 rounded-full bg-transparent !bg-primary`} />
                                            </div>
                                            <div className="ml-3 text-lg font-semibold text-design-orange">Essential</div>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-sm font-medium leading-[28px] text-slate-900">$</span>
                                            <span className="text-lg font-semibold text-slate-900">148</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 pl-7">
                                        <div className="text-sm text-slate-500">AI copilot for 1-4 interviews per month. Experience the AI magic of Interview Copilot™.</div>
                                        <div className="max-w-24 text-right text-xs font-medium text-slate-400">Per Month <br />Billed Monthly</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start rounded-lg border p-4 shadow-6">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full border border-primary dark:border-slate-300" />
                                            <div className="ml-3 text-lg font-semibold text-slate-900">Pro</div>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-sm font-medium leading-[28px] text-slate-900">$</span>
                                            <span className="text-lg font-semibold text-slate-900">96</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 pl-7">
                                        <div className="text-sm text-slate-500">3-month copilot for unlimited interviews—full support to land your dream job.</div>
                                        <div className="max-w-24 text-right text-xs font-medium text-slate-400">Per Month <br />Billed Quarterly</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setShowCompareModal(true)} className="mt-4 flex w-full items-center justify-center rounded-md bg-slate-100 p-1 font-medium text-slate-500 py-2">
                            Compare plans
                            <Icon icon="ArrowUpRight" />
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <button onClick={onNext} className="bg-slate-900 text-white rounded-md text-sm font-medium px-4 py-3 mb-3 w-full" >Next Step</button>
                <button className="text-sm px-4 py-2 w-full hover:bg-slate-100 hover:text-slate-900 font-semibold text-slate-400">Skip for 5 Minute Step</button>
            </div>
            {showCompareModal && (<CompareModal onClose={() => setShowCompareModal(false)} showModal={showCompareModal} />)}
        </div>
    )
}

export default LastStep