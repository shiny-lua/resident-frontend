import { Route, Routes } from "react-router-dom"
import HomeIndex from "./home"
import InterviewCopilot from "./interview-copilot"
import AiResumeBuilder from "./ai-resume-builder"


const Home = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeIndex />} />
            <Route path="/interview-copilot" element={<InterviewCopilot />} />
            <Route path="/ai-resume-builder" element={<AiResumeBuilder />} />
        </Routes>
    )
}

export default Home