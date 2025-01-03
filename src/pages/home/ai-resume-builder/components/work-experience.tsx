import Icon from "../../../../components/icon"

const WorkExperience = () => {
    return (
        <section className="flex flex-col gap-3 rounded-md bg-white p-6 pt-4 shadow transition-opacity duration-200 border border-slate-200 pb-6">
            <div className="flex items-center justify-between gap-4">
                <div className="flex grow items-center gap-2">
                    <Icon icon="Work" />
                    <input
                        className="block w-full border-b border-transparent text-lg font-semibold tracking-wide text-gray-900 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm"
                        type="text"
                        defaultValue="WORK EXPERIENCE"
                    />
                </div>
                <div className="flex items-center gap-0.5">
                    <span>
                        <button
                            type="button"
                            className="rounded outline-none px-2 py-1 leading-3"
                        >
                            <Icon icon="ArrowDown" />
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
                    <div className="relative grid grid-cols-6 gap-3">
                        <div className="col-span-full flex justify-center items-center h-9 bg-slate-100 px-3 py-2">
                            <h3 className="flex-1 text-slate-900 font-semibold text-sm relative before-title ">
                                1st Experience
                            </h3>
                            <div />
                            <div />
                        </div>
                        <label className="text-lg font-medium text-gray-700 col-span-full">
                            Company
                            <input
                                placeholder="Final Round AI"
                                className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg"
                                type="text"
                                defaultValue=""
                                name="company"
                            />
                        </label>
                        <label className="text-lg font-medium text-gray-700 col-span-4">
                            Job Title
                            <input
                                placeholder="Chief Resume Editor"
                                className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg"
                                type="text"
                                defaultValue=""
                                name="jobTitle"
                            />
                        </label>
                        <label className="text-lg font-medium text-gray-700 col-span-2">
                            Date
                            <input
                                placeholder="APR 2024 - Present"
                                className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg"
                                type="text"
                                defaultValue=""
                                name="date"
                            />
                        </label>
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
                                    Description
                                    <div
                                        contentEditable="true"
                                        className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg mt-[8px] cursor-text [&>div]:list-item pl-7"
                                    >
                                        <div />
                                    </div>
                                </label>
                            </div>
                            <div className="absolute left-[5.6rem] top-[0.07rem]">
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
            <div className="mt-2 flex">
                <button
                    type="button"
                    className="flex items-center rounded-md bg-white py-2 pl-3 pr-4 text-sm font-semibold text-link shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                        className="-ml-0.5 mr-1.5 h-5 w-5 text-link"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                    Add an experience
                </button>
            </div>
        </section>
    )
}

export default WorkExperience