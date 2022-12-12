import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/header/Header";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import SimulationPage from "../pages/SimulationPage";
import MyPage from "../pages/MyPage";
import MySimulationPage from "../pages/MySimulationPage";
import MySimulationDetail from "../components/mySimulation/MySimulationDetail";
import LoginModal from "../components/login/LoginModal";
import { onLoginState } from "../recoil/atoms/atoms";
import { useRecoilValue } from "recoil";
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
          <Route path="/simulation/" element={<SimulationPage />} />
          <Route path="/mysimulation" element={<MySimulationPage />} />
          <Route
            path="/mysimulation/:postId"
            element={<MySimulationDetail />}
          />
          <Route path="/custom" element={<CustomPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
