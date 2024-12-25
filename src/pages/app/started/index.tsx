import React from "react";

import Layout from "../components/layout";
import { infoCards, steps, tutorials } from "./components/data";
import Icon from "../../../components/icon";
import StepCard from "./components/step-card";
import TutorialCard from "./components/tutorial-card";
import InfoCard from "./components/info-card";

const Started = () => {
    return (
        <Layout>
            <div className="relative flex flex-1 flex-col gap-3 overflow-auto p-4 pb-8 lg:gap-4 lg:p-6 lg:pb-6 md:max-h-screen">
                <div className="flex items-center">
                    <h1 className="text-left text-2xl sm:text-3xl font-semibold leading-8">Get the most out of Final Round AI</h1>
                </div>
                <div className="my-3 opacity-100 transition-all duration-200">
                    <h2 className="flex text-lg sm:text-xl pt-2 pb-4 font-semibold text-slate-900">
                        <span className="block flex-1">Start with the basics</span>
                    </h2>
                    <div className="flex flex-col lg:flex-row items-center bg-[linear-gradient(180deg,_#54aef3_0%,_#00d9ff_100%)] text-white p-6 rounded-lg">
                        {steps.map((step, index) => (
                            <React.Fragment key={index}>
                                <StepCard title={step.title} desc={step.desc} link={step.link} idx={step.idx} />
                                {index < steps.length - 1 && (
                                    <div className="text-white">
                                        <div className="hidden lg:block"><Icon icon="ArrowRight" /></div>
                                        <div className="lg:hidden block"><Icon icon="ArrowDown" /></div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className="py-3">
                    <h2 className="flex text-lg sm:text-xl font-semibold text-slate-900">Watch the Interview Copilot™ demo</h2>
                    <div className="mt-4 grid grid-rows-2 gap-4 md:grid-cols-2 md:grid-rows-1">
                        {tutorials.map((tutorial, index) => (
                            <TutorialCard
                                key={index}
                                idx={index}
                                link={tutorial.link}
                                title={tutorial.title}
                                imgSrc={tutorial.imgSrc}
                                altText={tutorial.altText}
                            />
                        ))}
                    </div>
                </div>
                <div className="my-3">
                    <h2 className="flex text-lg sm:text-xl font-semibold text-slate-900">
                        Get a leg up on the competition
                    </h2>
                    <div className="mt-2 grid auto-rows-min gap-4 rounded-md lg:grid-cols-3 md:grid-rows-1">
                        {infoCards.map((card, index) => (
                            <InfoCard
                                key={index}
                                title={card.title}
                                desc={card.desc}
                                buttonText={card.buttonText}
                                link={card.link}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Started;
