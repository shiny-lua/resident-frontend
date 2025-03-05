import React from "react";
import Icon from "../../../components/icon"
import Modal from "../../../components/modal"
import { Select } from "../../../components/select";
import { Radio } from "../../../components/radio";

const UploadModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: VoidFunction }) => {

    const modalRef = React.useRef<HTMLDivElement | null>(null)

    const documentTypes = ["Resume", "Cover Letter", "Other"]
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

    const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];
        if (file) {
            setStatus({ ...status, fileName: file.name })
        }
    };

    return (
        <Modal>
            <div
                className="grid place-items-center fixed w-screen h-screen bg-black bg-opacity-70 backdrop-blur-sm fade-in">
                <div
                    ref={modalRef}
                    className="fixed left-[50%] top-[50%] z-50 grid max-w-[500px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg rounded-lg max-h-[calc(100dvh-48px)] w-[95%] sm:w-5/6 grid-rows-[auto_1fr_auto] pt-8"
                    style={{ pointerEvents: "auto" }}
                >
                    <div className="space-y-2 text-center sm:text-left relative flex flex-row justify-between align-middle">
                        <h2 className="text-xl font-bold box-border flex-1 pr-7 text-left text-slate-900">
                            Select your document type and then upload
                        </h2>
                        <div onClick={onClose} className="absolute -top-2 right-0 flex w-6 justify-center rounded-sm border align-middle hover:cursor-pointer" title="Close" >
                            <Icon icon="Close" />
                        </div>
                    </div>
                    <div className="font-semibold text-slate-700">Document Type</div>
                    <div className="gap-2 flex max-w-[300px] flex-row justify-between outline-none" >
                        {documentTypes.map((i, k) => (
                            <Radio key={k} value={i} isChecked={i === status.documentType ? true : false} onChangeRadio={(e) => setStatus({ ...status, documentType: e.target.value })} />
                        ))}
                    </div>
                    <div className="font-semibold text-slate-700">File</div>
                    <div className="rounded-[6px] border border-[#CBD5E1] px-3 py-2">
                        <label className="relative flex flex-row items-center cursor-pointer">
                            {!status.fileName ? (
                                <>
                                    Choose file
                                    <div className="ml-2 inline-block w-[180px] truncate text-slate-700 dtl:w-[300px]">
                                        No file chosen
                                    </div>
                                </>
                            ) : (
                                status.fileName
                            )}
                            <input
                                onChange={onFileUpload}
                                accept=".pdf,.docx,.doc,.DOC,.PDF,.DOCX"
                                type="file"
                                title="upload file"
                                className="absolute left-0 top-0 h-full w-full opacity-0"
                            />
                        </label>
                    </div>
                    <div className="mt-[-10px] text-xs text-slate-400">
                        Only PDF, DOC, or DOCX files up to 10 MB
                    </div>
                    <div>
                        <div className="mt-2 flex justify-end gap-2">
                            <button onClick={onClose} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold border hover:bg-sky-100 h-10 px-4 py-2">
                                Cancel
                            </button>
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold bg-primary hover:bg-primary/90 bg-gradient-to-r from-[#0090FF] to-[#00F7FF] text-white h-10 px-6 py-2">
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    )
}

export default UploadModal