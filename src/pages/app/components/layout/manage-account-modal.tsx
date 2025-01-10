import React from "react";

import Modal from "../../../../components/modal"
import Icon from "../../../../components/icon";

const ManageAccountModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: VoidFunction }) => {

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
                    className="fixed left-[50%] top-[50%] z-50 flex max-w-[900px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-4 shadow-lg duration-200 sm:rounded-lg rounded-lg h-[700px] max-h-[calc(100dvh-48px)] w-5/6"
                    style={{ pointerEvents: "auto" }}
                >
                    <div className="flex h-full w-full relative">
                        <div
                            onClick={onClose}
                            className="absolute -top-2 -right-2 flex w-6 justify-center bg-white rounded-sm border align-middle hover:cursor-pointer"
                            title="Close"
                        >
                            <Icon icon="Close" />
                        </div>
                        <div className="hidden md:flex flex-col justify-between w-1/3 h-full bg-sky-100 pt-8 px-3">
                            <div className="h-full">
                                <div className="text-2xl px-3">Account</div>
                                <div className="text-md px-3 text-slate-500 pt-1">Manage Your account info.</div>
                                <button className="flex gap-2 items-center mt-4 bg-slate-300 w-full py-2 px-3 rounded-lg">
                                    <Icon icon="ProfileUser" className="h-4.5 w-4.5" />
                                    Profile
                                </button>
                                <button className="flex gap-2 items-center my-1 text-slate-400 w-full py-2 px-3 rounded-lg">
                                    <Icon icon="Security" className="h-4.5 w-4.5" />
                                    Security
                                </button>
                            </div>
                        </div>
                        <div className="w-full md:w-2/3 border rounded-lg pt-8 px-6">
                            <div className="flex gap-2">
                                <div className="text-2xl font-semibold pb-4">Profile details</div>
                                <div className="text-2xl font-semibold pb-4">Security</div>
                            </div>
                            <div className="py-4 border-t">
                                <div className="flex flex-col lg:flex-row just items-center gap-2">
                                    <div className="text-md text-slate-600 w-full lg:w-1/3">Profile</div>
                                    <div className="flex justify-between items-center w-full lg:w-2/3 ml-6">
                                        <div className="flex gap-4 items-center">
                                            <img
                                                crossOrigin="anonymous"
                                                src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycWJueGZTckVuZFJnYXhUU0ZJU2FhbFNHaEIifQ?width=160"
                                                className="rounded-full w-14 h-14"
                                                title="Show Alive"
                                                alt="Show Alive"
                                            />
                                            <div className="text-slate-600 text-[13px]">Show Alive</div>
                                        </div>
                                        <button className="text-slate-800 text-sm py-2 px-4 border-slate-200 border rounded-lg hover:bg-slate-200">Update profile</button>
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row items-start gap-2 my-4">
                                    <div className="text-md text-slate-600 w-full md:w-1/3">Email Address</div>
                                    <div className="flex justify-between items-start w-full md:w-2/3  ml-6">
                                        <div>
                                            <div className="flex gap-4 items-center">
                                                <div className="flex gap-1 text-slate-600 text-[13px]">
                                                    <div>alivestonyplayer@gmail.com</div>
                                                    <div className="p-1 text-xs rounded-md bg-slate-200">primary</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1  hover:bg-sky-100 p-1 rounded-sm mt-1">
                                                <Icon icon="New" />
                                                <div className="text-sm">Add email address</div>
                                            </div>
                                        </div>
                                        <button className="hover:border-slate-200 mr-2 rounded-md p-1 hover:border"><Icon icon="MoreHorizontal" /></button>
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row items-start gap-2 my-4">
                                    <div className="text-md text-slate-600 w-full md:w-1/3">Connected accounts</div>
                                    <div className="flex justify-between items-start w-full md:w-2/3  ml-6">
                                        <div className="flex gap-4 items-center">
                                            <div>
                                                <div className="flex gap-1 text-slate-600 text-[13px]">
                                                    <div className="flex justify-center items-center">
                                                        <img src="/image/icons/google.png" width={14} height={14} />
                                                    </div>
                                                    <div className="p-1 text-xs rounded-md">Google - alivestonyplayer@gmail.com</div>
                                                </div>
                                                <div className="flex items-center gap-1  hover:bg-sky-100 p-1 rounded-sm mt-1">
                                                    <Icon icon="New" />
                                                    <div className="text-sm">Add email address</div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="hover:border-slate-200 mr-2 rounded-md p-1 hover:border"><Icon icon="MoreHorizontal" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ManageAccountModal