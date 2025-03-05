import { Route } from "react-router-dom"

import { Routes } from "react-router-dom";
import HomeIndex from "./home";
import MockRoom from "./mock-room";

const MockInterview = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeIndex />} />
            <Route path="/mock/:callId" element={<MockRoom />} />
        </Routes>
    )
}

export default MockInterview;
