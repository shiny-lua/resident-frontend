import Icon from "../../../../components/icon"

const CustomSetting = () => {
    return (
        <section className="flex flex-col gap-3 rounded-md bg-white p-6 pt-4 shadow transition-opacity duration-200 border border-slate-200 pb-2 opacity-60">
            <div className="flex items-center justify-between gap-4">
                <div className="flex grow items-center gap-2">
                    <Icon icon="Skill" />
                </div>
                <div className="flex items-center gap-0.5">
                    <span>
                        <button className="rounded outline-none px-2 py-1 leading-3" >
                            <Icon icon="MoveUp" />
                            <span className="sr-only">Move up</span>
                        </button>
                    </span>
                    <span>
                        <button
                            type="button"
                            className="rounded outline-none px-2 py-1 leading-3"
                        >
                            <Icon icon="Show" />
                            <span className="sr-only">Show section</span>
                        </button>
                    </span>
                </div>
            </div>
            <div className="grid overflow-hidden transition-all duration-300 invisible" style={{ gridTemplateRows: "0fr" }}>
                <div className="min-h-0">
                    <div className="col-span-full grid grid-cols-6 gap-3">
                        <div className="relative col-span-full">
                            <div className="relative col-span-6">
                                <label className="text-lg font-medium text-gray-700 col-span-full">
                                    Custom Textbox
                                    <div className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg cursor-text [&>div]:list-item pl-7" >
                                        <div />
                                    </div>
                                </label>
                            </div>
                            <div className="absolute left-[7.7rem] top-[0.07rem]">
                                <button
                                    type="button"
                                    className="rounded outline-none px-2 py-1 leading-3 !bg-sky-100"
                                >
                                    <div className="flex flex-row items-center">
                                        <Icon icon="BulletHidden" />
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