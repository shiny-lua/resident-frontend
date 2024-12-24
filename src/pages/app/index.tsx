import { Route, Routes } from "react-router-dom"

import Onboarding from "./onboarding"

const AppIndex = () => {

    return (
        <Routes>
            <Route path="/onboarding" element={<Onboarding />} />
        </Routes>
    )
}

export default AppIndex;