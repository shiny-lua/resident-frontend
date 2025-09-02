import React from "react";
import { Route } from "react-router-dom"

import { Routes } from "react-router-dom";
import HomeIndex from "./home";
import MockRoom from "./mock-room";
import MockInterviewResults from "./results";

const MockInterview = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeIndex />} />
            <Route path="/mock/:sessionCode" element={<MockRoom />} />
            <Route path="/results/:interviewId" element={<MockInterviewResults />} />
        </Routes>
    )
}

export default MockInterview;
