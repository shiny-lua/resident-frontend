import Carousel from "react-multi-carousel"
import { testimonials } from "./data.d"

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

const Testimonial = ({ i }: { i: { tag: string, quote: string, person: string, role: string, companyLogo: string, tagColor: string } }) => {
    return (
        <div className="flex flex-col shadow-1 items-start justify-between self-stretch rounded-[2rem] w-full sm:w-auto bg-sky-50 p-6 h-[400px] mx-2">
            <div className="mb-[2rem] flex flex-col items-start justify-between gap-8 text-wrap">
                <div className={`flex items-center justify-center gap-2 rounded-[2rem] px-4 py-3 nth2`}
                    style={{ backgroundColor: i.tagColor }}
                >
                    <h3 className="text-md text-white">{i.tag}</h3>
                </div>
                <h3 className="text-2xl font-albra">{i.quote}</h3>
                <p className="text-body/medium text-gray-primary opacity-40">{i.role}</p>
            </div>
            <img
                src={i.companyLogo}
                alt="company"
                className="w-[100px]"
            />
        </div>
    )
}

const Testimonials = () => {
    return (
        <section className="px flex flex-col items-center gap-20 overflow-hidden pb-28 pt-24">
            <div className="flex flex-col items-center lg:gap-16 gap-12 text-center relative z-10  max-w-[40.1rem]">
                <p className="text-xl  text-gray-400">We Are Here to Help You Succeed</p>
                <h2 className="text-4xl font-albra max-w-[46.9375rem]">Experience our product through real stories</h2>
            </div>
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
                        <Testimonial key={k} i={i} />

                    ))}
                </Carousel>
            </div>

        </section>
    )
}

export default Testimonials