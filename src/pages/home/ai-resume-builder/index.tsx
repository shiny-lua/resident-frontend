import Icon from "../../../components/icon"
import Layout from "../../../components/layout"
import BaseInfo from "./components/base-info"
import CustomSetting from "./components/custom-setting"
import Education from "./components/education"
import Project from "./components/project"
import ResumeSetting from "./components/resume-setting"
import Skills from "./components/skills"
import WorkExperience from "./components/work-experience"

const AiResumeBuilder = () => {
    return (
        <Layout>
            <div className="bg-cyan-50">
                <div className="text-center px-3">
                    <div className="mx-auto max-w-[983px] font-[Albra] text-[32px] leading-none tracking-tight md:text-5xl md:leading-[48px]">
                        The most powerful AI Resume Builder
                    </div>
                    <div className="flex flex-col-reverse items-center justify-center text-lg leading-[24px] tracking-tight text-gray-500 xs:mt-4 md:mt-6 md:flex-row ">
                        Over 1,200,000 resume generated in the past 30 days
                        <div className="mb-2 rounded-[32px] bg-cyan-100 px-4 py-2 text-sm tracking-tight text-gray-500 md:mb-0 md:ml-2">
                            100% Free
                        </div>
                    </div>
                </div>
                <div className="px-4">
                    <div className="mx-auto mt-12 hidden w-[83%] max-w-[1700px] rounded-[24px] border border-[#DFE2E4] bg-white px-6 pb-12 shadow-md lg:block">
                        <div className="flex flex-col overflow-hidden">
                            <div className="mx-auto mb-2 flex h-[100px] w-full max-w-[1500px] flex-col items-center justify-around bg-transparent px-4 pt-2 md:flex-row md:items-center md:justify-between">
                                <div className="whitespace-nowrap text-left text-3xl font-semibold leading-none md:flex-1 md:leading-8">AI Resume Builder</div>
                                <div className="flex flex-row">
                                    <div>
                                        <div className="flex flex-row">
                                            <button
                                                type="button"
                                                className="rounded outline-none bg-white py-1 leading-3 border-design-orange flex h-10 w-[185px] flex-row items-center justify-between border bg-transparent px-[16px] text-[14px] text-sky-500"
                                            >
                                                <Icon icon="Download" />
                                                Download Resume
                                            </button>
                                            <button
                                                type="button"
                                                className="rounded outline-none py-1 leading-3 bg-design-orange ml-[12px] flex h-10 w-[93px] flex-row items-center justify-between bg-sky-500 px-[16px] text-[14px] text-white"
                                            >
                                                <Icon icon="Save" />
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mx-auto flex h-[calc(100svh-100px)] w-full max-w-[1600px] flex-row flex-wrap justify-center overflow-x-hidden overflow-y-scroll">
                                <div className="w-[45%] min-w-[400px] max-w-[800px]">
                                    <div className="scrollbar scrollbar-track-[#FDF9F6] scrollbar-w-1 flex justify-center md:h-[calc(100vh_-_153px)] md:justify-end md:overflow-y-scroll">
                                        <section className="flex max-w-2xl flex-col gap-8">
                                            <BaseInfo />
                                            <WorkExperience />
                                            <Education />
                                            <Project />
                                            <Skills />
                                            <CustomSetting />
                                            <ResumeSetting />
                                        </section>
                                        <div className="invisible shrink-[10000] grow hidden md:block" style={{ maxWidth: 50, minWidth: 0 }} />
                                    </div>
                                </div>
                                <div className="w-[55%] min-w-[400px] max-w-[800px] text-center">
                                    <div className="relative flex justify-center md:h-[calc(100vh_-_153px)]">
                                        <div
                                            className="invisible shrink-[10000] grow hidden md:block"
                                            style={{ maxWidth: 50, minWidth: 0 }}
                                        />
                                        <div className="relative">
                                            <section className="h-[calc(100vh-var(--top-nav-bar-height)-var(--resume-control-bar-height))] overflow-hidden md:p-[var(--resume-padding)]">
                                                <div style={{ maxWidth: "375.36px", maxHeight: "485.76px" }}>
                                                    <div
                                                        className="bg-white border-black origin-top-left border-[12px] shadow-lg"
                                                        style={{
                                                            width: 816,
                                                            height: 1056,
                                                            transform: "scale(0.46)"
                                                        }}
                                                    >
                                                        <iframe
                                                            srcDoc='<!DOCTYPE html>
<html>
  <head>
    <link rel="preload" as="font" href="https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/Roboto-Regular.ttf" type="font/ttf" crossorigin="anonymous">
<link rel="preload" as="font" href="https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/Roboto-Bold.ttf" type="font/ttf" crossorigin="anonymous"><link rel="preload" as="font" href="https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/Lato-Regular.ttf" type="font/ttf" crossorigin="anonymous">
<link rel="preload" as="font" href="https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/Lato-Bold.ttf" type="font/ttf" crossorigin="anonymous"><link rel="preload" as="font" href="https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/Montserrat-Regular.ttf" type="font/ttf" crossorigin="anonymous">
<link rel="preload" as="font" href="https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/Montserrat-Bold.ttf" type="font/ttf" crossorigin="anonymous"><link rel="preload" as="font" href="https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/OpenSans-Regular.ttf" type="font/ttf" crossorigin="anonymous">
<link rel="preload" as="font" href="https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/OpenSans-Bold.ttf" type="font/ttf" crossorigin="anonymous"><link rel="preload" as="font" href="https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/Raleway-Regular.ttf" type="font/ttf" crossorigin="anonymous">
<link rel="preload" as="font" href="https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/Raleway-Bold.ttf" type="font/ttf" crossorigin="anonymous"><link rel="preload" as="font" href="https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/NotoSerif-Regular.ttf" type="font/ttf" crossorigin="anonymous">
<link rel="preload" as="font" href="https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/NotoSerif-Bold.ttf" type="font/ttf" crossorigin="anonymous"><link rel="preload" as="font" href="https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/Lora-Regular.ttf" type="font/ttf" crossorigin="anonymous">
<link rel="preload" as="font" href="https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/Lora-Bold.ttf" type="font/ttf" crossorigin="anonymous"><link rel="preload" as="font" href="https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/RobotoSlab-Regular.ttf" type="font/ttf" crossorigin="anonymous">
<link rel="preload" as="font" href="https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/RobotoSlab-Bold.ttf" type="font/ttf" crossorigin="anonymous"><link rel="preload" as="font" href="https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/PlayfairDisplay-Regular.ttf" type="font/ttf" crossorigin="anonymous">
<link rel="preload" as="font" href="https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/PlayfairDisplay-Bold.ttf" type="font/ttf" crossorigin="anonymous"><link rel="preload" as="font" href="https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/Merriweather-Regular.ttf" type="font/ttf" crossorigin="anonymous">
<link rel="preload" as="font" href="https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/Merriweather-Bold.ttf" type="font/ttf" crossorigin="anonymous">
    <style>
@font-face {font-family: "Roboto"; src: url("https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/Roboto-Regular.ttf");}
@font-face {font-family: "Roboto"; src: url("https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/Roboto-Bold.ttf"); font-weight: bold;}@font-face {font-family: "Lato"; src: url("https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/Lato-Regular.ttf");}
@font-face {font-family: "Lato"; src: url("https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/Lato-Bold.ttf"); font-weight: bold;}@font-face {font-family: "Montserrat"; src: url("https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/Montserrat-Regular.ttf");}
@font-face {font-family: "Montserrat"; src: url("https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/Montserrat-Bold.ttf"); font-weight: bold;}@font-face {font-family: "OpenSans"; src: url("https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/OpenSans-Regular.ttf");}
@font-face {font-family: "OpenSans"; src: url("https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/OpenSans-Bold.ttf"); font-weight: bold;}@font-face {font-family: "Raleway"; src: url("https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/Raleway-Regular.ttf");}
@font-face {font-family: "Raleway"; src: url("https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/Raleway-Bold.ttf"); font-weight: bold;}@font-face {font-family: "NotoSerif"; src: url("https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/NotoSerif-Regular.ttf");}
@font-face {font-family: "NotoSerif"; src: url("https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/NotoSerif-Bold.ttf"); font-weight: bold;}@font-face {font-family: "Lora"; src: url("https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/Lora-Regular.ttf");}
@font-face {font-family: "Lora"; src: url("https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/Lora-Bold.ttf"); font-weight: bold;}@font-face {font-family: "RobotoSlab"; src: url("https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/RobotoSlab-Regular.ttf");}
@font-face {font-family: "RobotoSlab"; src: url("https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/RobotoSlab-Bold.ttf"); font-weight: bold;}@font-face {font-family: "PlayfairDisplay"; src: url("https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/PlayfairDisplay-Regular.ttf");}
@font-face {font-family: "PlayfairDisplay"; src: url("https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/PlayfairDisplay-Bold.ttf"); font-weight: bold;}@font-face {font-family: "Merriweather"; src: url("https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/Merriweather-Regular.ttf");}
@font-face {font-family: "Merriweather"; src: url("https://d12araoe7z5xxk.cloudfront.net/landing-page/fonts/Merriweather-Bold.ttf"); font-weight: bold;}
    </style>
  </head>
  <body style=&apos;overflow-y: auto; width: 612pt; margin: 0; padding: 0; -webkit-text-size-adjust:none;&apos;>
    <div></div>
  </body>
</html>'
                                                            style={{ width: "100%", height: "100%" }}
                                                        />
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <video
                        src="https://d12araoe7z5xxk.cloudfront.net/landing-page/video/ai-resume-builder.mp4"
                        className="mt-12 rounded-[12px] border border-slate-200 shadow-md lg:hidden"
                    />
                </div>

            </div>
        </Layout>
    )
}

export default AiResumeBuilder