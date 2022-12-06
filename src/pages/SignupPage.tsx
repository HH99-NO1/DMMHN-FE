import { Controller, useForm, useFormState } from "react-hook-form";
import axios from "axios";
import { instance, UserApi } from "../recoil/instance";
import styled from "styled-components";
import { FlexCol } from "../elements/elements";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineAlert } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";

interface IForm {
  memberEmail: string;
  memberName: string;
  password: string;
  confirmPw: string;
  birth: string;
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

const SignupPage = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());

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
    if (submitData.password !== submitData.confirmPw) {
      setError(
        "confirmPw",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    } else {
      try {
        const req = {
          memberName: submitData.memberName,
          memberEmail: submitData.memberEmail,
          password: submitData.password,
          confirmPw: submitData.confirmPw,
          birth: submitData.birth,
          gender: submitData.gender,
          job: submitData.job,
          stack: submitData.stack,
        };
        console.log(req);
        const { data } = await UserApi.post(`members/signup`, req);
        console.log(data);
        // console.log(data.data.refreshToken);
        // sessionStorage.setItem("accesstoken", data.data.accessToken);
        // sessionStorage.setItem("refreshtoken", data.data.refreshToken);
      } catch (error: any) {
        return error.message;
      }
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      alert("이미 로그인 되어있습니다.");
      navigate(-1);
    }
  }, []);
  return (
    <Container>
      <InnerWrap>
        <Title>회원가입</Title>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "400px",
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
              />
              {errors?.memberEmail?.message ? (
                <ErrorMsg>
                  <AiOutlineAlert
                    fill="tomato"
                    stroke="tomato"
                    strokeWidth={30}
                    size={16}
                  />
                  {errors?.memberEmail?.message}
                </ErrorMsg>
              ) : (
                ""
              )}
            </InputBox>
            <InputBox>
              <Input
                {...register("memberName", {
                  required: "이름을 입력해주세요.",
                })}
                placeholder="닉네임"
              />
              {errors?.memberName?.message ? (
                <ErrorMsg>
                  <AiOutlineAlert
                    fill="tomato"
                    stroke="tomato"
                    strokeWidth={30}
                    size={16}
                  />
                  {errors?.memberName?.message}
                </ErrorMsg>
              ) : (
                ""
              )}
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
              {errors?.password?.message ? (
                <ErrorMsg>
                  <AiOutlineAlert
                    fill="tomato"
                    stroke="tomato"
                    strokeWidth={30}
                    size={16}
                  />
                  {errors?.password?.message}
                </ErrorMsg>
              ) : (
                ""
              )}
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
              {errors?.confirmPw?.message ? (
                <ErrorMsg>
                  <AiOutlineAlert
                    fill="tomato"
                    stroke="tomato"
                    strokeWidth={30}
                    size={16}
                  />
                  {errors?.confirmPw?.message}
                </ErrorMsg>
              ) : (
                ""
              )}
            </InputBox>
            <BoxWrap>
              <GenderBox>
                성별:
                <label htmlFor="male">
                  <input
                    id="male"
                    {...register("gender")}
                    type="radio"
                    value="남자"
                  />
                  남자
                </label>
                <label htmlFor="female">
                  <input
                    id="female"
                    {...register("gender")}
                    type="radio"
                    value="여자"
                  />
                  여자
                </label>
              </GenderBox>
              <BirthBox>
                <span>생년월일:</span>

                <Controller
                  control={control}
                  name="birth"
                  render={(field) => (
                    <DatePicker
                      {...register("birth")}
                      locale={ko}
                      dateFormat="yyyy - MM - dd"
                      selected={startDate}
                      minDate={new Date("1900-01-01")}
                      placeholderText="생년월일을 입력"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      onChange={(date: any) => setStartDate(date)}
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
                직업:
                <label htmlFor="seeker">
                  <input
                    id="seeker"
                    {...register("job")}
                    type="radio"
                    value="취준생"
                  />
                  취준생
                </label>
                <label htmlFor="frontDev">
                  <input
                    id="frontDev"
                    {...register("job")}
                    type="radio"
                    value="프론트개발자"
                  />
                  프론트개발자
                </label>
                <label htmlFor="backDev">
                  <input
                    id="backDev"
                    {...register("job")}
                    type="radio"
                    value="백엔드개발자"
                  />
                  백엔드개발자
                </label>
              </JobBox>
              <StackBox>
                {/* <Input
                type="stack"
                {...register("stack", {
                  required: "스택을 작성해주세요.",
                })}
                placeholder="스택을 작성해주세요. ex) /javascript/node"
              /> */}
                스택:
                <label htmlFor="javaScript">
                  <input
                    id="javaScript"
                    {...register("stack")}
                    type="checkbox"
                    value="javaScript"
                  />
                  javaScript
                </label>
                <label htmlFor="React">
                  <input
                    id="React"
                    {...register("stack")}
                    type="checkbox"
                    value="React"
                  />
                  React
                </label>
                <label htmlFor="Nodejs">
                  <input
                    id="Nodejs"
                    {...register("stack")}
                    type="checkbox"
                    value="Node.js"
                  />
                  Node.js
                </label>
                <label htmlFor="Spring">
                  <input
                    id="Spring"
                    {...register("stack")}
                    type="checkbox"
                    value="Spring"
                  />
                  Spring
                </label>
              </StackBox>
            </BoxWrap>
            <SignupBtn>가입하기</SignupBtn>
          </FlexCol>
        </form>
      </InnerWrap>
    </Container>
  );
};

export default SignupPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const InnerWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  height: 800px;
  border: 1px solid lightgray;
  border-radius: 15px;
  background-color: white;
`;

const Title = styled.div`
  text-align: center;
  margin: 40px auto;
  font-size: 25px;
  font-weight: 600;
`;

const Input = styled.input`
  height: 50px;
  padding: 4px 8px;
  margin-top: 5px;
  border-radius: 67px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid ${(props) => props.theme.__grayLight};
  :focus {
    outline: 1px solid ${(props) => props.theme.__red};
  }
`;
const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 50px;
  min-width: 400px;
`;
const ErrorMsg = styled.div`
  width: 400px;
  height: 25px;
  margin-top: 5px;
  background: rgba(210, 18, 18, 0.1);
  border: 1px solid #ffffff;
  border-radius: 67px;
  color: #747373;
`;

const BoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SignupBtn = styled.button`
  position: absolute;
  width: 400px;
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
  width: 400px;
  margin-top: 5px;
  display: flex;
  justify-content: left;
  color: #747373;
  label {
    color: #747373;
  }
`;

const JobBox = styled(GenderBox)``;

const StackBox = styled(GenderBox)``;

const BirthBox = styled(GenderBox)`
  span {
    width: 80px;
    color: #747373;
  }
`;
