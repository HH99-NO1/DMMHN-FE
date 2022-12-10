import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isLoginState, onLoginState } from "../../recoil/atoms/atoms";

interface IHamburgerMenu {
  setIsClick: (state: boolean) => void;
}

const HamburgerMenu = ({ setIsClick }: IHamburgerMenu) => {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  const setOnLogin = useSetRecoilState(onLoginState);
  const navigate = useNavigate();
  console.log(isLogin);

  // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsClick(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  });

  return (
    <Ctn ref={modalRef} onClick={() => setIsClick(false)}>
      {!isLogin ? (
        // 로그인이 되어있지 않을 때
        <>
          <MenuBox onClick={() => setOnLogin(true)}>Log in</MenuBox>
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
                window.location.href = `/`;
              }
            }}
          >
            <strong>Log out</strong>
          </MenuBox>
          <MenuLine />
          <MenuBox bgColor="#FAE6E6" onClick={() => navigate("/meeting")}>
            면접 룸
          </MenuBox>
        </>
      )}
    </Ctn>
  );
};

// 모달 배경화면
const BGTransparent = styled.div`
  z-index: 4;
  width: 100%;
  height: calc(100vh);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
`;

// 모달 바디
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
