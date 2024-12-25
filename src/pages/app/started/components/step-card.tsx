import React from "react";
import { Link } from "react-router-dom";

const StepCard = ({ link, idx, title, desc }: { link: string; idx: number; title: string; desc: string }) => {
    return (
        <div className="border h-full w-full flex-1 rounded-md border-none bg-white text-white subpixel-antialiased shadow-none">
            <Link className="block" to={link}>
                <div className="flex flex-col space-y-1.5 p-6 px-3 pb-2 pt-3">
                    <h3 className="tracking-tight flex flex-row items-center justify-center text-lg font-semibold leading-6 text-slate-900">
                        <span className="mr-2 h-7 w-7 rounded-3xl bg-gradient-to-r from-[#3CC8F2] to-[#8FE0F9] text-center text-md font-medium leading-7 text-white">{idx}</span>
                        <span className="flex-1">{title}</span>
                    </h3>
                </div>
                <p className="p-4 pt-0 font-medium text-slate-600">{desc}</p>
            </Link>
        </div>
    );
};

export default StepCard;