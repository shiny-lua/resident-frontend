import { Route, Routes } from "react-router-dom"

import SignUp from "./signup"
import SignIn from "./signin"
import VerifyCode from "./verify-code"
import ForgotPassword from "./forgot-password"

const Auth = () => {
    return (
        <Routes>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
    )
}

export default Auth