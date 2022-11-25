import { useRecoilState } from "recoil";
import { isLoginState, isReqLoginState } from "../recoil/atoms/atoms";
import { instance } from "../recoil/instance";

const [isLogin, setIsLogin] = useRecoilState(isLoginState);
const [reqLogin, setReqLogin] = useRecoilState(isReqLoginState);
const preRefreshToken = sessionStorage.getItem("refreshtoken");
const preAccessToken = sessionStorage.getItem("accesstoken");

const checkLogin = async () => {
  try {
    // if (preAccessToken) {
    const { data } = await instance.get(`/members/me`);
    setIsLogin(true);

    console.log(data);

    return;
  } catch (error: any) {
    const errorCode = error.response;
    console.log(errorCode);
    if (errorCode === undefined) {
      try {
        console.log("refresh를 요구했다.");
        const { data } = await instance.post(`/members/refresh`, 0, {
          headers: {
            Authorization: preAccessToken,
            refresh: preRefreshToken,
          },
        });
        const newAccessToken = data.data.accessToken;
        // console.log(data);
        // console.log(data.data);
        // console.log(data.data.accessToken);
        // console.log(newAccessToken);

        return sessionStorage.setItem("accessToken", newAccessToken);
      } catch (e) {
        setReqLogin(true);
        console.log(e);
      }
    }
    // setReqLogin(true);
    console.log(errorCode);
  }
};

export default checkLogin;
