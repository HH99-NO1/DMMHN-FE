import Signup from "../components/signup/Signup";
import { useRecoilValue } from "recoil";
import { isCheckEmail } from "../recoil/atoms/atoms";
import CheckEmailModal from "../components/signup/CheckEmailModal";

const SignupPage = () => {
  const isCheckEmailState = useRecoilValue(isCheckEmail);
  return (
    <>
      {isCheckEmailState && <CheckEmailModal />}
      <Signup />
    </>
  );
};

export default SignupPage;
