import React from "react";

const Card = ({ title, desc, subscribe, onNext }: { title: string, desc: string, subscribe: string, onNext:VoidFunction }) => {
    return (
        <div onClick={onNext} className="group cursor-pointer rounded-md border border-slate-200 bg-white p-6 shadow-4 md:shadow-none transition-all duration-300 mb-3 md:hover:shadow-4">
            <div className="mb-3 flex justify-between">
                <p className="text-xl font-semibold leading-5 text-slate-700 transition-colors duration-300 group-hover:text-brand">{title}</p>
                <button className={`rounded-full ${subscribe === "Free" ? "border border-slate-200 text-black" : "bg-orange-400 text-white text-sm"} px-3 py-1`}>{subscribe}</button>
            </div>
            <div className="text-md font-medium leading-5 text-slate-400">{desc}</div>
            <div className="mt-4 h-10 overflow-hidden transition-all duration-300 ease-out md:h-0 md:group-hover:h-10">
                <button className="whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 hover:text-accent-foreground px-4 h-10 overflow-hidden py-0 transition-all duration-300 ease-out md:h-0 border-slate-200 hover:border-sky-100 md:group-hover:h-10 md:group-hover:border md:group-hover:border-slate-200 md:group-hover:py-[10px]">Start here</button>
            </div>
        </div>
    )
}

export default Card