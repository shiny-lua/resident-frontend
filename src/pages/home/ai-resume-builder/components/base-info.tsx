const BaseInfo = () => {
    return (
        <section className="flex flex-col gap-3 rounded-md bg-white p-6 pt-4 shadow transition-opacity duration-200 border border-slate-200 undefined">
            <div className="grid grid-cols-6 gap-3">
                <label className="text-lg font-medium text-gray-700 col-span-3">
                    Name
                    <input
                        placeholder="Job Offer"
                        className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg"
                        type="text"
                    />
                </label>
                <label className="text-lg font-medium text-gray-700 col-span-3">
                    Location
                    <input
                        placeholder="San Francisco, CA"
                        className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg"
                        type="text"
                    />
                </label>
                <label className="text-lg font-medium text-gray-700 col-span-3">
                    Phone
                    <input
                        placeholder="(666)666-6666"
                        className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg"
                        type="text"
                    />
                </label>
                <label className="text-lg font-medium text-gray-700 col-span-3">
                    Email
                    <input
                        placeholder="hi@finalroundai.com"
                        className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg"
                        type="text"
                    />
                </label>
                <label className="text-lg font-medium text-gray-700 col-span-full">
                    Website
                    <input
                        placeholder="https://www.linkedin.com/company/finalroundai"
                        className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg"
                        type="text"
                    />
                </label>
                <div className="relative col-span-full">
                    <button className="rounded outline-none bg-[#f7f7f7] px-2 py-1 leading-3 absolute right-0 top-0">
                        <div className="flex flex-row items-center text-[12px]">
                            <img src="/image/icons/ai_star.png" width={20} height={20} alt="stars" />
                            AI Generate
                        </div>
                    </button>
                    <label className="text-lg font-medium text-gray-700 col-span-full relative">
                        Objective
                        <textarea
                            className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-lg resize-none overflow-hidden"
                            placeholder="AI superpower to assist candidates in navigating the challenges of this recruitment season."
                            style={{ height: 88 }}
                        />
                    </label>
                </div>
            </div>
        </section>
    )
}

export default BaseInfo