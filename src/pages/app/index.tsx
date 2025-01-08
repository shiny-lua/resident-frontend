import { Route, Routes } from "react-router-dom"

import Onboarding from "./onboarding"
import Started from "./started";
import Interview from "./interview";

const AppIndex = () => {

    return (
        <Routes>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/started" element={<Started />} />
            <Route path="/interview" element={<Interview />} />
        </Routes>
    )
}

export default AppIndex;