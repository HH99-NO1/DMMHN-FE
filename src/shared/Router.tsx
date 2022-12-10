import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/header/Header";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
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
import Room from "../components/meeting/Room";
import RoomDetail from "../components/meeting/RoomDetail";
import NaverTTS from "../components/simulation/NaverTTS";
import TestRecorder from "../components/simulation/TestRecorder";
import SnsLoginPage from "../pages/SnsLoginPage";
import CustomPage from "../pages/CustomPage";

const Router = () => {
  const onLogin = useRecoilValue(onLoginState);

  return (
    <>
      <BrowserRouter>
        <Header />
        {onLogin && <LoginModal />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/meeting" element={<MeetingPage />} />
          <Route path="/meeting2/:roomName" element={<MeetingTest />} />
          <Route path="/room" element={<Room />} />
          <Route path="/room/:roomName" element={<RoomDetail />} />
          <Route path="/simulation/" element={<SimulationPage />} />
          <Route path="/mysimulation" element={<MySimulationPage />} />
          <Route path="/tts" element={<NaverTTS />} />
          <Route path="/recorder" element={<TestRecorder />} />
          <Route path="/snslogin" element={<SnsLoginPage />} />
          <Route
            path="/mysimulation/:postId"
            element={<MySimulationDetail />}
          />
          <Route path="/stopwatch" element={<Stopwatch />} />
          <Route path="/custom" element={<CustomPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
