import { Route, Routes } from "react-router-dom"

import RecruitersHotline from "./recruiters-hotline"
import ResumeOptimizer from "./resume-optimizer"
import ResumeGrader from "./resume-grader"
import ResumeChecker from "./resume-checker"
import ResumeScore from "./resume-score"
import ResumeMakerForAts from "./resume-maker-for-ats"
import AtsResumeMaker from "./ats-resume-maker"


const AiTools = () => {
    return (
        <Routes>
            <Route path="/recruiters-hotline" element={<RecruitersHotline />} />
            <Route path="/resume-optimizer" element={<ResumeOptimizer />} />
            <Route path="/resume-grader" element={<ResumeGrader />} />
            <Route path="/resume-checker" element={<ResumeChecker />} />
            <Route path="/resume-score" element={<ResumeScore />} />
            <Route path="/resume-maker-for-ats" element={<ResumeMakerForAts />} />
            <Route path="/ats-resume-maker" element={<AtsResumeMaker />} />
        </Routes>
    )
}

export default AiTools