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
                            <Icon icon="MoveDown" />
                            <span className="sr-only">Move down</span>
                        </button>
                    </span>
                    <span>
                        <button
                            type="button"
                            className="rounded outline-none   px-2 py-1 leading-3"
                        >
                            <Icon icon="Hide" />
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
                            <h3 className="flex-1 text-slate-900 font-semibold text-sm relative before-title">
                                1st Experience
                            </h3>
                        </div>
                        <label className="text-lg font-medium text-gray-700 col-span-full">
                            Company
                            <input
                                placeholder="Final Round AI"
                                className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg"
                                type="text"
                            />
                        </label>
                        <label className="text-lg font-medium text-gray-700 col-span-4">
                            Job Title
                            <input
                                placeholder="Chief Resume Editor"
                                className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg"
                                type="text"
                            />
                        </label>
                        <label className="text-lg font-medium text-gray-700 col-span-2">
                            Date
                            <input
                                placeholder="APR 2024 - Present"
                                className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg"
                                type="text"
                            />
                        </label>
                        <div className="relative col-span-full">
                            <div className="relative col-span-6">
                                <button className="rounded outline-none bg-[#f7f7f7] px-2 py-1 leading-3 absolute right-0 top-0">
                                    <div className="flex flex-row items-center text-[12px] gap-1">
                                        <img src="/image/icons/ai_star.png" width={20} height={20} alt="stars" />
                                        AI Generate
                                    </div>
                                </button>
                                <label className="text-lg font-medium text-gray-700 col-span-full">
                                    Description
                                    <div className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg cursor-text [&>div]:list-item pl-7">
                                        <div />
                                    </div>
                                </label>
                            </div>
                            <div className="absolute left-[5.6rem] top-[0.07rem]">
                                <button className="rounded outline-none px-2 py-1 leading-3 !bg-sky-100">
                                    <div className="flex flex-row items-center">
                                        <Icon icon="BulletHidden" />
                                        <span className="text-[10px] ml-[4px]">Bullet Hidden</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-2 flex">
                <button className="flex items-center rounded-md bg-white py-2 pl-3 pr-4 text-sm font-semibold text-link shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <Icon icon="New" />
                    Add an experience
                </button>
            </div>
        </section>
    )
}

export default WorkExperience