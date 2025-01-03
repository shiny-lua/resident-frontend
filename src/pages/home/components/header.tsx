import Carousel from "react-multi-carousel"

import Icon from "../../../components/icon"
import { companies } from "./data.d"

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

const Header = () => {
    return (
        <div className="relative pb-20">
            <div className="flex justify-center mt-10 md:mt-20 lg:mt-40">
                <div className="mx-auto px-4 max-w-[1700px]">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="">
                            <div className="text-center font-albra font-normal lg:text-left text-[20px] leading-[30px] md:leading-[40px] lg:leading-[45px] md:text-[32px] lg:text-4xl"><div>Unlock Your Interview Superpowers with AI, </div><div>Your AI-Powered Interview Copilot</div></div>
                            <div className="flex lg:justify-start justify-center items-center gap-8 mt-6 mb-5">
                                <div className="text-sm md:text-xl font-normal md:font-[600] text-center lg:text-left">250K+ Offers Received</div>
                                <div className="h-10 w-[2px] bg-light-gray"></div>
                                <div className="text-sm md:text-xl font-normal md:font-[600] text-center lg:text-left">1.2M + Interviews Aced</div>
                            </div>
                            <div className="flex justify-center lg:justify-start">
                                <button className="text-white rounded-md px-10 py-4 text-md bg-primary hover:bg-black">Activate AI Interview Mode Now</button>
                            </div>

                            <div className="flex justify-center lg:justify-start">
                                <div className="mt-8 w-[280px] text-center text-md text-slate-400 lg:w-full lg:max-w-[438px] lg:text-left lg:text-md">Interview Copilot<span className="relative top-[-3px]"></span> generating actionable guidance for interviews in real-time</div>
                            </div>
                        </div>
                        <div className="-translate-y-10 lg:translate-y-0 relative">
                            <img src="/image/video.png" className="max-w-full h-auto" alt="" />
                            <img src="/image/text.png" className="absolute hidden md:block -top-15 lg:-top-30 left-0 max-w-full h-auto" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full mt-30">
                <div className="flex justify-center">
                    <h2 className="font-albra text-[20px] md:text-[32px] lg:text-[38px] max-w-[800px] text-center">300,000+ offers from the most exciting companies and organizations</h2>
                </div>
            </div>

            <div className="mx-auto px-4 my-20 max-w-[1700px]">
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
                        <div className="flex items-center justify-center w-20 h-20" key={k} >
                            <Icon icon={i} />
                        </div>
                    ))}
                </Carousel>
            </div>

        </div>
    )
}

export default Header