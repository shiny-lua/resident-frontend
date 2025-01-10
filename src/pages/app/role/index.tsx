import React from "react"
import Icon from "../../../components/icon"
import Layout from "../components/layout"
import PrepareModal from "../components/prepare-modal"

const Role = () => {
    const [showRoleModal, setShowRoleModal] = React.useState(false)

    return (
        <Layout>
            <div className="relative flex flex-1 flex-col gap-3 overflow-auto p-4 lg:gap-4 lg:p-6 lg:pb-6 md:max-h-screen pb-0">
                <h1 className="text-left text-3xl font-semibold leading-8">Interview Preparation Hub</h1>
                <div className="mb-4 text-md font-medium text-slate-700">Link your resume and create a role, generate interview questions, and prepare in advance.</div>
                <div className="hidden gap-4 sm:flex">
                    <button onClick={() => setShowRoleModal(true)} className="flex items-center justify-center whitespace-nowrap rounded-md gap-2 text-md font-medium text-white hover:bg-sky-500 bg-sky-400 h-10 px-4 py-2"><Icon icon="New" />Prepare</button>
                </div>
                <div className="h-min">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm hidden md:table">
                            <thead>
                                <tr className="border-b transition-colors hover:bg-sky-200/50 h-12 bg-slate-50">
                                    <th className="h-10 px-2 text-left align-middle font-semibold text-slate-900">Resume</th>
                                    <th className="h-10 px-2 text-left align-middle font-semibold text-slate-900">Position</th>
                                    <th className="h-10 px-2 text-left align-middle font-semibold text-slate-900">Company</th>
                                    <th className="h-10 px-2 text-left align-middle cursor-pointer font-semibold text-slate-900">Company Detail</th>
                                    <th className="h-10 px-2 text-left align-middle cursor-pointer font-semibold text-slate-900">Job Description</th>
                                    <th className="h-10 px-2 text-left align-middle font-semibold text-slate-900">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b transition-colors hover:bg-sky-200/50">
                                    <td className="p-2 align-middle">
                                        <button className="inline-flex items-center gap-1">
                                            <div className="w-[140px] overflow-hidden overflow-ellipsis whitespace-nowrap text-left">
                                                <a className="hover:text-sky-500">proposal.docx</a>
                                            </div>
                                        </button>
                                    </td>
                                    <td className="p-2 align-middle">
                                        <button className="inline-flex items-center gap-1">
                                            <div className="w-[140px] overflow-hidden overflow-ellipsis whitespace-nowrap text-left">sdf</div>
                                        </button>
                                    </td>
                                    <td className="p-2 align-middle">
                                        <button className="inline-flex items-center gap-1">
                                            <div className="w-[140px] overflow-hidden overflow-ellipsis whitespace-nowrap text-left">sdf</div>
                                        </button>
                                    </td>
                                    <td className="p-2 align-middle">
                                        <button className="inline-flex items-center gap-1">
                                            <div className="w-[140px] overflow-hidden overflow-ellipsis whitespace-nowrap text-left">
                                                sdfsdf
                                            </div>
                                        </button>
                                    </td>
                                    <td className="p-2 align-middle overflow-hidden overflow-ellipsis whitespace-nowrap">
                                        <button className="inline-flex items-center gap-1">
                                            <div className="w-[140px] overflow-hidden overflow-ellipsis whitespace-nowrap text-left">asd</div>
                                        </button>
                                    </td>
                                    <td className="p-2 align-middle flex items-center gap-3">
                                        <button className="flex gap-1 items-center justify-center whitespace-nowrap text-sm font-medium border rounded-md px-3 h-8">
                                            <Icon icon="MagicEdit" />
                                            Edit QA Pairs
                                        </button>
                                        <button className="flex gap-1 items-center justify-center whitespace-nowrap text-sm font-medium border rounded-md px-3 h-8">
                                            <Icon icon="Edit" />
                                            Edit Role
                                        </button>
                                        <button className="flex gap-1 items-center justify-center whitespace-nowrap text-sm font-medium border rounded-md px-3 h-8">
                                            <Icon icon="Remove" />
                                        </button>
                                    </td>
                                </tr>
                                <tr className="border-b transition-colors hover:bg-sky-200/50 data-[state=selected]:bg-sky-200">
                                    <td className="p-2 align-middle">
                                        <div className="w-[140px] overflow-hidden overflow-ellipsis whitespace-nowrap text-left">
                                            <span className="select-none opacity-60">Not selected yet</span>
                                        </div>
                                    </td>
                                    <td className="p-2 align-middle">
                                        <button className="inline-flex items-center gap-1">
                                            <div className="w-[140px] overflow-hidden overflow-ellipsis whitespace-nowrap text-left">
                                                Web Developer
                                            </div>
                                        </button>
                                    </td>
                                    <td className="p-2 align-middle">
                                        <button className="inline-flex items-center gap-1">
                                            <div className="w-[140px] overflow-hidden overflow-ellipsis whitespace-nowrap text-left">
                                                Swiss Re AG
                                            </div>
                                        </button>
                                    </td>
                                    <td className="p-2 align-middle">
                                        <button className="inline-flex items-center gap-1">
                                            <div className="w-[140px] overflow-hidden overflow-ellipsis whitespace-nowrap text-left">Swiss Re AG</div>
                                        </button>
                                    </td>
                                    <td className="p-2 align-middle overflow-hidden overflow-ellipsis whitespace-nowrap">
                                        <button className="inline-flex items-center gap-1">
                                            <div className="w-[140px] overflow-hidden overflow-ellipsis whitespace-nowrap text-left">
                                                Web Developer
                                            </div>
                                        </button>
                                    </td>
                                    <td className="p-2 align-middle flex items-center gap-3">
                                        <button className="flex gap-1 items-center justify-center whitespace-nowrap text-sm font-medium border rounded-md px-3 h-8">
                                            <Icon icon="MagicEdit" />
                                            Edit QA Pairs
                                        </button>
                                        <button className="flex gap-1 items-center justify-center whitespace-nowrap text-sm font-medium border rounded-md px-3 h-8">
                                            <Icon icon="Edit" />
                                            Edit Role
                                        </button>
                                        <button className="flex gap-1 items-center justify-center whitespace-nowrap text-sm font-medium border rounded-md px-3 h-8">
                                            <Icon icon="Remove" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="h-min">
                        <div className="rounded-xl border bg-card text-card-foreground mb-4 shadow-none md:hidden">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h3 className="font-semibold leading-none tracking-tight break-words">
                                    sdf
                                </h3>
                                <p className="text-sm text-muted-foreground break-words">sdf</p>
                            </div>
                            <div className="flex items-center rounded-b-xl bg-slate-50 p-4">
                                <button className="flex items-center gap-2 justify-center whitespace-nowrap text-sm font-medium border h-9 rounded-md px-3">
                                    <Icon icon="Edit" />
                                    Edit
                                </button>
                            </div>

                        </div>
                        <div className="rounded-xl border bg-card text-card-foreground mb-4 shadow-none md:hidden">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h3 className="font-semibold leading-none tracking-tight break-words">Web Developer</h3>
                                <p className="text-sm text-muted-foreground break-words">Swiss Re AG</p>
                            </div>
                            <div className="flex items-center rounded-b-xl bg-slate-50 p-4">
                                <button className="flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium border h-9 rounded-md px-3">
                                    <Icon icon="Edit" />
                                    Edit
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="my-4 flex h-8 items-center justify-center gap-6">
                        <div className="flex items-center space-x-2 antialiased">
                            <h4>
                                <span className="text-xs font-medium text-[#6B7280]"> Page </span>
                                <span className="text-xs font-medium text-slate-900">1/1</span>
                            </h4>
                            <h4>
                                <span className="text-xs font-medium text-[#6B7280]"> Total </span>
                                <span className="text-xs font-medium text-slate-900">2</span>
                            </h4>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium border border-slate-300 box-content h-8 w-8 px-0 py-0" >
                                <Icon icon="ArrowLeft" />
                            </button>
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium border border-slate-300 box-content h-8 w-8 px-0 py-0" >
                                <Icon icon="ChevronRight" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showRoleModal && <PrepareModal isOpen={showRoleModal} onClose={() => setShowRoleModal(false)} />}
        </Layout>
    )
}

export default Role