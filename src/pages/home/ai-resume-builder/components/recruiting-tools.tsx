import { Link } from "react-router-dom"

const RecruitingTools = () => {
    return (
        <div className="px-4 pt-10 md:pt-0">
            <div className="text-center md:pt-[200px] px-3 pt-[100px] ">
                <div className="mx-auto max-w-[983px] font-albra text-[32px] leading-none tracking-tight md:text-5xl md:leading-[48px]">
                    A suite of powerful AI tools to help you navigate this recruiting season
                </div>
            </div>
            <div className="mx-auto mt-12 flex w-full min-w-[320px] max-w-[1200px] flex-row flex-wrap items-center justify-center gap-2 md:mt-16 md:flex-nowrap">
                <div className="order-last mt-6 flex h-[354px] w-full min-w-[230px] flex-col items-center justify-center rounded-[24px] border border-gray-200 bg-white px-6 py-8 sm:max-w-[364px] md:order-none md:mt-0 lg:h-[394px] lg:px-8 lg:py-12">
                    <img
                        alt="Mock Interview"
                        width={64}
                        height={64}
                        src="/image/icons/mock.svg"
                    />
                    <div className="mt-4 font-albra text-3xl">Mock Interview</div>
                    <div className="mt-4 text-center text-lg font-[500] text-gray-500">
                        Immersive interview simulation and practice
                    </div>
                    <Link
                        className="dt:mt-[58px] mt-[38px] h-[40px] w-[145px] cursor-pointer rounded-[6px] text-center border border-gray-200 bg-sky-500 px-4 py-[10px] text-md text-white hover:text-sky-500 hover:bg-sky-200"
                        to="/app/interview"
                    >
                        Get Started Free
                    </Link>
                    <Link
                        className="mt-4 h-[40px] w-[145px] cursor-pointer rounded-[6px] border border-gray-200 px-4 py-[10px] text-center text-md text-black hover:text-sky-500 hover:bg-sky-200"
                        to="/ai-mock-interview"
                    >
                        learn more
                    </Link>
                </div>
                <div className="flex h-[360px] w-full min-w-[260px] flex-col items-center justify-center rounded-[24px] bg-gradient-to-r from-[#0090FF] to-[#00F7FF] px-8 py-8 sm:max-w-[364px] lg:mx-6 lg:h-[450px] lg:max-w-[424px] lg:px-8 lg:py-12">
                    <img
                        alt="Interview Copilot"
                        width={64}
                        height={64}
                        src="/image/icons/interview-copilot.svg"
                    />
                    <div className="mt-4 flex flex-row font-albra text-3xl text-white">Interview Copilot™</div>
                    <div className="mt-4 text-center text-lg font-[600] text-gray-500 text-white">
                        Offers actionable guidance in real-time during interviews
                    </div>
                    <Link
                        className="dt:mt-12 mt-4 h-[56px] cursor-pointer rounded-[6px] border border-gray-200 bg-white px-6 py-[16px] text-black lg:mt-[38px] hover:text-sky-500 hover:bg-sky-200"
                        to="https://app.finalroundai.com/app/v2/interview"
                    >
                        Get Started Free
                    </Link>
                    <Link
                        className="mt-4 h-[56px] cursor-pointer rounded-[6px] border border-gray-200 bg-transparent px-6 py-[16px] text-white lg:mt-[16px] hover:text-sky-500 hover:bg-sky-200"
                        to="/interview-copilot"
                    >
                        Learn More
                    </Link>
                </div>
                <div className="mt-6 flex h-[354px] w-full min-w-[230px] flex-col items-center justify-center rounded-[24px] border border-gray-200 bg-white px-8 py-8 sm:max-w-[364px] md:mt-0 lg:h-[394px] lg:px-8 lg:py-12">
                    <img
                        alt="AI Resume builder"
                        loading="lazy"
                        width={64}
                        height={64}
                        decoding="async"
                        data-nimg={1}
                        style={{ color: "transparent" }}
                        src="/image/icons/ai-resume.svg"
                    />
                    <div className="mt-4 font-albra text-3xl">AI Resume builder</div>
                    <div className="mt-4 text-center text-lg font-[500] text-gray-500">
                        Generate hire-able resume in seconds
                    </div>
                    <Link
                        className="dt:mt-[80px] mt-[60px] h-[40px] w-[145px] cursor-pointer rounded-[6px] text-center border border-gray-200 bg-sky-500 px-4 py-[10px] text-md text-white hover:text-sky-500 hover:bg-sky-200"
                        to="https://app.finalroundai.com/app/v2/resume"
                    >
                        Get Started Free
                    </Link>
                    <Link
                        className="mt-4 h-[40px] w-[145px] cursor-pointer rounded-[6px] border border-gray-200 px-4 py-[10px] text-center text-md text-black hover:text-sky-500 hover:bg-sky-200"
                        to="/ai-resume-builder"
                    >
                        learn more
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RecruitingTools