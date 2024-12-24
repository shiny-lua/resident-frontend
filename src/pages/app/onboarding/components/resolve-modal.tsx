import React from "react";
import Modal from "../../../../components/modal";
import Icon from "../../../../components/icon";

const ResloveModal = ({onClose, selectedStatus}: {onClose: VoidFunction, selectedStatus: string}) => {

    return (
        <Modal>
            <div
                className="fixed left-[50%] top-[50%] bg-white l z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
                style={{ pointerEvents: "auto" }}
            >
                <div className="flex flex-col space-y-1.5 text-center sm:text-left font-lg font-semibold text-slate-900">
                    Resolve the Permission Issue{" "}
                </div>
                <div>
                    <div className="mb-2 text-sm font-medium text-slate-500">
                        If you previously declined permission and the window doesn't appear,follow these steps:
                    </div>
                    <div className="text-sm font-medium text-slate-500">
                        1. Click on the icon on the left side of the URL bar to open site permission settings.
                    </div>
                    <img
                        src="/image/app/onboarding-permission-guide-setting-btn.png"
                        alt=""
                        className="w-100"
                    />
                    <div className="text-sm font-medium text-slate-500">
                        2.Toggle the notifications setting to "Allow".
                    </div>
                    <img
                        src={`/image/app/onboarding-permission-guide-${selectedStatus}.png`}
                        alt=""
                        className="mt-4 w-48"
                    />
                </div>
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                    <button
                        className="border border-input hover:bg-slate-100 px-4 py-2"
                        onClick={onClose}
                    >
                        Fix now
                    </button>
                </div>
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                >
                    <Icon icon="Close" />
                </button>
            </div>

        </Modal>
    )
}

export default ResloveModal;