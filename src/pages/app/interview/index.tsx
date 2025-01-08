import React from "react"
import { Link } from "react-router-dom"

import Icon from "../../../components/icon"
import Layout from "../components/layout"
import InterviewModal from "../components/interview-modal"
import { Select } from "../../../components/select"

const Interview = () => {
    const [showCreateDropdown, setShowCreateDropdown] = React.useState(false)
    const [showInterviewModal, setShowInterviewModal] = React.useState(false)
    const [status, setStatus] = React.useState({
        status: "All Status"
    })
    const [showStatusDropdown, setShowStatusDropdown] = React.useState(false)
    const onHandleStatus = (v: string, obk: string) => {
        setStatus({...status, [obk]: v});
        setShowStatusDropdown(false)
    }

    const showCreateDropdownRef = React.useRef<HTMLDivElement | null>(null);
    const showStatusDropdownRef = React.useRef<HTMLDivElement | null>(null);

    const onShowCreateDropdown = (event: MouseEvent) => {
        if (showCreateDropdownRef.current && !showCreateDropdownRef.current.contains(event.target as Node)) {
            setShowCreateDropdown(false);
        }
    };

    const onShowStatusDropdown = (event: MouseEvent) => {
        if (showStatusDropdownRef.current && !showStatusDropdownRef.current.contains(event.target as Node)) {
            setShowStatusDropdown(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("mousedown", onShowCreateDropdown);
        document.addEventListener("mousedown", onShowStatusDropdown);
        return () => {
            document.removeEventListener("mousedown", onShowCreateDropdown);
            document.removeEventListener("mousedown", onShowStatusDropdown);
        };
    }, []);

    return (
        <Layout>
            <div className="w-full relative flex flex-1 flex-col gap-3 p-4 pb-16 lg:gap-4 lg:p-6 lg:pb-6 md:max-h-screen">
                <div>
                    <h1 className="text-left text-2xl font-semibold leading-8">
                        Live Interview
                    </h1>
                    <div className="mt-1 max-w-[640px] text-md font-medium leading-6 text-slate-700">
                        Live Interview offers a variety of interview scenarios and provides
                        customized add-ons tailored to different industries.
                    </div>
                </div>
                <div className="mb-4 flex-col justify-between gap-4 sm:flex md:flex-row">
                    <div className="hidden gap-4 md:flex">
                        <div className="relative">
                            <button onClick={() => setShowCreateDropdown(!showCreateDropdown)} className="items-center whitespace-nowrap rounded-md text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50 text-slate-500 hover:bg-opacity-90 px-4 py-2 relative flex h-[50px] w-[160px] flex-col justify-between bg-slate-900 md:h-10 md:flex-row" >
                                <div className="flex flex-row text-white gap-2">
                                    <Icon icon="New" />
                                    Create
                                </div>
                                <Icon icon="ChevronDown" className='w-6 h-6 text-white' />
                                <span className="absolute -right-2 -top-5 inline-flex rounded-full p-0">
                                    <Icon icon="FreeTip" />
                                </span>
                            </button>
                            {showCreateDropdown &&
                                <div ref={showCreateDropdownRef} className={`absolute fade-in left-0 top-12 bg-white z-1 w-[218px] border rounded-xl shadow-4 py-4`}>
                                    <button onClick={() => setShowInterviewModal(true)} className="flex gap-3 w-full py-2 hover:bg-sky-100 px-4">
                                        <Icon icon="General" />
                                        <div>General</div>
                                    </button>
                                    <div className="border-t ">
                                        <div className="py-3 text-sm text-gray-500 px-4">Specialized Skills</div>
                                        <button className="flex gap-2 py-2 text-gray-400 w-full px-4">
                                            <Icon icon="CodingCopilot" />
                                            <div>Coding Copilot</div>
                                        </button>
                                        <button className="flex gap-4 py-2 text-gray-400 w-full px-4">
                                            <Icon icon="HireVue" />
                                            <div>HireVue</div>
                                        </button>
                                        <button onClick={() => setShowInterviewModal(true)} className="flex gap-4 py-2 w-full hover:bg-sky-100 px-4">
                                            <Icon icon="PhoneInterview" />
                                            <div>Phone Interview</div>
                                        </button>
                                    </div>
                                    <Link to="/app/subscription" className="mt-2 flex items-center justify-center rounded-md font-medium mx-4 bg-primary hover:bg-primary/90 h-10 py-2 w-[88%] bg-gradient-to-r from-[#0090FF] to-[#00F7FF] text-white">
                                        <Icon icon="Diamond" />
                                        Upgrade Now
                                    </Link>
                                </div>}
                        </div>
                        <button className="flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50 border border-slate-300 bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                            <Icon className="flex items-center w-5 h-5" icon="Setting" />
                            Setting
                        </button>
                    </div>
                    <div className="hidden gap-4 md:flex">
                        <Select onDropdown={() => setShowStatusDropdown(true)} showDropdown={showStatusDropdown} value={status.status} obk="status" onHandle={onHandleStatus} data={["Ready to Launch", "In Progress", "Complete"]} dropdownRef={showStatusDropdownRef} />
                    </div>
                    <div className="flex flex-1 gap-2 md:hidden">
                        <button onClick={() => setShowInterviewModal(true)} className="items-center justify-center whitespace-nowrap rounded-md text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 box-content flex h-[50px] flex-1 flex-col !bg-design-orange px-4 py-2.5">
                            <Icon icon="New" className="text-white" />
                            <span className="text-lg font-medium text-slate-50">Live Interview</span>
                        </button>
                    </div>
                    <div className="-mb-6 mt-4 block border-b border-slate-100 md:hidden" />
                </div>
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-md hidden md:table">
                        <thead className="[&_tr]:border-0">
                            <tr className="border-b transition-colors hover:bg-slate-500/50 data-[state=selected]:bg-slate-500 h-12 bg-slate-50">
                                <th className="h-10 px-2 text-left align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] w-3/12 font-semibold text-slate-900">Interview</th>
                                <th className="h-10 px-2 text-left align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] hidden w-2/12 font-semibold text-slate-900 sm:table-cell">Status</th>
                                <th className="h-10 px-2 text-left align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] hidden w-3/12 cursor-pointer font-semibold text-slate-900 md:table-cell">Appointment</th>
                                <th className="h-10 px-2 text-left align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] w-3/12 font-semibold text-slate-900">Action</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            <tr className="border-b transition-colors hover:bg-slate-500/50 data-[state=selected]:bg-slate-500">
                                <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                                    <span
                                        className="inline-block max-w-64 truncate"
                                        data-state="closed"
                                    >
                                        &lt;Empty Job Info&gt;
                                    </span>
                                </td>
                                <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] hidden sm:table-cell">
                                    <span className="inline-flex items-center rounded-xl border border-slate-100 bg-white px-2.5 py-1.5">
                                        <span className="inline-block w-2 h-2 rounded-full mr-2 bg-slate-500" />
                                        <span className="text-xs text-slate-700">Completed</span>
                                    </span>
                                </td>
                                <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] hidden md:table-cell">
                                    N/A
                                </td>
                                <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] flex items-center gap-3">
                                    <div>/</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col rounded-lg border border-slate-200 md:hidden">
                    <div className="p-4">
                        <div className="font-base truncate font-semibold text-slate-900">
                            &lt;Empty Job Info&gt;
                        </div>
                        <div className="font-base text-slate-400">Live Interview</div>
                        <div className="font-base text-slate-400">07 Jan, 2025</div>
                    </div>
                    <div className="align-items box-content rounded-b-lg bg-slate-50 p-2 hidden" />
                </div>
                <div className="my-4 flex h-8 items-center justify-center gap-6">
                    <div className="flex items-center space-x-2 antialiased">
                        <h4>
                            <span className="text-xs font-medium text-[#6B7280]"> Page </span>
                            <span className="text-xs font-medium text-slate-900">1/1</span>
                        </h4>
                        <h4>
                            <span className="text-xs font-medium text-[#6B7280]"> Total </span>
                            <span className="text-xs font-medium text-slate-900">1</span>
                        </h4>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50 border border-slate-300 bg-background hover:bg-accent hover:text-accent-foreground box-content h-8 w-8 px-0 py-0" >
                            <Icon icon="ArrowLeft" />
                        </button>
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50 border border-slate-300 bg-background hover:bg-accent hover:text-accent-foreground box-content h-8 w-8 px-0 py-0" >
                            <Icon icon="ChevronRight" />
                        </button>
                    </div>
                </div>
            </div>
            {showInterviewModal && (<InterviewModal isOpen={showInterviewModal} onClose={() => setShowInterviewModal(false)} />)}
        </Layout>
    )
}

export default Interview