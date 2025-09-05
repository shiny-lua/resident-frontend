import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import PracticeInterview from "./home"
import PracticeInterviewRoom from "./practice-room"
import PracticeInterviewResults from "./results"

const PracticeInterviewIndex = () => {
    return (
        <Routes>
            <Route path="/" element={<PracticeInterview />} />
            <Route path="/practice/:sessionCode" element={<PracticeInterviewRoom />} />
            <Route path="/results/:sessionCode" element={<PracticeInterviewResults />} />
            <Route path="*" element={<Navigate to="/app/practice-interview" replace />} />
        </Routes>
    )
}

export default PracticeInterviewIndex
