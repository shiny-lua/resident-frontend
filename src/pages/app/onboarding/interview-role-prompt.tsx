import React from "react";
import Icon from "../../../components/icon";

const companies = [
    "3M Company",
    "A.P. Moller-Maersk Group",
    "ABB Ltd.",
    "ACC Limited",
    "Adani Enterprises"
]

const roles = [
    "Accountant",
    "Administrative Assistant",
    "Advertising Manager",
    "Architect",
    "Art Director",
];

const InterviewRolePrompt = ({ onNext, onPrev }: { onNext: VoidFunction, onPrev: VoidFunction }) => {

    const companyRef = React.useRef(null);
    const roleRef = React.useRef(null);

    const [status, setStatus] = React.useState({
        company: "", role: ""
    })
    const [isCompanyVisible, setIsCompanyVisible] = React.useState(false);
    const [isRoleVisible, setIsRoleVisible] = React.useState(false);

    return (
        <div>
            <button onClick={onPrev} className="flex gap-2 items-center">
                <Icon icon="ArrowLeft" />
                <span>Back</span>
            </button>
            <div className="my-9">
                <div className="mb-2 text-sm font-medium text-slate-900">1/4</div>
                <p className="text-2xl font-semibold leading-8 text-slate-900">
                    Tell us about the role you're interviewing for
                </p>
                <div>
                    <div className="mt-4">
                        <div className="mb-2 text-md font-medium leading-5 text-slate-900">
                            Your desired company
                        </div>
                        <div className="group relative">
                            <input value={status.company} onChange={e => setStatus({ ...status, company: e.target.value })} onClick={() => setIsCompanyVisible(true)} onBlur={() => setIsCompanyVisible(false)} className="bg-white w-full rounded-md outline-none focus:border-primary border p-3 " type="text" name="" id="email" />
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 -rotate-90 transform cursor-pointer transition-all">
                                <Icon icon="ChevronRight" />
                            </span>
                            <ul
                                ref={companyRef}
                                className={`absolute z-10 w-full rounded-b-md border border-slate-400 shadow-lg bg-white transition-all ${isCompanyVisible ? "opacity-100 max-h-60 visible" : "opacity-0 max-h-0 invisible"
                                    }`}
                                style={{
                                    overflow: isCompanyVisible ? "auto" : "hidden",
                                    transition: "opacity 0.2s, max-height 0.2s",
                                }}
                            >
                                <li className="p-2 text-sm font-semibold text-slate-600">Suggestions</li>
                                {companies.map((i, k) => (
                                    <li onClick={() => setStatus({...status, company: i})} key={k} className="mx-1 cursor-pointer rounded-md p-2 transition-all hover:bg-gray-100" >{i}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="mb-2 text-md font-medium leading-5 text-slate-900">
                            Your desired role
                        </div>
                        <div className="group relative">
                            <input value={status.role} onChange={e => setStatus({ ...status, role: e.target.value })} onClick={() => setIsRoleVisible(true)} onBlur={() => setIsRoleVisible(false)} className="bg-white w-full rounded-md outline-none focus:border-primary border p-3 " type="text" name="" id="email" />
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 -rotate-90 transform cursor-pointer transition-all">
                                <Icon icon="ChevronRight" />
                            </span>
                            <ul
                                ref={roleRef}
                                className={`absolute z-10 w-full rounded-b-md border border-slate-400 shadow-lg bg-white transition-all ${isRoleVisible ? "opacity-100 max-h-60 visible" : "opacity-0 max-h-0 invisible"
                                    }`}
                                style={{
                                    overflow: isRoleVisible ? "auto" : "hidden",
                                    transition: "opacity 0.2s, max-height 0.2s",
                                }}
                            >
                                <li className="p-2 text-sm font-semibold text-slate-600">Suggestions</li>
                                {roles.map((i, k) => (
                                    <li key={k} onClick={() => setStatus({...status, role: i})} className="mx-1 cursor-pointer rounded-md p-2 transition-all hover:bg-gray-100" >{i}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button
                    onClick={onNext}
                    className="bg-slate-900 text-white rounded-md text-sm font-medium px-4 py-3 mb-3 w-full"
                >
                    Next Step
                </button>
                <button className="text-sm px-4 py-2 w-full hover:bg-slate-100 hover:text-slate-900 font-semibold text-slate-400">
                    Skip This Step
                </button>
            </div>

        </div>
    )
}

export default InterviewRolePrompt;