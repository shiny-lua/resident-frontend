import React, { useState } from "react";
import { useParams } from "react-router-dom";

import HeaderSection from "./header-section";
import InterviewerSection from "./interviewer-section";
import ModelResponseSection from "./model-response-section";
import ReviewSection from "./review-section";

const InterviewRoom = () => {
    const { callId } = useParams();
    const [isEndInterview, setEndInterview] = useState(false);

    return (
        <div>
            {isEndInterview ? <ReviewSection /> : (
                <div className="h-dvh bg-design-light px-1">
                    <HeaderSection setEndInterview={setEndInterview} interviewId={callId} />
                    <div className="relative h-[calc(100dvh-142px)] w-full bg-slate-50 px-6">

                        <div className="flex flex-row overflow-hidden gap-5 h-full w-full min-h-[500px] min-w-[1200px]">
                            <InterviewerSection />
                            <ModelResponseSection />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default InterviewRoom
