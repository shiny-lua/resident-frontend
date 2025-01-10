import React from "react";

import Icon from "../../../components/icon";
import ResloveModal from "./components/resolve-modal";
type SettingsKeys = 'microphone' | 'camera' | 'notification' | 'compatibility';

type Settings = {
    [key: string]: boolean;
};

const LaunchChecklist = ({ onNext, onPrev }: { onNext: VoidFunction, onPrev: VoidFunction }) => {

    const [status, setStatus] = React.useState({
        microphone: false,
        camera: false,
        notification: false,
        compatibility: false,
    } as Settings)

    const [showModal, setShowModal] = React.useState(false)
    const [selectedStatus, setSelectedStatus] = React.useState("")

    const onResolve = (k: string) => {
        if (status[k] === false) {
            setStatus({ ...status, [k]: true })
        } else {
            setSelectedStatus(k)
            setShowModal(true)
        }
    }

    const onCloseModal = () => {
        setSelectedStatus("")
        setShowModal(false)
    }

    return (
        <div>
            <button onClick={onPrev} className="flex gap-2 items-center">
                <Icon icon="ArrowLeft" />
                <span>Back</span>
            </button>
            <div className="my-9">
                <div className="mb-2 text-sm font-medium text-slate-900">3/4</div>
                <p className="text-2xl font-semibold leading-8 text-slate-900">
                    Launch Checklist
                </p>
                <div className="mt-2 text-sm font-medium leading-5 text-slate-500">
                    Obtain the necessary permissions for the interview in advance to ensure a
                    smooth process.
                </div>
                <div>
                    <div className="grid w-full gap-[10px] pt-4">
                        <div className="flex w-full justify-center">
                            <div className="flex w-full items-center justify-between rounded-md border border-slate-200 bg-white p-4 text-slate-700">
                                <div className="flex items-center font-medium">
                                    <Icon icon="Audio" />
                                    Microphone Permission
                                </div>
                                <div className="flex justify-center items-center gap-1">
                                    {status.microphone && <span className="mr-3 font-medium text-orange-600">Blocked</span>}
                                    <button onClick={() => onResolve("microphone")} className="rounded-md text-sm font-medium hover:bg-slate-100 px-4 py-2 border">{!status.microphone ? "Request" : "Resolve"}</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full justify-center">
                            <div className="flex w-full items-center justify-between rounded-md border border-slate-200 bg-white p-4 text-slate-700">
                                <div className="flex items-center font-medium">
                                    <Icon icon="Camera" />
                                    Camera Permission
                                </div>
                                <div className="flex justify-center items-center gap-1">
                                    {status.camera && <span className="mr-3 font-medium text-orange-600">Blocked</span>}
                                    <button onClick={() => onResolve("camera")} className="rounded-md text-sm font-medium hover:bg-slate-100 px-4 py-2 border">{!status.camera ? "Request" : "Resolve"}</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full justify-center">
                            <div className="flex w-full items-center justify-between rounded-md border border-slate-200 bg-white p-4 text-slate-700">
                                <div className="flex items-center font-medium">
                                    <Icon icon="Notification" />
                                    Browser Notifications
                                </div>
                                <div className="flex justify-center items-center gap-1">
                                    {status.notification && <span className="mr-3 font-medium text-orange-600">Blocked</span>}
                                    <button onClick={() => onResolve("notification")} className="rounded-md text-sm font-medium hover:bg-slate-100 px-4 py-2 border">{!status.notification ? "Request" : "Resolve"}</button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full justify-center rounded-md border border-slate-200 bg-white p-4">
                            <div className="flex w-full items-center justify-between text-slate-700">
                                <div className="flex items-center font-medium">
                                    <Icon icon="Compatibility" />
                                    Browser Compatibility
                                </div>
                                <div className="text-green-600"><Icon className="w-6 h-6" icon="Check" /></div>
                            </div>
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
            {showModal && (<ResloveModal onClose={onCloseModal} selectedStatus={selectedStatus} />)}
        </div>
    )
}

export default LaunchChecklist;