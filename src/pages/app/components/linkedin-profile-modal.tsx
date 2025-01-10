import React from "react";
import Icon from "../../../components/icon"
import Modal from "../../../components/modal"
import { Select } from "../../../components/select";
import { Radio } from "../../../components/radio";
import { Link } from "react-router-dom";

const LinkedinProfileModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: VoidFunction }) => {

    const modalRef = React.useRef<HTMLDivElement | null>(null)

    const [status, setStatus] = React.useState({
        documentType: "Resume",
        fileName: ""
    })
    React.useEffect(() => {

        const onModal = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose()
            }
        };

        document.addEventListener("mousedown", onModal);
        return () => {
            document.removeEventListener("mousedown", onModal);
        };
    })

    return (
        <Modal>
            <div
                className="grid place-items-center fixed w-screen h-screen bg-black bg-opacity-70 backdrop-blur-sm fade-in">
                <div
                    ref={modalRef}
                    className="fixed left-[50%] top-[50%] z-50 grid max-w-[500px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg rounded-lg max-h-[calc(100dvh-48px)] w-5/6 grid-rows-[auto_1fr_auto] pt-8"
                    style={{ pointerEvents: "auto" }}
                >
                    <div className="space-y-2 text-center sm:text-left mb-2 relative flex flex-row justify-between align-middle">
                        <h2 className="text-xl font-bold box-border flex-1 pr-7 text-left text-slate-900">
                            LinkedIn profile
                        </h2>
                        <div onClick={onClose} className="absolute -top-2 right-0 flex w-6 justify-center rounded-sm border align-middle hover:cursor-pointer" title="Close" >
                            <Icon icon="Close" />
                        </div>
                    </div>
                    <div className="grid w-full items-center gap-y-1.5">
                        <label className="text-[12.5px] font-medium leading-none" >
                            Linkedin Profile
                        </label>
                        <input type="text" className="flex h-10 w-full rounded-md px-3 py-2 text-[12.5px] focus:border-sky-500 !border !shadow-none !outline-none" placeholder="input your LinkedIn profile url" />
                    </div>
                    <Link to="https://www.linkedin.com/in/" className="text-xs text-sky-500 hover:underline" >
                        Visit my LinkedIn Profile
                    </Link>
                    <div>
                        <div className="mt-2 flex justify-end gap-2">
                            <button onClick={onClose} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-[12.5px] font-semibold border hover:bg-sky-100 h-10 px-4 py-2">
                                Cancel
                            </button>
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-[12.5px] font-semibold bg-primary hover:bg-primary/90 bg-gradient-to-r from-[#0090FF] to-[#00F7FF] text-white h-10 px-6 py-2">
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    )
}

export default LinkedinProfileModal