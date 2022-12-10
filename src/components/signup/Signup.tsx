import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { FlexCol, HeaderBox, Text } from "../../elements/elements";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineAlert } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  checkSucceedState,
  isCheckEmail,
  onLoginState,
  serverCodeNumber,
  userEmailValue,
} from "../../recoil/atoms/atoms";
import { UserApi } from "../../recoil/instance";

interface IForm {
  memberEmail: string;
  memberName: string;
  password: string;
  confirmPw: string;
  birth: Date;
  job: string;
  gender: string;
  stack: string;
}

// interface IDate {
//   setModify: (state: boolean) => void;
// }
// export const ACCESS_TOKEN = sessionStorage.getItem("accesstoken");
// export const REFRESH_TOKEN = sessionStorage.getItem("refreshtoken");
// console.log(ACCESS_TOKEN);
// console.log(ACCESS_TOKEN);

const Signup = () => {
  const navigate = useNavigate();

  // 이메일 체크 모달 창 처리
  const setIsCheckEmailState = useSetRecoilState(isCheckEmail);

  const setOnLogin = useSetRecoilState(onLoginState);
  const [startDate, setStartDate] = useState(new Date());
  const [isChecked, setIsChecked] = useState(false);
  console.log(startDate);

  const setServerCode = useSetRecoilState(serverCodeNumber);
  const [userEmail, setUserEmail] = useRecoilState(userEmailValue);

  const checkSucceed = useRecoilValue(checkSucceedState);
  const onChangeUserEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.currentTarget.value);
  };

  const checkEmail = async () => {
    if (userEmail.trim() === "") {
      return alert("이메일을 입력해주세요.");
    } else {
      try {
        const { data } = await UserApi.post("/members/sendAuthCode", {
          memberEmail: userEmail,
        });
        setServerCode(data.data);
        setUserEmail(userEmail);
        setIsCheckEmailState(true);
        setIsChecked(true);
      } catch (e: any | unknown) {
        console.log(e.response.status);
        if (e.response.status === 400) {
          alert("이미 가입된 이메일입니다.");
        }
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<IForm>({
    // defaultValues: {
    //   email: "@naver.com",
    // },
    // mode: "onChange",
    // criteriaMode: "firstError",
  });

  const onValid = async (submitData: IForm) => {
    console.log(submitData);
    if (checkSucceed) {
      if (submitData.password !== submitData.confirmPw) {
        setError(
          "confirmPw",
          { message: "비밀번호가 일치하지 않습니다." },
          { shouldFocus: true }
        );
      } else {
        try {
          const year = startDate.getFullYear();
          const month = ("0" + (startDate.getMonth() + 1)).slice(-2);
          const day = ("0" + startDate.getDate()).slice(-2);
          const dateString = year + "년 " + month + "월 " + day + "일";
          const req = {
            memberName: submitData.memberName,
            memberEmail: submitData.memberEmail,
            password: submitData.password,
            confirmPw: submitData.confirmPw,
            birth: dateString,
            gender: submitData.gender,
            job: submitData.job,
            stack: submitData.stack,
            validate: process.env.REACT_APP_CHECK_SIGNUP_KEY,
          };
          // console.log(req);

          const { data } = await UserApi.post(`members/signup`, req);
          console.log(data.message);
          if (data.message) {
            alert("회원가입이 완료되었습니다.");
            navigate("/");
            return setOnLogin(true);
          }
        } catch (error: unknown | any) {
          if (error.response.status === 400) {
            alert("이미 가입된 계정입니다. 이메일을 확인해주세요.");
          }
          console.log(error.response);
          return error.response;
        }
      }
    } else {
      alert("이메일 인증이 필요합니다.");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      alert("이미 로그인 되어있습니다.");
      navigate(-1);
    }
  }, []);

  const totalError = () => {
    if (errors.memberEmail) {
      return errors.memberEmail.message;
    } else if (errors.memberName) {
      return errors.memberName.message;
    } else if (errors.password) {
      return errors.password.message;
    } else if (errors.confirmPw) {
      return errors.confirmPw.message;
    } else if (errors.gender) {
      return errors.gender.message;
    } else if (errors.birth) {
      return errors.birth.message;
    } else if (errors.stack) {
      return errors.stack.message;
    }
  };
  console.log(totalError());
  return (
    <>
      <HeaderBox />
      <Container>
        <InnerWrap>
          <Title>회원가입</Title>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              margin: "0 auto",
            }}
            onSubmit={handleSubmit(onValid)}
          >
            <FlexCol gap="25px">
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
                  value={userEmail}
                  onChange={onChangeUserEmail}
                  disabled={checkSucceed}
                />
                <CheckEmailBtn
                  type="button"
                  disabled={checkSucceed}
                  onClick={() => {
                    checkEmail();
                  }}
                  checkSucceed={checkSucceed}
                >
                  {!checkSucceed
                    ? !isChecked
                      ? "인증코드 요청"
                      : "인증코드 재요청"
                    : "인증 완료"}
                </CheckEmailBtn>
              </InputBox>

              <InputBox>
                <Input
                  {...register("memberName", {
                    required: "이름을 입력해주세요.",
                  })}
                  placeholder="닉네임"
                />
              </InputBox>
              <InputBox>
                <Input
                  type="password"
                  {...register("password", {
                    required: "비밀번호를 입력해주세요.",
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,16}$/,
                      message:
                        "8~16자 영문 대소문자, 숫자, 특수문자 한 자 이상 조합",
                    },
                  })}
                  placeholder="비밀번호"
                />
              </InputBox>
              <InputBox>
                <Input
                  type="password"
                  {...register("confirmPw", {
                    required: "비밀번호를 확인해주세요.",
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,16}$/,
                      message:
                        "8~16자 영문 대소문자, 숫자, 특수문자 한 자 이상 조합",
                    },
                  })}
                  placeholder="비밀번호 확인"
                />
              </InputBox>
              <BoxWrap>
                <GenderBox>
                  <span>성별:</span>
                  <Label htmlFor="male">
                    <input
                      id="male"
                      {...register("gender")}
                      type="radio"
                      value="남자"
                    />
                    남자
                  </Label>
                  <Label htmlFor="female">
                    <input
                      id="female"
                      {...register("gender")}
                      type="radio"
                      value="여자"
                    />
                    여자
                  </Label>
                </GenderBox>
                <BirthBox>
                  <span>생년월일:</span>
                  <Controller
                    control={control}
                    name="birth"
                    render={() => (
                      <DatePicker
                        {...register("birth")}
                        locale={ko}
                        dateFormat="yyyy - MM - dd"
                        className="birth-datepicker"
                        selected={startDate}
                        minDate={new Date("1900-01-01")}
                        placeholderText="생년월일을 입력"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        onChange={(date: Date) => setStartDate(date)}
                        isClearable
                      />
                    )}
                  />
                  {/* <DatePicker
                    {...register("birth")}
                    locale={ko}
                    dateFormat="yyyy/MM/dd"
                    selected={startDate}
                    minDate={new Date("1900-01-01")}
                    placeholderText="생년월일을 입력"
                    onChange={(date: any) => setStartDate(date)}
                  /> */}
                </BirthBox>
                <JobBox>
                  <span>직업:</span>
                  <SelectDiv>
                    <Label htmlFor="seeker">
                      <input
                        id="seeker"
                        {...register("job")}
                        type="radio"
                        value="취준생"
                      />
                      취준생
                    </Label>
                    <Label htmlFor="frontDev">
                      <input
                        id="frontDev"
                        {...register("job")}
                        type="radio"
                        value="프론트개발자"
                      />
                      프론트개발자
                    </Label>
                    <Label htmlFor="backDev">
                      <input
                        id="backDev"
                        {...register("job")}
                        type="radio"
                        value="백엔드개발자"
                      />
                      백엔드개발자
                    </Label>
                  </SelectDiv>
                </JobBox>
                <StackBox>
                  {/* <Input
                  type="stack"
                  {...register("stack", {
                    required: "스택을 작성해주세요.",
                  })}
                  placeholder="스택을 작성해주세요. ex) /javascript/node"
                /> */}
                  <span>스택:</span>
                  <SelectDiv>
                    <Label htmlFor="javaScript">
                      <input
                        id="javaScript"
                        {...register("stack")}
                        type="checkbox"
                        value="javaScript"
                      />
                      javaScript
                    </Label>
                    <Label htmlFor="React">
                      <input
                        id="React"
                        {...register("stack")}
                        type="checkbox"
                        value="React"
                      />
                      React
                    </Label>
                  </SelectDiv>
                  <SelectDiv>
                    <Label htmlFor="Nodejs">
                      <input
                        id="Nodejs"
                        {...register("stack")}
                        type="checkbox"
                        value="Node.js"
                      />
                      Node.js
                    </Label>
                    <Label htmlFor="Spring">
                      <input
                        id="Spring"
                        {...register("stack")}
                        type="checkbox"
                        value="Spring"
                      />
                      Spring
                    </Label>
                  </SelectDiv>
                </StackBox>
              </BoxWrap>
              <Height30>
                {totalError() && (
                  <ErrorMsg>
                    <AiOutlineAlert
                      fill="tomato"
                      stroke="tomato"
                      strokeWidth={30}
                      size={16}
                    />
                    {totalError()}
                  </ErrorMsg>
                )}
              </Height30>
              <SignupBtn>가입하기</SignupBtn>
            </FlexCol>
          </form>
        </InnerWrap>
      </Container>
    </>
  );
};

