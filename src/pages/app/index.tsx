import { Route, Routes } from "react-router-dom"

import Onboarding from "./onboarding"
import Started from "./started";

const AppIndex = () => {

    return (
        <Routes>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/started" element={<Started />} />
        </Routes>
    )
}

export default AppIndex;