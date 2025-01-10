import Icon from "../../../components/icon"
import Layout from "../components/layout"

const AiGenerater = () => {
    return (
        <Layout>
            <div className="relative flex flex-1 flex-col gap-3 overflow-auto p-4 pb-16 lg:gap-4 lg:p-6 lg:pb-6 md:max-h-screen">
                <div>
                    <div className="sm:flex sm:items-center">
                        <div className="flex-grow border-b border-slate-100 pb-3">
                            <h1 className="inline-block align-middle text-2xl font-bold leading-6">AI Material Generator</h1>
                            <p className="mt-2 text-sm text-gray-700">Generate resume, cover letters, and interview flashcards tailored to each job.</p>
                        </div>
                    </div>
                    <div className="mt-3 flow-root">
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm hidden md:table">
                                <thead>
                                    <tr className="border-b transition-colors hover:bg-slate-100/50 h-12 bg-slate-50">
                                        <th className="h-10 px-2 text-left align-middle font-semibold text-slate-900">Role</th>
                                        <th className="h-10 px-2 text-left align-middle hidden font-semibold text-slate-900 sm:table-cell">Company</th>
                                        <th className="h-10 px-2 text-left align-middle hidden cursor-pointer font-semibold text-slate-900 sm:table-cell">Resume</th>
                                        <th className="h-10 px-2 text-left align-middle hidden cursor-pointer font-semibold text-slate-900 sm:table-cell">Cover</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b transition-colors hover:bg-slate-100/50">
                                        <td className="p-2 align-middle">
                                            <div className="w-[180px] overflow-hidden overflow-ellipsis whitespace-nowrap text-slate-700">sdf</div>
                                        </td>
                                        <td className="p-2 align-middle hidden sm:table-cell">
                                            <div className="w-[180px] overflow-hidden overflow-ellipsis whitespace-nowrap text-slate-700">sdf</div>
                                        </td>
                                        <td className="p-2 align-middle hidden sm:table-cell">
                                            <div className="flex items-center">
                                                <div className="flex flex-row">
                                                    <button className="whitespace-nowrap rounded-md text-sm font-medium border mr-2 flex h-auto items-center justify-center p-2">
                                                        <Icon icon="Download" />
                                                    </button>
                                                    <button className="whitespace-nowrap rounded-md text-sm font-medium border flex h-auto items-center justify-center p-2">
                                                        <Icon icon="Refresh" />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-2 align-middle hidden sm:table-cell">
                                            <div className="flex items-center">
                                                <div className="flex flex-row">
                                                    <button className="whitespace-nowrap rounded-md text-sm font-medium border mr-2 flex h-auto items-center justify-center p-2">
                                                        <Icon icon="Download" />
                                                    </button>
                                                    <button className="whitespace-nowrap rounded-md text-sm font-medium border flex h-auto items-center justify-center p-2">
                                                        <Icon icon="Refresh" />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b transition-colors hover:bg-slate-100/50">
                                        <td className="p-2 align-middle">
                                            <div className="w-[180px] overflow-hidden overflow-ellipsis whitespace-nowrap text-slate-700">Web Developer</div>
                                        </td>
                                        <td className="p-2 align-middle hidden sm:table-cell">
                                            <div className="w-[180px] overflow-hidden overflow-ellipsis whitespace-nowrap text-slate-700">Swiss Re AG</div>
                                        </td>
                                        <td className="p-2 align-middle hidden sm:table-cell">
                                            <div className="flex items-center">
                                                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium border h-auto px-2 py-[6px] text-sm text-slate-900">
                                                    <Icon icon="MagicEdit" />
                                                    Generate
                                                </button>
                                            </div>
                                        </td>
                                        <td className="p-2 align-middle hidden sm:table-cell">
                                            <div className="flex items-center">
                                                <div className="flex flex-row">
                                                    <button className="whitespace-nowrap rounded-md text-sm font-medium border mr-2 flex h-auto items-center justify-center p-2">
                                                        <Icon icon="Download" />
                                                    </button>
                                                    <button className="whitespace-nowrap rounded-md text-sm font-medium border flex h-auto items-center justify-center p-2">
                                                        <Icon icon="Refresh" />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="h-min">
                            <div className="rounded-xl border bg-card text-card-foreground mb-4 shadow-none md:hidden">
                                <div className="flex flex-col space-y-1.5 p-4 pb-2 text-base font-semibold">
                                    <h3 className="font-semibold leading-none tracking-tight break-words">
                                        sdf
                                    </h3>
                                </div>
                                <div className="flex items-center rounded-b-xl p-4 bg-transparent px-4 py-2">
                                    <div className="w-full">
                                        <div className="mb-2 flex w-full flex-row items-center justify-between border-t border-slate-200 pt-2">
                                            <div className="text-sm text-slate-700">Resume</div>
                                            <div className="flex flex-row">
                                                <button className="whitespace-nowrap rounded-md text-sm font-medium border mr-2 flex h-auto items-center justify-center p-2">
                                                    <Icon icon="Download" />
                                                </button>
                                                <button className="whitespace-nowrap rounded-md text-sm font-medium border flex h-auto items-center justify-center p-2">
                                                    <Icon icon="Refresh" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mb-2 flex w-full flex-row items-center justify-between border-t border-slate-200 pt-2">
                                            <div className="text-sm text-slate-700">Cover Letter</div>
                                            <div className="flex flex-row">
                                                <button className="whitespace-nowrap rounded-md text-sm font-medium border mr-2 flex h-auto items-center justify-center p-2">
                                                    <Icon icon="Download" />
                                                </button>
                                                <button className="whitespace-nowrap rounded-md text-sm font-medium border flex h-auto items-center justify-center p-2">
                                                    <Icon icon="Refresh" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-xl border bg-card text-card-foreground mb-4 shadow-none md:hidden">
                                <div className="flex flex-col space-y-1.5 p-4 pb-2 text-base font-semibold">
                                    <h3 className="font-semibold leading-none tracking-tight break-words">
                                        Web Developer
                                    </h3>
                                </div>
                                <div className="flex items-center rounded-b-xl p-4 bg-transparent px-4 py-2">
                                    <div className="w-full">
                                        <div className="mb-2 flex w-full flex-row items-center justify-between border-t border-slate-200 pt-2">
                                            <div className="text-sm text-slate-700">Resume</div>
                                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium border h-auto px-2 py-[6px] text-sm text-slate-900">
                                                <Icon icon="MagicEdit" />
                                                Generate
                                            </button>
                                        </div>
                                        <div className="mb-2 flex w-full flex-row items-center justify-between border-t border-slate-200 pt-2">
                                            <div className="text-sm text-slate-700">Cover Letter</div>
                                            <div className="flex flex-row">
                                                <button className="whitespace-nowrap rounded-md text-sm font-medium border mr-2 flex h-auto items-center justify-center p-2">
                                                    <Icon icon="Download" />
                                                </button>
                                                <button className="whitespace-nowrap rounded-md text-sm font-medium border flex h-auto items-center justify-center p-2">
                                                    <Icon icon="Refresh" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-4 flex h-8 items-center justify-center gap-6">
                        <div className="flex items-center space-x-2 antialiased">
                            <h4>
                                <span className="text-xs font-medium text-[#6B7280]"> Page </span>
                                <span className="text-xs font-medium text-slate-900">1/1</span>
                            </h4>
                            <h4>
                                <span className="text-xs font-medium text-[#6B7280]"> Total </span>
                                <span className="text-xs font-medium text-slate-900">2</span>
                            </h4>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium border-slate-300 box-content h-8 w-8 px-0 py-0" >
                                <Icon icon="ArrowLeft" />
                            </button>
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium border-slate-300 box-content h-8 w-8 px-0 py-0" >
                                <Icon icon="ChevronRight" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AiGenerater