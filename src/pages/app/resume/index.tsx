import React from "react";
import Layout from "../components/layout";
import Icon from "../../../components/icon";
import UploadModal from "../components/upload-modal";
import { Link } from "react-router-dom";
import LinkedinProfileModal from "../components/linkedin-profile-modal";

const Resume = () => {
    const [showUploadModal, setShowUploadModal] = React.useState(false)
    const [showLinkedinProfileModal, setShowLinkedinProfileModal] = React.useState(false)

    return (
        <Layout>
            <div className="relative flex flex-1 flex-col gap-3 overflow-auto p-4 pb-16 lg:gap-4 lg:p-6 lg:pb-6 md:max-h-screen">
                <div className="flex flex-col items-start justify-center border-b border-slate-100 pb-3">
                    <h1 className="text-left text-2xl font-semibold leading-8">
                        Document Center
                    </h1>
                    <div className="mt-1 max-w-[640px] text-sm font-medium text-slate-700">
                        Upload your resume, cover letter, notes or any other application materials. AI will extract key content and remind you during the interview to fully showcase yourself.</div>
                </div>
                <div className="flex justify-between md:mb-4">
                    <div className="flex gap-4">
                        <button onClick={() => setShowUploadModal(!showUploadModal)} className="flex gap-2 items-center justify-center whitespace-nowrap rounded-md text-md font-medium border px-6 py-3 relative border-slate-100 bg-primary hover:bg-primary/90 bg-gradient-to-r from-[#0090FF] to-[#00F7FF] text-slate-50">
                            <Icon icon="Upload" />
                            Upload
                        </button>
                        {/* <button className="items-center justify-center gap-1 whitespace-nowrap rounded-md text-md font-medium hover:bg-sky-100 py-1 hidden border border-slate-300 bg-white px-3 shadow-sm md:flex">
                            <Icon icon="New" />
                            <Link to={"/ai-resume-builder"} className="ml-[6px] text-left">
                                <div className="mt-1 text-md text-slate-900">Create</div>
                                <div className="mt-[-6px] text-[10px] text-slate-400">
                                    by AI Resume Builder
                                </div>
                            </Link>
                        </button> */}
                        <button onClick={() => setShowLinkedinProfileModal(!showLinkedinProfileModal)} className="flex gap-1 items-center justify-center whitespace-nowrap rounded-md text-md font-medium border hover:bg-sky-100 py-1 px-4">LinkedIn Profile</button>
                    </div>
                </div>
                <div className="h-min">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm hidden md:table">
                            <thead>
                                <tr className="border-b transition-colors hover:bg-sky-100/50 h-12 bg-slate-50">
                                    <th className="h-10 px-2 text-left align-middle font-semibold text-slate-900">File Name</th>
                                    <th className="h-10 px-2 text-left align-middle font-semibold text-slate-900">Document Type</th>
                                    <th className="h-10 px-2 text-left align-middle cursor-pointer font-semibold text-slate-900">Upload Date</th>
                                    <th className="h-10 px-2 text-left align-middle font-semibold text-slate-900">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b transition-colors hover:bg-sky-100/50">
                                    <td className="p-2 align-middle">
                                        <div className="max-w-[500px] overflow-hidden overflow-ellipsis whitespace-nowrap">proposal.docx</div>
                                    </td>
                                    <td className="p-2 align-middle">Other</td>
                                    <td className="p-2 align-middle">08 Jan, 2025</td>
                                    <td className="p-2 align-middle flex items-center">
                                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 h-10 w-10">
                                            <Icon icon="Download" />
                                        </button>
                                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border  hover:bg-sky-100 h-10 w-10 ml-3" >
                                            <Icon icon="Remove" />
                                        </button>
                                    </td>
                                </tr>
                                <tr className="border-b transition-colors hover:bg-sky-100/50">
                                    <td className="p-2 align-middle">
                                        <div className="max-w-[500px] overflow-hidden overflow-ellipsis whitespace-nowrap">
                                            proposal.docx
                                        </div>
                                    </td>
                                    <td className="p-2 align-middle">
                                        Resume
                                    </td>
                                    <td className="p-2 align-middle">
                                        08 Jan, 2025
                                    </td>
                                    <td className="p-2 align-middle flex items-center">
                                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 h-10 w-10">
                                            <Icon icon="Download" />
                                        </button>
                                        <button
                                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 h-10 w-10 ml-3"
                                            type="button"
                                            aria-haspopup="dialog"
                                            aria-expanded="false"
                                            aria-controls="radix-:r7k5:"
                                            data-state="closed"
                                        >
                                            <Icon icon="Remove" />
                                        </button>
                                    </td>
                                </tr>
                                <tr className="border-b transition-colors hover:bg-sky-100/50">
                                    <td className="p-2 align-middle">
                                        <div className="max-w-[500px] overflow-hidden overflow-ellipsis whitespace-nowrap">
                                            proposal.docx
                                        </div>
                                    </td>
                                    <td className="p-2 align-middle">
                                        Resume
                                    </td>
                                    <td className="p-2 align-middle">
                                        08 Jan, 2025
                                    </td>
                                    <td className="p-2 align-middle flex items-center">
                                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 h-10 w-10">
                                            <Icon icon="Download" />
                                        </button>
                                        <button
                                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 h-10 w-10 ml-3"
                                            type="button"
                                            aria-haspopup="dialog"
                                            aria-expanded="false"
                                            aria-controls="radix-:r7k6:"
                                            data-state="closed"
                                        >
                                            <Icon icon="Remove" />
                                        </button>
                                    </td>
                                </tr>
                                <tr className="border-b transition-colors hover:bg-sky-100/50">
                                    <td className="p-2 align-middle">
                                        <div className="max-w-[500px] overflow-hidden overflow-ellipsis whitespace-nowrap">
                                            proposal.docx
                                        </div>
                                    </td>
                                    <td className="p-2 align-middle">
                                        Resume
                                    </td>
                                    <td className="p-2 align-middle">
                                        07 Jan, 2025
                                    </td>
                                    <td className="p-2 align-middle flex items-center">
                                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 h-10 w-10">
                                            <Icon icon="Download" />
                                        </button>
                                        <button
                                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 h-10 w-10 ml-3"
                                            type="button"
                                            aria-haspopup="dialog"
                                            aria-expanded="false"
                                            aria-controls="radix-:r7k7:"
                                            data-state="closed"
                                        >
                                            <Icon icon="Remove" />
                                        </button>
                                    </td>
                                </tr>
                                <tr className="border-b transition-colors hover:bg-sky-100/50">
                                    <td className="p-2 align-middle">
                                        <div className="max-w-[500px] overflow-hidden overflow-ellipsis whitespace-nowrap">
                                            LeoYoungResume.pdf
                                        </div>
                                    </td>
                                    <td className="p-2 align-middle">
                                        Resume
                                    </td>
                                    <td className="p-2 align-middle">
                                        15 Dec, 2024
                                    </td>
                                    <td className="p-2 align-middle flex items-center">
                                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 h-10 w-10">
                                            <Icon icon="Eye" />
                                        </button>
                                        <button
                                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 h-10 w-10 ml-3"
                                            type="button"
                                            aria-haspopup="dialog"
                                            aria-expanded="false"
                                            aria-controls="radix-:r7k8:"
                                            data-state="closed"
                                        >
                                            <Icon icon="Remove" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="md:hidden">
                        <div className="rounded-xl border bg-card text-card-foreground mb-4 shadow-none md:hidden">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h3 className="font-semibold leading-none tracking-tight break-words">
                                    proposal.docx
                                </h3>
                                <p className="text-sm text-muted-foreground break-words" />
                                <div className="mt-2">
                                    <div>Document Type: other</div>
                                    <div className="mt-1">Upload Date: 08 Jan, 2025</div>
                                    <div className="mt-4">
                                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 h-10 w-10">
                                            <Icon icon="Eye" />
                                        </button>
                                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 h-10 w-10 ml-3">
                                            <Icon icon="Remove" />
                                        </button>
                                    </div>
                                </div>
                                <p />
                            </div>
                        </div>
                        <div className="rounded-xl border bg-card text-card-foreground mb-4 shadow-none md:hidden">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h3 className="font-semibold leading-none tracking-tight break-words">proposal.docx</h3>
                                <p className="text-sm text-muted-foreground break-words" />
                                <div className="mt-2">
                                    <div>Document Type: resume</div>
                                    <div className="mt-1">Upload Date: 08 Jan, 2025</div>
                                    <div className="mt-4">
                                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 h-10 w-10">
                                            <Icon icon="Eye" />
                                        </button>
                                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 h-10 w-10 ml-3">
                                            <Icon icon="Remove" />
                                        </button>
                                    </div>
                                </div>
                                <p />
                            </div>
                        </div>
                        <div className="rounded-xl border bg-card text-card-foreground mb-4 shadow-none md:hidden">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h3 className="font-semibold leading-none tracking-tight break-words">proposal.docx</h3>
                                <p className="text-sm text-muted-foreground break-words" />
                                <div className="mt-2">
                                    <div>Document Type: resume</div>
                                    <div className="mt-1">Upload Date: 08 Jan, 2025</div>
                                    <div className="mt-4">
                                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 h-10 w-10">
                                            <Icon icon="Eye" />
                                        </button>
                                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 h-10 w-10 ml-3">
                                            <Icon icon="Remove" />
                                        </button>
                                    </div>
                                </div>
                                <p />
                            </div>
                        </div>
                        <div className="rounded-xl border bg-card text-card-foreground mb-4 shadow-none md:hidden">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h3 className="font-semibold leading-none tracking-tight break-words">
                                    proposal.docx
                                </h3>
                                <p className="text-sm text-muted-foreground break-words" />
                                <div className="mt-2">
                                    <div>Document Type: resume</div>
                                    <div className="mt-1">Upload Date: 07 Jan, 2025</div>
                                    <div className="mt-4">
                                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 h-10 w-10">
                                            <Icon icon="Eye" />
                                        </button>
                                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 h-10 w-10 ml-3">
                                            <Icon icon="Remove" />
                                        </button>
                                    </div>
                                </div>
                                <p />
                            </div>
                        </div>
                        <div className="rounded-xl border bg-card text-card-foreground mb-4 shadow-none md:hidden">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h3 className="font-semibold leading-none tracking-tight break-words">LeoYoungResume.pdf</h3>
                                <p className="text-sm text-muted-foreground break-words" />
                                <div className="mt-2">
                                    <div>Document Type: resume</div>
                                    <div className="mt-1">Upload Date: 15 Dec, 2024</div>
                                    <div className="mt-4">
                                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 h-10 w-10">
                                            <Icon icon="Eye" />
                                        </button>
                                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 h-10 w-10 ml-3" >
                                            <Icon icon="Remove" />
                                        </button>
                                    </div>
                                </div>
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
                                <span className="text-xs font-medium text-slate-900">5</span>
                            </h4>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium border-slate-300 box-content h-8 w-8 px-0 py-0" >
                                <Icon icon="ArrowLeft" />
                            </button>
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium border-slate-300 box-content h-8 w-8 px-0 py-0" >
                                <Icon icon="ChevronRight" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showUploadModal && <UploadModal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} />}
            {showLinkedinProfileModal && <LinkedinProfileModal isOpen={showLinkedinProfileModal} onClose={() => setShowLinkedinProfileModal(false)} />}
        </Layout>
    )
}

export default Resume