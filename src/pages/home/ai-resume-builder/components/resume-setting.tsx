import Icon from "../../../../components/icon"

const ResumeSetting = () => {
    return (
        <section className="flex flex-col gap-3 rounded-md bg-white p-6 pt-4 shadow transition-opacity duration-200 border border-slate-200 undefined">
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                    <Icon icon="ResumeSetting" />
                    <div className="text-lg font-semibold tracking-wide text-gray-900">
                        Resume Setting
                    </div>
                </div>
                <div>
                    <label className="flex gap-2 text-sm font-medium item-center text-gray-700 undefined">
                        <span className="w-28 text-sm leading-9">Theme Color</span>
                        <input
                            placeholder="#0ea5e9"
                            className="w-[6rem] border-b border-gray-300 text-center font-semibold leading-3 outline-none text-sm"
                            type="text"
                            defaultValue="#f97316"
                            style={{ color: "rgb(249, 115, 22)" }}
                        />
                    </label>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <div
                            className="text-white flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm"
                            style={{ backgroundColor: "rgb(248, 113, 113)" }}
                        />
                        <div
                            className="text-white flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm"
                            style={{ backgroundColor: "rgb(255, 72, 0)" }}
                        />
                        <div
                            className="text-white flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm"
                            style={{ backgroundColor: "rgb(251, 146, 60)" }}
                        />
                        <div
                            className="text-white flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm"
                            style={{ backgroundColor: "rgb(249, 115, 22)" }}
                        >
                            ✓
                        </div>
                        <div
                            className="text-white flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm"
                            style={{ backgroundColor: "rgb(251, 191, 36)" }}
                        />
                        <div
                            className="text-white flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm"
                            style={{ backgroundColor: "rgb(245, 158, 11)" }}
                        />
                        <div
                            className="text-white flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm"
                            style={{ backgroundColor: "rgb(34, 197, 94)" }}
                        />
                        <div
                            className="text-white flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm"
                            style={{ backgroundColor: "rgb(21, 128, 61)" }}
                        />
                        <div
                            className="text-white flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm"
                            style={{ backgroundColor: "rgb(56, 189, 248)" }}
                        />
                        <div
                            className="text-white flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm"
                            style={{ backgroundColor: "rgb(14, 165, 233)" }}
                        />
                        <div
                            className="text-white flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm"
                            style={{ backgroundColor: "rgb(129, 140, 248)" }}
                        />
                        <div
                            className="text-white flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm"
                            style={{ backgroundColor: "rgb(99, 102, 241)" }}
                        />
                    </div>
                </div>
                <div>
                    <label className="text-lg font-medium text-gray-700 undefined">Font Family</label>
                    <div className="mt-2 flex flex-wrap gap-3">
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
                            style={{ fontFamily: "Roboto", fontSize: "14.6667px" }}
                        >
                            Roboto
                        </div>
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
                            style={{ fontFamily: "Lato", fontSize: "14.6667px" }}
                        >
                            Lato
                        </div>
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
                            style={{
                                fontFamily: "Montserrat",
                                fontSize: "13.3333px"
                            }}
                        >
                            Montserrat
                        </div>
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
                            style={{
                                fontFamily: "OpenSans",
                                fontSize: "13.3333px"
                            }}
                        >
                            Open Sans
                        </div>
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
                            style={{ fontFamily: "Raleway", fontSize: "13.3333px" }}
                        >
                            Raleway
                        </div>
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
                            style={{
                                fontFamily: "NotoSerif",
                                fontSize: "13.3333px"
                            }}
                        >
                            Noto Serif
                        </div>
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
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
                            style={{
                                fontFamily: "RobotoSlab",
                                fontSize: "13.3333px"
                            }}
                        >
                            Roboto Slab
                        </div>
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
                            style={{
                                fontFamily: "PlayfairDisplay",
                                fontSize: "13.3333px"
                            }}
                        >
                            Playfair Display
                        </div>
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
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
                        <span className="w-28 text-sm leading-9">Font Size (pt)</span>
                        <input
                            placeholder="11"
                            className="w-[6rem] border-b border-gray-300 text-center font-semibold leading-3 outline-none text-sm"
                            type="text"
                            defaultValue={10}
                        />
                    </label>
                    <div className="mt-2 flex flex-wrap gap-3">
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
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
                            style={{ fontFamily: "Lora", fontSize: "14.6667px" }}
                        >
                            Standard
                        </div>
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
                            style={{ fontFamily: "Lora", fontSize: 16 }}
                        >
                            Large
                        </div>
                    </div>
                </div>
                <div>
                    <label className="text-lg font-medium text-gray-700 undefined">Document Size</label>
                    <div className="mt-2 flex flex-wrap gap-3">
                        <div
                            className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
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
                        <div className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100">
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