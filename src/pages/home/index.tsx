import { Route, Routes } from "react-router-dom"
import HomeIndex from "./home"
import InterviewCopilot from "./interview-copilot"


const Home = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeIndex />} />
            <Route path="/interview-copilot" element={<InterviewCopilot />} />
        </Routes>
    )
}

export default Home