import Carousel from "react-multi-carousel"
import { slides } from "./data.d"

const Item = ({ i }: { i: { image: string, title: string, button: string } }) => {
    return (
        <div className="relative flex h-[198px] w-[300px] flex-col justify-between rounded-[24px] border border-gray-200 bg-white p-6 lg:h-[258px] lg:w-[336px]">
            <div className="mb-3">
                <img src={i.image} width={80} height={80}/>
            </div>
            <div className="line-clamp text-xl leading-[30px] tracking-tight md:h-[89px]">
                {i.title}
            </div>
            <div className="jusitfy-start mt-6 flex flex-row items-center">
                <div className="relative cursor-pointer items-center justify-center rounded-[6px] border border-gray-200 px-4 py-2 text-sm shadow-sm">
                    {i.button}
                </div>
            </div>
        </div>
    )
}

const responsive = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1024
        },
        items: 3,
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
        items: 2,
        partialVisibilityGutter: 30
    }
}

const Practice = () => {

    return (
        <div>
            <div className="text-center md:pt-[200px] px-3 pt-[100px] ">
                <div className="mx-auto max-w-[983px] font-albra text-[32px] leading-none tracking-tight md:text-5xl md:leading-[48px]">
                    Practice with the Biggest Companies and Be Ready for Anything
                </div>
                <div className="flex flex-col-reverse items-center justify-center text-lg leading-[24px] tracking-tight text-gray-tertiary xs:mt-4 md:mt-6 md:flex-row ">
                    <div className="max-w-[900px] text-gray-tertiary">
                        <div>These are the toughest interviews in the world — high standards, intense questions, and no room for error. If you can nail interviews with giants like Microsoft, Netflix, and OpenAI, you're ready for any challenge other companies throw your way.</div>
                    </div>
                </div>
            </div>
            <div className="mx-auto px-4 my-20 max-w-[1300px]">
                <Carousel additionalTransfrom={0}
                    arrows={false}
                    autoPlaySpeed={2000}
                    centerMode={false}
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
                    {slides.map((i, k) => (
                        <Item key={k} i={i} />
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

export default Practice