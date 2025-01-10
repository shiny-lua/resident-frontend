import Icon from "../../../components/icon"
import Layout from "../components/layout"

const InterviewCoach = () => {
    return (
        <Layout>
            <div className="h-[100vh] relative flex flex-1 flex-col gap-3 overflow-auto p-4 pb-16 lg:gap-4 lg:p-6 lg:pb-6 md:max-h-screen">
                <div>
                    <div className="sm:flex sm:items-center">
                        <div className="flex-grow border-b border-slate-100 pb-3">
                            <h1 className="inline-block align-middle text-2xl font-bold leading-6">AI Career Coach</h1>
                            <p className="mt-2 text-sm text-gray-700">Our AI Career Coach provides personalized, real-time guidance on career growth, job search strategies, and professional development tailored to your unique goals and industry.</p>
                        </div>
                    </div>
                </div>
                <div className="h-full shrink flex-grow overflow-hidden rounded-xl border px-4 py-8 dt:py-12">
                    <div className="relative flex w-full flex-col overflow-hidden mx-auto h-full max-w-[800px]">
                        <div className="flex-grow overflow-auto px-2">
                            <div className="mx-auto mb-10 flex flex-col justify-between">
                                <div>
                                    <h2 className="mb-12 text-center font-inter text-[20px] font-[700] text-slate-900 sm:mt-10 sm:text-3xl">
                                        Ask me any questions about recruiting, interviews, and careers development
                                    </h2>
                                    <div className="mt-4 grid auto-rows-fr grid-cols-2 gap-6 sm:mt-10 md:grid-cols-4">
                                        <div className="flex-1 cursor-pointer rounded-lg bg-sky-100 p-3 text-left shadow-sm">
                                            <p className="mb-1">🔥</p>
                                            <p className="text-sm text-slate-500 hover:text-black">
                                                How do I transition from my current career to a new field without
                                                taking a step back in salary?
                                            </p>
                                        </div>
                                        <div className="flex-1 cursor-pointer rounded-lg bg-sky-100 p-3 text-left shadow-sm">
                                            <p className="mb-1">📄</p>
                                            <p className="text-sm text-slate-500 hover:text-black">
                                                How can I make my resume stand out for a data analyst position?
                                            </p>
                                        </div>
                                        <div className="flex-1 cursor-pointer rounded-lg bg-sky-100 p-3 text-left shadow-sm">
                                            <p className="mb-1">🖊️</p>
                                            <p className="text-sm text-slate-500 hover:text-black">
                                                What are the best ways to prepare for a leadership role in my
                                                industry?
                                            </p>
                                        </div>
                                        <div className="flex-1 cursor-pointer rounded-lg bg-sky-100 p-3 text-left shadow-sm">
                                            <p className="mb-1">💰</p>
                                            <p className="text-sm text-slate-500 hover:text-black">
                                                What are some strategies for negotiating a higher salary during a job
                                                offer?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 w-full mx-2 mt-6">
                            <div className="mx-auto">
                                <div>
                                    <div className="overflow-hidden rounded-full duration-200 mr-2 border border-sky-300 bg-sky-50 p-2 ">
                                        <div className="flex items-center">
                                            <textarea placeholder="Send a message to coach" className="mx-auto block w-full flex-grow resize-none border-none text-content-primary outline-none placeholder:text-content-tertiary bg-transparent px-2 py-0 text-lg placeholder:overflow-hidden placeholder:text-ellipsis placeholder:whitespace-nowrap empty:max-h-6" name="" id=""></textarea>
                                            <div className="flex shrink-0 self-end">
                                                <button className="flex select-none appearance-none items-center justify-center rounded-full bg-cyan-500 text-white sm:text-xl sm:leading-10 h-8 w-8 text-lg leading-8 disabled:opacity-50" >
                                                    <Icon icon="ArrowUp" className="text-white" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default InterviewCoach