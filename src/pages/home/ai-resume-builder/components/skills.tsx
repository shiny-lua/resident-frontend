import Icon from "../../../../components/icon"

const Skills = () => {
    return (
        <section className="flex flex-col gap-3 rounded-md bg-white p-6 pt-4 shadow transition-opacity duration-200 border border-slate-200 pb-6">
            <div className="flex items-center justify-between gap-4">
                <div className="flex grow items-center gap-2">
                    <Icon icon="Skill" />
                    <input
                        className="block w-full border-b border-transparent text-lg font-semibold tracking-wide text-gray-900 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm"
                        type="text"
                        defaultValue="SKILLS"
                    />
                </div>
                <div className="flex items-center gap-0.5">
                    <span>
                        <button className="rounded outline-none px-2 py-1 leading-3">
                            <Icon icon="MoveUp" />
                            <span className="sr-only">Move up</span>
                        </button>
                    </span>
                    <span>
                        <button className="rounded outline-none px-2 py-1 leading-3">
                            <Icon icon="MoveDown" />
                            <span className="sr-only">Move down</span>
                        </button>
                    </span>
                    <span>
                        <button className="rounded outline-none px-2 py-1 leading-3">
                            <Icon icon="Hide" />
                            <span className="sr-only">Hide section</span>
                        </button>
                    </span>
                </div>
            </div>
            <div className="grid overflow-hidden transition-all duration-300 visible" style={{ gridTemplateRows: "1fr" }}>
                <div className="min-h-0">
                    <div className="col-span-full grid grid-cols-6 gap-3">
                        <div className="relative col-span-full">
                            <div className="relative col-span-6">
                                <button className="rounded outline-none bg-[#f7f7f7] px-2 py-1 leading-3 absolute right-0 top-0">
                                    <div className="flex flex-row items-center text-[12px] gap-1">
                                        <img src="/image/icons/ai_star.png" width={20} height={20} alt="stars" />
                                        AI Generate
                                    </div>
                                </button>
                                <label className="text-lg font-medium text-gray-700 col-span-full">
                                    Skills List
                                    <div className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg cursor-text [&>div]:list-item pl-7" >
                                        <div />
                                    </div>
                                </label>
                            </div>
                            <div className="absolute left-[4.5rem] top-[0.07rem]">
                                <button className="rounded outline-none px-2 py-1 leading-3 !bg-sky-100" >
                                    <div className="flex flex-row items-center">
                                        <Icon icon="BulletHidden" />
                                        <span className="text-[10px] ml-[4px]">Bullet Hidden</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="col-span-full mb-4 mt-6 border-t-2 border-dotted border-gray-200" />
                        <label className="text-lg font-medium text-gray-700 col-span-full">
                            Featured Skills (Optional)
                            <p className="mt-2 text-sm font-normal text-gray-600">Featured skills is optional to highlight top skills, with more circles mean higher proficiency.</p>
                        </label>
                        <div className="flex col-span-6">
                            <input
                                placeholder="Featured Skill 1"
                                className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg"
                                type="text"
                            />
                            <div className="flex items-center p-2">
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
                                </div>
                            </div>
                        </div>
                        <div className="flex col-span-6">
                            <input
                                placeholder="Featured Skill 2"
                                className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg"
                                type="text"
                            />
                            <div className="flex items-center p-2">
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-white border border-sky-500"/>
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-white border border-sky-500"/>
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
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
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
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
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
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
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
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
                                </div>
                                <div className="cursor-pointer p-0.5">
                                    <div className="h-5 w-5 rounded-full transition-transform duration-200 hover:scale-[120%] bg-sky-500 border border-sky-500 "/>
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