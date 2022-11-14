import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/header/Header";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import InterviewPage from "../pages/InterviewPage";
import { Gap } from "../elements/elements";

const Router = () => {
  return (
    <>
      <Header />
      <Gap />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/interview" element={<InterviewPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
