const CustomSetting = () => {
    return (
        <section className="flex flex-col gap-3 rounded-md bg-white p-6 pt-4 shadow transition-opacity duration-200 border border-slate-200 pb-2 opacity-60">
            <div className="flex items-center justify-between gap-4">
                <div className="flex grow items-center gap-2">
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
                            d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.867 19.125h.008v.008h-.008v-.008Z"
                        />
                    </svg>
                    <input
                        className="block w-full border-b border-transparent text-lg font-semibold tracking-wide text-gray-900 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm"
                        type="text"
                        defaultValue="CUSTOM SECTION"
                    />
                </div>
                <div className="flex items-center gap-0.5">
                    <span>
                        <button
                            type="button"
                            className="rounded outline-none   px-2 py-1 leading-3"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                                data-slot="icon"
                                className="h-6 w-6 text-gray-400"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 19.5v-15m0 0-6.75 6.75M12 4.5l6.75 6.75"
                                />
                            </svg>
                            <span className="sr-only">Move up</span>
                        </button>
                    </span>
                    <span>
                        <button
                            type="button"
                            className="rounded outline-none   px-2 py-1 leading-3"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                                data-slot="icon"
                                className="h-6 w-6 text-gray-400"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                                />
                            </svg>
                            <span className="sr-only">Show section</span>
                        </button>
                    </span>
                </div>
            </div>
            <div
                className="grid overflow-hidden transition-all duration-300 invisible"
                style={{ gridTemplateRows: "0fr" }}
            >
                <div className="min-h-0">
                    <div className="col-span-full grid grid-cols-6 gap-3">
                        <div className="relative col-span-full">
                            <div className="relative col-span-6">
                                <label className="text-lg font-medium text-gray-700 col-span-full">
                                    Custom Textbox
                                    <div
                                        contentEditable="true"
                                        className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg mt-[8px] cursor-text [&>div]:list-item pl-7"
                                    >
                                        <div />
                                    </div>
                                </label>
                            </div>
                            <div className="absolute left-[7.7rem] top-[0.07rem]">
                                <button
                                    type="button"
                                    className="rounded outline-none bg-[#f7f7f7] px-2 py-1 leading-3 !bg-sky-100"
                                >
                                    <div className="flex flex-row items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                            data-slot="icon"
                                            className="h-4 w-4 text-gray-700"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                            />
                                        </svg>
                                        <span className="text-[10px] ml-[4px]">
                                            Bullet Hidden
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CustomSetting