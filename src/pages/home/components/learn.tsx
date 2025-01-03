import Carousel from "react-multi-carousel"
import { Link } from "react-router-dom"
import { tutorials } from "./data.d"

const Item = ({ i }: { i: { title: string, description: string, date: string, image: string } }) => {
    return (
        <Link to={""} className="">
            <div className="flex h-[527px] cursor-pointer flex-col items-start justify-start gap-6 self-stretch text-wrap rounded-[2rem] bg-white p-8 w-[21.375rem] sm:w-[25.9rem]">
                <img
                    src={i.image}
                    alt={i.title}
                    className="max-h-[10.125rem] w-full rounded-lg"
                    width={350}
                    height={162}
                />
                <p className="text-xl text-slate-600 opacity-40">{i.date}</p>
                <h3 className="text-2xl font-albra">{i.title}</h3>
                <p className="text-xl text-slate-600 opacity-40">{i.description}</p>
            </div>
        </Link>
    )
}

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
        items: 4,
        partialVisibilityGutter: 30
    }
}

const Learn = () => {
    return (
        <section className="px flex flex-col items-center gap-20 overflow-hidden pb-28 pt-24">

            <div className="my-20 max-w-[100vw]">
                <div className="px-3 flex flex-col items-center lg:gap-16 xs:gap-12 text-center relative z-10 sm:px-5">
                    <p className="text-xl text-gray-400">
                        AI Will Not Take Your Job But Someone Using AI Will
                    </p>
                    <h2 className="text-4xl font-albra max-w-[46.9375rem]">
                        Learn more about AI superpowers to navigate this recruiting season
                    </h2>
            </div>
                <Carousel additionalTransfrom={0}
                    arrows={false}
                    autoPlaySpeed={4000}
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
                    {tutorials.map((i, k) => (
                        <Item key={k} i={i} />
                    ))}
                </Carousel>
            </div>
        </section>
    )
}

export default Learn