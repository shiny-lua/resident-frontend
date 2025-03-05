import React from "react";

import Modal from "../modal"
import Icon from "../icon";
import Profile from "./profile";
import Security from "./security";

const ManageAccountModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: VoidFunction }) => {

    const modalRef = React.useRef<HTMLDivElement | null>(null)
    const [tabIdx, setTabIdx] = React.useState(0)

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
                    className="fixed left-[50%] top-[50%] z-50 flex max-w-[900px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-0 sm:p-4 shadow-lg duration-200 sm:rounded-lg rounded-lg h-[700px] max-h-[calc(100dvh-48px)] w-[95%] sm:w-5/6"
                    style={{ pointerEvents: "auto" }}
                >
                    <div className="flex h-full w-full relative">
                        <div
                            onClick={onClose}
                            className="absolute top-2 right-2 sm:-top-2 sm:-right-2 flex w-6 justify-center bg-white rounded-sm border align-middle hover:cursor-pointer"
                            title="Close"
                        >
                            <Icon icon="Close" />
                        </div>
                        <div className="hidden md:flex flex-col justify-between w-1/3 h-full bg-sky-50 pt-8 px-3">
                            <div className="h-full">
                                <div className="text-2xl px-3">Account</div>
                                <div className="text-md px-3 text-slate-500 pt-1">Manage Your account info.</div>
                                <button onClick={() => setTabIdx(0)} className={`flex gap-2 items-center mt-4 w-full py-2 px-3 rounded-lg ${tabIdx === 0 ? "bg-slate-200 text-sky-500" : "text-slate-400"}`}>
                                    <Icon icon="ProfileUser" className="h-4.5 w-4.5" />
                                    Profile
                                </button>
                                <button onClick={() => setTabIdx(1)} className={`flex gap-2 items-center my-1 w-full py-2 px-3 rounded-lg ${tabIdx === 1 ? "bg-slate-200 text-sky-500" : "text-slate-400"}`}>
                                    <Icon icon="Security" className="h-4.5 w-4.5" />
                                    Security
                                </button>
                            </div>
                        </div>
                        {tabIdx === 0 ? <Profile /> : <Security />}
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ManageAccountModal