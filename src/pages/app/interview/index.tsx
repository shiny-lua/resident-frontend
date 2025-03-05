import { Route, Routes } from "react-router-dom"

import HomeIndex from "./home"
import InterviewRoom from "./interview-room"
const Interview = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeIndex />} />
            <Route path="/live/:callId" element={<InterviewRoom />} />
        </Routes>
    )
}

export default Interview