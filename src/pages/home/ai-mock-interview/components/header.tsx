import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between px-4 pt-[20px] lg:flex-row lg:pt-[30px]">
            <div className="flex max-w-[476px] flex-col items-center text-gray-primary lg:items-start">
                <h1 className="text-center font-albra text-[32px] font-normal leading-[45px] lg:text-left lg:text-[36px]">
                    <div>Land Your Dream Job with 100% Confidence</div>
                </h1>
                <div className="mt-6 flex w-full max-w-[423px] flex-row items-center justify-center text-center text-md font-medium leading-[18px] md:text-lg lg:justify-start lg:text-left">
                    Every day, 500 candidates level up with us. Join them, crush your nerves,
                    and become interview-ready.
                </div>
                <Link
                    className="mt-12 flex h-[56px] w-[251px] text-lg cursor-pointer items-center justify-center rounded-[8px] bg-sky-500 text-white"
                    to="/app/interview"
                >
                    Start Now for Free
                </Link>
            </div>
            <img
                alt="mock interview introduction"
                width={732}
                height={450}
                className="mt-12 rounded-[16px] lg:mt-0"
                src="https://www.finalroundai.com/_next/image?url=%2Fassets%2Fimages%2Fnew-ai-mock%2Fmock-intro-pic.png&w=750&q=75"
            />
        </header>
    )
}

export default Header