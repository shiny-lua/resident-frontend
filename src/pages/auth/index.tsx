import { Route, Routes } from "react-router-dom"

import SignUp from "./signup"
import SignIn from "./signin"
import VerifyCode from "./verify-code"
import ForgotPassword from "./forgot-password"
import ResetPassword from "./reset-password"

const Auth = () => {
    return (
        <Routes>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
    )
}

export default Auth