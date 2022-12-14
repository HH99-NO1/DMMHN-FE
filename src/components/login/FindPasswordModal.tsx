import { useEffect, useRef } from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import { useRecoilState, useSetRecoilState } from "recoil";
import { checkSucceedState, userEmailValue } from "../../recoil/atoms/atoms";
import FindPWCheckEmail from "./FindPWCheckEmail";
import ChangePassword from "./ChangePassword";

const FindPasswordModal = ({
  setIsFindPW,
}: {
  setIsFindPW: (state: boolean) => void;
}) => {
  const [checkSucceed, setCheckSucceed] = useRecoilState(checkSucceedState);
  const setUserEmail = useSetRecoilState(userEmailValue);

  // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setUserEmail("");
        setCheckSucceed(false);
        setIsFindPW(false);
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
    <BGTransparents>
      <Ctn>
        <CheckCtn ref={modalRef}>
          <CloseBtn
            onClick={() => {
              setUserEmail("");
              setCheckSucceed(false);
              setIsFindPW(false);
            }}
          >
            <GrClose size={16} />
          </CloseBtn>
          <Header>비밀번호 찾기</Header>
          <CheckBody>
            {!checkSucceed ? (
              <FindPWCheckEmail />
            ) : (
              <ChangePassword setIsFindPW={setIsFindPW} />
            )}
          </CheckBody>
        </CheckCtn>
      </Ctn>
    </BGTransparents>
  );
};

// 모달 배경화면
const BGTransparents = styled.div`
  z-index: 8;
  width: 100%;
  height: calc(100vh);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  background-color: transparent;
`;

// 모달 위치 고정
const Ctn = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 570px;
  min-width: 300px;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;

const CheckCtn = styled.div`
  background-color: #fff;
  min-height: 300px;
  position: relative;
  border: 1px solid #ebebeb;
  border-radius: 10px;
  margin: 0 auto;
  width: 80%;
`;

// 모달 닫기 버튼
const CloseBtn = styled.div`
  display: flex;
  top: 8px;
  left: 12px;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  position: absolute;
  background-color: inherit;
  border-radius: 50%;
  cursor: pointer;
  transition: all ease 0.3s;
  &:hover {
    background-color: #ebebeb;
    transform: rotate(-90deg);
  }
`;

// 모달(로그인) 제목
const Header = styled.h3`
  display: flex;
  font-size: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebebeb;
  margin: 0;
  padding: 10px 24px;
  justify-content: center;
`;

const CheckBody = styled.div`
  height: 100%;
  padding: 30px 8%;
  overflow-y: auto;
`;
export default FindPasswordModal;
