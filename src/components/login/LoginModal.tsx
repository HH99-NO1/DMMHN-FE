import { useEffect, useRef, useState } from "react";
import Portal from "./Portal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../../recoil/instance";
import { useForm } from "react-hook-form";
import { FlexCol, FlexRow, Liner, Text } from "../../elements/elements";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  checkSucceedState,
  isLoginState,
  onLoginState,
  userState,
} from "../../recoil/atoms/atoms";
import jwt_decode from "jwt-decode";
import FindPasswordModal from "./FindPasswordModal";
import CloseItem from "../../elements/CloseItem";
import {
  OutlineEyeInvisibleItem,
  OutlineEyeItem,
} from "../../elements/EyeItem";
import AlertItem from "../../elements/AlertItem";

interface IForm {
  memberEmail: string;
  password: string;
}

interface IUserState {
  memberName: string;
  img: string;
  iat: number;
  exp: number;
}

const LoginModal = () => {
  const setOnLogin = useSetRecoilState(onLoginState);
  const setIsLogin = useSetRecoilState(isLoginState);
  const setLoginUserState = useSetRecoilState(userState);
  const isLogin = useRecoilValue(isLoginState);
  const navigate = useNavigate();
  const [isFindPW, setIsFindPW] = useState(false);

  // 패스워드 보이는 상태
  const [isShowPassword, setIsShowPassword] = useState(false);

  // useForm 등록
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({});

  // useForm을 통한 제출 이벤트
  const onValid = async (submitData: IForm) => {
    try {
      const req = {
        memberEmail: submitData.memberEmail,
        password: submitData.password,
      };
      const { data } = await UserApi.post(`/members/login`, req);
      sessionStorage.setItem("accessToken", data.data.accessToken);
      sessionStorage.setItem("refreshToken", data.data.refreshToken);
      alert("로그인이 완료되었습니다.");
      navigate("/");
      console.log(data);
      setOnLogin(false);
      setIsLogin(true);
      const preAccessToken = sessionStorage.getItem("accessToken");
      if (preAccessToken) {
        const decodeUserState: IUserState = jwt_decode(preAccessToken);
        sessionStorage.setItem("userName", decodeUserState.memberName);
        sessionStorage.setItem("userImg", decodeUserState.img);
        setLoginUserState(decodeUserState);
      }
      return window.location.reload();
    } catch (error: any) {
      if (error.response.status === 400) {
        alert("비밀번호가 일치하지 않습니다.");
      } else if (error.response.status === 401) {
        alert("등록되지 않은 사용자입니다.");
      } else {
        console.log("알수 없는 오류입니다.");
      }
      return error.response;
    }
  };

  // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
  const modalRef = useRef<HTMLDivElement>(null);
  const setCheckSucceed = useSetRecoilState(checkSucceedState);
  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOnLogin(false);
        setCheckSucceed(false);
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

  // 이미 로그인 되어 있을 경우, 돌려보냄
  useEffect(() => {
    if (isLogin) {
      alert("이미 로그인 되어있습니다.");
      return setOnLogin(false);
    }
  }, [isLogin, setOnLogin]);

  return (
    <Portal>
      <BGBlack>
        <Ctn>
          <LoginCtn ref={modalRef} isFindPW={isFindPW}>
            <CloseBtn onClick={() => setOnLogin(false)}>
              <CloseItem />
            </CloseBtn>
            <LoginHeader>로그인</LoginHeader>
            <LoginBody onSubmit={handleSubmit(onValid)}>
              <FlexCol gap="10px">
                <InputBox>
                  <Input
                    {...register("memberEmail", {
                      required: "이메일을 입력해주세요.",
                      pattern: {
                        // eslint-disable-next-line
                        value: /^[a-z0-9+-\_.]{4,15}@[a-z]{4,15}\.[a-z]{2,3}$/,
                        message: "이메일 형식을 확인해주세요.",
                      },
                    })}
                    placeholder="이메일"
                  />
                  <InputDiv>
                    <Input
                      type={!isShowPassword ? "password" : "text"}
                      {...register("password", {
                        required: "비밀번호를 입력해주세요.",
                      })}
                      placeholder="비밀번호"
                    />
                    <ToggleBtn
                      type="button"
                      onClick={() => setIsShowPassword(!isShowPassword)}
                    >
                      {!isShowPassword ? (
                        <OutlineEyeInvisibleItem />
                      ) : (
                        <OutlineEyeItem />
                      )}
                    </ToggleBtn>
                  </InputDiv>
                  <CheckBox>
                    {errors?.memberEmail?.message ? (
                      <ErrorMsg>
                        <AlertItem />
                        {errors?.memberEmail?.message}
                      </ErrorMsg>
                    ) : null}
                  </CheckBox>
                </InputBox>
                <LoginBtn>로그인</LoginBtn>
              </FlexCol>
            </LoginBody>
            <Liner />
            <LoginFooter>
              <TextEl onClick={() => setIsFindPW(true)}>비밀번호 찾기</TextEl>
              <TextOr />
              <TextEl
                onClick={() => {
                  setOnLogin(false);
                  navigate("/signup");
                }}
              >
                회원가입
              </TextEl>
            </LoginFooter>
            {isFindPW && (
              <>
                <BGBlack2 />
                <FindPasswordModal setIsFindPW={setIsFindPW} />
              </>
            )}
          </LoginCtn>
        </Ctn>
      </BGBlack>
    </Portal>
  );
};

