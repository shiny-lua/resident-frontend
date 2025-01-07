import Carousel from "react-multi-carousel"

import Icon from "../../../components/icon"
import Layout from "../../../components/layout"
import BaseInfo from "./components/base-info"
import CustomSetting from "./components/custom-setting"
import Education from "./components/education"
import Project from "./components/project"
import ResumeSetting from "./components/resume-setting"
import Skills from "./components/skills"
import WorkExperience from "./components/work-experience"
import { companies } from "./components/data.d"
import RecruitingTools from "./components/recruiting-tools"
import Experience from "./components/experience"

const responsive = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1024
        },
        items: 7,
        partialVisibilityGutter: 40
    },
    mobile: {
        breakpoint: {
            max: 464,
            min: 0
        },
        items: 1,
        partialVisibilityGutter: 30
    },
    tablet: {
        breakpoint: {
            max: 1024,
            min: 464
        },
        items: 4,
        partialVisibilityGutter: 30
    }
}

const AiResumeBuilder = () => {
    return (
        <Layout>
            <div className="relative pt-30">
                <img className="absolute left-0 top-0 w-full -z-1" src="/image/home/common-bg.png" alt="" />
                <div className="text-center px-3">
                    <div className="mx-auto max-w-[983px] font-albra text-[32px] leading-none tracking-tight md:text-5xl md:leading-[48px]">
                        The most powerful AI Resume Builder
                    </div>
                    <div className="flex flex-col-reverse items-center justify-center text-lg leading-[24px] tracking-tight text-gray-500 mt-4 md:mt-6 md:flex-row ">
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
                                            <section className="overflow-hidden">
                                                <div style={{ maxWidth: "375.36px", maxHeight: "485.76px" }}>
                                                    <div
                                                        className="bg-white border-black origin-top-left border-[12px] shadow-lg"
                                                        style={{
                                                            width: 816,
                                                            height: 1056,
                                                            transform: "scale(0.46)"
                                                        }}
                                                    >

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
                <div className="mx-auto px-4 mt-20 max-w-[1700px]">
                    <Carousel additionalTransfrom={0}
                        arrows={false}
                        autoPlaySpeed={2000}
                        centerMode={true}
                        autoPlay
                        className=""
                        draggable
                        customTransition="all 2s linear"
                        focusOnSelect={false}
                        infinite
                        minimumTouchDrag={80}
                        pauseOnHover
                        renderArrowsWhenDisabled={false}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        responsive={responsive}
                        rewind={false}
                        rewindWithAnimation={false}
                        rtl={false}
                        shouldResetAutoplay
                        showDots={false}
                        sliderClass=""
                        slidesToSlide={1}
                        swipeable
                    >
                        {companies.map((i, k) => (
                            <div className="flex items-center justify-center w-50 h-50" key={k} >
                                <img src={i.src} alt={i.alt} width="100%" height="100%"/>
                            </div>
                        ))}
                    </Carousel>
                </div>
                <RecruitingTools />
                <Experience />
            </div>
        </Layout>
    )
}

export default AiResumeBuilder