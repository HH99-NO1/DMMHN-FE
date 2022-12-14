import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import { FlexCol, Text } from "../../elements/elements";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  checkSucceedState,
  isCheckEmail,
  serverCodeNumber,
  userEmailValue,
} from "../../recoil/atoms/atoms";

const CheckEmailModal = () => {
  const serverCode = useRecoilValue(serverCodeNumber);
  const setCheckSucceed = useSetRecoilState(checkSucceedState);

  const [checkCode, setCheckCode] = useState("");
  const onChangeCheckCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckCode(event.currentTarget.value);
  };
  const userEmail = useRecoilValue(userEmailValue);
  const checkServerCode = () => {
    if (serverCode + "" === checkCode) {
      alert("인증이 완료되었습니다.");
      setIsCheckEmailState(false);
      return setCheckSucceed(true);
    } else {
      return alert("잘못된 코드입니다. 다시 확인해주세요.");
    }
  };

  // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
  const setIsCheckEmailState = useSetRecoilState(isCheckEmail);

  // const modalRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   // 이벤트 핸들러 함수
  //   const handler = (event: any) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       setIsCheckEmailState(false);
  //     }
  //   };

  //   // 이벤트 핸들러 등록
  //   document.addEventListener("mousedown", handler);
  //   // document.addEventListener('touchstart', handler); // 모바일 대응

  //   return () => {
  //     // 이벤트 핸들러 해제
  //     document.removeEventListener("mousedown", handler);
  //     // document.removeEventListener('touchstart', handler); // 모바일 대응
  //   };
  // });

  return (
    <BGBlack>
      <Ctn>
        <CheckCtn /* ref={modalRef}> */>
          <CloseBtn onClick={() => setIsCheckEmailState(false)}>
            <GrClose size={16} />
          </CloseBtn>
          <Header>이메일 인증 확인</Header>
          <CheckBody>
            <FlexCol gap="30px">
              <UserEmailCall>{`${userEmail}로 인증 메일을 발송했습니다.`}</UserEmailCall>
              <InputBox>
                <Input
                  //
                  onInput={(e) => {
                    if (
                      e.currentTarget.value.length > e.currentTarget.maxLength
                    )
                      e.currentTarget.value = e.currentTarget.value.slice(
                        0,
                        e.currentTarget.maxLength
                      );
                  }}
                  type="number"
                  maxLength={6}
                  value={checkCode}
                  onChange={onChangeCheckCode}
                  placeholder="이메일 인증번호"
                />
              </InputBox>
              <CheckBtn
                onClick={() => {
                  checkServerCode();
                }}
              >
                인증코드 확인
              </CheckBtn>
            </FlexCol>
          </CheckBody>
        </CheckCtn>
      </Ctn>
    </BGBlack>
  );
};

// 모달 배경화면
const BGBlack = styled.div`
  z-index: 6;
  width: 100%;
  height: calc(100vh);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
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
  position: relative;
  border: 1px solid #ebebeb;
  border-radius: 10px;
  margin: 0% 3%;
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
  padding: 30px 10%;
  overflow-y: auto;
`;

interface IInput {
  isError?: boolean;
}
const Input = styled.input<IInput>`
  font-size: 16px;
  padding: 20px 30px;
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.isError ? "tomato" : props.theme.__grayLight)};

  :focus {
    border-bottom: 2px solid ${(props) => props.theme.__grayMedium};
    outline: none;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const InputBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CheckBtn = styled.button`
  background-color: ${(props) => props.theme.__greenMidium};
  color: #fff;
  border: none;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  padding: 20px 10%;
  border-radius: 30px;
  cursor: pointer;
  transition: all, 0.2s;
  :hover {
    box-shadow: 0px 4px 8px -1px rgba(0, 0, 0, 0.5) inset;
  }
`;

const UserEmailCall = styled(Text)``;

export default CheckEmailModal;
