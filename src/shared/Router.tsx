import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/header/Header";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import InterviewPage from "../pages/InterviewPage";
import { Gap } from "../elements/elements";
import Scheduler from "../components/interview/Scheduler";
import SchedulerTest from "../components/interview/SchedulerTest";
import SchedulerTest2 from "../components/interview/SchedulerTest2";
import MeetingPage from "../pages/MeetingPage";
import SimulationPage from "../pages/SimulationPage";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Gap />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/scheduler" element={<Scheduler />} />
          <Route path="/schedulerTest" element={<SchedulerTest />} />
          <Route path="/schedulerTest2" element={<SchedulerTest2 />} />
          <Route path="/meeting" element={<MeetingPage />} />
          <Route path="/simulation" element={<SimulationPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
