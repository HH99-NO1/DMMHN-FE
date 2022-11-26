import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/header/Header";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import InterviewPage from "../pages/InterviewPage";
import { Gap } from "../elements/elements";
import Scheduler from "../components/interview/Scheduler";
import SchedulerTest from "../components/interview/SchedulerTest";
import SchedulerTest2 from "../components/interview/SchedulerTest2";
import MeetingPage from "../pages/MeetingPage";
import SimulationPage from "../pages/SimulationPage";
import Stopwatch from "../components/stopwatch/Stopwatch";
import MyPage from "../pages/MyPage";
import MeetingTest from "../components/meeting/MeetingTest";
import MySimulationPage from "../pages/MySimulationPage";
import MySimulationDetail from "../components/mySimulation/MySimulationDetail";
import LoginModal from "../components/login/LoginModal";
import { onLoginState } from "../recoil/atoms/atoms";
import { useRecoilValue } from "recoil";

const Router = () => {
  const onLogin = useRecoilValue(onLoginState);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Gap />
        {onLogin && <LoginModal />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/scheduler" element={<Scheduler />} />
          <Route path="/schedulerTest" element={<SchedulerTest />} />
          <Route path="/schedulerTest2" element={<SchedulerTest2 />} />
          <Route path="/meeting" element={<MeetingPage />} />
          <Route path="/meeting2/:roomName" element={<MeetingTest />} />
          <Route path="/simulation/" element={<SimulationPage />} />
          <Route path="/mysimulation" element={<MySimulationPage />} />
          <Route
            path="/mysimulation/:postId"
            element={<MySimulationDetail />}
          />
          <Route path="/stopwatch" element={<Stopwatch />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
