import React from "react";
import { Link } from "react-router-dom";

import Icon from "../../../components/icon"
import Layout from "../components/layout"
import { essentialItems, proItems } from "../onboarding/components/compare-modal-data"
import { restApi } from "../../../context/restApi";
import Loader from "../../../components/loader";

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

const Subscription = () => {

    const [isLoading, setIsLoading] = React.useState(false);

    const onSubscribe = async (amount: number) => {
        if (isLoading) return;
        setIsLoading(true);
        const res = await restApi.postRequest('create-payment-intent', { amount });
        console.log(res)
        if (res.status === 200) {
            window.location.href = res.data.data;
        }
        setIsLoading(false);
    }

    return (
        <Layout>
            <div className="relative flex flex-1 flex-col gap-3 p-4 lg:gap-4 lg:p-6 lg:pb-6 md:max-h-screen pb-0">
                <div className="text-left text-3xl font-semibold leading-8">Upgrade Now</div>
                <div className="mb-4 text-md font-medium text-slate-700">You are on the Free Trial plan</div>
                <div className="">
                    <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-8">
                            {/* Essential Plan */}
                            <div className="relative flex w-full max-w-[380px] flex-col rounded-lg border border-sky-500 p-6 dt:basis-[45%] dtxl:basis-[30%]">
                                <h3 className="text-xl font-semibold leading-7">Essential</h3>
                                <div className="mt-2 text-sm text-slate-400">AI copilot for 1-4 interviews per month. Experience the AI magic of Interview Copilot™.</div>
                                <div className="mt-6">
                                    <div className="relative flex w-full flex-row items-center justify-start tracking-tight text-gray-900">
                                        <span><span className="text-sm">$</span> <span className="text-5xl font-extrabold">96</span></span>
                                        <span className="ml-3 flex flex-col items-start justify-start text-sm"><span>Per Month</span><span>Billed Monthly</span></span>
                                    </div>
                                    <button onClick={() => onSubscribe(96)} className="mt-6 flex gap-2 items-center justify-center rounded-md font-medium bg-primary hover:bg-primary/90 h-10 py-2 w-full bg-gradient-to-r from-[#0090FF] to-[#00F7FF] text-white">
                                        {isLoading && <Loader />}
                                        <div>Subscribe</div>
                                    </button>
                                    <ul className="mt-4 space-y-4 border-t pt-6 text-sm">
                                        {essentialItems.map((item, index) => (
                                            <ListItem key={index} icon={item.icon} title={item.title} description={item.description} />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            {/* Pro Plan */}
                            <div className="relative hover:border-sky-500 flex w-full max-w-[380px] flex-col rounded-lg border border-slate-200 p-6 dt:basis-[45%] dtxl:basis-[30%]">
                                <h3 className="text-xl font-semibold leading-7">Pro</h3>
                                <div className="mt-2 text-sm text-slate-400">3-month copilot for unlimited interviews—full support to land your dream job.</div>
                                <div className="mt-6">
                                    <div className="relative flex w-full flex-row items-center justify-start tracking-tight text-gray-900">
                                        <span><span className="text-sm">$</span> <span className="text-5xl font-extrabold">148</span></span>
                                        <span className="ml-3 flex flex-col items-start justify-start text-sm"><span>Per Month</span><span>Billed Quarterly</span></span>
                                    </div>
                                    <button onClick={() => onSubscribe(148)} className="hover:bg-gradient-to-r from-[#0090FF] to-[#00F7FF] hover:text-white mt-6 flex gap-2 items-center justify-center rounded-md font-medium h-10 py-2 w-full border border-slate-300">
                                        {isLoading && <Loader />}
                                        <div>Subscribe</div>
                                    </button>
                                    <ul className="mt-4 space-y-4 border-t pt-6 text-sm">
                                        {proItems.map((item, index) => (
                                            <ListItem key={index} icon={item.icon} title={item.title} description={item.description} />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Subscription