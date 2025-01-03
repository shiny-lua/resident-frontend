const Skills = () => {
    return (
        <section className="flex flex-col gap-3 rounded-md bg-white p-6 pt-4 shadow transition-opacity duration-200 border border-slate-200 pb-6">
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
                        defaultValue="SKILLS"
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
                                    d="M12 4.5v15m0 0 6.75-6.75M12 19.5l-6.75-6.75"
                                />
                            </svg>
                            <span className="sr-only">Move down</span>
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
                                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                            </svg>
                            <span className="sr-only">Hide section</span>
                        </button>
                    </span>
                </div>
            </div>
            <div
                className="grid overflow-hidden transition-all duration-300 visible"
                style={{ gridTemplateRows: "1fr" }}
            >
                <div className="min-h-0">
                    <div className="col-span-full grid grid-cols-6 gap-3">
                        <div className="relative col-span-full">
                            <div className="relative col-span-6">
                                <button
                                    type="button"
                                    className="rounded outline-none bg-[#f7f7f7] px-2 py-1 leading-3 absolute right-0 top-0"
                                >
                                    <div className="flex flex-row items-center text-[12px]">
                                        <img
                                            className="mr-1 h-4 w-4"
                                            src="https://d12araoe7z5xxk.cloudfront.net/landing-page/images/resumeEditor/ai_star.png"
                                        />{" "}
                                        AI Generate
                                    </div>
                                </button>
                                <label className="text-lg font-medium text-gray-700 col-span-full">
                                    Skills List
                                    <div
                                        contentEditable="true"
                                        className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg mt-[8px] cursor-text [&>div]:list-item pl-7"
                                    >
                                        <div />
                                    </div>
                                </label>
                            </div>
                            <div className="absolute left-[4.5rem] top-[0.07rem]">
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
                        <div className="col-span-full mb-4 mt-6 border-t-2 border-dotted border-gray-200" />
                        <label className="text-lg font-medium text-gray-700 col-span-full">
                            Featured Skills (Optional)
                            <p className="mt-2 text-sm font-normal text-gray-600">
                                Featured skills is optional to highlight top skills,
                                with more circles mean higher proficiency.
                            </p>
                        </label>
                        <div className="flex col-span-6">
                            <input
                                placeholder="Featured Skill 1"
                                className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg"
                                type="text"
                                defaultValue=""
                            />
                            <div className="flex items-center p-2">
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex col-span-6">
                            <input
                                placeholder="Featured Skill 2"
                                className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg"
                                type="text"
                                defaultValue=""
                            />
                            <div className="flex items-center p-2">
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "white",
                                            border: "2px solid rgb(229, 231, 235)"
                                        }}
                                    />
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "white",
                                            border: "2px solid rgb(229, 231, 235)"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex col-span-6">
                            <input
                                placeholder="Featured Skill 3"
                                className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg"
                                type="text"
                                defaultValue=""
                            />
                            <div className="flex items-center p-2">
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex col-span-6">
                            <input
                                placeholder="Featured Skill 4"
                                className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg"
                                type="text"
                                defaultValue=""
                            />
                            <div className="flex items-center p-2">
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex col-span-6">
                            <input
                                placeholder="Featured Skill 5"
                                className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg"
                                type="text"
                                defaultValue=""
                            />
                            <div className="flex items-center p-2">
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex col-span-6">
                            <input
                                placeholder="Featured Skill 6"
                                className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg"
                                type="text"
                                defaultValue=""
                            />
                            <div className="flex items-center p-2">
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div
                                        className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] "
                                        style={{
                                            backgroundColor: "rgb(249, 115, 22)",
                                            border: "2px solid rgb(249, 115, 22)"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Skills