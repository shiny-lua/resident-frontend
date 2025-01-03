import Icon from "../../../components/icon";
import { faqs } from "./data.d";
import { useState } from "react";

const Accordion = ({ item, isActive, toggle }: { item: { question: string, answer: string }; isActive: boolean; toggle: () => void }) => {
    return (
        <div className="w-full bg-cyan-50 cursor-pointer rounded-2xl lg:rounded-[2rem] bg-white-background p-2 transition-all duration-300 pb-2">
            <div
                className={`flex flex-col p-8 text-left transition-all duration-300 hover:bg-cyan-200 rounded-2xl lg:rounded-3xl ${isActive ? "bg-cyan-200" : "bg-cyan-50"}`}
                onClick={toggle}
            >
                <div className="text-xl flex w-full flex-row items-center justify-between">
                    {item.question}
                    <div className={`${isActive ? "text-cyan-500" : "text-black"}`}>
                        <Icon icon={isActive ? "Minus" : "Plus"} />
                    </div>
                </div>
                <div
                    className={`overflow-hidden text-xl text-gray-500 transition-all duration-300 ${isActive ? "max-h-screen mt-4" : "max-h-0 mt-0"}`}
                >
                    <div>{item.answer}</div>
                </div>
            </div>
        </div>
    );
};

const Question = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="flex flex-col items-center gap-20 pb-40 pt-6 px-3 sm:px-5">
            <div className="flex flex-col items-center lg:gap-16 gap-12 text-center relative z-10">
                <p className="text-xl text-gray-400">Questions &amp; Answers</p>
                <h2 className="text-4xl font-albra max-w-[46.9375rem]">
                    If you still have questions. Here are the answers
                </h2>
            </div>
            <div className="flex w-full max-w-[64.3rem] flex-col gap-2">
                {faqs.map((item, index) => (
                    <Accordion
                        key={index}
                        item={item}
                        isActive={activeIndex === index}
                        toggle={() => toggleAccordion(index)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Question;
