import axios from "axios";

const preAccessToken = sessionStorage.getItem("accesstoken");
export const instance = axios.create({
  baseURL: "https://dgbnb.shop",
  headers: { Authorization: preAccessToken },
});

export const UserApi = axios.create({
  baseURL: "https://dgbnb.shop",
});

const preRefreshToken = sessionStorage.getItem("refreshtoken");

export const CheckAccessApi = axios.create({
  baseURL: "https://dgbnb.shop/",
  headers: {
    Authorization: preAccessToken,
    // refresh: preRefreshToken,
  },
});
export const CheckRefreshApi = axios.create({
  baseURL: "https://dgbnb.shop/",
  headers: {
    Authorization: preAccessToken,
    refresh: preRefreshToken,
  },
});

instance.interceptors.response.use(
  (res) => {
    console.log(res);
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
        // console.log("Authorization: " + preAccessToken);
        // console.log("refresh: " + preRefreshToken);
        if (preRefreshToken) {
          try {
            async function checkToken() {
              console.log("checkToken 중...");
              return await axios
                .get("https://dgbnb.shop/members/me", {
                  Authorization: preAccessToken,
                })
                .then(async (res) => {
                  console.log(res);
                });
            }
          } catch (error) {
            console.log(error);
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
