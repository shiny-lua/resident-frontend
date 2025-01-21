import { Navigate, Route, Routes, useNavigate } from "react-router-dom"

import Onboarding from "./onboarding"
import Started from "./started";
import Interview from "./interview";
import MockInterview from "./mock-interview";
import PermissionSetting from "./permission-setting";
import Role from "./role";
import Resume from "./resume";
import AiGenerater from "./ai-generator";
import InterviewCoach from "./interview-coach";
import ChatWithRecruiters from "./chat-with-recruiters";
import Question from "./question";
import Subscription from "./subscription";
import { useGlobalContext } from "../../context";
import { restApi } from "../../context/restApi";
import { showToast } from "../../context/helper";
import React from "react";

const AppIndex = () => {

    const navigate = useNavigate()
    const [state, { dispatch, storeData }]: GlobalContextType = useGlobalContext()

    React.useEffect(() => {

        const fetchData = async () => {
            try {
                console.log(state.authToken);
                const res = await restApi.postRequest("get-user");

                if (res === undefined) {
                    showToast('An error has occurred during communication with backend.', 'warning');
                } else if (res.status === 200) {
                    const data = res.data.data;
                    const user = { email: data.email, fullName: data.full_name, pfp: data.pfp };
                    dispatch({ type: "user", payload: user });
                    dispatch({ type: "authToken", payload: res.data.token });
                    storeData(res.data.token);
                    navigate("/app/started");
                } else {
                    navigate("/auth/sign-in");
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                navigate("/auth/sign-in");
            }
        };

        fetchData();

    }, []);

    return (
        <Routes>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/started" element={<Started />} />
            <Route path="/live-interview" element={<Interview />} />
            <Route path="/mock-interview" element={<MockInterview />} />
            <Route path="/permission-setting" element={<PermissionSetting />} />
            <Route path="/role" element={<Role />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/ai-generator" element={<AiGenerater />} />
            <Route path="/interview-coach" element={<InterviewCoach />} />
            <Route path="/chat-with-recruiters" element={<ChatWithRecruiters />} />
            <Route path="/question" element={<Question />} />
            <Route path="/subscription" element={<Subscription />} />
        </Routes>
    )
}

export default AppIndex;