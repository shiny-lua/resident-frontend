import Layout from "../../../components/layout"
import Carousel from "react-multi-carousel"
import { companies } from "./components/data.d"
import Practice from "./components/practice"
import Header from "./components/header"
import JobPreparation from "./components/job-preparation"
import JoinSeekers from "./components/join-seekers"
import JobOfferReceive from "./components/job-offer-receive"
import { faqs } from "../components/data.d"
import Faq from "../components/faq"

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

const AiMockInterview = () => {
    return (
        <Layout>
            <div className="relative bg-cyan-50 pt-30">
                <img className="absolute left-0 top-0 w-full -z-1" src="/image/home/common-bg.png" alt="" />
                <Header />
                <div className="bg-white my-20">
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
                            <div className="flex items-center justify-center w-40 h-25" key={k} >
                                <img src={i.src} alt={i.alt} />
                            </div>
                        ))}
                    </Carousel>
                </div>
                <Practice />
                <JobPreparation />
                <JoinSeekers />
                <JobOfferReceive />
                <Faq title="FAQ: Everything You Need to Know About Mock Interviews" data={faqs}/>
            </div>
        </Layout>
    )
}

export default AiMockInterview