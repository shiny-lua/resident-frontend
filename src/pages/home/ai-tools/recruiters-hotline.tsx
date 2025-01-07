import React from "react";
import { Link } from "react-router-dom";

import Icon from "../../../components/icon";
import Layout from "../../../components/layout";
import RecruitingTools from "../ai-resume-builder/components/recruiting-tools";

const RecruitersHotline = () => {

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
                                <div className="mx-auto w-fit rounded-lg border border-sky-800 text-sky-800 px-2 py-1 text-md font-[500] sm:mx-0">Recruiters Hotline</div>
                                <div className="mt-6 font-albra text-[32px] leading-[32px] text-sky-900 sm:text-[40px] sm:leading-[40px] md:text-[48px] md:leading-[48px]">Speak with Recruiters from Fortune 500 Companies</div>
                                <div className="mt-4 font-default text-[16px] leading-[18px] text-sky-700 md:text-[18px] md:leading-[24px]">
                                    Connect with top recruiters and unlock global job opportunities, anytime
                                    and anywhere. Shape your future—start chatting now!
                                </div>
                            </div>
                            <div className="absolute bottom-[144px] flex shrink-0 flex-grow items-end justify-center sm:static">
                                <img
                                    alt="recruiter"
                                    width={229}
                                    height={266}
                                    className="-z-10 w-11/12 sm:z-0"
                                    style={{
                                        color: "transparent",
                                        maxWidth: 229,
                                        aspectRatio: "0.8609022556390977"
                                    }}
                                    src="/image/home/recruiters-hotline.png"
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-6 md:flex-nowrap">
                            <div className="w-full shrink-0 md:w-[292px]">
                                <div className="flex min-w-[190px] flex-col rounded-2xl bg-white p-6 shadow-md">
                                    <ul className="flex flex-col gap-3 overflow-auto">
                                        <li className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 border-sky-500 bg-sky-500/[0.17]">
                                            <img
                                                src="https://cdn.brandfetch.io/idnrCPuv87/w/400/h/400/theme/dark/icon.png?k=bfHSJFAPEG&height=32&width=32"
                                                className="h-8 w-8 overflow-hidden"
                                                alt="logo"
                                            />
                                            <span>Apple</span>
                                        </li>
                                        <li className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 p-3">
                                            <img
                                                src="https://cdn.brandfetch.io/idXoj5DuCE/theme/dark/symbol.svg?k=bfHSJFAPEG&height=32&width=32"
                                                className="h-8 w-8 overflow-hidden"
                                                alt="logo"
                                            />
                                            <span>NVIDIA</span>
                                        </li>
                                        <li className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 p-3">
                                            <img
                                                src="https://cdn.brandfetch.io/idnq7H7qT0/theme/dark/symbol.svg?k=bfHSJFAPEG&height=32&width=32"
                                                className="h-8 w-8 overflow-hidden"
                                                alt="logo"
                                            />
                                            <span>Oracle</span>
                                        </li>
                                        <li className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 p-3">
                                            <img
                                                src="https://cdn.brandfetch.io/idawOgYOsG/theme/dark/symbol.svg?k=bfHSJFAPEG&height=32&width=32"
                                                className="h-8 w-8 overflow-hidden"
                                                alt="logo"
                                            />
                                            <span>Amazon</span>
                                        </li>
                                        <li className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 p-3">
                                            <img
                                                src="https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/symbol.svg?k=bfHSJFAPEG&height=32&width=32"
                                                className="h-8 w-8 overflow-hidden"
                                                alt="logo"
                                            />
                                            <span>Google</span>
                                        </li>
                                        <li className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 p-3">
                                            <img
                                                src="https://cdn.brandfetch.io/id2S-kXbuK/theme/dark/symbol.svg?k=bfHSJFAPEG&height=32&width=32"
                                                className="h-8 w-8 overflow-hidden"
                                                alt="logo"
                                            />
                                            <span>Tesla</span>
                                        </li>
                                        <li className="group flex cursor-pointer justify-center gap-2 rounded-lg border border-gray-300 p-3 hover:text-sky-500">
                                            <span>Find More</span>
                                            <div className="text-black group-hover:text-sky-500"><Icon icon="ArrowRight" /></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex-grow">
                                <div className="h-[516px] rounded-2xl bg-white px-4 py-6 shadow-md">
                                    <div className="relative h-full overflow-hidden">
                                        <div className="mx-auto mb-8 flex flex-col justify-between">
                                            <div className="flex flex-col gap-6" >
                                                <div className="flex gap-2 overflow-hidden sm:gap-4">
                                                    <div className="h-fit w-8 shrink-0 overflow-hidden rounded-lg bg-white-background shadow-sm">
                                                        <img
                                                            src="https://cdn.brandfetch.io/idnrCPuv87/w/400/h/400/theme/dark/icon.png?k=bfHSJFAPEG&height=40&width=40"
                                                            alt="logo_avatar"
                                                        />
                                                    </div>
                                                    <div className="flex flex-shrink flex-grow items-center sm:px-4 rounded-2xl rounded-tl-none bg-[#F1F5F9] p-3">
                                                        <div className="break-word prose max-w-full font-default text-lg font-normal text-black">
                                                            <p>
                                                                Hello, I am a recruiter at Apple, and I am more than happy to answer
                                                                any questions you may have regarding our company's recruitment,
                                                                interviews, and workplace-related matters.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="inline-block sm:max-w-[80%] sm:px-4 rounded-2xl rounded-br-none bg-[#E9E5FF] p-3">
                                                        <div className="whitespace-pre-wrap break-words text-left font-default text-lg font-normal text-black">
                                                            kl
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 overflow-hidden sm:gap-4">
                                                    <div className="h-fit w-8 shrink-0 overflow-hidden rounded-lg bg-white-background shadow-sm">
                                                        <img
                                                            src="https://cdn.brandfetch.io/idnrCPuv87/w/400/h/400/theme/dark/icon.png?k=bfHSJFAPEG&height=40&width=40"
                                                            alt="logo_avatar"
                                                        />
                                                    </div>
                                                    <div className="flex flex-shrink flex-grow items-center sm:px-4 rounded-2xl rounded-tl-none bg-[#F1F5F9] p-3">
                                                        <div className="break-word prose max-w-full font-default text-lg font-normal text-black">
                                                            <p>
                                                                I'm sorry, but I didn't understand your message. Could you please
                                                                provide more details or ask a specific question about job
                                                                applications, recruitment, interviews, or the workplace at Apple?
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
                                                            <textarea className="mx-auto block w-full flex-grow resize-none border-none text-content-primary outline-none placeholder:text-content-tertiary bg-transparent px-2 py-0 text-lg placeholder:overflow-hidden placeholder:text-ellipsis placeholder:whitespace-nowrap empty:max-h-6" name="" id=""></textarea>
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
                    </div>
                    <div className="block h-full pt-16 sm:hidden">
                        <div className="relative z-[1] mx-auto h-full w-[92%] gap-10">
                            <div className="flex flex-col items-center gap-10 pt-10 sm:pt-10 md:flex-row md:items-end md:pr-5">
                                <div className="flex flex-col justify-center self-stretch text-center sm:text-left md:pb-10">
                                    <div className="mx-auto w-fit rounded-lg border border-sky-700  px-2 py-1 text-sky-700 text-md font-[500] sm:mx-0">
                                        Recruiters Hotline
                                    </div>
                                    <div className="mt-6 font-albra text-[32px] leading-[32px] text-sky-900 sm:text-[40px] sm:leading-[40px] md:text-[48px] md:leading-[48px]">
                                        Speak with Recruiters from Fortune 500 Companies
                                    </div>
                                    <div className="mt-4 font-default text-[16px] leading-[18px] text-sky-700 md:text-[18px] md:leading-[24px]" >
                                        Connect with top recruiters and unlock global job opportunities,
                                        anytime and anywhere. Shape your future—start chatting now!
                                    </div>
                                </div>
                                <div className="absolute bottom-[144px] flex shrink-0 flex-grow items-end justify-center sm:static">
                                    <img
                                        alt="recruiter"
                                        width={229}
                                        height={266}
                                        className="max-w-[228px] -z-10 w-11/12 sm:z-0"
                                        src="/image/home/recruiters-hotline.png"
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
                                Don't Miss Out: Engage with Top Recruiters from Fortune 500 Companies!
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
                    <div className="mx-auto mt-[200px] w-[90%] max-w-[1200px]">
                        <section>
                            <h2
                                className="text-center text-5xl font-albra"
                            >
                                Find more exciting companies below
                            </h2>
                            <h5 className="text-xl mt-6 text-center text-slate-500">
                                They are ready to chat with you, chose one and chat now
                            </h5>
                            <div className="text-black mt-16 flex justify-around overflow-auto gap-4 px-0 md:gap-6 lg:px-8">
                                <div className="flex flex-1 cursor-pointer items-center justify-center rounded-lg text-lg px-4 py-2 text-center bg-sky-100 border border-sky-500 text-sky-500">
                                    17
                                </div>
                                <div className="flex flex-1 cursor-pointer items-center justify-center rounded-lg text-lg border text-slate-700 border-white bg-white px-4 py-2 text-center">
                                    Startup
                                </div>
                                <div className="flex flex-1 cursor-pointer items-center justify-center rounded-lg text-lg border text-slate-700 border-white bg-white px-4 py-2 text-center">
                                    Consumer
                                </div>
                                <div className="flex flex-1 cursor-pointer items-center justify-center rounded-lg text-lg border text-slate-700 border-white bg-white px-4 py-2 text-center">
                                    Professional Services
                                </div>
                                <div className="flex flex-1 cursor-pointer items-center justify-center rounded-lg text-lg border text-slate-700 border-white bg-white px-4 py-2 text-center">
                                    Healthcare
                                </div>
                            </div>
                            <div className="text-black mt-12 grid grid-cols-2 gap-6 md:grid-cols-3">
                                <div className="rounded-3xl border border-gray-300 bg-white p-6">
                                    <div>
                                        <img
                                            src="https://cdn.brandfetch.io/idnrCPuv87/w/400/h/400/theme/dark/icon.png?k=bfHSJFAPEG&width=32&height=32"
                                            alt="logo"
                                            className="mr-3 inline-block h-8 w-8"
                                        />
                                        <span className="align-middle">Apple</span>
                                    </div>
                                    <div
                                        role="button"
                                        className="mt-6 w-fit cursor-pointer rounded-md border border-gray-300 px-4 py-2 shadow-sm"
                                    >
                                        Speak with Recruiters
                                    </div>
                                </div>
                                <div className="rounded-3xl border border-gray-300 bg-white p-6">
                                    <div>
                                        <img
                                            src="https://cdn.brandfetch.io/idXoj5DuCE/theme/dark/symbol.svg?k=bfHSJFAPEG&width=32&height=32"
                                            alt="logo"
                                            className="mr-3 inline-block h-8 w-8"
                                        />
                                        <span className="align-middle">NVIDIA</span>
                                    </div>
                                    <div
                                        role="button"
                                        className="mt-6 w-fit cursor-pointer rounded-md border border-gray-300 px-4 py-2 shadow-sm"
                                    >
                                        Speak with Recruiters
                                    </div>
                                </div>
                                <div className="rounded-3xl border border-gray-300 bg-white p-6">
                                    <div>
                                        <img
                                            src="https://cdn.brandfetch.io/idnq7H7qT0/theme/dark/symbol.svg?k=bfHSJFAPEG&width=32&height=32"
                                            alt="logo"
                                            className="mr-3 inline-block h-8 w-8"
                                        />
                                        <span className="align-middle">Oracle</span>
                                    </div>
                                    <div
                                        role="button"
                                        className="mt-6 w-fit cursor-pointer rounded-md border border-gray-300 px-4 py-2 shadow-sm"
                                    >
                                        Speak with Recruiters
                                    </div>
                                </div>
                                <div className="rounded-3xl border border-gray-300 bg-white p-6">
                                    <div>
                                        <img
                                            src="https://cdn.brandfetch.io/idawOgYOsG/theme/dark/symbol.svg?k=bfHSJFAPEG&width=32&height=32"
                                            alt="logo"
                                            className="mr-3 inline-block h-8 w-8"
                                        />
                                        <span className="align-middle">Amazon</span>
                                    </div>
                                    <div
                                        role="button"
                                        className="mt-6 w-fit cursor-pointer rounded-md border border-gray-300 px-4 py-2 shadow-sm"
                                    >
                                        Speak with Recruiters
                                    </div>
                                </div>
                                <div className="rounded-3xl border border-gray-300 bg-white p-6">
                                    <div>
                                        <img
                                            src="https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/symbol.svg?k=bfHSJFAPEG&width=32&height=32"
                                            alt="logo"
                                            className="mr-3 inline-block h-8 w-8"
                                        />
                                        <span className="align-middle">Google</span>
                                    </div>
                                    <div
                                        role="button"
                                        className="mt-6 w-fit cursor-pointer rounded-md border border-gray-300 px-4 py-2 shadow-sm"
                                    >
                                        Speak with Recruiters
                                    </div>
                                </div>
                                <div className="rounded-3xl border border-gray-300 bg-white p-6">
                                    <div>
                                        <img
                                            src="https://cdn.brandfetch.io/id2S-kXbuK/theme/dark/symbol.svg?k=bfHSJFAPEG&width=32&height=32"
                                            alt="logo"
                                            className="mr-3 inline-block h-8 w-8"
                                        />
                                        <span className="align-middle">Tesla</span>
                                    </div>
                                    <div
                                        role="button"
                                        className="mt-6 w-fit cursor-pointer rounded-md border border-gray-300 px-4 py-2 shadow-sm"
                                    >
                                        Speak with Recruiters
                                    </div>
                                </div>
                                <div className="rounded-3xl border border-gray-300 bg-white p-6">
                                    <div>
                                        <img
                                            src="https://cdn.brandfetch.io/id4_P9mCgY/w/400/h/400/theme/dark/icon.jpeg?k=bfHSJFAPEG&width=32&height=32"
                                            alt="logo"
                                            className="mr-3 inline-block h-8 w-8"
                                        />
                                        <span className="align-middle">IBM</span>
                                    </div>
                                    <div
                                        role="button"
                                        className="mt-6 w-fit cursor-pointer rounded-md border border-gray-300 px-4 py-2 shadow-sm"
                                    >
                                        Speak with Recruiters
                                    </div>
                                </div>
                                <div className="rounded-3xl border border-gray-300 bg-white p-6">
                                    <div>
                                        <img
                                            src="https://cdn.brandfetch.io/idchmboHEZ/theme/dark/symbol.svg?k=bfHSJFAPEG&width=32&height=32"
                                            alt="logo"
                                            className="mr-3 inline-block h-8 w-8"
                                        />
                                        <span className="align-middle">Microsoft</span>
                                    </div>
                                    <div
                                        role="button"
                                        className="mt-6 w-fit cursor-pointer rounded-md border border-gray-300 px-4 py-2 shadow-sm"
                                    >
                                        Speak with Recruiters
                                    </div>
                                </div>
                                <div className="rounded-3xl border border-gray-300 bg-white p-6">
                                    <div>
                                        <img
                                            src="https://cdn.brandfetch.io/idWvz5T3V7/w/400/h/400/theme/dark/icon.png?k=bfHSJFAPEG&width=32&height=32"
                                            alt="logo"
                                            className="mr-3 inline-block h-8 w-8"
                                        />
                                        <span className="align-middle">Meta</span>
                                    </div>
                                    <div
                                        role="button"
                                        className="mt-6 w-fit cursor-pointer rounded-md border border-gray-300 px-4 py-2 shadow-sm"
                                    >
                                        Speak with Recruiters
                                    </div>
                                </div>
                            </div>
                            <div className="mx-auto mt-12 w-fit cursor-pointer rounded-lg bg-sky-300 px-5 py-2 text-md text-white">
                                + Load More
                            </div>
                        </section>
                    </div>
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

export default RecruitersHotline;