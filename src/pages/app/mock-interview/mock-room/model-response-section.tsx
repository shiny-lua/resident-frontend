const ModelResponseSection = () => {
    return (
        <div className="flex gap-5 w-4/5 justify-center">
            <div
                className="min-w-[400px] rounded-t-lg"
                style={{ flex: "40 1 0px", overflow: "hidden" }}
            >
                <div className=" flex flex-1 flex-col border border-slate-100 bg-white h-full p-6">
                    <div className="flex flex-col gap-2">
                        <div className="text-sm text-slate-600">00:00</div>
                        <div className="text-slate-900">
                            <div className="bg-cyan-100 rounded-lg px-3 py-2 text-cyan-800 text-md font-semibold">Welcome to your mock interview! Let's get started and focus on showcasing your strengths and skills.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModelResponseSection;
