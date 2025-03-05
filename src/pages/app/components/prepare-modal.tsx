import React from "react";
import Icon from "../../../components/icon"
import Modal from "../../../components/modal"
import { Select } from "../../../components/select";

const PrepareModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: VoidFunction }) => {

    const resumeDropdownRef = React.useRef<HTMLDivElement | null>(null)
    const modalRef = React.useRef<HTMLDivElement | null>(null)

    const [status, setStatus] = React.useState({
        resume: "",
        resumes: ["proposal1.docx", "proposal2.docx", "proposal.docx", "LeoYoungResume.pdf"]
    })
    const [showResumeDropdown, setShowResumeDropdown] = React.useState(false)

    React.useEffect(() => {
        const onOutResumeDropdown = (event: MouseEvent) => {
            if (resumeDropdownRef.current && !resumeDropdownRef.current.contains(event.target as Node)) {
                setShowResumeDropdown(false);
            }
        };

        const onModal = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose()
            }
        };

        document.addEventListener("mousedown", onModal);
        document.addEventListener("mousedown", onOutResumeDropdown);
        return () => {
            document.removeEventListener("mousedown", onModal);
            document.removeEventListener("mousedown", onOutResumeDropdown);
        };
    })

    return (
        <Modal>
            <div
                className="grid place-items-center fixed w-screen h-screen bg-black bg-opacity-70 backdrop-blur-sm fade-in">
                <div
                    ref={modalRef}
                    className="fixed left-[50%] top-[50%] z-50 grid max-w-[500px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white px-6 pb-1 shadow-lg duration-200 sm:rounded-lg rounded-lg max-h-[calc(100dvh-48px)] w-[95%] sm:w-5/6 grid-rows-[auto_1fr_auto] pt-8"
                    style={{ pointerEvents: "auto" }}
                >
                    <div className="space-y-2 text-center sm:text-left relative flex flex-row justify-between align-middle">
                        <h2 className="text-lg font-semibold box-border flex-1 pr-7 text-left text-slate-900">
                            Prepare for QA Pairs
                        </h2>
                        <div onClick={onClose} className="absolute -top-2 right-0 flex w-6 justify-center rounded-sm border align-middle hover:cursor-pointer" title="Close" >
                            <Icon icon="Close" />
                        </div>
                    </div>
                    <div>
                        <div className="mb-4">
                            <label className="mb-2 block text-md font-medium text-gray-700 after:ml-1 after:text-sky-500 after:content-['*']">Resume</label>
                            <Select
                                value={status.resume}
                                data={status.resumes}
                                onHandle={(i: string, obk: string) => setStatus({ ...status, [obk]: i })}
                                showDropdown={showResumeDropdown}
                                onDropdown={() => setShowResumeDropdown(true)}
                                dropdownRef={resumeDropdownRef}
                                obk="resume"
                                optionPrefix="Select your resume"
                            />
                        </div>
                        <div>
                            <label className="block text-md font-medium text-gray-700">Job Description</label>
                            <div className="mt-2">
                                <input
                                    type="url"
                                    placeholder="e.g. https://www.example.com/jobs?id=abc123"
                                    className="block w-full rounded-md border focus:border-sky-500 px-3 outline-none py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="mt-10 flex justify-end gap-2">
                            <button onClick={onClose} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 h-10 px-4 py-2">
                                Cancel
                            </button>
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary hover:bg-primary/90 bg-gradient-to-r from-[#0090FF] to-[#00F7FF] text-white h-10 px-6 py-2">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    )
}

export default PrepareModal