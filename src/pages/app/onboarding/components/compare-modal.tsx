import React from "react";
import Modal from "../../../../components/modal";
import Icon from "../../../../components/icon";
import { essentialItems, proItems } from "./compare-modal-data";

const ListItem = ({ icon, title, description }: { icon: string, title: string, description?: string }) => (
    <li className="flex items-center justify-between">
        <div className="flex items-center justify-center">
            <div className="flex w-6 items-center">
                {icon === "Check" ? <div className="text-green-600"><Icon icon={icon} /></div> : <Icon className="text-danger" icon={icon} />}
            </div>
            <div className="ml-2 flex flex-1 flex-col">
                <h5 className="flex items-center text-lg text-slate-700">{title}</h5>
                {description && <p className="text-xs">{description}</p>}
            </div>
        </div>
    </li>
);

const CompareModal = ({ showModal, onClose }: { showModal: boolean, onClose: VoidFunction }) => {

    return (
        <Modal>
            <div className="fixed bg-white left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg max-h-dvh max-w-[calc(100vw-24px)] rounded-md p-0 md:w-max md:max-w-max" style={{ pointerEvents: "auto" }}>
                <h2 className="text-lg font-semibold leading-none tracking-tight flex flex-row items-center p-4">
                    <span className="text-lg">Compare Plans</span>
                </h2>
                <div className="max-h-[100px] overflow-auto" style={{ minHeight: "calc(-125px + 100vh)" }}>
                    <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap-reverse justify-center gap-x-6 gap-y-8">
                            {/* Essential Plan */}
                            <div className="relative flex w-full max-w-[380px] flex-col rounded-lg border border-slate-200 p-6 dt:basis-[45%] dtxl:basis-[30%]">
                                <h3 className="text-xl font-semibold leading-7">Essential</h3>
                                <div className="mt-2 text-sm text-slate-400">AI copilot for 1-4 interviews per month. Experience the AI magic of Interview Copilot™.</div>
                                <div className="mt-6">
                                    <div className="relative flex w-full flex-row items-center justify-start tracking-tight text-gray-900">
                                        <span><span className="text-sm">$</span> <span className="text-5xl font-extrabold">148</span></span>
                                        <span className="ml-3 flex flex-col items-start justify-start text-sm"><span>Per Month</span><span>Billed Monthly</span></span>
                                    </div>
                                    <ul className="mt-4 space-y-4 border-t pt-6 text-sm">
                                        {essentialItems.map((item, index) => (
                                            <ListItem key={index} icon={item.icon} title={item.title} description={item.description} />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            {/* Pro Plan */}
                            <div className="relative flex w-full max-w-[380px] flex-col rounded-lg border border-slate-200 p-6 dt:basis-[45%] dtxl:basis-[30%]">
                                <h3 className="text-xl font-semibold leading-7">Pro</h3>
                                <div className="mt-2 text-sm text-slate-400">3-month copilot for unlimited interviews—full support to land your dream job.</div>
                                <div className="mt-6">
                                    <div className="relative flex w-full flex-row items-center justify-start tracking-tight text-gray-900">
                                        <span><span className="text-sm">$</span> <span className="text-5xl font-extrabold">96</span></span>
                                        <span className="ml-3 flex flex-col items-start justify-start text-sm"><span>Per Month</span><span>Billed Quarterly</span></span>
                                    </div>
                                    <ul className="mt-4 space-y-4 border-t pt-6 text-sm">
                                        {proItems.map((item, index) => (
                                            <ListItem key={index} icon={item.icon} title={item.title} description={item.description} />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center my-6 bg-slate-50 py-4 text-center text-slate-700">
                            <Icon icon="Star" />
                            <span className="px-2">Satisfaction Guarantee</span>
                            <Icon icon="Star" />
                        </div>
                    </div>
                </div>
                <button onClick={onClose} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <Icon icon="Close" />
                </button>
            </div>
        </Modal>
    )
}

export default CompareModal;
