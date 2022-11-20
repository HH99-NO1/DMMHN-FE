import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../components/login/Login";

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  // baseURL: "http://localhost:3001",
  baseURL: "https://dgbnb.shop",
  headers: { Authorization: "accesstoken" },
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    // response에서 error가 발생했을 경우 catch로 넘어가기 전에 처리
    try {
      const errResponseStatus = error.response.status;
      const errResponseData = error.response.data;
      const prevRequest = error.config;

      // access token이 만료되어 발생하는 에러인 경우
      if (
        errResponseData.error?.message === "jwt expired" ||
        errResponseStatus === 401
      ) {
        const preRefreshToken = sessionStorage.getItem("refreshtoken");
        const preAccessToken = sessionStorage.getItem("accesstoken");
        console.log("Authorization: " + preAccessToken);
        console.log("refresh: " + preRefreshToken);
        if (preRefreshToken) {
          async function checkToken() {
            return await axios
              .post("https://dgbnb.shop/members/me", {
                Authorization: preAccessToken,
                refresh: preRefreshToken,
              })
              .then(async (res) => {
                console.log(res);
              });
          }

          // refresh token을 이용하여 access token 재발급
          //     async function regenerateToken() {
          //       return await axios
          //         .post("https://dgbnb.shop/members/refresh", {
          //           refresh_token: preRefreshToken,
          //         })
          //         .then(async (res) => {
          //           const { access_token, refresh_token } = res.data;
          //           // 새로 받은 token들 저장
          //           sessionStorage.setItem(ACCESS_TOKEN, access_token, {
          //             path: "/" /*httpOnly: true */,
          //           });
          //           sessionStorage.setItem(REFRESH_TOKEN, refresh_token, {
          //             path: "/" /*httpOnly: true */,
          //           });

          //           // header 새로운 token으로 재설정
          //           prevRequest.headers.Authorization = `${access_token}`;

          //           // 실패했던 기존 request 재시도
          //           return await axios(prevRequest);
          //         })
          //         .catch((e) => {
          //           /*
          //            token 재발행 또는 기존 요청 재시도 실패 시
          //            기존 token 제거
          //            */
          //           sessionStorage.removeItem(ACCESS_TOKEN);
          //           sessionStorage.removeItem(REFRESH_TOKEN);

          //           return new Error(e);
          //         });
          //     }
          //     return await regenerateToken();
        } else {
          throw new Error("There is no refresh token");
        }
      }
    } catch (e) {
      // 오류 내용 출력 후 요청 거절
      return Promise.reject(e);
    }
  }
);

export const UserApi = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  // baseURL: "http://localhost:3001",
  baseURL: "https://dgbnb.shop",
});
