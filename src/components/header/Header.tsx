import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FlexRow, Text } from "../../elements/elements";
import UserState from "./UserState";
import HamburgerMenu from "./HamburgerMenu";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  isLoginState,
  IUserState,
  onLoginState,
  userState,
} from "../../recoil/atoms/atoms";
import HamburgerMenuItem from "../../elements/HamburgerMenuItem";
import jwt_decode from "jwt-decode";

const Header = () => {
  const [loginUserState, setLoginUserState] = useRecoilState(userState);
  console.log(loginUserState);
  const setOnLogin = useSetRecoilState(onLoginState);

  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  const [isClick, setIsClick] = useState(false);
  // console.log(isLogin);
  const preAccessToken = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    preAccessToken ? setIsLogin(true) : setIsLogin(false);
    // console.log(userLoginData);
    // checkLogin();
    // console.log(checkLogin());
  }, [preAccessToken]);

  useEffect(() => {
    if (preAccessToken) {
      const decodeUserState: IUserState = jwt_decode(preAccessToken);
      setLoginUserState(decodeUserState);
    }
  }, [preAccessToken]);

  return (
    <Ctn>
      <Wrap>
        <FlexRow gap="10px" justifyContent="space-between">
          <FlexRow gap="10px">
            {/* <LogoBox onClick={() => navigate("/")}>
              <LogoItem />
            </LogoBox> */}
            <Img onClick={() => navigate("/")} src="img/logo.png" />

            {/* <Text fontSize="20px" fontWeight="600" color="white">
              떨면뭐하니
            </Text> */}
          </FlexRow>
          <FlexRow gap="30px">
            {isLogin ? (
              <UserState />
            ) : (
              <>
                <Btn onClick={() => setOnLogin(true)}>Log in</Btn>
                <Btn onClick={() => navigate("/signup")}>Sign up</Btn>
              </>
            )}
            <LogoBox onClick={() => setIsClick(!isClick)}>
              <HamburgerMenuItem />
            </LogoBox>
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
  background-color: transparent;
  /* box-shadow: 0px 2px 8px -2px rgba(0, 0, 0, 0.1); */
  /* border-bottom: 1px solid ${(props) => props.theme.__lineGray}; */
  z-index: 2;
  /* border: 1px solid red; */
`;

const Wrap = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  /* border: 1px solid green; */
`;
const LogoBox = styled.div`
  display: flex;
  margin: 0;
  width: 30px;
  & svg {
    width: 30px;
    transition: all, 0.2s;
    cursor: pointer;
  }
`;
const Img = styled.img`
  height: 60px;
  object-fit: cover;
  cursor: pointer;
`;
const Btn = styled.button`
  margin: 0 auto;
  background-color: transparent;
  border: none;
  font-family: 400;
  color: white;
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
