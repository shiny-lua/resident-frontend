const ResumeSetting = () => {
    return (
        <section className="flex flex-col gap-3 rounded-md bg-white p-6 pt-4 shadow transition-opacity duration-200 border border-slate-200 undefined">
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                        className="h-6 w-6 text-gray-600"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                    </svg>
                    <div className="text-lg font-semibold tracking-wide text-gray-900">
                        Resume Setting
                    </div>
                </div>
                <div>
                    <label className="flex gap-2 text-sm font-medium item-center text-gray-700 undefined">
                        <span className="w-28   text-sm leading-9">
                            Theme Color
                        </span>
                        <input
                            placeholder="#FF4800"
                            className="w-[6rem] border-b border-gray-300 text-center font-semibold leading-3 outline-none text-sm"
                            type="text"
                            defaultValue="#f97316"
                            name="themeColor"
                            style={{ color: "rgb(249, 115, 22)" }}
                        />
                    </label>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <div
                            className="text-white flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm"
                            tabIndex={0}
                            style={{ backgroundColor: "rgb(248, 113, 113)" }}
                        />
                        <div
                            className="text-white flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm"
                            tabIndex={0}
                            style={{ backgroundColor: "rgb(255, 72, 0)" }}
                        />
                        <div
                            className="text-white flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm"
                            tabIndex={0}
                            style={{ backgroundColor: "rgb(251, 146, 60)" }}
                        />
                        <div
                            className="text-white flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm"
                            tabIndex={0}
                            style={{ backgroundColor: "rgb(249, 115, 22)" }}
                        >
                            ✓
                        </div>
                        <div
                            className="text-white flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm"
                            tabIndex={0}
                            style={{ backgroundColor: "rgb(251, 191, 36)" }}
                        />
                        <div
                            className="text-white flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm"
                            tabIndex={0}
                            style={{ backgroundColor: "rgb(245, 158, 11)" }}
                        />
                        <div
                            className="text-white flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm"
                            tabIndex={0}
                            style={{ backgroundColor: "rgb(34, 197, 94)" }}
                        />
                        <div
                            className="text-white flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm"
                            tabIndex={0}
                            style={{ backgroundColor: "rgb(21, 128, 61)" }}
                        />
                        <div
                            className="text-white flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm"
                            tabIndex={0}
                            style={{ backgroundColor: "rgb(56, 189, 248)" }}
                        />
                        <div
                            className="text-white flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm"
                            tabIndex={0}
                            style={{ backgroundColor: "rgb(14, 165, 233)" }}
                        />
                        <div
                            className="text-white flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm"
                            tabIndex={0}
                            style={{ backgroundColor: "rgb(129, 140, 248)" }}
                        />
                        <div
                            className="text-white flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm"
                            tabIndex={0}
                            style={{ backgroundColor: "rgb(99, 102, 241)" }}
                        />
                    </div>
                </div>
                <div>
                    <label className="text-lg font-medium text-gray-700 undefined">
                        Font Family
                    </label>
                    <div className="mt-2 flex flex-wrap gap-3">
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
                            tabIndex={0}
                            style={{ fontFamily: "Roboto", fontSize: "14.6667px" }}
                        >
                            Roboto
                        </div>
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
                            tabIndex={0}
                            style={{ fontFamily: "Lato", fontSize: "14.6667px" }}
                        >
                            Lato
                        </div>
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
                            tabIndex={0}
                            style={{
                                fontFamily: "Montserrat",
                                fontSize: "13.3333px"
                            }}
                        >
                            Montserrat
                        </div>
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
                            tabIndex={0}
                            style={{
                                fontFamily: "OpenSans",
                                fontSize: "13.3333px"
                            }}
                        >
                            Open Sans
                        </div>
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
                            tabIndex={0}
                            style={{ fontFamily: "Raleway", fontSize: "13.3333px" }}
                        >
                            Raleway
                        </div>
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
                            tabIndex={0}
                            style={{
                                fontFamily: "NotoSerif",
                                fontSize: "13.3333px"
                            }}
                        >
                            Noto Serif
                        </div>
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
                            tabIndex={0}
                            style={{
                                fontFamily: "Lora",
                                fontSize: "14.6667px",
                                color: "white",
                                backgroundColor: "rgb(249, 115, 22)",
                                borderColor: "rgb(249, 115, 22)"
                            }}
                        >
                            Lora
                        </div>
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
                            tabIndex={0}
                            style={{
                                fontFamily: "RobotoSlab",
                                fontSize: "13.3333px"
                            }}
                        >
                            Roboto Slab
                        </div>
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
                            tabIndex={0}
                            style={{
                                fontFamily: "PlayfairDisplay",
                                fontSize: "13.3333px"
                            }}
                        >
                            Playfair Display
                        </div>
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
                            tabIndex={0}
                            style={{
                                fontFamily: "Merriweather",
                                fontSize: "13.3333px"
                            }}
                        >
                            Merriweather
                        </div>
                    </div>
                </div>
                <div>
                    <label className="flex gap-2 text-sm font-medium item-center text-gray-700 undefined">
                        <span className="w-28   text-sm leading-9">
                            Font Size (pt)
                        </span>
                        <input
                            placeholder="11"
                            className="w-[6rem] border-b border-gray-300 text-center font-semibold leading-3 outline-none text-sm"
                            type="text"
                            defaultValue={10}
                            name="fontSize"
                        />
                    </label>
                    <div className="mt-2 flex flex-wrap gap-3">
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
                            tabIndex={0}
                            style={{
                                fontFamily: "Lora",
                                fontSize: "13.3333px",
                                color: "white",
                                backgroundColor: "rgb(249, 115, 22)",
                                borderColor: "rgb(249, 115, 22)"
                            }}
                        >
                            Compact
                        </div>
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
                            tabIndex={0}
                            style={{ fontFamily: "Lora", fontSize: "14.6667px" }}
                        >
                            Standard
                        </div>
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
                            tabIndex={0}
                            style={{ fontFamily: "Lora", fontSize: 16 }}
                        >
                            Large
                        </div>
                    </div>
                </div>
                <div>
                    <label className="text-lg font-medium text-gray-700 undefined">
                        Document Size
                    </label>
                    <div className="mt-2 flex flex-wrap gap-3">
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
                            tabIndex={0}
                            style={{
                                color: "white",
                                backgroundColor: "rgb(249, 115, 22)",
                                borderColor: "rgb(249, 115, 22)"
                            }}
                        >
                            <div className="flex flex-col items-center">
                                <div>Letter</div>
                                <div className="text-xs">(US, Canada)</div>
                            </div>
                        </div>
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
                            tabIndex={0}
                        >
                            <div className="flex flex-col items-center">
                                <div>A4</div>
                                <div className="text-xs">(other countries)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ResumeSetting