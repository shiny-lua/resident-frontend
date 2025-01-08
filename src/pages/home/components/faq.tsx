import Icon from "../../../components/icon";

import { useState } from "react";

const Item = ({ i, isOpen, toggleOpen }: { i: { question: string, answer: string }, isOpen: boolean, toggleOpen: () => void }) => {
    return (
        <div onClick={toggleOpen} className="w-full max-w-[962px] cursor-pointer rounded-[16px] border border-gray-300 bg-white transition-all duration-300">
            <div className="flex flex-col p-6 text-left transition-all duration-500">
                <div className={`flex w-full flex-row text-xl items-center justify-between ${isOpen ? "text-sky-500" : "text-black"}`} >
                    {i.question}
                    <Icon className="h-6 w-6" icon={isOpen ? "ChevronUp" : "ChevronDown"} />
                </div>
                <div
                    className={`overflow-hidden text-gray-700 text-lg transition-all duration-300 ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}
                    style={{ marginTop: 12 }}
                >
                    <div>{i.answer}</div>
                </div>
            </div>
        </div>
    );
};

const Faq = ({title, desc, data}: {title: string, desc?: string, data: any}) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null); 

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index); 
    };

    return (
        <section className="flex flex-col items-center gap-20 pb-40 pt-6 px-4 sm:px-5">
            <div className="text-center md:pt-[200px] px-3 pt-[100px]">
                <div className="mx-auto max-w-[983px] font-[Albra] text-[32px] leading-none tracking-tight md:text-5xl md:leading-[48px]">
                    {title}
                </div>
                <code className="text-slate-500 text-lg mt-6">{desc}</code>
            </div>
            <div className="flex w-full max-w-[962px] flex-col gap-4">
                {data.map((i: any, k: number) => (
                    <Item
                        key={k}
                        i={i}
                        isOpen={openIndex === k}
                        toggleOpen={() => toggleAccordion(k)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Faq;
