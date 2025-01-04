const JobOfferReceive = () => {
    return (
        <div className="mt-[100px] w-screen px-4 lg:mt-[200px]">
            <div className="mx-auto flex h-[592px] w-full max-w-[1200px] flex-col items-center justify-start rounded-[24px] bg-gradient-to-r from-[#0090FF] to-[#00F7FF] px-6 py-12 text-white lg:h-[400px]">
                <img
                    alt="rate"
                    width={145}
                    height={24}
                    src="/image/icons/stars-5.svg"
                />
                <div className="mt-3 text-lg font-medium">250K+ Job Offers Received</div>
                <div className="mt-8 w-full text-center font-albra text-[32px] leading-[32px] lg:text-[48px] lg:leading-[48px]">
                    <div>No More Interview Nerves or Missed Opportunities</div>
                </div>
                <div className="mt-3 w-full max-w-[1068px] text-center opacity-70">
                    Say goodbye to sweaty palms, blank stares, and “I should've said that”
                    moments.&nbsp; With Final Round AI, you get real practice, real feedback,
                    and real confidence.&nbsp; Step into your next interview calm, clear, and
                    ready to impress.
                </div>
                <div className="mt-12 hidden min-h-[56px] w-[392px] cursor-pointer items-center justify-center rounded-[8px] bg-white text-lg font-medium text-gray-900 hover:bg-gray-900 hover:text-white lg:flex">
                    Start Building Interview Confidence Now
                </div>
                <div className="mt-12 flex min-h-[80px] w-[276px] cursor-pointer flex-col items-center justify-center rounded-[8px] bg-white text-lg font-medium text-gray-900 hover:bg-gray-900 hover:text-white lg:hidden lg:w-[392px]">
                    <div>Start Building</div>
                    <div>Interview Confidence Now</div>
                </div>
            </div>
        </div>

    )
}

export default JobOfferReceive