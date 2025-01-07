import React from "react";
import { Link } from "react-router-dom";

import Icon from "../../../components/icon";
import Layout from "../../../components/layout"
import { interviewCopilot } from "../components/data.d";

const Item = ({ i }: { i: { logo: string, position: string } }) => {
    return (
        <div className="relative mt-6 flex min-h-[172px] w-full max-w-[350px] flex-col justify-between rounded-[24px] border border-slate-200 bg-white p-6 md:min-h-[201px] md:max-w-[384px]">
            <div className="mb-3">
                <img alt="logo" width={100} height={33} className="object-contain" src={i.logo} />
            </div>
            <div className="line-clamp text-xl leading-[30px] tracking-tight md:h-[89px]">{i.position}</div>
            <div className="jusitfy-start mt-6 flex flex-row items-center">
                <div className="relative h-[40px] min-w-[181px] cursor-pointer items-center justify-center rounded-[6px] border border-slate-400 px-3 text-md leading-[38px] shadow-sm">Interview Copilot™</div>
                <div className="ml-6 h-[40px] min-w-[107px] cursor-pointer rounded-[6px] px-2 text-center text-md leading-[40px] text-slate-500 hover:bg-[#F1F5F9]"> Mock Interview</div>
            </div>
        </div>
    )
}