export default Signup;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 20px;
`;

const InnerWrap = styled.div`
  margin: 20px auto;
  padding: 40px;
  max-width: 550px;
  width: 100%;
  height: 100%;
  border: 1px solid lightgray;
  border-radius: 15px;
  background-color: white;
  box-sizing: border-box;
  @media screen and (max-width: 600px) {
    padding: 20px;
  }
`;

const Title = styled.div`
  text-align: center;
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 40px;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 8px 20px;
  border-radius: 67px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid ${(props) => props.theme.__grayLight};
  :focus {
    outline: 1px solid ${(props) => props.theme.__grayMedium};
  }
`;

const Label = styled.label`
  margin-right: 10px;
  :last-child {
    margin-left: 0;
  }
`;
const InputBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 50px;
  min-width: 250px;
`;
const ErrorMsg = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  width: 400px;
  height: 25px;
  font-size: 13px;
  margin-top: 5px;
  background: rgba(210, 18, 18, 0.1);
  border: 1px solid #ffffff;
  border-radius: 67px;
  padding: 0;
  color: #747373;
`;

const BoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
`;

const SignupBtn = styled.button`
  width: 100%;
  height: 50px;
  bottom: 40px;
  border: none;
  background-color: #025729;
  border-radius: 67px;
  color: white;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`;

const GenderBox = styled.div`
  width: 100%;
  display: flex;

  span {
    width: 90px;
    font-weight: bold;
  }
`;

const JobBox = styled(GenderBox)``;

const SelectDiv = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const StackBox = styled(GenderBox)``;

const BirthBox = styled(GenderBox)`
  align-items: center;
`;

const Height30 = styled.div`
  width: 100%;
  height: 30px;
`;

interface ICheck {
  checkSucceed?: boolean;
}
const CheckEmailBtn = styled.button<ICheck>`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${(props) => {
    if (props.checkSucceed) {
      return props.theme.__greenMidium;
    } else {
      return "white";
    }
  }};
  color: ${(props) => {
    if (props.checkSucceed) {
      return "white";
    } else {
      return "black";
    }
  }};
  border: 1px solid ${(props) => props.theme.__greenMidium};
  border-radius: 20px;
  padding: 4px 12px;
  cursor: ${(props) => {
    if (props.checkSucceed) {
      return "auto";
    } else {
      return "pointer";
    }
  }};
`;
