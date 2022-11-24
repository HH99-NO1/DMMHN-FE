import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FlexCol, FlexRow, Text } from "../../elements/elements";
import { instance } from "../../recoil/instance";
import UserState from "./UserState";
// import logo from "img/logo.png";

const Header = () => {
  const [loginUser, setLoginUser] = useState(false);
  const [reqLogin, setReqLogin] = useState(false);
  console.log(loginUser);
  const preRefreshToken = sessionStorage.getItem("refreshtoken");
  const preAccessToken = sessionStorage.getItem("accesstoken");

  const navigate = useNavigate();

  // console.log("Authorization: " + preAccessToken);
  // console.log("refresh: " + preRefreshToken);

  const checkLogin = async () => {
    // console.log("??");
    try {
      // if (preAccessToken) {
      const { data } = await instance.get(`/members/me`);
      setLoginUser(true);
      // setLoginUserData([data]);
      console.log(data);
      return;
    } catch (error: any) {
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
          console.log(data);
          console.log(data.data);
          console.log(data.data.accessToken);
          console.log(newAccessToken);

          return sessionStorage.setItem("accesstoken", newAccessToken);
        } catch (e) {
          setReqLogin(true);
          console.log(e);
        }
      }
      console.log(errorCode);
    }

    //     const { data } = CheckAccessApi.get("members/me");
    //     setLoginUser(true);
    //     console.log("로그인 중");
    //     console.log(data);
    //     if (data === undefined) {
    //       const twiceCheck = CheckRefreshApi.get("members/me");
    //     }
    //     return data;
    //     // return console.log("loginUser_State: ", res.data);

    //     // console.log(response.data);
    //     // } else {
    //     //   setLoginUser(false);
    //     //   throw new Error("There is no refresh token");
    //     // }
    //   } catch (error: any) {
    //     const errorCode = error.response.data.ok;
    //     console.log(errorCode);
    //     setLoginUser(false);
    //     alert("access token이 만료되었습니다. 로그인 페이지로 이동합니다.");
    //     return console.log("11");
    //   }
  };
  useEffect(() => {
    if (reqLogin) {
      alert("로그인 세션이 만료되었습니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
      setReqLogin(false);
    }
  }, []);
  useEffect(() => {
    // checkLogin();
    // console.log(checkLogin());
  }, [checkLogin()]);

  return (
    <Ctn>
      <Wrap>
        <FlexRow gap="10px" justifyContent="space-between">
          <FlexRow gap="10px">
            <Img onClick={() => navigate("/")} src="img/logo.png" />
            <FlexCol alignItem="left" gap="5px">
              <Text fontWeight="600">떨면뭐하니</Text>
              <Text fontSize="small">
                떨리는 면접, 우리만 아는 방법이 있다!
              </Text>
            </FlexCol>
          </FlexRow>
          {loginUser ? (
            <UserState />
          ) : (
            <FlexRow gap="10px">
              <Btn onClick={() => navigate("/login")}>로그인 창으로 이동</Btn>
              <Btn onClick={() => navigate("/signup")}>
                회원가입 창으로 이동
              </Btn>
            </FlexRow>
          )}
        </FlexRow>
      </Wrap>
    </Ctn>
  );
};

const Ctn = styled.div`
  position: fixed;
  width: 100%;
  background-color: white;
  /* box-shadow: 0px 2px 8px -2px rgba(0, 0, 0, 0.1); */
  border-bottom: 1px solid ${(props) => props.theme.__lineGray};
  z-index: 2;
  /* border: 1px solid red; */
`;
const Wrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
  /* border: 1px solid green; */
`;
const Img = styled.img`
  width: 40px;
  height: 40px;
  scale: 1;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all, 0.3s;
  :hover {
    box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.3);
  }
`;
const Btn = styled.button`
  width: 200px;
  margin: 0 auto;
`;

export default React.memo(Header);
