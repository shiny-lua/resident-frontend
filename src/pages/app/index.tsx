import { Route, Routes } from "react-router-dom"

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

const AppIndex = () => {

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