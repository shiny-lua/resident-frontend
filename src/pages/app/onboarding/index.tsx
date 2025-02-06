import React from "react";
import { Link, useNavigate } from "react-router-dom";

import InterviewHelper from "./interview-helper";
import InterviewRolePrompt from "./interview-role-prompt";
import RealtimeResponseCustomizer from "./realtime-response-customizer";
import LaunchChecklist from "./launch-checklist";
import LastStep from "./last-step";

const Onboarding = () => {

    const [stepIndex, setStepIndex] = React.useState(0)

    const onNext = () => setStepIndex(stepIndex + 1)
    const onPrev = () => setStepIndex(stepIndex - 1)

    return (
        <div className="flex w-full h-[100vh] justify-center relative">
            <div className="max-w-[500px] flex flex-col mt-10 px-5">
                <Link to="/" className="flex justify-center gap-2 top-5 left-5 sm:left-10 2xl:left-20 cursor-pointer">
                    <div className="text-2xl text-primary">Final Round</div>
                    <div>
                        <img src="/image/icons/logo.png" alt="logo" />
                    </div>
                </Link>
                <Link to="/app/started" className="top-10   hover:underline absolute right-5 z-50 cursor-pointer text-sm font-medium text-slate-400">Skip to app</Link>
                {stepIndex === 0 && (<InterviewHelper onNext={onNext} />)}
                {stepIndex === 1 && (<InterviewRolePrompt onNext={onNext} onPrev={onPrev} />)}
                {stepIndex === 2 && (<RealtimeResponseCustomizer onNext={onNext} onPrev={onPrev} />)}
                {stepIndex === 3 && (<LaunchChecklist onNext={onNext} onPrev={onPrev} />)}
                {stepIndex === 4 && (<LastStep onNext={onNext} onPrev={onPrev} />)}
            </div>
        </div>
    )
}

export default Onboarding