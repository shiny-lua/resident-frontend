import { useState } from "react";

import HeaderSection from "./header-section";
import InterviewerSection from "./interviewer-section";
import ModelResponseSection from "./model-response-section";
import ReviewSection from "./review-section";
const MockRoom = () => {

    const [isEndInterview, setEndInterview] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(false);


    return (
        <div>
            {isEndInterview ? <ReviewSection /> : (
                <div className="h-dvh bg-design-light px-1">
                    <HeaderSection setEndInterview={setEndInterview} isCameraOn={isCameraOn} setIsCameraOn={setIsCameraOn} />
                    <div className="relative h-[calc(100dvh-142px)] w-full bg-slate-50 px-6">
                        <div className="flex flex-row overflow-hidden gap-5 h-full w-full min-h-[500px] min-w-[1200px]">
                            <InterviewerSection isCameraOn={isCameraOn} />
                            <ModelResponseSection />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MockRoom
