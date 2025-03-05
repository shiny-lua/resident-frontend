import { Link } from "react-router-dom"
import Layout from "../../components/layout"
import Icon from "../../components/icon"

const images = [
    { src: "/image/icons/google-meeting.svg", alt: "googlemeet" },
    { src: "/image/icons/webex.svg", alt: "webex" },
    { src: "/image/icons/team.svg", alt: "Microsoft Teams" },
    { src: "/image/icons/ring-central.svg", alt: "ringcentral" },
    { src: "/image/icons/skype.svg", alt: "skype" },
    { src: "/image/icons/chime.svg", alt: "chime" },
    { src: "/image/icons/zoom.svg", alt: "zoom" },
    { src: "/image/icons/blue-jeans.svg", alt: "bluejeans" },
    { src: "/image/icons/whatsup.svg", alt: "whatsup" },
    { src: "/image/icons/goto-meeting.svg", alt: "goto meeting" },
    { src: "/image/icons/bigblue.svg", alt: "bigblue" },
    { src: "/image/icons/slack.svg", alt: "slack" },
    { src: "/image/icons/jitsi.svg", alt: "jitsi" },
    { src: "/image/icons/whereby.svg", alt: "whereby" },
    { src: "/image/icons/flower.svg", alt: "flower" },
    { src: "/image/icons/message.svg", alt: "message" },
    { src: "/image/icons/lark.svg", alt: "lark" },
    { src: "/image/icons/head.svg", alt: "head" },
    { src: "/image/icons/m.svg", alt: "m" }
];

