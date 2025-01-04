import { slides } from "./data.d"

const Item = ({ i }: { i: any }) => {
    return (
        <div className="mt-6 min-h-[247px] rounded-[24px] bg-white px-6 py-4">
            <img alt="quote" width={336} height={16} src="/image/icons/quote.svg" />
            <div className="font-500 mt-2 min-h-[120px] text-[16px] tracking-tight text-[#0E1828]">{i.quote}</div>
            <img alt="dequote" width={336} height={16} src="/image/icons/dequote.svg" />
            <div className="mt-4 flex flex-row justify-between">
                <div className="flex flex-row justify-start">
                    <img
                        alt={i.avatar.alt}
                        width={40}
                        height={40}
                        className="rounded-[20px]"
                        src={i.avatar.src}
                    />
                    <div className="ml-3">
                        <div className="text-md tracking-tight">{i.user.name}</div>
                        <div className="mt-1 text-sm tracking-tight text-gray-500">{i.user.role}</div>
                    </div>
                </div>
                <img
                    alt={i.company.alt}
                    width={60}
                    height={40}
                    className="object-contain"
                    src={i.company.src}
                />
            </div>
        </div>
    )
}

const Experience = () => {
    return (
        <div className="mt-[100px] box-border min-h-[617px] w-full bg-cyan-200 py-16 lg:mt-[200px] lg:pt-[100px]">
            <div className="text-center">
                <div className="mx-auto max-w-[983px] font-albra text-[32px] leading-none tracking-tight md:text-5xl md:leading-[48px]">
                    Experience our product through real stories.
                </div>
                <div className="mt-4 text-lg leading-[24px] tracking-tight text-gray-500 md:mt-6">
                    We are here to help you succeed
                </div>
            </div>
            <div className="flex justify-center">
                <div className="max-w-[1650px]">
                    <div className="sm:container sm:mx-auto mx-2 grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {slides.map((i, k) => (
                            <Item key={k} i={i} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Experience