// 비밀번호 찾기가 활성화 되어 있을 때, 활성화
const BGBlack2 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 300px;
  width: 100%;
  height: 100%;
  z-index: 7;
  background-color: rgba(0, 0, 0, 0.3);
`;

// 모달 배경화면
const BGBlack = styled.div`
  position: relative;
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

interface ILoginCtn {
  isFindPW: boolean;
}
const LoginCtn = styled.div<ILoginCtn>`
  position: relative;
  border-radius: 10px;
  margin: 0% 3%;
  background-color: white;
  border: 1px solid
    ${(props) => {
      if (!props.isFindPW) {
        return "#ebebeb";
      } else {
        return "none";
      }
    }};
  overflow: hidden;
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
  & svg {
    width: 16px;
  }
`;

// 모달(로그인) 제목
const LoginHeader = styled.h3`
  display: flex;
  font-size: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebebeb;
  margin: 0;
  padding: 10px 24px;
  justify-content: center;
`;

// form 객체 지정
const LoginBody = styled.form`
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
  border-radius: 30px;
  border: 2px solid
    ${(props) => (props.isError ? "tomato" : props.theme.__grayLight)};
  box-shadow: 0px 4px 4px 0px #0000000d;
  :focus {
    border: 2px solid ${(props) => props.theme.__grayMedium};
    outline: none;
  }
`;
const InputBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const InputDiv = styled(InputBox)`
  gap: 0;
`;
const ToggleBtn = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
  padding: 0;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  & svg {
    width: 24px;
    fill: ${(props) => props.theme.__grayMedium};
  }
`;

const CheckBox = styled(FlexRow)`
  gap: 10px;
  height: 36.8px;
`;

// 에러 메세지
const ErrorMsg = styled(FlexRow)`
  padding: 10px 20px;
  width: 100%;
  background-color: #fae6e6;
  justify-content: left;
  gap: 10px;
  border-radius: 20px;
  font-size: 14px;
  color: ${(props) => props.theme.__grayDark};
  & svg {
    fill: tomato;
    stroke: tomato;
    stroke-width: 30;
    width: 16px;
  }
`;

const LoginBtn = styled.button`
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
// 푸터 영역
const LoginFooter = styled(FlexRow)`
  padding: 30px 10%;
  gap: 20px;
  justify-content: center;
`;
const TextEl = styled(Text)`
  color: ${(props) => props.theme.__grayDark};
  cursor: pointer;
`;
const TextOr = styled.div`
  width: 2px;
  height: 16px;
  background-color: ${(props) => props.theme.__grayLight};
`;

export default LoginModal;
