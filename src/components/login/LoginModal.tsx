import { useEffect, useRef } from "react";
import Portal from "./Portal";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import { AiOutlineAlert } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../../recoil/instance";
import { useForm } from "react-hook-form";
import { FlexCol, FlexRow, Liner, Text } from "../../elements/elements";
import errorNotYet from "../errors/errorNotYet";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  isLoginState,
  onLoginState,
  userState,
} from "../../recoil/atoms/atoms";
import jwt_decode from "jwt-decode";

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

  // useForm 등록
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({});

  // useForm을 통한 제출 이벤트
  const onValid = async (submitData: IForm) => {
    console.log(submitData);
    try {
      const req = {
        memberEmail: submitData.memberEmail,
        password: submitData.password,
      };
      const { data } = await UserApi.post(`/members/login`, req);
      sessionStorage.setItem("accessToken", data.data.accessToken);
      sessionStorage.setItem("refreshToken", data.data.refreshToken);
      alert("로그인이 완료되었습니다.");
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
      console.log(error.response);
      // console.log(error.message);
      if (error.response.status === 400) {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
      return error.response;
    }
  };

  // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOnLogin(false);
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
  }, []);

  return (
    <Portal>
      <BGBlack>
        <Ctn>
          <LoginCtn ref={modalRef}>
            <CloseBtn onClick={() => setOnLogin(false)}>
              <GrClose size={16} />
            </CloseBtn>
            <LoginHeader>이메일로 로그인</LoginHeader>
            <LoginBody onSubmit={handleSubmit(onValid)}>
              <FlexCol gap="10px">
                <InputBox>
                  <Input
                    {...register("memberEmail", {
                      required: "이메일을 입력해주세요.",
                      pattern: {
                        value: /^[a-z0-9+-\_.]{4,15}@[a-z]{4,15}\.[a-z]{2,3}$/,
                        message: "이메일 형식을 확인해주세요.",
                      },
                    })}
                    placeholder="이메일"
                  />
                  <Input
                    type="password"
                    pattern="[A-Za-z\d@!%*#?&]*"
                    {...register("password", {
                      required: "비밀번호를 입력해주세요.",
                    })}
                    placeholder="비밀번호"
                  />
                  <CheckBox>
                    {
                      errors?.memberEmail?.message ? (
                        <ErrorMsg>
                          <AiOutlineAlert
                            fill="tomato"
                            stroke="tomato"
                            strokeWidth={30}
                            size={16}
                          />
                          {errors?.memberEmail?.message}
                        </ErrorMsg>
                      ) : null
                      // (
                      //   <>
                      //     <input id="login_is" type="checkbox" />
                      //     <label htmlFor="login_is">로그인 상태 유지</label>
                      //   </>
                      // )
                    }
                  </CheckBox>
                </InputBox>
                <LoginBtn>로그인</LoginBtn>
                {/* <span>{errors?.extraError?.message}</span> */}
              </FlexCol>
            </LoginBody>
            <Or>또는</Or>
            {/* <SocialItemBox>
              <Img
                onClick={() => errorNotYet()}
                border={true}
                src="/img/apple.png"
                alt="apple"
              />
              <Img
                onClick={() => errorNotYet()}
                border={true}
                src="/img/google.png"
                alt="google"
              />
              <Img
                onClick={() => errorNotYet()}
                src="/img/kakao.png"
                alt="kakao"
              />
              <Img
                onClick={() => errorNotYet()}
                src="/img/naver.png"
                alt="naver"
              />
            </SocialItemBox> */}
            <Liner />
            <LoginFooter>
              <TextEl onClick={() => errorNotYet()}>
                아이디/비밀번호 찾기
              </TextEl>
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
          </LoginCtn>
        </Ctn>
      </BGBlack>
    </Portal>
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

  /* @media screen and (max-width: 800px) {
    top: auto;
    bottom: 0;
    margin-bottom: -10px;
    transform: translate(-50%, 0%);
  }
  @media screen and (max-height: 620px) {
    position: relative;
    height: 100%;
    top: 0;
    left: 0;
    transform: translate(0%, 0%);
  } */
`;

const LoginCtn = styled.div`
  background-color: white;
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
`;

const LoginBtn = styled.button`
  background-color: ${(props) => props.theme.__greenMidium};
  color: white;
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

const Or = styled.span`
  min-width: 50px;
  color: ${(props) => props.theme.__grayDark};
  font-size: 14px;
  text-align: center;
`;

// 소셜로그인 영역
const SocialItemBox = styled(FlexRow)`
  width: 100%;
  padding: 30px 10%;
  gap: 10px;
  justify-content: space-between;
`;

interface IImg {
  border?: boolean;
}
const Img = styled.img<IImg>`
  max-width: 70px;
  min-width: 30px;
  width: 100%;
  max-height: 70px;
  height: 100%;
  border-radius: 50%;
  border: ${(props) =>
    props.border === undefined
      ? "none"
      : "1px solid " + props.theme.__grayLight};
  cursor: pointer;
  transition: all, 0.3s;
  :hover {
    box-shadow: 0px 4px 4px 0px #0000000d;
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
