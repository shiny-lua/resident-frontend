import Carousel from "react-multi-carousel"
import { innovation } from "./data.d"

const responsive = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1024
        },
        items: 5,
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
        items: 3,
        partialVisibilityGutter: 30
    }
}

const Innovation = ({i}: {i: {quote: string, author: string, source?: string, sourceImage: string}}) => {
    return (
        <div className="flex flex-col items-start self-start text-wrap max-w-[16.8rem] sm:max-w-[19.4rem]">
            <h3 className="quote-title mb-6 text-3xl font-albra text-white">
            “{i.quote}
            </h3>
            <p className="mb-10 text-xl text-blue-50">
                {i.author} {i.source}
            </p>
            <img
                src={i.sourceImage}
                alt={i.source}
                className="max-h-12"
            />
        </div>
    )
}

const Innovations = () => {
    return (
        <section className="px-3 sm:px-5">
            <div className="relative flex flex-col items-center gap-20 overflow-hidden rounded-[2rem] py-[5.5rem] bg-[linear-gradient(90deg,_#54b3f3_0%,_#00c3ff_100%)] text-white">
                <div className="flex flex-col items-center lg:gap-16 gap-12 text-center relative z-10 max-w-[41rem] px-12">
                    <p className="text-xl text-sky-200">We're Humble to Mention</p>
                    <h2 className="text-4xl font-albra max-w-[46.9375rem]">
                        Groundbreaking innovation for interviewees, as featured on
                    </h2>
                </div>

                <div className="w-full">
                    <Carousel additionalTransfrom={0}
                        arrows={false}
                        autoPlaySpeed={4000}
                        centerMode={false}
                        autoPlay
                        className=""
                        draggable
                        customTransition="all 4s linear"
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
                        {innovation.map((i, k) => (
                            <Innovation key={k} i={i} />
                        ))}
                    </Carousel>
                </div>
            </div>
        </section>

    )
}

export default Innovations