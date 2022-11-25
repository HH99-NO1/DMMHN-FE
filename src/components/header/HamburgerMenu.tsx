import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface IHamburgerMenu {
  setIsClick: any;
  isLogin: boolean;
  setIsLogin: any;
}

const HamburgerMenu = ({ setIsClick, isLogin, setIsLogin }: IHamburgerMenu) => {
  const navigate = useNavigate();
  console.log(isLogin);
  return (
    <Ctn onClick={() => setIsClick(false)}>
      {!isLogin ? (
        // 로그인이 되어있지 않을 때
        <>
          <MenuBox onClick={() => navigate("/login")}>Log in</MenuBox>
          <MenuBox onClick={() => navigate("/signup")}>Sign up</MenuBox>
          <MenuLine />
          <MenuBox onClick={() => navigate("/simulation")}>모의면접</MenuBox>
        </>
      ) : (
        // 로그인이 되어있을 때
        <>
          <MenuBox onClick={() => navigate("/simulation")}>
            <strong>모의면접</strong>
          </MenuBox>
          <MenuBox onClick={() => navigate("/mysimulation")}>
            나의 모의면접 현황
          </MenuBox>
          <MenuLine />
          <MenuBox onClick={() => navigate("/mypage")}>My page</MenuBox>
          <MenuBox
            onClick={() => {
              setIsClick(false);
              if (window.confirm("로그아웃 하시겠습니까?")) {
                sessionStorage.clear();
                setIsLogin(false);
                window.location.reload();
              }
            }}
          >
            <strong>Log out</strong>
          </MenuBox>
          <MenuLine />
          <MenuBox bgColor="#FAE6E6" onClick={() => navigate("/interview")}>
            면접 스케줄러
          </MenuBox>
          <MenuBox bgColor="#FAE6E6" onClick={() => navigate("/meeting")}>
            면접 룸
          </MenuBox>
        </>
      )}
    </Ctn>
  );
};

const Ctn = styled.div`
  position: absolute;
  z-index: 5;
  top: 70px;
  right: 20px;
  min-width: 200px;
  background-color: white;
  border-radius: 10px;
  padding: 10px 0;
  box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.1);
`;

interface IMenuBox {
  bgColor?: string;
}

const MenuBox = styled.div<IMenuBox>`
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.bgColor === undefined ? props.theme.__grayLight : props.bgColor};
  }
`;
const MenuLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ebebeb;
  margin: 8px 0;
`;
export default HamburgerMenu;
