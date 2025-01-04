const JobPreparation = () => {
    return (
        <div>
            <div className="space-between mx-auto mt-[100px] flex w-full max-w-[1200px] flex-col items-center lg:mt-[200px] lg:flex-row">
                <div className="flex h-[234px] w-[358px] items-center justify-center rounded-[24px] bg-b4 lg:h-[388px] lg:w-[592px]">
                    <img
                        alt="better prepared"
                        width={528}
                        height={324}
                        src="/image/home/become-the-ideal-candidate.png"
                    />
                </div>
                <div className="mt-8 w-full text-center lg:ml-12 lg:mt-0 lg:w-[560px] lg:text-left">
                    <div className="font-albra text-[32px] leading-[32px] tracking-tight text-gray-900 lg:text-[48px] lg:leading-[48px]">
                        Become the Ideal Candidate
                    </div>
                    <div className="mt-6 px-4 text-xl leading-[18px] text-gray-500 lg:px-0 lg:leading-[24px]">
                        Build the skills, confidence, and mindset top employers are looking for.
                        Stand out by being prepared for every question, challenge, and test.
                    </div>
                </div>
            </div>
            <div className="space-between mx-auto mt-[64px] flex w-full max-w-[1200px] flex-col items-center lg:mt-[48px] lg:flex-row-reverse">
                <div className="flex h-[234px] w-[358px] items-center justify-center rounded-[24px] bg-b4 lg:h-[388px] lg:w-[592px]">
                    <img
                        alt="better prepared"
                        width={528}
                        height={324}
                        src="/image/home/land-your-dream-job.png"
                    />
                </div>
                <div className="mx-4 mt-8 w-full text-center lg:mx-0 lg:mr-12 lg:mt-0 lg:w-[560px] lg:text-right">
                    <div className="font-albra text-[32px] leading-[32px] text-gray-500 lg:text-[48px] lg:leading-[48px]">
                        Land Your Dream Job
                    </div>
                    <div className="mt-6 px-4 text-xl leading-[18px] text-gray-500 lg:px-0 lg:leading-[24px]">
                        Practice until you're pitch-perfect and ready to impress. Walk into any
                        interview knowing you're about to get hired.
                    </div>
                </div>
            </div>

        </div>
    )
}

export default JobPreparation