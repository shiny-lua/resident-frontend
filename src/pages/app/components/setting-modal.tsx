import React from "react";

import Modal from "../../../components/modal";
import Icon from "../../../components/icon";
import { languages } from "./data.d";

const SettingModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: VoidFunction }) => {

    const modalRef = React.useRef<HTMLDivElement>(null);
    const [status, setStatus] = React.useState({
        language: "English (United States)"
    })
    const [pageIdx, setPageIdx] = React.useState(0);
    const [tabIdxes, setTabIdxes] = React.useState({
        verbosity: 0,
        copilotTemperature: 0,
        perdivancePreference: 0,
        modePreference: 0
    })

    const languageDropdownRef = React.useRef<HTMLDivElement | null>(null);
    const [showLanguageDropdown, setShowLanguageDropdown] = React.useState(false);

    const [permissions, setPermissions] = React.useState({
        audio: false,
        video: false
    });

    const [permissionErrors, setPermissionErrors] = React.useState({
        audio: '',
        video: ''
    });

    const onLanguageDropdown = (event: MouseEvent) => {
        if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
            setShowLanguageDropdown(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("mousedown", onLanguageDropdown);
        return () => {
            document.removeEventListener("mousedown", onLanguageDropdown);
        };
    }, []);

    // Add function to request audio permission
    const requestAudioPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop());
            setPermissions(prev => ({ ...prev, audio: true }));
            setPermissionErrors(prev => ({ ...prev, audio: '' }));
        } catch (err) {
            console.error("Error requesting audio permission:", err);
            setPermissionErrors(prev => ({
                ...prev,
                audio: 'Permission denied. Please enable microphone access in your browser settings.'
            }));
        }
    };

    // Add function to request video permission
    const requestVideoPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => track.stop());
            setPermissions(prev => ({ ...prev, video: true }));
            setPermissionErrors(prev => ({ ...prev, video: '' }));
        } catch (err) {
            console.error("Error requesting video permission:", err);
            setPermissionErrors(prev => ({
                ...prev,
                video: 'Permission denied. Please enable camera access in your browser settings.'
            }));
        }
    };

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
                    className="fixed left-[50%] top-[50%] z-50 grid max-w-[500px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg rounded-lg max-h-[calc(100dvh-48px)] w-[95%] sm:w-5/6 grid-rows-[auto_1fr_auto] pt-8"
                >
                    <div className="relative">
                        <button onClick={onClose} className="border absolute -top-2 right-0 rounded-md p-1">
                            <Icon icon="Close" />
                        </button>
                        <div className="flex gap-2">
                            <button onClick={() => setPageIdx(0)} className={`inline-flex items-center justify-center whitespace-nowrap hover:bg-sky-500 px-3 py-1.5 text-md font-medium rounded-full ${pageIdx === 0 ? "text-white bg-sky-500" : "text-black bg-white border"}`}>
                                Permission
                            </button>
                            <button onClick={() => setPageIdx(1)} className={`inline-flex items-center justify-center whitespace-nowrap hover:bg-sky-500 px-3 py-1.5 text-md font-medium rounded-full ${pageIdx !== 0 ? "text-white bg-sky-500" : "text-black bg-white border"}`}>
                                Copilot
                            </button>
                        </div>
                        <div className="max-h-full overflow-y-auto">
                            {pageIdx === 0 ? (<div className="mt-2 max-w-[520px]">
                                <p className="mb-4 rounded-md p-3 text-sm bg-sky-300 text-sky-800">
                                    The following settings will affect all interviews, while the settings
                                    within each interview will only affect that specific interview.
                                </p>
                                <div className="mt-4">
                                    <h3 className="h-5 text-md font-semibold">Mandatory</h3>
                                    <div>
                                        <div className="rounded-xl border mt-4 flex flex-col items-center justify-center p-4 shadow-none dark:bg-slate-400">
                                            <div className="flex flex-row items-center justify-center">
                                                <div className="flex flex-col flex-1 space-y-0 p-0 pr-2">
                                                    <h3 className="font-semibold leading-none tracking-tight flex items-center">
                                                        <Icon icon="Audio" />
                                                        Audio
                                                    </h3>
                                                    <p className="text-sm text-slate-500 pl-8">
                                                        Enable Interview Copilot™ to provide real-time guidance based on
                                                        your input. You'll need to turn this on to generate interview
                                                        reports.
                                                    </p>

                                                </div>
                                                <div className="flex w-24 items-center justify-center p-0">
                                                    <button
                                                        onClick={requestAudioPermission}
                                                        className={`items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border h-12 px-4 py-2 block ${permissions.audio
                                                            ? "bg-green-100 text-green-700 border-green-300"
                                                            : "bg-white hover:bg-sky-100"
                                                            }`}
                                                    >
                                                        {permissions.audio ? "Granted" : "Request"}
                                                    </button>
                                                </div>
                                            </div>
                                            {permissionErrors.audio && (
                                                <p className="!mt-2 ml-8 rounded-md py-3 pl-4 pr-1 text-sm bg-red-200 text-red-900">
                                                    {permissionErrors.audio}
                                                </p>
                                            )}
                                        </div>

                                    </div>
                                    <div className="rounded-xl border mt-4 flex flex-row items-center justify-center p-4 shadow-none dark:bg-slate-400">
                                        <div className="flex flex-col flex-1 space-y-0 p-0 pr-2">
                                            <h3 className="font-semibold leading-none tracking-tight flex items-center">
                                                <Icon icon="Compatibility" />Video
                                            </h3>
                                            <p className="text-sm text-slate-500 mt-2 pl-8">
                                                Enhance your mock interview experience.
                                            </p>
                                            {permissionErrors.video && (
                                                <p className="!mt-2 ml-8 rounded-md py-3 pl-4 pr-1 text-sm bg-red-200 text-red-900">
                                                    {permissionErrors.video}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex w-24 items-center justify-center p-0">
                                            <button
                                                onClick={requestVideoPermission}
                                                className={`items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border h-12 px-4 py-2 block ${permissions.video
                                                    ? "bg-green-100 text-green-700 border-green-300"
                                                    : "bg-white hover:bg-sky-100"
                                                    }`}
                                            >
                                                {permissions.video ? "Granted" : "Request"}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="rounded-xl border mt-4 flex flex-row items-center justify-center p-4 shadow-none dark:bg-slate-400">
                                        <div className="flex flex-col flex-1 space-y-0 p-0 pr-2">
                                            <h3 className="font-semibold leading-none tracking-tight flex items-center">
                                                <Icon icon="Compatibility" />Coding Copilot Extension
                                            </h3>
                                            <p className="text-sm text-slate-500 mt-2 pl-8">
                                                A special chrome extension to work with Interview Copilot™ and
                                                help you crush coding interviews.
                                            </p>
                                            <p className="!mt-2 ml-8 rounded-md py-3 pl-4 pr-1 text-sm bg-red-200 text-red-900">
                                                You need to install the Theresidentguy Google extension to
                                                receive program advice from our Coding Copilot.
                                                <a
                                                    target="_blank"
                                                    href="https://chromewebstore.google.com/detail/final-round-ai/lfbbdphejjjanjiohlmkdbapdmfoaeem"
                                                    className="mx-2 underline underline-offset-2 hover:text-blue-500"
                                                    rel="noreferrer"
                                                >
                                                    Add from Chrome Web Store
                                                </a>
                                                and enable it.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className="h-5 text-md font-semibold">Optional</h3>
                                    <div className="rounded-xl border mt-3 flex flex-row items-center justify-center p-4 shadow-none dark:bg-slate-400">
                                        <div className="flex flex-col flex-1 space-y-0 p-0 pr-2">
                                            <h3 className="font-semibold leading-none tracking-tight flex items-center">
                                                <Icon icon="Notification" />
                                                Browser Notifications
                                            </h3>
                                            <p className="text-sm text-slate-500 mt-2 pl-8">
                                                Get timely updates on interview report progress and special
                                                offers.
                                            </p>
                                            <p className="!mt-2 ml-8 rounded-md py-3 pl-4 pr-1 text-sm bg-red-200 text-red-900">
                                                You have disabled notification permissions in your browser.
                                                Please refer to the
                                                <a
                                                    target="_blank"
                                                    href="https://www.finalroundai.com/v2/guide#windows"
                                                    className="mx-1 underline underline-offset-2 hover:text-blue-500"
                                                    rel="noreferrer"
                                                >
                                                    tutorial
                                                </a>
                                                to enable them.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>) : (
                                <div className="mt-2 max-w-[420px]">
                                    <p className="mb-4 rounded-md p-3 text-md bg-sky-300 text-sky-800">
                                        The following settings will affect all interviews, while the settings
                                        within each interview will only affect that specific interview.
                                    </p>
                                    <div className="scroll-bar-v2 -mr-6 space-y-4 overflow-auto pr-6 pt-3 max-h-full">
                                        <div className="space-y-2">
                                            <label className="text-md font-medium leading-none" >
                                                Verbosity
                                            </label>
                                            <p className="text-sm text-muted-foreground !mt-1" >The length and complexity of your Copilot responses </p>
                                            <div className="h-12 items-center justify-center rounded-md bg-sky-100 p-1 flex">
                                                <button onClick={() => setTabIdxes({ ...tabIdxes, verbosity: 0 })} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-[13px] font-medium flex-1 ${tabIdxes.verbosity === 0 ? "bg-white" : "bg-transparent"}`}>
                                                    Concise
                                                </button>
                                                <button onClick={() => setTabIdxes({ ...tabIdxes, verbosity: 1 })} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-[13px] font-medium flex-1 ${tabIdxes.verbosity === 1 ? "bg-white" : "bg-transparent"}`}>
                                                    Default
                                                </button>
                                                <button onClick={() => setTabIdxes({ ...tabIdxes, verbosity: 2 })} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-[13px] font-medium flex-1 ${tabIdxes.verbosity === 2 ? "bg-white" : "bg-transparent"}`}>
                                                    Lengthy
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-2 relative z-1">
                                            <label className="text-md font-medium leading-none" >
                                                Language for Copilot responses
                                            </label>
                                            <button onClick={() => setShowLanguageDropdown(!showLanguageDropdown)} className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm" >
                                                <span style={{ pointerEvents: "none" }}>{status.language}</span>
                                                <Icon className="w-4 h-4 text-slate-500" icon="ChevronDown" />
                                            </button>
                                            {showLanguageDropdown && (
                                                <div ref={languageDropdownRef} className="absolute left-0 top-[60px] w-full bg-white z-1">
                                                    <div
                                                        className="h-[300px] overflow-y-scroll scrollbar-hide border border-gray-300 rounded-md"
                                                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                                                    >
                                                        <ul className="space-y-2">
                                                            {languages.map((i: { value: string, label: string }, k) => (
                                                                <li key={k} onClick={() => setStatus({ ...status, language: i.label })} className="flex gap-2 py-1 px-4 text-md items-center bg-white hover:bg-gray-100 cursor-pointer">
                                                                    <div className="w-4">{status.language === i.label && <Icon className="text-sky-500" icon="Check" />}</div>
                                                                    {i.label}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-md font-medium leading-none" >
                                                Copilot Temperature
                                            </label>
                                            <div className="h-12 items-center justify-center rounded-md bg-sky-100 p-1 flex">
                                                <button onClick={() => setTabIdxes({ ...tabIdxes, copilotTemperature: 0 })} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-[13px] font-medium flex-1 ${tabIdxes.copilotTemperature === 0 ? "bg-white" : "bg-transparent"}`}>
                                                    Low
                                                </button>
                                                <button onClick={() => setTabIdxes({ ...tabIdxes, copilotTemperature: 1 })} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-[13px] font-medium flex-1 ${tabIdxes.copilotTemperature === 1 ? "bg-white" : "bg-transparent"}`}>
                                                    Default
                                                </button>
                                                <button onClick={() => setTabIdxes({ ...tabIdxes, copilotTemperature: 2 })} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-[13px] font-medium flex-1 ${tabIdxes.copilotTemperature === 2 ? "bg-white" : "bg-transparent"}`}>
                                                    High
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-md font-medium leading-none" >Perdivance Preference</label>
                                            <div className="h-12 items-center justify-center rounded-md bg-sky-100 p-1 flex">
                                                <button onClick={() => setTabIdxes({ ...tabIdxes, perdivancePreference: 0 })} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-[13px] font-medium flex-1 ${tabIdxes.perdivancePreference === 0 ? "bg-white" : "bg-transparent"}`}>
                                                    Speed
                                                </button>
                                                <button onClick={() => setTabIdxes({ ...tabIdxes, perdivancePreference: 1 })} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-[13px] font-medium flex-1 ${tabIdxes.perdivancePreference === 1 ? "bg-white" : "bg-transparent"}`}>
                                                    Quality
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-md font-medium leading-none">
                                                Mode Preference
                                            </label>
                                            <div className="h-12 items-center justify-center rounded-md bg-sky-100 p-1 flex">
                                                <button onClick={() => setTabIdxes({ ...tabIdxes, modePreference: 0 })} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-[13px] font-medium flex-1 ${tabIdxes.modePreference === 0 ? "bg-white" : "bg-transparent"}`}>
                                                    Default
                                                </button>
                                                <button onClick={() => setTabIdxes({ ...tabIdxes, modePreference: 1 })} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-[13px] font-medium flex-1 ${tabIdxes.modePreference === 1 ? "bg-white" : "bg-transparent"}`}>
                                                    STAR
                                                </button>
                                                <button onClick={() => setTabIdxes({ ...tabIdxes, modePreference: 2 })} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-[13px] font-medium flex-1 ${tabIdxes.modePreference === 2 ? "bg-white" : "bg-transparent"}`}>
                                                    SOAR
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 pt-3">
                                            <label className="flex items-start gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="mt-1 h-4 w-4 text-sky-500 focus:ring-sky-500 border-gray-300 rounded"
                                                />
                                                <div className="text-left">
                                                    <div className="text-sm leading-4 text-slate-800">
                                                        I would like to opt out of having Theresidentguy share my personal
                                                        information.
                                                    </div>
                                                    <div className="mt-1 text-xs text-slate-600">
                                                        Notice: If you choose to opt out, you may miss out on some of the
                                                        benefits of having your data used as described in our policy. You can
                                                        enable or disable it anytime.
                                                    </div>
                                                </div>
                                            </label>
                                        </div>

                                        <div className="mt-4 flex justify-start gap-x-3">
                                            <button onClick={onClose} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium bg-black text-white hover:bg-black/90 h-12 px-4 py-2 w-28" >
                                                Save
                                            </button>
                                            <button onClick={onClose} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium border hover:bg-accent h-12 px-4 py-2 w-28" >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default SettingModal;
