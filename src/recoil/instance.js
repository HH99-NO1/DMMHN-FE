import axios from "axios";

export const instance = axios.create({
  baseURL: "https://dgbnb.shop",
  headers: { Authorization: "accesstoken" },
});

export const UserApi = axios.create({
  baseURL: "https://dgbnb.shop",
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
