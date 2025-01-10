import React from "react"

import Layout from "../components/layout"
import Icon from "../../../components/icon"
import { languages } from "../components/data.d"

const PermissionSetting = () => {

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

    return (
        <Layout>
            <main className="relative flex flex-1 flex-col gap-3 overflow-auto p-4 pb-16 lg:gap-4 lg:p-6 lg:pb-6 md:max-h-screen">
                <h1 className="text-left text-3xl font-semibold leading-8">Settings</h1>
                <div>
                    <div className="flex gap-2">
                        <button onClick={() => setPageIdx(0)} className={`inline-flex items-center justify-center whitespace-nowrap hover:bg-sky-500 px-3 py-1.5 text-md font-medium rounded-full ${pageIdx === 0 ? "text-white bg-sky-500" : "text-black bg-white border"}`}>
                            Permission
                        </button>
                        <button onClick={() => setPageIdx(1)} className={`inline-flex items-center justify-center whitespace-nowrap hover:bg-sky-500 px-3 py-1.5 text-md font-medium rounded-full ${pageIdx !== 0 ? "text-white bg-sky-500" : "text-black bg-white border"}`}>
                            Copilot
                        </button>
                    </div>
                    {pageIdx === 0 ? (<div className="mt-2 max-w-[520px]">
                        <p className="mb-4 rounded-md p-3 text-sm bg-sky-300 text-sky-800">
                            The following settings will affect all interviews, while the settings
                            within each interview will only affect that specific interview.
                        </p>
                        <div className="mt-4">
                            <h3 className="h-5 text-md font-semibold">Mandatory</h3>
                            <div className="rounded-xl border mt-4 flex flex-row items-center justify-center p-4 shadow-none dark:bg-slate-400">
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
                                    <button className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border bg-white hover:bg-accent hover:bg-sky-100 h-12 px-4 py-2 block">
                                        Request
                                    </button>
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
                                </div>
                                <div className="flex w-24 items-center justify-center p-0">
                                    <button className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border bg-white hover:bg-accent hover:bg-sky-100 h-12 px-4 py-2 block">
                                        Request
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
                                    <p className="!mt-2 ml-8 rounded-md py-3 pl-4 pr-1 text-sm bg-sky-300 text-sky-800">
                                        You need to install the Final Round AI Google extension to
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
                                    <p className="!mt-2 ml-8 rounded-md py-3 pl-4 pr-1 text-sm bg-sky-300 text-sky-800">
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
                                        <button onClick={() => setTabIdxes({...tabIdxes, verbosity: 0})} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-[13px] font-medium flex-1 ${tabIdxes.verbosity === 0 ? "bg-white" : "bg-transparent"}`}>
                                            Concise
                                        </button>
                                        <button onClick={() => setTabIdxes({...tabIdxes, verbosity: 1})} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-[13px] font-medium flex-1 ${tabIdxes.verbosity === 1 ? "bg-white" : "bg-transparent"}`}>
                                            Default
                                        </button>
                                        <button onClick={() => setTabIdxes({...tabIdxes, verbosity: 2})} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-[13px] font-medium flex-1 ${tabIdxes.verbosity === 2 ? "bg-white" : "bg-transparent"}`}>
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
                                        <button onClick={() => setTabIdxes({...tabIdxes, copilotTemperature: 0})} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-[13px] font-medium flex-1 ${tabIdxes.copilotTemperature === 0 ? "bg-white" : "bg-transparent"}`}>
                                            Low
                                        </button>
                                        <button onClick={() => setTabIdxes({...tabIdxes, copilotTemperature: 1})} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-[13px] font-medium flex-1 ${tabIdxes.copilotTemperature === 1 ? "bg-white" : "bg-transparent"}`}>
                                            Default
                                        </button>
                                        <button onClick={() => setTabIdxes({...tabIdxes, copilotTemperature: 2})} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-[13px] font-medium flex-1 ${tabIdxes.copilotTemperature === 2 ? "bg-white" : "bg-transparent"}`}>
                                            High
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-md font-medium leading-none" >Perdivance Preference</label>
                                    <div className="h-12 items-center justify-center rounded-md bg-sky-100 p-1 flex">
                                        <button onClick={() => setTabIdxes({...tabIdxes, perdivancePreference: 0})} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-[13px] font-medium flex-1 ${tabIdxes.perdivancePreference === 0 ? "bg-white" : "bg-transparent"}`}>
                                            Speed
                                        </button>
                                        <button onClick={() => setTabIdxes({...tabIdxes, perdivancePreference: 1})} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-[13px] font-medium flex-1 ${tabIdxes.perdivancePreference === 1 ? "bg-white" : "bg-transparent"}`}>
                                            Quality
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-md font-medium leading-none">
                                        Mode Preference
                                    </label>
                                    <div className="h-12 items-center justify-center rounded-md bg-sky-100 p-1 flex">
                                        <button onClick={() => setTabIdxes({...tabIdxes, modePreference: 0})} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-[13px] font-medium flex-1 ${tabIdxes.modePreference === 0 ? "bg-white" : "bg-transparent"}`}>
                                            Default
                                        </button>
                                        <button onClick={() => setTabIdxes({...tabIdxes, modePreference: 1})} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-[13px] font-medium flex-1 ${tabIdxes.modePreference === 1 ? "bg-white" : "bg-transparent"}`}>
                                            STAR
                                        </button>
                                        <button onClick={() => setTabIdxes({...tabIdxes, modePreference: 2})} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-[13px] font-medium flex-1 ${tabIdxes.modePreference === 2 ? "bg-white" : "bg-transparent"}`}>
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
                                                I would like to opt out of having Final Round AI share my personal
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
                                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium bg-black text-white hover:bg-black/90 h-12 px-4 py-2 w-28" >
                                        Save
                                    </button>
                                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium border hover:bg-accent h-12 px-4 py-2 w-28" >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

        </Layout>
    )
}

export default PermissionSetting