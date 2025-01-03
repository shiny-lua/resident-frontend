import Layout from "../../components/layout"

const InterviewCopilot = () => {
    return (
        <Layout>
            <div className="text-center px-3">
                <div className="mx-auto max-w-[983px] font-[Albra] text-[32px] leading-none tracking-tight md:text-5xl md:leading-[48px]">
                    <div className="text-center">
                        Struggling to answer tough questions during <br /> interviews?
                    </div>
                </div>
                <div
                    className="flex flex-col-reverse items-center justify-center text-lg leading-[24px] tracking-tight text-gray-tertiary xs:mt-4 md:mt-6 md:flex-row"
                >
                    <div style={{ maxWidth: 600, color: "black" }}>
                        Interview Copilot™ has your back with AI-powered responses that keep you calm and collected, even when the pressure's on.
                    </div>
                </div>
            </div>
            <div className="mx-auto mt-12 hidden w-full max-w-[1200px] flex-row justify-start lg:flex">
                <div className="ml-4 flex flex-row rounded-[24px] border border-gray-200 bg-white p-6">
                    <div className="min-w-[350px] border-r-[1px] border-gray-border pr-6">
                        <div className="flex h-[80px] flex-row">
                            <img
                                alt="interviewer of xxx"
                                width={80}
                                height={80}
                                className="rounded-[16px]"
                                style={{ color: "transparent" }}
                                src="/image/icons/user.png"
                            />
                            <div className="ml-6">
                                <div className="text-lg tracking-tight text-black-text">Interviewer</div>
                                <div className="text-white mt-4 flex h-[28px] items-center justify-center rounded-[14px] bg-[linear-gradient(90deg,_#54b3f3_0%,_#00c3ff_100%)] px-[1px]">
                                    <div className="flex h-[26px] w-full items-center justify-center rounded-[14px] bg-white p-2 text-[13px] leading-[26px] text-sky-500">
                                        <img
                                            alt="loader"
                                            width={16}
                                            height={16}
                                            className="mr-1"
                                            style={{
                                                color: "transparent",
                                                translate: "none",
                                                rotate: "none",
                                                scale: "none",
                                                transform: "rotate(720deg)"
                                            }}
                                            src="/image/icons/loader-line.svg"
                                        />
                                        Transcribing
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 min-h-[256px] rounded-[16px] bg-[#F1F5F9] p-6">
                            <div className="mb-4" style={{ opacity: 1, visibility: "inherit" }}>
                                <div className="text-sm leading-[16px] text-slate-500">
                                    00:02:58
                                </div>
                                <div className="mt-2 text-xl leading-[22px] tracking-tight text-black">
                                    Why do you want to work as a software engineer at our company?
                                </div>
                            </div>
                            <div className="mb-4" style={{ opacity: 1, visibility: "inherit" }}>
                                <div className="text-sm leading-[16px] text-slate-500">
                                    00:02:58
                                </div>
                                <div className="mt-2 text-xl leading-[22px] tracking-tight text-black">
                                    Can you describe your software development process?
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ml-6 min-h-[360px] rounded-[16px] bg-gradient-to-r from-[#FF891C] to-red-primary p-4">
                        <div className="flex flex-row justify-between text-white-primary">
                            <div className="flex flex-row text-lg font-[500] leading-[21px]">
                                Interview Copilot
                                <div className="relative top-[-6px] mr-1">
                                    <svg
                                        width={14}
                                        height={7}
                                        viewBox="0 0 14 7"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="inline"
                                    >
                                        <path
                                            d="M9.9375 6.81814L7.15909 0.54541H8.28409L10.2273 5.14768L12.1705 0.54541H13.2955L10.517 6.81814H9.9375ZM6.95454 6.81814V0.54541H8.04545V6.81814H6.95454ZM12.4091 6.81814V0.54541H13.5V6.81814H12.4091ZM2.86364 6.81814V1.09086H3.95454V6.81814H2.86364ZM0.954544 1.49996V0.54541H5.86364V1.49996H0.954544Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>{" "}
                                &amp; You
                            </div>
                            <div className="flex min-h-[28px] w-[128px] items-center justify-center rounded-[14px] bg-white-primary bg-opacity-20 text-[13px]">
                                <img
                                    alt="AI Generating"
                                    loading="lazy"
                                    width={16}
                                    height={16}
                                    decoding="async"
                                    data-nimg={1}
                                    className="mr-1"
                                    style={{ color: "transparent" }}
                                    src="https://d12araoe7z5xxk.cloudfront.net/landing-page/images/interviewCopilot/stars.svg"
                                />
                                AI Generating
                            </div>
                        </div>
                        <div className="mt-3">
                            <div
                                className="mb-2 min-h-[100px] w-full rounded-[16px] bg-[#FFFAF8E5] p-4"
                                style={{ opacity: 1, visibility: "inherit" }}
                            >
                                <div className="text-sm leading-[16px] text-slate-500">
                                    00:02:58
                                </div>
                                <div className="mt-2 text-xl leading-[22px] text-black-text">
                                    admire your innovative tech solutions and collaborative culture.
                                    My skills in software development and passion for creating efficient
                                    code align perfectly with your company’s mission, and I’m eager to
                                    contribute to your team’s success.
                                </div>
                            </div>
                            <div
                                className="mb-2 min-h-[100px] w-full rounded-[16px] bg-[#FFFAF8E5] p-4"
                                style={{ opacity: 1, visibility: "inherit" }}
                            >
                                <div className="text-sm leading-[16px] text-slate-500">
                                    00:02:58
                                </div>
                                <div className="mt-2 text-xl leading-[22px] text-black-text">
                                    gather requirements, design architecture, develop, test, iterate
                                    based on feedback, and ensure high-quality deliverables through
                                    reviews and testing.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-12 min-h-[200px] w-full px-4 lg:hidden">
                <video
                    className="rounded-[8px]"
                    src="https://d12araoe7z5xxk.cloudfront.net/landing-page/video/interview-copilot.mp4"
                    muted={false}
                    autoPlay
                    width="100%"
                    loop={true}
                />
            </div>

        </Layout>
    )
}

export default InterviewCopilot