const AtsResumeMaker = () => {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 479);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Layout hiddenFooter={isMobile ? true : false}>
            <div className="relative box-border min-w-[320px] bg-blue-100 bg-left-top bg-no-repeat h-dvh sm:h-auto">
                <div className="h-full w-full sm:h-auto" style={{ background: "linear-gradient(180deg, #91c2fd 10%, rgba(255, 255, 255, 0.00) 100%)" }} >
                    <div className="mx-auto hidden min-h-[335px] w-[90%] max-w-[1200px] gap-10 pb-2 pt-16 sm:block">
                        <div className="flex flex-col items-center gap-10 pt-10 sm:pt-10 md:flex-row md:items-end md:pr-5">
                            <div className="flex flex-col justify-center self-stretch text-center sm:text-left md:pb-10">
                                <div className="mx-auto w-fit rounded-lg border border-sky-800 text-sky-800 px-2 py-1 text-md font-[500] sm:mx-0">
                                    ATS Resume Maker
                                </div>
                                <div className="mt-6 font-albra text-[32px] leading-[32px] text-sky-900 sm:text-[40px] sm:leading-[40px] md:text-[48px] md:leading-[48px]">
                                    Optimize your resume for Applicant Tracking Systems (ATS)
                                </div>
                                <div className="mt-4 font-default text-[16px] leading-[18px] text-sky-700 md:text-[18px] md:leading-[24px]">
                                    Create a resume that's tailored to pass through ATS filters with the right keywords, structure, and formatting, ensuring your application reaches hiring managers.
                                </div>
                            </div>
                            <div className="absolute bottom-[144px] flex shrink-0 flex-grow items-end justify-center sm:static">
                                <img
                                    alt="Resume Optimizer with Final Round AI"
                                    width={280}
                                    height={264}
                                    className="max-w-[280px] -z-10 w-11/12 sm:z-0"
                                    src="/image/home/ats-resume-maker.png"
                                />
                            </div>
                        </div>
                        <div className="relative mx-auto flex h-[492px] max-w-[1200px] flex-col rounded-2xl border border-sky-200 bg-white p-6 shadow">
                            <div className="h-full overflow-hidden">
                                <div className="relative flex h-full w-full flex-col mx-auto max-w-[800px] flex-grow">
                                    <div className="flex flex-col gap-6" >
                                        <div className="text-right">
                                            <div className="inline-block sm:max-w-[80%] sm:px-4 rounded-2xl rounded-br-none bg-sky-200 p-3">
                                                <div className="whitespace-pre-wrap break-words text-left font-default text-lg font-normal text-slate-500">
                                                    Get tips to make your resume talk the talk for job listings.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 overflow-hidden sm:gap-4">
                                            <div className="h-fit w-8 shrink-0 overflow-hidden rounded-lg bg-white-background shadow-sm">
                                                <img src="/assets/images/ai-tools/system-logo.svg" alt="logo_avatar" />
                                            </div>
                                            <div className="flex flex-shrink flex-grow items-center sm:px-4 rounded-2xl rounded-tl-none bg-sky-200 p-3">
                                                <div className="break-word prose max-w-full font-default text-lg font-normal text-slate-500">
                                                    <p>
                                                        Absolutely, I can provide you with tips to enhance your resume.
                                                        However, to give you the most tailored advice, it would be best if you
                                                        could upload your current resume in PDF format. This way, I can review
                                                        it and offer specific suggestions for improvement. Please upload your
                                                        resume when you're ready.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 w-full mx-2 mt-6">
                                        <div className="mx-auto">
                                            <form>
                                                <div className="overflow-hidden rounded-full duration-200 mr-2 border border-sky-300 bg-sky-50 p-2 ">
                                                    <div className="flex items-center">
                                                        <Icon icon="Attachment" />
                                                        <textarea placeholder="Send a message to coach" className="mx-auto block w-full flex-grow resize-none border-none text-slate-500 outline-none placeholder:text-content-tertiary bg-transparent px-2 py-0 text-lg placeholder:overflow-hidden placeholder:text-ellipsis placeholder:whitespace-nowrap empty:max-h-6" name="" id=""></textarea>
                                                        <div className="flex shrink-0 self-end">
                                                            <button className="flex select-none appearance-none items-center justify-center rounded-full bg-cyan-500 text-white sm:text-xl sm:leading-10 h-8 w-8 text-lg leading-8 disabled:opacity-50" >
                                                                <Icon icon="ArrowUp" className="text-white" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="block h-full pt-16 sm:hidden">
                        <div className="relative z-[1] mx-auto h-full w-[92%] gap-10">
                            <div className="flex flex-col items-center gap-10 pt-10 sm:pt-10 md:flex-row md:items-end md:pr-5">
                                <div className="flex flex-col justify-center self-stretch text-center sm:text-left md:pb-10">
                                    <div className="mx-auto w-fit rounded-lg border border-sky-700 text-sky-700 px-2 py-1 text-md font-[500] sm:mx-0">
                                        ATS Resume Maker
                                    </div>
                                    <div className="mt-6 font-headlines text-[32px] leading-[32px] text-sky-900 sm:text-[40px] sm:leading-[40px] md:text-[48px] md:leading-[48px]">
                                        Optimize your resume for Applicant Tracking Systems (ATS)
                                    </div>
                                    <div className="mt-4 font-default text-[16px] leading-[18px] text-sky-700 md:text-[18px] md:leading-[24px]" >
                                        Create a resume that's tailored to pass through ATS filters with the right keywords, structure, and formatting, ensuring your application reaches hiring managers.
                                    </div>
                                </div>
                                <div className="absolute bottom-[144px] flex shrink-0 flex-grow items-end justify-center sm:static">
                                    <img
                                        alt="Resume Optimizer with Final Round AI"
                                        width={280}
                                        height={264}
                                        className="max-w-[280px] -z-10 w-11/12 sm:z-0"
                                        src="/image/home/ats-resume-maker.png"
                                    />
                                </div>
                            </div>
                            <div className="absolute cursor-pointer bottom-24 h-[52px] w-full rounded-lg bg-sky-500 px-5 text-center text-lg leading-[52px] text-white">
                                Try Now
                            </div>
                            <Link
                                to="https://app.finalroundai.com/sign-in"
                                className="!absolute bottom-6 block h-[52px] w-full rounded-lg border border-sky-500 px-5 text-center text-lg leading-[52px] text-black hover:bg-sky-200 hover:border-sky-200 hover:text-sky-500"
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-16 hidden sm:block">
                    <div className="mt-12 min-h-[80px] w-full bg-gradient-to-l from-[#0090FF] to-[#00F7FF] px-4 py-6 text-white">
                        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-center flex-col md:flex-row md:justify-between">
                            <div className="text-center text-lg md:mr-16 md:text-left lg:w-[892px] text-white">
                                Unlock your AI superpower and land your dream job!
                            </div>
                            <Link
                                to="/auth/sign-in"
                                className="group !flex h-[36px] w-[158px] cursor-pointer flex-row items-center justify-center !rounded-full border-[2px] border-white text-md mt-6 md:mt-0 text-white hover:bg-white hover:text-sky-500"
                            >
                                Get Started Free
                                <Icon icon="GetFreeTrialArrow" className="text-white group-hover:text-sky-500" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="hidden sm:block">
                    <div>
                        <div>
                            <div className="text-center md:pt-[200px] px-3 pt-[100px] ">
                                <div className="mx-auto max-w-[983px] font-[Albra] text-[32px] leading-none tracking-tight md:text-5xl md:leading-[48px]">
                                    Use Interview Copilot™️ for your interview questions
                                </div>
                                <div className="flex flex-col-reverse items-center justify-center text-lg leading-[24px] tracking-tight text-slate-500 xs:mt-4 md:mt-6 md:flex-row ">
                                    Mock interviews or live interviews. Final Round AI is here to help you
                                    succeed.
                                </div>
                            </div>
                            <div className="mt-6 md:mt-12">
                                <div className="flex flex-row flex-wrap w-full max-w-[1240px] justify-around mx-auto">
                                    {interviewCopilot.map((i, k) => (
                                        <Item key={k} i={i} />
                                    ))}
                                </div>
                                <div className="w-[358px] flex flex-row justify-between items-center mt-8 md:mt-12 mx-auto">
                                    <div className="cursor-pointer bg-sky-500 md:w-[234px] w-[225px] h-[40px] rounded-[6px] text-white flex flex-row justify-center items-center text-md">
                                        Try Interview Copilot
                                        <div className="relative top-[-4px]">
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
                                        </div>
                                        <span className="ml-1">for free</span>
                                    </div>
                                    <div className="cursor-pointer bg-transparent rounded-[6px] w-[102px] h-[40px] text-md flex justify-center items-center border border-slate-300">
                                        Learn More
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="relative h-[458px] lg:mb-40 lg:h-96 my-[200px]">
                            <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-r from-[#0090FF] to-[#00F7FF] lg:bg-lg-join-footer-gradient" />
                            <div className="relative z-20 mx-auto flex h-52 items-center justify-center px-3 pt-12 lg:h-full lg:max-w-[1440px] lg:justify-start lg:pt-0">
                                <div className="flex flex-col items-center justify-center px-6 lg:ml-28 lg:max-w-[720px] lg:items-start">
                                    <h3 className="text-center font-albra text-3xl tracking-tight text-white antialiased lg:text-left lg:text-5xl">
                                        Join millions worldwide who crush their interviews with Final Round AI
                                    </h3>
                                    <Link to="https://app.finalroundai.com/sign-in" className="text-black hover:!bg-transparent hover:text-sky-500" >
                                        <button className="mt-6 h-12 w-60 rounded-md bg-white text-lg"> Get started for free</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="absolute bottom-0 z-10 opacity-40 right-0 mx-auto flex max-h-full w-screen overflow-hidden lg:h-full lg:w-[800px] lg:max-w-[1440px]">
                                <img
                                    src="/image/home/join-influencer-bg.png"
                                    className="mx-auto -mb-1 block lg:mb-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AtsResumeMaker