const InterviewCopilot = () => {
    return (
        <Layout>
            <div className="relative pt-30">
                <img className="absolute left-0 top-0 w-full -z-1" src="/image/home/common-bg.png" alt="" />
                <div className="text-center px-3">
                    <div className="mx-auto max-w-[983px] font-albra text-[32px] leading-none tracking-tight md:text-5xl md:leading-[48px]">
                        <div className="text-center">
                            Struggling to answer tough questions during <br /> interviews?
                        </div>
                    </div>
                    <div
                        className="flex flex-col-reverse items-center justify-center text-xl leading-[24px] tracking-tight text-gray-500 mt-4 md:mt-6 md:flex-row"
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
                                    <div className="text-xl tracking-tight text-black">Interviewer</div>
                                    <div className="text-white mt-4 flex h-[28px] items-center justify-center rounded-[14px] bg-gradient-to-r from-[#0090FF] to-[#00F7FF] px-[1px]">
                                        <div className="flex h-[26px] w-full items-center justify-center rounded-[14px] bg-white p-2 text-[13px] leading-[26px] text-sky-500">
                                            <img alt="loader" width={16} height={16} className="mr-1 text-transparent transform rotate-[720deg]" src="/image/icons/loader-line.svg" />
                                            Transcribing
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 min-h-[156px] rounded-[16px] bg-[#F1F5F9] p-6">
                                <div className="mb-4" style={{ opacity: 1, visibility: "inherit" }}>
                                    <div className="text-sm leading-[16px] text-slate-500">
                                        00:02:58
                                    </div>
                                    <div className="mt-2 text-xl leading-[22px] tracking-tight text-black">
                                        Why do you want to work as a software engineer at our company?
                                    </div>
                                </div>
                                <div className="mb-4" style={{ opacity: 1, visibility: "inherit" }}>
                                    <div className="text-sm leading-[16px] text-slate-500">00:02:58</div>
                                    <div className="mt-2 text-xl leading-[22px] tracking-tight text-black">Can you describe your software development process?</div>
                                </div>
                            </div>
                        </div>
                        <div className="ml-6 min-h-[260px] rounded-[16px] bg-gradient-to-r from-[#0090FF] to-[#00F7FF] p-4">
                            <div className="flex flex-row justify-between text-white">
                                <div className="flex flex-row text-xl font-[500] leading-[21px]">
                                    Interview Copilot™ &amp; You
                                </div>
                                <div className="flex min-h-[28px] w-[128px] items-center justify-center rounded-[14px] bg-white bg-opacity-20 text-[13px]">
                                    <img alt="AI Generating" width={16} height={16} className="mr-1" style={{ color: "transparent" }} src="/image/icons/stars.svg" />
                                    AI Generating
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="mb-2 min-h-[100px] w-full rounded-[16px] bg-[#FFFAF8E5] p-4" style={{ opacity: 1, visibility: "inherit" }} >
                                    <div className="text-sm leading-[16px] text-slate-500">00:02:58</div>
                                    <div className="mt-2 text-xl leading-[22px] text-black">
                                        admire your innovative tech solutions and collaborative culture.
                                        My skills in software development and passion for creating efficient
                                        code align perfectly with your company's mission, and I'm eager to
                                        contribute to your team's success.
                                    </div>
                                </div>
                                <div className="mb-2 min-h-[100px] w-full rounded-[16px] bg-[#FFFAF8E5] p-4" style={{ opacity: 1, visibility: "inherit" }} >
                                    <div className="text-sm leading-[16px] text-slate-500">00:02:58</div>
                                    <div className="mt-2 text-xl leading-[22px] text-black">
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
                <div className="mt-12 min-h-[80px] w-full bg-gradient-to-r from-[#0090FF] to-[#00F7FF] px-4 py-6 text-white">
                    <div className="mx-auto flex w-full max-w-[1200px] items-center justify-center flex-col md:flex-row md:justify-between">
                        <div className="text-center text-xl md:mr-16 md:text-left lg:w-[892px]">
                            Your Theresidentguy of interview, your AI Interview Copilot!
                        </div>
                        <Link to="/auth/sign-in" className="!flex h-[36px] w-[158px] cursor-pointer flex-row items-center justify-center !rounded-full border-[2px] border-white text-md text-white mt-6 md:mt-0">
                            <div>Get Started Free</div>
                            <Icon icon="ArrowNarrowRight" />
                        </Link>
                    </div>
                </div>
                <div className="text-center md:pt-[200px] px-3 pt-[100px] ">
                    <div className="mx-auto max-w-[983px] font-albra text-[32px] leading-none tracking-tight md:text-5xl md:leading-[48px]">Real-time AI Suggestions</div>
                    <div className="flex flex-col-reverse items-center justify-center text-xl leading-[24px] tracking-tight text-gray-500 mt-4 md:mt-6 md:flex-row ">
                        <div>Interview Copilot™ generating actionable guidance in real-time</div>
                    </div>
                </div>
                <div className="flex md:flex-row flex-col justify-center align-center box-border max-w-[1200px] md:px-6 px-4 mx-[auto] md:mt-16 mt-4">
                    <div className="xl:flex-1 xl:min-h-[271px] md:p-6 p-0 flex flex-col justify-start items-center box-border  md:mt-0">
                        <img
                            alt="Contextual Awareness"
                            width={48}
                            height={48}
                            className="md:w-[64px] md:h-[64px] mr-6 md:mr-0 mt-2 md:mt-0"
                            style={{ color: "transparent" }}
                            src="/image/icons/awareness.svg"
                        />
                        <div className="mt-4 xl:mt-8 text-center">
                            <div className="text-2xl md:text-3xl font-albra text-black-text leading-[33px]">
                                Contextual Awareness
                            </div>
                            <div className="md:mt-6 mt-3 tracking-tight text-xl text-[#95989B] leading-[22px]">
                                Generates tailored responses by analyzing job descriptions and company details for each interview.
                            </div>
                        </div>
                    </div>
                    <div className="xl:flex-1 xl:min-h-[271px] md:p-6 p-0 flex flex-col justify-start items-center box-border mt-4 md:mt-0">
                        <img
                            alt="Personalized Responses"
                            width={48}
                            height={48}
                            style={{ color: "transparent" }}
                            src="/image/icons/personal.svg"
                        />
                        <div className="mt-4 xl:mt-8 text-center">
                            <div className="text-2xl md:text-3xl font-albra text-black-text leading-[33px]">
                                Personalized Responses
                            </div>
                            <div className="md:mt-6 mt-3 tracking-tight text-xl text-[#95989B] leading-[22px]">
                                Craft personalized answers that highlight your background, skills, and
                                experiences to meet interviewers' expectations.
                            </div>
                        </div>
                    </div>
                    <div className="xl:flex-1 xl:min-h-[271px] md:p-6 p-0 flex flex-col justify-start items-center box-border mt-4 md:mt-0">
                        <img
                            alt="Customizable Preparation"
                            width={48}
                            height={48}
                            className="md:w-[64px] md:h-[64px] mr-6 md:mr-0 mt-2 md:mt-0"
                            src="/image/icons/preparation.svg"
                        />
                        <div className="mt-4 xl:mt-8 text-center">
                            <div className="text-2xl md:text-3xl font-albra text-black-text leading-[33px]">
                                Customizable Preparation
                            </div>
                            <div className="md:mt-6 mt-3 tracking-tight text-xl text-[#95989B] leading-[22px]">
                                Train and customize your copilot with your materials, like pre-prepared Q&amp;A, for tailored performance
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-[16px] mt-[100px] box-border flex min-h-[118px] max-w-[1029px] flex-col items-center justify-center rounded-[24px] border border-[#E3E5EB] bg-transparent bg-white p-6 md:border-0 md:bg-cyan-100 md:pl-6 lg:mx-auto">
                    <div className="w-full text-center font-albra text-3xl text-gray-500">Support All Meeting Softwares</div>
                    <div className="mt-4 flex w-full flex-row flex-wrap justify-center md:px-4 xl:w-[1044px]">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                alt={image.alt}
                                width={140}
                                height={70}
                                className="mt-2 w-[25%] lg:h-[70px] lg:w-[140px]"
                                style={{ color: "transparent" }}
                                src={image.src}
                            />
                        ))}
                    </div>
                </div>
                <div className="mt-[124px] md:mt-[200px]">
                    <div className="flex flex-col-reverse xl:flex-row flex-wrap max-w-[1200px] mx-auto px-4 xl:px-0 justify-between items-center">
                        <div className="xl:max-w-[560px] w-full xl:w-auto mt-12 xl:mt-0 flex flex-col justify-center">
                            <div className="text-[32px] md:text-5xl font-albra text-center xl:text-left tracking-tight leading-none">
                                Real-time Transcription
                            </div>
                            <div className="text-xl md:mt-6 mt-4 text-center xl:text-left text-gray-500 leading-[24px] tracking-tight">
                                Understand every question sharply
                            </div>
                            <div className="md:mt-16 mt-12">
                                <div className="mt-0 text-center xl:text-left">
                                    <div className="flex flex-row justify-center xl:justify-start">
                                        <img
                                            alt="Super-low Latency."
                                            width={32}
                                            height={32}
                                            className="md:w-[36px] md:h-[36px] w-[32px] h-[32px]"
                                            style={{ color: "transparent" }}
                                            src="/image/icons/latency.svg"
                                        />
                                        <div className="text-2xl md:text-3xl ml-4 font-albra leading-[36px] tracking-tight">
                                            Super-low Latency.
                                        </div>
                                    </div>
                                    <div className="text-lg pl-[52px] mt-2 text-gray-500 tracking-tight">
                                        Recognizes text nuances, creating synthetic, human voices with
                                        accurate intonation and resonance.
                                    </div>
                                </div>
                                <div className="mt-6 text-center xl:text-left">
                                    <div className="flex flex-row justify-center xl:justify-start">
                                        <img
                                            alt="Exceptional Accuracy"
                                            width={32}
                                            height={32}
                                            className="md:w-[36px] md:h-[36px] w-[32px] h-[32px]"
                                            style={{ color: "transparent" }}
                                            src="/image/icons/light-clock.svg"
                                        />
                                        <div className="text-2xl md:text-3xl ml-4 font-albra leading-[36px] tracking-tight">
                                            Exceptional Accuracy
                                        </div>
                                    </div>
                                    <div className="text-lg pl-[52px] mt-2 text-gray-500 tracking-tight">
                                        Meticulous attention to detail and high fidelity in capturing spoken
                                        questions and conversations correctly.
                                    </div>
                                </div>
                                <div className="mt-6 text-center xl:text-left">
                                    <div className="flex flex-row justify-center xl:justify-start">
                                        <img
                                            alt="Multilingual Capability"
                                            width={32}
                                            height={32}
                                            className="md:w-[36px] md:h-[36px] w-[32px] h-[32px]"
                                            style={{ color: "transparent" }}
                                            src="/image/icons/a-text.svg"
                                        />
                                        <div className="text-2xl md:text-3xl ml-4 font-albra leading-[36px] tracking-tight">
                                            Multilingual Capability
                                        </div>
                                    </div>
                                    <div className="text-lg pl-[52px] mt-2 text-gray-500 tracking-tight">
                                        Support up to 29 languages and accents. More to come!
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 flex justify-center xl:justify-start">
                                <Link to="/auth/sign-in" className="md:w-80 flex justify-center w-full bg-sky-500 text-white rounded-lg text-xl py-4 hover:bg-opacity-30">Launch Interview Copilot</Link>
                            </div>
                        </div>
                        <img
                            alt="Theresidentguy provides real-time transcription and multilingual capabilities"
                            width={592}
                            height={672}
                            className="hidden md:inline-block"
                            src="/image/home/real-time-transcription-1.png"
                        />
                        <img
                            alt="Theresidentguy provides real-time transcription and multilingual capabilities"
                            width={357}
                            height={290}
                            className="inline-block md:hidden"
                            style={{ color: "transparent" }}
                            src="/image/home/real-time-transcription-2.png"
                        />
                    </div>
                </div>
                <div className="my-[124px] md:my-[100px]">
                    <div className="flex flex-col-reverse xl:flex-row-reverse flex-wrap max-w-[1200px] mx-auto px-4 xl:px-0 justify-between items-center">
                        <div className="xl:max-w-[560px] w-full xl:w-auto mt-12 xl:mt-0 flex flex-col justify-center">
                            <div className="text-[32px] md:text-5xl font-albra text-center xl:text-left tracking-tight leading-none">
                                Real-time Feedback
                            </div>
                            <div className="text-xl md:mt-6 mt-4 text-center xl:text-left text-gray-500 leading-[24px] tracking-tight">
                                Generate an interview summary report after each Interview Copilot
                                session to helps candidates understand their strengths and pinpoint
                                areas for improvement, making each interview a valuable learning
                                experience.
                            </div>
                            <div className="md:mt-16 mt-12">
                                <div className="mt-0 text-center xl:text-left">
                                    <div className="flex flex-row justify-center xl:justify-start">
                                        <img
                                            alt="Insightful Analysis"
                                            loading="lazy"
                                            width={32}
                                            height={32}
                                            decoding="async"
                                            data-nimg={1}
                                            className="md:w-[36px] md:h-[36px] w-[32px] h-[32px]"
                                            style={{ color: "transparent" }}
                                            src="https://d12araoe7z5xxk.cloudfront.net/landing-page/images/interviewCopilot/analysis.svg"
                                        />
                                        <div className="text-2xl md:text-3xl ml-4 font-albra leading-[36px] tracking-tight">
                                            Insightful Analysis
                                        </div>
                                    </div>
                                    <div className="text-lg pl-[52px] mt-2 text-gray-500 tracking-tight">
                                        generates a detailed report that highlights key moments, evaluates
                                        responses, and provides actionable feedback.
                                    </div>
                                </div>
                                <div className="mt-6 text-center xl:text-left">
                                    <div className="flex flex-row justify-center xl:justify-start">
                                        <img
                                            alt="Versatile Utility"
                                            loading="lazy"
                                            width={32}
                                            height={32}
                                            decoding="async"
                                            data-nimg={1}
                                            className="md:w-[36px] md:h-[36px] w-[32px] h-[32px]"
                                            style={{ color: "transparent" }}
                                            src="https://d12araoe7z5xxk.cloudfront.net/landing-page/images/interviewCopilot/utility.svg"
                                        />
                                        <div className="text-2xl md:text-3xl ml-4 font-albra leading-[36px] tracking-tight">
                                            Versatile Utility
                                        </div>
                                    </div>
                                    <div className="text-lg pl-[52px] mt-2 text-gray-500 tracking-tight">
                                        Designed for both practice sessions and real interview and support
                                        continuous improvement and personal growth in the interview process.
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 flex justify-center xl:justify-start">
                                <Link to="/auth/sign-in" className="md:w-80 flex justify-center w-full bg-sky-500 text-white rounded-lg text-xl py-4 hover:bg-opacity-30">Launch Interview Copilot</Link>
                            </div>
                        </div>
                        <img
                            alt="Theresidentguy provides Interview summary report for implementation feedback"
                            width={592}
                            height={672}
                            className="hidden md:inline-block"
                            style={{ color: "transparent" }}
                            src="/image/home/real-time-feedback.png"
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default InterviewCopilot