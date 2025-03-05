import "./index.css";

const Loading = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-screen flex gap-8 justify-center items-center">
            <div className="loader">
                <div className="face">
                    <div className="circle"></div>
                </div>
                <div className="face">
                    <div className="circle"></div>
                </div>
            </div>
            <div className="loader-1">{children}</div>
        </div>
    )
};

export default Loading;