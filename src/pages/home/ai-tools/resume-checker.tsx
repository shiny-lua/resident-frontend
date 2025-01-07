import React from "react";
import { Link } from "react-router-dom";

import Icon from "../../../components/icon";
import Layout from "../../../components/layout"
import Experience from "../ai-resume-builder/components/experience";
import RecruitingTools from "../ai-resume-builder/components/recruiting-tools";
import Faq from "../components/faq";
import { askedQuestion } from "../components/data.d";

const ResumeChecker = () => {
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
                                    Resume Checker
                                </div>
                                <div className="mt-6 font-albra text-[32px] leading-[32px] text-sky-900 sm:text-[40px] sm:leading-[40px] md:text-[48px] md:leading-[48px]">
                                    Ensure your resume is error-free and polished
                                </div>
                                <div className="mt-4 font-default text-[16px] leading-[18px] text-sky-700 md:text-[18px] md:leading-[24px]">
                                    Get a detailed analysis of your resume, identifying common mistakes, formatting issues, and areas for improvement, so you can present a hirable application.
                                </div>
                            </div>
                            <div className="absolute bottom-[144px] flex shrink-0 flex-grow items-end justify-center sm:static">
                                <img
                                    alt="Resume Optimizer with Final Round AI"
                                    width={280}
                                    height={264}
                                    className="max-w-[280px] -z-10 w-11/12 sm:z-0"
                                    src="/image/home/resume-grader.png"
                                />
                            </div>
                        </div>
                        <div className="relative mx-auto flex h-[492px] max-w-[1200px] flex-col rounded-2xl border border-[#DFE2E4] bg-white p-6 shadow">
                            <div className="h-full overflow-hidden">
                                <div className="relative flex h-full w-full flex-col mx-auto max-w-[800px] flex-grow">
                                    <div className="flex-grow overflow-auto px-2">
                                        <div className="mx-auto mb-8 flex flex-col justify-between">
                                            <div className="text-center">
                                                <div className="mt-4 grid auto-rows-fr grid-cols-2 gap-6 sm:mt-10 md:grid-cols-4">
                                                    <div className="group flex-1 cursor-pointer rounded-lg bg-white p-3 text-left shadow-sm sm:bg-sky-100">
                                                        <p className="mb-1">🔍</p>
                                                        <p className="text-md text-slate-700 group-hover:text-slate-900">
                                                            Spot what's great and what needs fixing in your resume.
                                                        </p>
                                                    </div>
                                                    <div className="group flex-1 cursor-pointer rounded-lg bg-white p-3 text-left shadow-sm sm:bg-sky-100">
                                                        <p className="mb-1">✨</p>
                                                        <p className="text-md text-slate-700 group-hover:text-slate-900">
                                                            Get tips to make your resume talk the talk for job listings.
                                                        </p>
                                                    </div>
                                                    <div className="group flex-1 cursor-pointer rounded-lg bg-white p-3 text-left shadow-sm sm:bg-sky-100">
                                                        <p className="mb-1">🛠️</p>
                                                        <p className="text-md text-slate-700 group-hover:text-slate-900">
                                                            Pack in those must-have keywords for ATS love.
                                                        </p>
                                                    </div>
                                                    <div className="group flex-1 cursor-pointer rounded-lg bg-white p-3 text-left shadow-sm sm:bg-sky-100">
                                                        <p className="mb-1">📄</p>
                                                        <p className="text-md text-slate-700 group-hover:text-slate-900">
                                                            Make your resume look sharp and easy on the eyes.
                                                        </p>
                                                    </div>
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
                                                        <textarea placeholder="Send a message to coach" className="mx-auto block w-full flex-grow resize-none border-none text-content-primary outline-none placeholder:text-content-tertiary bg-transparent px-2 py-0 text-lg placeholder:overflow-hidden placeholder:text-ellipsis placeholder:whitespace-nowrap empty:max-h-6" name="" id=""></textarea>
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
                                    <div className="mx-auto w-fit rounded-lg border border-sky-700 text-sky-700 px-2 py-1 text-sm font-[500] sm:mx-0">
                                        Resume Checker
                                    </div>
                                    <div className="mt-6 font-headlines text-[32px] leading-[32px] text-sky-900 sm:text-[40px] sm:leading-[40px] md:text-[48px] md:leading-[48px]">
                                        Ensure your resume is error-free and polished
                                    </div>
                                    <div className="mt-4 font-default text-[16px] leading-[18px] text-sky-700 md:text-[18px] md:leading-[24px]" >
                                        Get a detailed analysis of your resume, identifying common mistakes, formatting issues, and areas for improvement, so you can present a hirable application.
                                    </div>
                                </div>
                                <div className="absolute bottom-[144px] flex shrink-0 flex-grow items-end justify-center sm:static">
                                    <img
                                        alt="Resume Optimizer with Final Round AI"
                                        width={280}
                                        height={264}
                                        className="max-w-[280px] -z-10 w-11/12 sm:z-0"
                                        src="/image/home/resume-grader.png"
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
                                Start your free resume check now and get instant feedback!
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
                    <RecruitingTools />
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

export default ResumeChecker