import React from "react"

import Icon from "../../../components/icon"
import Layout from "../components/layout"
import { Select } from "../../../components/select"
import MockInterviewModal from "../components/mock-interview-modal"

const MockInterview = () => {
    const [showMockInterviewModal, setShowMockInterviewModal] = React.useState(false)
    const [status, setStatus] = React.useState({
        status: "All Status"
    })
    const [showStatusDropdown, setShowStatusDropdown] = React.useState(false)
    const onHandleStatus = (v: string, obk: string) => {
        setStatus({ ...status, [obk]: v });
        setShowStatusDropdown(false)
    }

    const showCreateDropdownRef = React.useRef<HTMLDivElement | null>(null);
    const showStatusDropdownRef = React.useRef<HTMLDivElement | null>(null);

    const onShowStatusDropdown = (event: MouseEvent) => {
        if (showStatusDropdownRef.current && !showStatusDropdownRef.current.contains(event.target as Node)) {
            setShowStatusDropdown(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("mousedown", onShowStatusDropdown);
        return () => {
            document.removeEventListener("mousedown", onShowStatusDropdown);
        };
    }, []);

    return (
        <Layout>
            <div className="w-full relative flex flex-1 flex-col gap-3 p-4 pb-16 lg:gap-4 lg:p-6 lg:pb-6 md:max-h-screen">
                <div>
                    <h1 className="text-left text-2xl font-semibold leading-8">
                        Mock Interview
                    </h1>
                    <div className="mt-1 max-w-[640px] text-md font-medium leading-6 text-slate-700">
                        Prepare for the interview in advance and get yourself in the best possible state.
                    </div>
                </div>
                <div className="mb-4 flex-col justify-between gap-4 sm:flex md:flex-row">
                    <div className="hidden gap-4 md:flex">
                        <button onClick={() => setShowMockInterviewModal(!showMockInterviewModal)} className="whitespace-nowrap flex items-center gap-2 justify-center gap-y-3 rounded-md bg-sky-500 p-3 text-sm font-medium text-white hover:opacity-80">
                            <Icon icon="MockInterview" />
                            <span className="text-sm font-medium">
                                Start Mock Interview
                            </span>
                        </button>
                    </div>
                    <div className="hidden gap-4 md:flex">
                        <Select onDropdown={() => setShowStatusDropdown(true)} showDropdown={showStatusDropdown} value={status.status} obk="status" onHandle={onHandleStatus} data={["Ready to Launch", "In Progress", "Complete"]} dropdownRef={showStatusDropdownRef} />
                    </div>
                    <div className="flex flex-1 gap-2 md:hidden">
                        <button onClick={() => setShowMockInterviewModal(true)} className="items-center justify-center whitespace-nowrap rounded-md text-md font-medium bg h-[50px] flex-1 flex-col !bg-design-orange px-4 py-2.5">
                            <Icon icon="New" className="text-white" />
                            <span className="text-lg font-medium text-slate-50">Mock Interview</span>
                        </button>
                    </div>
                    <div className="-mb-6 mt-4 block border-b border-slate-100 md:hidden" />
                </div>
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm hidden md:table">
                        <thead className="[&_tr]:border-0">
                            <tr className="border-b transition-colors hover:bg-sky-100/50 h-12 bg-slate-50">
                                <th className="h-10 px-2 text-left align-middle w-3/12 font-semibold text-slate-900">
                                    Interview
                                </th>
                                <th className="h-10 px-2 text-left align-middle hidden w-2/12 font-semibold text-slate-900 sm:table-cell">
                                    Status
                                </th>
                                <th className="h-10 px-2 text-left align-middle hidden w-3/12 cursor-pointer font-semibold text-slate-900 md:table-cell">
                                    Appointment
                                </th>
                                <th className="h-10 px-2 text-left align-middle w-3/12 font-semibold text-slate-900">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            <tr className="border-b transition-colors hover:bg-sky-100/50">
                                <td className="p-2 align-middle">
                                    <span className="inline-block max-w-64 truncate">
                                        <div className="font-semibold">Job Readiness Assessment</div>
                                        <div className="text-[11px]">Management Consultant</div>
                                    </span>
                                </td>
                                <td className="p-2 align-middle hidden sm:table-cell">
                                    <span className="inline-flex items-center rounded-xl border border-slate-100 bg-white px-2.5 py-1.5">
                                        <span className="inline-block w-2 h-2 rounded-full mr-2 bg-slate-500" />
                                        <span className="text-xs text-slate-700">Completed</span>
                                    </span>
                                </td>
                                <td className="p-2 align-middle hidden md:table-cell">
                                    N/A
                                </td>
                                <td className="p-2 align-middle flex items-center gap-3">
                                    <div>/</div>
                                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium border h-9 rounded-md px-3">
                                        <Icon icon="ExplorePath" />
                                        Explore Learning Path
                                    </button>
                                </td>
                            </tr>
                            <tr className="border-b transition-colors hover:bg-sky-100/50">
                                <td className="p-2 align-middle">
                                    <span className="inline-block max-w-64 truncate">
                                        <div className="font-semibold">Job Readiness Assessment</div>
                                        <div className="text-[11px]">IT  Consultant</div>
                                    </span>
                                </td>
                                <td className="p-2 align-middle hidden sm:table-cell">
                                    <span className="inline-flex items-center rounded-xl border border-slate-100 bg-white px-2.5 py-1.5">
                                        <span className="inline-block w-2 h-2 rounded-full mr-2 bg-slate-500" />
                                        <span className="text-xs text-slate-700">Completed</span>
                                    </span>
                                </td>
                                <td className="p-2 align-middle hidden md:table-cell">
                                    N/A
                                </td>
                                <td className="p-2 align-middle flex items-center gap-3">
                                    <div>/</div>
                                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium border h-9 rounded-md px-3">
                                        <Icon icon="ExplorePath" />
                                        Explore Learning Path
                                    </button>
                                </td>
                            </tr>
                            <tr className="border-b transition-colors hover:bg-sky-100/50">
                                <td className="p-2 align-middle">
                                    <span className="inline-block max-w-64 truncate">
                                        <div className="font-semibold">Job Readiness Assessment</div>
                                        <div className="text-[11px]">IT Consultant</div>
                                    </span>
                                </td>
                                <td className="p-2 align-middle hidden sm:table-cell">
                                    <span className="inline-flex items-center rounded-xl border border-slate-100 bg-white px-2.5 py-1.5">
                                        <span className="inline-block w-2 h-2 rounded-full mr-2 bg-slate-500" />
                                        <span className="text-xs text-slate-700">Completed</span>
                                    </span>
                                </td>
                                <td className="p-2 align-middle hidden md:table-cell">
                                    N/A
                                </td>
                                <td className="p-2 align-middle flex items-center gap-3">
                                    <div>/</div>
                                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium border h-9 rounded-md px-3">
                                        <Icon icon="ExplorePath" />
                                        Explore Learning Path
                                    </button>
                                </td>
                            </tr>
                            <tr className="border-b transition-colors hover:bg-sky-100/50">
                                <td className="p-2 align-middle">
                                    <span className="inline-block max-w-64 truncate" data-state="closed">
                                        Web Developer
                                    </span>
                                </td>
                                <td className="p-2 align-middle hidden sm:table-cell">
                                    <span className="inline-flex items-center rounded-xl border border-slate-100 bg-white px-2.5 py-1.5">
                                        <span className="inline-block w-2 h-2 rounded-full mr-2 bg-slate-500" />
                                        <span className="text-xs text-slate-700">Completed</span>
                                    </span>
                                </td>
                                <td className="p-2 align-middle hidden md:table-cell">
                                    N/A
                                </td>
                                <td className="p-2 align-middle flex items-center gap-3">
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
                        <div className="font-base text-slate-400">Free Trial Interview</div>
                        <div className="font-base text-slate-400">09 Jan, 2025</div>
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
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium box-content h-8 w-8 px-0 py-0" >
                            <Icon icon="ArrowLeft" />
                        </button>
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium box-content h-8 w-8 px-0 py-0" >
                            <Icon icon="ChevronRight" />
                        </button>
                    </div>
                </div>
            </div>
            {showMockInterviewModal && (<MockInterviewModal isOpen={showMockInterviewModal} onClose={() => setShowMockInterviewModal(false)} />)}
        </Layout>
    )
}

export default MockInterview