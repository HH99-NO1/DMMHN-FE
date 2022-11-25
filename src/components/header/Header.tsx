import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FlexCol, FlexRow, Text } from "../../elements/elements";
import LogoItem from "../../elements/LogoItem";
import { instance } from "../../recoil/instance";
import UserState from "./UserState";
import { GiHamburgerMenu } from "react-icons/gi";
import HamburgerMenu from "./HamburgerMenu";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isLoginState, onLoginState } from "../../recoil/atoms/atoms";

const Header = () => {
  const setOnLogin = useSetRecoilState(onLoginState);

  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  const [reqLogin, setReqLogin] = useState(false);

  const [isClick, setIsClick] = useState(false);
  console.log(isLogin);
  const preRefreshToken = sessionStorage.getItem("refreshToken");
  const preAccessToken = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  // console.log("Authorization: " + preAccessToken);
  // console.log("refresh: " + preRefreshToken);

  const checkLogin = async () => {
    // console.log("??");
    if (preAccessToken) {
      try {
        // if (preAccessToken) {
        const { data } = await instance.get(`/members/me`);
        // setReqLogin(false);
        setIsLogin(true);
        // setLoginUserData([data]);
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
    } else {
      return;
    }
  };
  useEffect(() => {
    console.log("reqLogin: ", reqLogin);
    if (reqLogin) {
      alert("로그인 세션이 만료되었습니다. 로그인을 해주세요.");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      setReqLogin(false);
      setOnLogin(true);
    }
  }, []);
  useEffect(() => {
    preAccessToken && checkLogin();
    // console.log(userLoginData);
    // checkLogin();
    // console.log(checkLogin());
  }, [checkLogin()]);

  return (
    <Ctn>
      <Wrap>
        <FlexRow gap="10px" justifyContent="space-between">
          <FlexRow gap="10px">
            <LogoBox onClick={() => navigate("/")}>
              <LogoItem />
            </LogoBox>
            {/* <Img onClick={() => navigate("/")} src="img/logo.png" /> */}
            <FlexCol alignItem="left" gap="5px">
              <Text fontWeight="600">떨면뭐하니</Text>
              <Text fontSize="small">
                떨리는 면접, 우리만 아는 방법이 있다!
              </Text>
            </FlexCol>
          </FlexRow>
          <FlexRow gap="10px">
            {isLogin ? (
              <UserState />
            ) : (
              <>
                <Btn onClick={() => setOnLogin(true)}>Log in</Btn>
                <Btn onClick={() => navigate("/signup")}>Sign up</Btn>
              </>
            )}
            <Curser>
              <GiHamburgerMenu onClick={() => setIsClick(!isClick)} size={30} />
            </Curser>
            {isClick && <HamburgerMenu setIsClick={setIsClick} />}
          </FlexRow>
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
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
  /* border: 1px solid green; */
`;
const LogoBox = styled.div`
  margin: 0;
  width: 40px;
  height: 40px;
  & > svg {
    border-radius: 12%;
    width: 40px;
    height: 40px;
    box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.3);
    transition: all, 0.2s;
    cursor: pointer;
  }
  & > svg:hover {
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.3);
  }
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
  margin: 0 auto;
  background-color: transparent;
  border: none;
  font-family: 400;
  cursor: pointer;
`;
const Curser = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

export default React.memo(Header);
