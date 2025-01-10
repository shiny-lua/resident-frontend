import { Link } from "react-router-dom"
import Icon from "../../../components/icon"

const Progress = () => {
    return (
        <div className="relative lg:flex lg:flex-col lg:gap-[10svh]">
            <section className="lg:sticky static top-0 p-5 min-h-[100svh] flex bg-black lg:pb-5 pb-0">
                <div className="p-8 rounded-[2rem] bg-white w-full flex flex-col items-center justify-center self-stretch relative overflow-hidden lg:p-8 px-4 sm:pb-[6.69rem] pb-[4.44rem] sm:pt-20 pt-[5.25rem]">
                    <div className="bubbles-wrapper absolute bottom-0 left-0 right-0 top-0 min-h-[100svh] z-[1] ">
                        <div className="blur-overlay" />
                        <div className="bubble is--blue" />
                        <div className="bubble is--sky" />
                        <div className="bubble is--green" />
                    </div>
                    <div className="flex flex-col items-center lg:gap-16 gap-12 text-center relative z-10 lg:mb-[6.87rem] lg:max-w-[34.8125rem]">
                        <p className="text-xl leading-[1.31] tracking-[-0.0225rem] text-gray-900/30">
                            From Day One to Final Rounds
                        </p>
                        <h2 className="font-albra text-[30px] md:text-[36px] tracking-tight max-w-[46.9375rem]">
                            A suite of AI tools to navigate through this difficult recruiting
                            season
                        </h2>
                    </div>
                    <div className="text-center max-w-[82rem] w-full px-4 relative z-10 flex justify-between gap-8 flex-col items-center lg:flex-row lg:items-start">
                        <ul className="text-nowrap flex flex-col gap-1 pt-25">
                            <li className="relative mb-12">
                                <h3 className="text-3xl md:text-4xl font-albra">Before Interviews</h3>
                                <span className="absolute right-[-1rem] bottom-[0.9rem] opacity-50 text-gray-500">1</span>
                            </li>
                            <li>
                                <div className="px-8 py-4 rounded-full bg-white">
                                    <Link className="hover:text-sky-500" to="/app/resume" >AI Resume Builder</Link>
                                </div>
                            </li>
                            <li>
                                <div className="px-8 py-4 rounded-full bg-white">
                                    <Link className="hover:text-sky-500" to="/app/interview" >AI Mock Interview</Link>
                                </div>
                            </li>
                        </ul>
                        <span className="bg-gray-500 opacity-20 lg:h-[0.125rem] lg:w-full h-12 w-[0.125rem] lg:max-w-[11.111vw] mt-3" />
                        <ul className="text-nowrap flex flex-col gap-1">
                            <li className="relative mb-12">
                                <h3 className="text-3xl md:text-4xl font-albra">During Interviews</h3>
                                <span className="absolute right-[-1rem] bottom-[0.9rem] opacity-50 text-gray-500">2</span>
                            </li>
                            <li>
                                <div className="px-8 py-4 rounded-full bg-white">
                                    <Link className="hover:text-sky-500" to="/app/interview">🚀 Interview Copilot™</Link>
                                </div>
                            </li>
                            <li>
                                <div className="px-8 py-4 rounded-full bg-white">
                                    <Link className="hover:text-sky-500" to="/app/interview">Real-Time Transcription</Link>
                                </div>
                            </li>
                            {/* <li>
                                <div className="px-8 py-4 rounded-full bg-white">
                                    <Link className="hover:text-sky-500" to="/app/store">Domain Knowledge Support</Link>
                                </div>
                            </li> */}
                            <li>
                                <div className="px-8 py-4 rounded-full bg-white">
                                    <Link className="hover:text-sky-500" to="/app/interview">Coding Copilot</Link>
                                </div>
                            </li>
                        </ul>
                        <span className="bg-gray-500 opacity-20 lg:h-[0.125rem] lg:w-full h-12 w-[0.125rem] lg:max-w-[11.111vw] mt-3" />
                        <ul className="text-nowrap flex flex-col gap-1">
                            <li className="relative mb-12">
                                <h3 className="text-3xl md:text-4xl font-albra">After Interviews</h3>
                                <span className="absolute right-[-1rem] bottom-[0.9rem] opacity-50 text-gray-500">3</span>
                            </li>
                            <li>
                                <div className="px-8 py-4 rounded-full bg-white">
                                    <Link className="hover:text-sky-500" to="/app/interview?tab=completed">Interview Summary
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <div className="px-8 py-4 rounded-full bg-white">
                                    <Link className="hover:text-sky-500" to="/app/interview?tab=completed">Interview Analytics
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <div className="px-8 py-4 rounded-full bg-white">
                                    <Link className="hover:text-sky-500" to="/app/interview?tab=completed">Sentiment Assessment
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="lg:sticky static top-0 p-5 min-h-[100svh] flex bg-black lg:pb-5 pb-0">
                <div className="p-8 rounded-[2rem] bg-white w-full flex flex-col items-center justify-center self-stretch relative overflow-hidden lg:p-8 sm:p-12 p-4 ">
                    <div className="horizontal-tab flex items-stretch self-stretch h-full gap-50">
                        <div className="lg:max-w-[35.4rem] w-full flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-4">
                                    <div className="rounded-[2rem] py-3 px-4 mb-12 flex items-center justify-center gap-2 bg-primary text-white">
                                        <Icon icon="AiResumeBuilder" />
                                        <h3 className="text-xl">AI Resume Builder</h3>
                                    </div>
                                </div>
                                <h2 className="text-[1.9rem] sm:text-[2.5rem] leading-tight font-albra mb-12 w-full">
                                    Generate a hireable resume with ease in one-click.
                                </h2>
                            </div>
                            <div className="w-full relative z-10 overflow-hidden lg:hidden flex flex-col items-end justify-center lg:min-h-auto sm:min-h-[41.2rem] min-h-[21.8rem] mb-12">
                                <div className="bubbles-wrapper absolute bottom-0 left-0 right-0 top-0 min-h-[100svh] z-[-1] rounded-lg rotate-180 overflow-hidden ">
                                    <div className="blur-overlay rounded-lg overflow-hidden" />
                                    <div className="bubble is--blue" />
                                    <div className="bubble is--sky" />
                                    <div className="bubble is--green" />
                                </div>
                                <img
                                    alt="AI Resume Builder"
                                    loading="lazy"
                                    width="1169.191"
                                    height="774.875"
                                    decoding="async"
                                    data-nimg={1}
                                    className="absolute bottom-[-8%] left-[15%] h-[105%] max-w-none max-h-none w-auto rotate-[-13.477deg]"
                                    style={{ color: "transparent" }}
                                    srcSet="/_next/image?url=https%3A%2F%2Fd12araoe7z5xxk.cloudfront.net%2Flanding-page%2Fimages%2Fsticky-tabs%2Fats-optimized.webp&w=1200&q=75 1x, /_next/image?url=https%3A%2F%2Fd12araoe7z5xxk.cloudfront.net%2Flanding-page%2Fimages%2Fsticky-tabs%2Fats-optimized.webp&w=3840&q=75 2x"
                                    src="/_next/image?url=https%3A%2F%2Fd12araoe7z5xxk.cloudfront.net%2Flanding-page%2Fimages%2Fsticky-tabs%2Fats-optimized.webp&w=3840&q=75"
                                />
                            </div>
                            <div>
                                <ul className="service-list flex gap-6 overflow-hidden flex-col">
                                    <li className="">
                                        <div className="relative text-left pt-6 border-t-2 text-lg border-gray-quinary is--active">
                                            <h3 className="mb-4 transition-colors duration-200 text-gray-primary">
                                                ATS Optimized
                                            </h3>
                                            <p className="transition-colors duration-200 text-gray-tertiary">
                                                Designed to ensure ATS optimization so your credentials
                                                stand out to top employers and pass machine screening
                                                process.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="">
                                        <div className="relative text-left pt-6 border-t-2 text-lg border-gray-quinary ">
                                            <h3 className="mb-4 transition-colors leading-[1.31] tracking-[-0.0225rem]xt-gray-900/30">
                                                Personalization with AI
                                            </h3>
                                            <p className="transition-colors leading-[1.31] tracking-[-0.0225rem]xt-gray-900/30">
                                                Customize your document with intelligent suggestions
                                                tailored to your career goals. Stand out from the crowd with
                                                a resume that's uniquely yours, yet professionally
                                                appealing.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                                <div className="mt-10 w-full md:w-80 flex justify-center">
                                    <Link to="/app/resume" className="flex justify-center w-full bg-black text-white rounded-lg text-xl py-5 ">Launch Resume Builder</Link>
                                </div>
                            </div>
                        </div>
                        <div className="w-full relative z-10 overflow-hidden lg:flex hidden flex-col items-end justify-center">
                            <div className="bubbles-wrapper absolute bottom-0 left-0 right-0 top-0 min-h-[100svh] z-[-1] rounded-lg rotate-180 overflow-hidden ">
                                <div className="blur-overlay rounded-lg overflow-hidden" />
                                <div className="bubble is--blue" />
                                <div className="bubble is--sky" />
                                <div className="bubble is--green" />
                            </div>
                            <img
                                src="https://d12araoe7z5xxk.cloudfront.net/landing-page/images/sticky-tabs/ats-optimized.webp"
                                alt="AI Resume Builder"
                                width="1169.191"
                                height="774.875"
                                loading="lazy"
                                className="absolute bottom-[-4%] left-[16.255%] lg:min-h-[100%] sm:min-h-[100%] max-w-none rotate-[-13.477deg]"
                                style={{
                                    translate: "none",
                                    rotate: "none",
                                    scale: "none",
                                    transform:
                                        "translate(0px, -0.1857px) rotate(-13.4768deg) skew(0.000557182deg, 0deg)"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section
                className="lg:sticky static top-0 p-5 min-h-[100svh] flex bg-black lg:pb-5 pb-0"
                id="mock-interview"
            >
                <div className="rounded-[2rem] bg-white w-full flex flex-col items-center justify-center self-stretch relative overflow-hidden lg:p-8 sm:p-12 p-4 ">
                    <div className="horizontal-tab radius-[2rem] h-full bg-white flex flex-col items-start justify-between">
                        <div className="rounded-[2rem] py-3 px-4 mb-6 flex items-center justify-center gap-2 bg-violet-400 text-white">
                            <Icon icon="AiMockInterview" />
                            <h3 className="text-xl">AI Mock Interview</h3>
                        </div>
                        <div className="flex items-end justify-between self-stretch my-12">
                            <h2 className="max-w-[1000px] text-[1.9rem] sm:text-[2.5rem] leading-tight font-albra w-full">
                                Prepare your session with the most immersive mock interview powered
                                by AI
                            </h2>
                            <div className="w-80 hidden lg:flex justify-center">
                                <Link to="/app" className="flex justify-center w-full bg-black text-white rounded-lg text-xl py-5 ">Launch Mock Interview</Link>
                            </div>
                        </div>
                        <div className="mb-12 lg:flex-1 self-stretch relative rounded-[0.5rem] z-10 overflow-hidden lg:h-auto sm:h-[41.2rem] h-[21.8rem]">
                            <div className="bubbles-wrapper absolute bottom-0 left-0 right-0 top-0 min-h-[100svh] z-[-1] rotate-180 rounded-lg overflow-hidden ">
                                <div className="blur-overlay rounded-lg overflow-hidden" />
                                <div className="bubble is--blue" />
                                <div className="bubble is--sky" />
                                <div className="bubble is--green" />
                            </div>
                            <div className="absolute left-[50%] translate-x-[-50%] lg:translate-y-[0%] lg:top-[9%] lg:w-[80.539%] lg:h-[91%] sm:w-[86.557%] sm:h-[49.162%] top-[50%] translate-y-[-50%] w-[90.994%] h-[49.162%]">
                                <img
                                    alt="AI Mock Interview"
                                    loading="lazy"
                                    width={1076}
                                    height={672}
                                    decoding="async"
                                    data-nimg={1}
                                    className="absolute lg:top-[9.002%] top-[50%] left-[50%] lg:translate-y-[0%] translate-y-[-50%] translate-x-[-50%] w-[100%]"
                                    style={{ color: "transparent" }}
                                    srcSet="/_next/image?url=https%3A%2F%2Fd12araoe7z5xxk.cloudfront.net%2Flanding-page%2Fimages%2Fsticky-tabs%2Ffr-intcop%203.webp&w=1080&q=75 1x, /_next/image?url=https%3A%2F%2Fd12araoe7z5xxk.cloudfront.net%2Flanding-page%2Fimages%2Fsticky-tabs%2Ffr-intcop%203.webp&w=3840&q=75 2x"
                                    src="/_next/image?url=https%3A%2F%2Fd12araoe7z5xxk.cloudfront.net%2Flanding-page%2Fimages%2Fsticky-tabs%2Ffr-intcop%203.webp&w=3840&q=75"
                                />
                                <img
                                    alt="AI Mock Interview"
                                    loading="lazy"
                                    width={826}
                                    height={107}
                                    decoding="async"
                                    data-nimg={1}
                                    className="absolute z-10 lg:rounded-[1rem] lg:top-[14.25rem] lg:left-[20.725%] lg:w-[76.766%] sm:left-[20%] sm:w-[79%] sm:top-[28.729%] left-[20%] w-[79%] top-[30%]"
                                    style={{ color: "transparent" }}
                                    srcSet="/_next/image?url=https%3A%2F%2Fd12araoe7z5xxk.cloudfront.net%2Flanding-page%2Fimages%2Fsticky-tabs%2Ffr-intcop%204.webp&w=828&q=75 1x, /_next/image?url=https%3A%2F%2Fd12araoe7z5xxk.cloudfront.net%2Flanding-page%2Fimages%2Fsticky-tabs%2Ffr-intcop%204.webp&w=1920&q=75 2x"
                                    src="/_next/image?url=https%3A%2F%2Fd12araoe7z5xxk.cloudfront.net%2Flanding-page%2Fimages%2Fsticky-tabs%2Ffr-intcop%204.webp&w=1920&q=75"
                                />
                            </div>
                        </div>
                        <ul className="service-list flex gap-6 overflow-hidden lg:flex-row flex-col">
                            <li className="flex-1">
                                <div className="relative text-left pt-6 border-t-2 text-xl border-gray-quinary is--active">
                                    <h3 className="mb-4 transition-colors duration-200 text-gray-primary">
                                        Industry-Specific Scenarios
                                    </h3>
                                    <p className="transition-colors duration-200 text-gray-tertiary">
                                        Get a competitive edge by practicing with questions designed to
                                        reflect the latest industry trends and expectations.
                                    </p>
                                </div>
                            </li>
                            <li className="flex-1">
                                <div className="relative text-left pt-6 border-t-2 text-xl border-gray-quinary ">
                                    <h3 className="mb-4 transition-colors leading-[1.31] tracking-[-0.0225rem]xt-gray-900/30">
                                        Real-Time Feedback
                                    </h3>
                                    <p className="transition-colors leading-[1.31] tracking-[-0.0225rem]xt-gray-900/30">
                                        Facilitates accessibility by allowing individuals with hearing
                                        impairments to follow along with spoken content in real-time,
                                        enhancing inclusivity and understanding.
                                    </p>
                                </div>
                            </li>
                        </ul>
                        <div className="mt-10 w-full lg:hidden flex justify-center">
                            <Link to="/app" className="flex justify-center w-full bg-black text-white rounded-lg text-xl py-5 ">Launch Mock Interview</Link>
                        </div>
                    </div>
                </div>
            </section>
            <section
                className="lg:sticky static top-0 p-5 min-h-[100svh] flex bg-black lg:pb-5 pb-0"
                id="question-bank"
            >
                <div className="py-8 rounded-[2rem] bg-white w-full flex flex-col items-center justify-center self-stretch relative overflow-hidden lg:p-8 sm:p-12 p-4 ">
                    <div className="horizontal-tab radius-[2rem] h-full bg-white flex flex-col items-start justify-between">
                        <div className="rounded-[2rem] py-3 px-4 mb-6 flex items-center justify-center gap-2 text-xl bg-orange-400 text-black">
                            <Icon icon="QuestionBank" />
                            <h3 className="">Question Bank</h3>
                        </div>
                        <div className="flex items-end justify-between self-stretch mb-12">
                            <h2 className="max-w-[1000px] text-[1.9rem] sm:text-[2.5rem] leading-tight font-albra w-full">
                                Review top interview questions and learn AI-empowered answers to
                                optimize your preparation.
                            </h2>
                            <div className="w-80 hidden lg:flex justify-center">
                                <Link to="/app/question" className="flex justify-center w-full bg-black text-white rounded-lg text-xl py-5 ">Try Question Bank</Link>
                            </div>
                        </div>
                        <div className="mb-12 lg:flex-1 self-stretch relative rounded-[0.5rem] z-10 overflow-hidden lg:h-auto sm:h-[41.2rem] h-[21.8rem]">
                            <div className="bubbles-wrapper absolute bottom-0 left-0 right-0 top-0 min-h-[100svh] z-[-1] rotate-180 rounded-lg overflow-hidden ">
                                <div className="blur-overlay rounded-lg overflow-hidden" />
                                <div className="bubble is--blue" />
                                <div className="bubble is--sky" />
                                <div className="bubble is--green" />
                            </div>
                            <div className="absolute left-[50%] translate-x-[-50%] lg:translate-y-[0%] lg:top-[9%] lg:w-[80.539%] lg:h-[91%] sm:w-[86.557%] sm:h-[49.162%] top-[50%] translate-y-[-50%] w-[90.994%] h-[49.162%]">
                                <img
                                    alt="Question Bank"
                                    loading="lazy"
                                    width={1076}
                                    height={672}
                                    decoding="async"
                                    data-nimg={1}
                                    className="absolute lg:top-[9.002%] top-[50%] left-[50%] lg:translate-y-[0%] translate-y-[-50%] translate-x-[-50%] w-[100%]"
                                    style={{
                                        color: "transparent",
                                        translate: "none",
                                        rotate: "none",
                                        scale: "none",
                                        transform: "translate(-50%, 0%) translate(-0.227px, 5.2047px)"
                                    }}
                                    srcSet="/_next/image?url=https%3A%2F%2Fd12araoe7z5xxk.cloudfront.net%2Flanding-page%2Fimages%2Fsticky-tabs%2Ffr-intcop%205.webp&w=1080&q=75 1x, /_next/image?url=https%3A%2F%2Fd12araoe7z5xxk.cloudfront.net%2Flanding-page%2Fimages%2Fsticky-tabs%2Ffr-intcop%205.webp&w=3840&q=75 2x"
                                    src="/_next/image?url=https%3A%2F%2Fd12araoe7z5xxk.cloudfront.net%2Flanding-page%2Fimages%2Fsticky-tabs%2Ffr-intcop%205.webp&w=3840&q=75"
                                />
                                <img
                                    alt="Question Bank"
                                    loading="lazy"
                                    width={826}
                                    height={107}
                                    decoding="async"
                                    data-nimg={1}
                                    className="absolute z-10 lg:rounded-[1rem] lg:top-[14.25rem] lg:left-[20.725%] lg:w-[76.766%] sm:left-[20%] sm:w-[79%] sm:top-[28.729%] left-[20%] w-[79%] top-[30%]"
                                    style={{
                                        color: "transparent",
                                        translate: "none",
                                        rotate: "none",
                                        scale: "none",
                                        transform: "translate(0px, 7.807px)"
                                    }}
                                    srcSet="/_next/image?url=https%3A%2F%2Fd12araoe7z5xxk.cloudfront.net%2Flanding-page%2Fimages%2Fsticky-tabs%2Ffr-incop%206.webp&w=828&q=75 1x, /_next/image?url=https%3A%2F%2Fd12araoe7z5xxk.cloudfront.net%2Flanding-page%2Fimages%2Fsticky-tabs%2Ffr-incop%206.webp&w=1920&q=75 2x"
                                    src="/_next/image?url=https%3A%2F%2Fd12araoe7z5xxk.cloudfront.net%2Flanding-page%2Fimages%2Fsticky-tabs%2Ffr-incop%206.webp&w=1920&q=75"
                                />
                            </div>
                        </div>
                        <ul className="service-list flex gap-6 overflow-hidden lg:flex-row flex-col">
                            <li className="flex-1">
                                <div className="relative text-left pt-6 border-t-2 text-xl border-gray-quinary is--active">
                                    <h3 className="mb-4 transition-colors duration-200 text-gray-primary">
                                        Verified Question Database
                                    </h3>
                                    <p className="transition-colors duration-200 text-gray-tertiary">
                                        featuring real interview questions collected directly from
                                        recruiters and successful candidates. Ensure you’re prepared for
                                        what employers really ask, backed by insights from industry
                                        experts.
                                    </p>
                                </div>
                            </li>
                            <li className="flex-1">
                                <div className="relative text-left pt-6 border-t-2 text-xl border-gray-quinary ">
                                    <h3 className="mb-4 transition-colors leading-[1.31] tracking-[-0.0225rem]xt-gray-900/30">
                                        AI-enabled best practices
                                    </h3>
                                    <p className="transition-colors leading-[1.31] tracking-[-0.0225rem]xt-gray-900/30">
                                        Get optimal answers for each question in our verified database.
                                        Get expert-level guidance on crafting responses that align with
                                        industry standards and impress your interviewers.
                                    </p>
                                </div>
                            </li>
                        </ul>
                        <div className="mt-10 lg:hidden w-full flex justify-center">
                            <Link to="/app/question" className="flex justify-center w-full bg-black text-white rounded-lg text-xl py-5 ">Try Question Bank</Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="lg:sticky static top-0 p-5 min-h-[100svh] flex bg-black ">
                <div className="py-8 rounded-[2rem] bg-white w-full flex flex-col items-center justify-center self-stretch relative overflow-hidden lg:p-8 sm:p-12 p-4 ">
                    <div className="horizontal-tab flex items-stretch self-stretch h-full gap-50">
                        <div className="lg:max-w-[35.4rem] w-full flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-4">
                                    <div className="rounded-[2rem] py-3 px-4 mb-6 flex items-center justify-center gap-2 text-xl bg-pink-400 text-black">
                                        <Icon icon="File" />
                                        <h3>Interview Report</h3>
                                    </div>
                                </div>
                                <h2 className="max-w-[1000px] text-[1.9rem] sm:text-[2.5rem] leading-tight font-albra w-full">
                                    Receive comprehensive interview report after each session.
                                    Understand your performance so that you can always improve.
                                </h2>
                            </div>
                            <div className="w-full relative z-10 overflow-hidden lg:hidden flex flex-col items-end justify-center lg:min-h-auto sm:min-h-[41.2rem] min-h-[21.8rem] mb-12">
                                <div className="bubbles-wrapper absolute bottom-0 left-0 right-0 top-0 min-h-[100svh] z-[-1] rounded-lg rotate-180 overflow-hidden ">
                                    <div className="blur-overlay rounded-lg overflow-hidden" />
                                    <div className="bubble is--blue" />
                                    <div className="bubble is--sky" />
                                    <div className="bubble is--green" />
                                </div>
                                <img
                                    alt="Interview Report"
                                    loading="lazy"
                                    width="1169.191"
                                    height="774.875"
                                    decoding="async"
                                    data-nimg={1}
                                    className="absolute bottom-[-8%] left-[15%] h-[105%] max-w-none max-h-none w-auto rotate-[-13.477deg]"
                                    style={{ color: "transparent" }}
                                    srcSet="/_next/image?url=https%3A%2F%2Fd12araoe7z5xxk.cloudfront.net%2Flanding-page%2Fimages%2Fsticky-tabs%2Fdetailed-performance-analysis.webp&w=1200&q=75 1x, /_next/image?url=https%3A%2F%2Fd12araoe7z5xxk.cloudfront.net%2Flanding-page%2Fimages%2Fsticky-tabs%2Fdetailed-performance-analysis.webp&w=3840&q=75 2x"
                                    src="/_next/image?url=https%3A%2F%2Fd12araoe7z5xxk.cloudfront.net%2Flanding-page%2Fimages%2Fsticky-tabs%2Fdetailed-performance-analysis.webp&w=3840&q=75"
                                />
                                <img
                                    alt="Interview Report"
                                    loading="lazy"
                                    width={826}
                                    height={99}
                                    decoding="async"
                                    data-nimg={1}
                                    className="absolute z-[2] sm:top-[29.59%] top-[31%] left-[30%] rotate-[-13.477deg]"
                                    style={{ color: "transparent" }}
                                    srcSet="/_next/image?url=https%3A%2F%2Fd12araoe7z5xxk.cloudfront.net%2Flanding-page%2Fimages%2Fsticky-tabs%2Finterview-report-2.webp&w=828&q=75 1x, /_next/image?url=https%3A%2F%2Fd12araoe7z5xxk.cloudfront.net%2Flanding-page%2Fimages%2Fsticky-tabs%2Finterview-report-2.webp&w=1920&q=75 2x"
                                    src="/_next/image?url=https%3A%2F%2Fd12araoe7z5xxk.cloudfront.net%2Flanding-page%2Fimages%2Fsticky-tabs%2Finterview-report-2.webp&w=1920&q=75"
                                />
                            </div>
                            <div>
                                <ul className="service-list flex gap-6 overflow-hidden flex-col">
                                    <li className="">
                                        <div className="relative text-left pt-6 border-t-2 text-xl border-gray-quinary is--active">
                                            <h3 className="mb-4 transition-colors duration-200 text-gray-primary">
                                                Detailed Performance Analysis
                                            </h3>
                                            <p className="transition-colors duration-200 text-gray-tertiary">
                                                Discover your strengths and areas for improvement with
                                                metrics and feedback that help you refine your approach.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="">
                                        <div className="relative text-left pt-6 border-t-2 text-xl border-gray-quinary ">
                                            <h3 className="mb-4 transition-colors leading-[1.31] tracking-[-0.0225rem]xt-gray-900/30">
                                                Customized Improvement Recommendations
                                            </h3>
                                            <p className="transition-colors leading-[1.31] tracking-[-0.0225rem]xt-gray-900/30">
                                                Get tailored advice on communication skills, technical
                                                question handling, and behavioral responses to ensure you're
                                                fully prepared for the real thing.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                                <div className="w-80 hidden lg:flex justify-center mt-10">
                                    <Link to="/app" className="flex justify-center w-full bg-black text-white rounded-lg text-xl py-5 ">Get Interview Report</Link>
                                </div>
                            </div>
                        </div>
                        <div className="w-full relative z-10 overflow-hidden lg:flex hidden flex-col items-end justify-center">
                            <div className="bubbles-wrapper absolute bottom-0 left-0 right-0 top-0 min-h-[100svh] z-[-1] rounded-lg rotate-180 overflow-hidden ">
                                <div className="blur-overlay rounded-lg overflow-hidden" />
                                <div className="bubble is--blue" />
                                <div className="bubble is--sky" />
                                <div className="bubble is--green" />
                            </div>
                            <img
                                src="https://d12araoe7z5xxk.cloudfront.net/landing-page/images/sticky-tabs/detailed-performance-analysis.webp"
                                alt="Interview Report"
                                width="1169.191"
                                height="774.875"
                                loading="lazy"
                                className="absolute bottom-[-4%] left-[16.255%] lg:min-h-[100%] sm:min-h-[100%] max-w-none rotate-[-13.477deg]"
                            />
                            <img
                                src="https://d12araoe7z5xxk.cloudfront.net/landing-page/images/sticky-tabs/interview-report-2.webp"
                                alt="Interview Report"
                                width={826}
                                height={99}
                                loading="lazy"
                                className="absolute z-[2] left-[26.978%] top-[30.542%] h-[20.777%] w-auto max-w-none rotate-[-13.477deg]"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Progress