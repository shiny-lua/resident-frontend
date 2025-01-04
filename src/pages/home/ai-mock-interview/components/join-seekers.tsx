import Carousel from "react-multi-carousel"

import { testimonials } from "../../components/data.d"

const responsive = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1024
        },
        items: 4,
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

const Item = ({ i }: { i: { tag: string, quote: string, person: string, role: string, companyLogo: string, tagColor: string } }) => {
    return (
        <div className="flex flex-col shadow-1 items-start justify-between self-stretch rounded-[2rem] w-full sm:w-auto bg-sky-50 p-6 h-[400px] mx-2">
            <div className="mb-[2rem] flex flex-col items-start justify-between gap-8 text-wrap">
                <div className={`flex items-center justify-center gap-2 rounded-[2rem] px-4 py-3 nth2`}
                    style={{ backgroundColor: i.tagColor }}
                >
                    <h3 className="text-lg text-black">{i.tag}</h3>
                </div>
                <h3 className="text-3xl font-albra">{i.quote}</h3>
                <p className="text-xl text-gray-primary opacity-40">{i.role}</p>
            </div>
            <img
                src={i.companyLogo}
                alt="company"
                className="w-[100px]"
            />
        </div>
    )
}

const JoinSeekers = () => {
    return (
        <section className="px mt-[100px] flex flex-col items-center overflow-hidden lg:mt-[200px]">
            <h2 className="relative z-10 mb-12 w-screen text-center text-3xl lg:mb-16">
                Join Thousands of Happy Job Seekers
            </h2>
            <div className="mx-auto px-4 my-20 w-full">
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
                    {testimonials.map((i, k) => (
                        <Item key={k} i={i} />

                    ))}
                </Carousel>
            </div>
        </section>
    )
}

export default JoinSeekers