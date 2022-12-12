import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FlexRow } from "../../elements/elements";
import UserState from "./UserState";
import HamburgerMenu from "./HamburgerMenu";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isLoginState, onLoginState } from "../../recoil/atoms/atoms";
import HamburgerMenuItem from "../../elements/HamburgerMenuItem";

const Header = () => {
  const setOnLogin = useSetRecoilState(onLoginState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const [isClick, setIsClick] = useState(false);
  const preAccessToken = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    preAccessToken ? setIsLogin(true) : setIsLogin(false);
  }, [preAccessToken]);

  // 헤더 배경 등 고정
  const [isFixed, setIsFixed] = useState(false);
  console.log(isFixed);
  const handleShowButton = () => {
    if (window.scrollY > 0) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    handleShowButton();
    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    <Ctn isFixed={isFixed}>
      <Wrap>
        <FlexRow gap="10px" justifyContent="space-between">
          <FlexRow gap="10px">
            <Img onClick={() => navigate("/")} src="img/logo.png" alt="logo" />
          </FlexRow>
          <FlexRow gap="30px">
            <UpWidth500>
              {isLogin ? (
                <UserState />
              ) : (
                <>
                  <Btn onClick={() => setOnLogin(true)}>Log in</Btn>
                  <Btn onClick={() => navigate("/signup")}>Sign up</Btn>
                </>
              )}
            </UpWidth500>
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

interface ICtn {
  isFixed?: boolean;
}

const Ctn = styled.div<ICtn>`
  position: fixed;
  width: 100%;
  height: 60px;
  z-index: 2;
  background-color: ${(props) => {
    if (props.isFixed) {
      return "#004922";
    } else {
      return "transparent";
    }
  }};
`;

const Wrap = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
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
  color: #fff;
  cursor: pointer;
`;

const UpWidth500 = styled(FlexRow)`
  gap: 20px;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

export default React.memo(Header);
