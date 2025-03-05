import { Route, Routes } from "react-router-dom"
import HomeIndex from "./home"
import InterviewCopilot from "./interview-copilot"
import AiResumeBuilder from "./ai-resume-builder"
import AiMockInterview from "./ai-mock-interview"
import AiTools from "./ai-tools"
import Guide from "./tutorial"

const Home = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeIndex />} />
            <Route path="/interview-copilot" element={<InterviewCopilot />} />
            {/* <Route path="/ai-resume-builder" element={<AiResumeBuilder />} /> */}
            <Route path="/ai-mock-interview" element={<AiMockInterview />} />
            <Route path="/ai-tools/*" element={<AiTools />} />
            <Route path="/guide" element={<Guide />} />
        </Routes>
    )
}

export default Home