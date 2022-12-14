import axios from "axios";

const preAccessToken = sessionStorage.getItem("accessToken");
export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { Authorization: preAccessToken },
});

export const UserApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
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

      // access token이 만료되어 발생하는 에러인 경우
      if (
        errResponseData.error?.message === "jwt expired" ||
        errResponseStatus === 401
      ) {
        const preRefreshToken = sessionStorage.getItem("refreshToken");
        const preAccessToken = sessionStorage.getItem("accessToken");

        if (preAccessToken) {
          try {
            const checkToken = async () => {
              return await axios
                .get(`${process.env.REACT_APP_API_URL}/members/me`, {
                  headers: {
                    Authorization: preAccessToken,
                  },
                })
                .then(async (res) => {
                  console.log(res);
                });
            };
            checkToken();
          } catch (error) {
            const errorCode = error.response;
            if (errorCode === undefined) {
              try {
                const { data } = await instance.post(`/members/refresh`, 0, {
                  headers: {
                    Authorization: preAccessToken,
                    refresh: preRefreshToken,
                  },
                });
                const newAccessToken = data.data.accessToken;

                return sessionStorage.setItem("accessToken", newAccessToken);
              } catch (e) {
                alert("로그인 기한이 만료되었습니다.");
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("refreshToken");
              }
            }
            // setReqLogin(true);
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
