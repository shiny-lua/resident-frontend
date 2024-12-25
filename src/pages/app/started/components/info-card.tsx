import React from "react";
import { Link } from "react-router-dom";

const InfoCard = ({ title, desc, buttonText, link }: { title: string; desc: string; buttonText: string; link: string }) => {
    return (
        <div className="border flex-1 rounded-md text-slate-700 subpixel-antialiased shadow-none">
            <div className="flex flex-col space-y-1.5 p-6 px-6 py-4 pb-3 sm:py-6 sm:pb-3">
                <h3 className="tracking-tight flex flex-row items-center justify-center text-lg font-semibold leading-6">
                    <span className="mr-2 flex-1">{title}</span>
                </h3>
            </div>
            <div className="p-6 px-6 py-4 pt-0 sm:py-6 sm:pt-0">
                <p className="text-md font-normal leading-5 text-slate-500">{desc}</p>
                <div className="inline-flex items-center justify-center rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 word-break mt-5 whitespace-break-spaces font-semibold">
                    <Link to={link}>{buttonText}</Link>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;