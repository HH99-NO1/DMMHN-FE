import { useForm } from "react-hook-form";
import axios from "axios";
import { instance, UserApi } from "../recoil/instance";
import styled from "styled-components";
import { FlexCol } from "../elements/elements";
import { TonalitySharp } from "@material-ui/icons";

interface IForm {
  memberEmail: string;
  memberName: string;
  phoneNum: number;
  password: string;
  confirmPw: string;
}

// export const ACCESS_TOKEN = sessionStorage.getItem("accesstoken");
// export const REFRESH_TOKEN = sessionStorage.getItem("refreshtoken");
// console.log(ACCESS_TOKEN);
// console.log(ACCESS_TOKEN);

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    // defaultValues: {
    //   email: "@naver.com",
    // },
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
          name: submitData.memberName,
          memberEmail: submitData.memberEmail,
          phoneNumber: submitData.phoneNum,
          password: submitData.password,
          confirmPw: submitData.confirmPw,
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
  console.log(errors);
  return (
    <>
      <h1>회원가입</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "400px",
          margin: "0 auto",
        }}
        onSubmit={handleSubmit(onValid)}
      >
        <FlexCol gap="10px">
          <InputBox>
            <Input
              {...register("memberName", {
                required: "이름을 입력해주세요.",
              })}
              placeholder="이름(실명)"
            />
            <ErrorMsg>{errors?.memberName?.message}</ErrorMsg>
          </InputBox>
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
            <ErrorMsg>{errors?.memberEmail?.message}</ErrorMsg>
          </InputBox>
          <InputBox>
            <Input
              {...register("phoneNum", {
                required: "휴대폰 번호을 입력해주세요.",
                pattern: {
                  value: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
                  message: "올바르지 않은 휴대폰 번호입니다.",
                },
              })}
              placeholder="휴대폰번호"
            />
            <ErrorMsg>{errors?.phoneNum?.message}</ErrorMsg>
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
            <ErrorMsg>{errors?.password?.message}</ErrorMsg>
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
              placeholder="중복확인"
            />
            <ErrorMsg>{errors?.confirmPw?.message}</ErrorMsg>
          </InputBox>
          <button>가입하기</button>
        </FlexCol>
      </form>
    </>
  );
};

export default SignupPage;

const Input = styled.input`
  padding: 4px 8px;
  border-radius: 5px;
  border: 2px solid ${(props) => props.theme.__grayLight};
  :focus {
    outline: 1px solid ${(props) => props.theme.__grayDark};
  }
`;
const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 50px;
  min-width: 300px;
`;
const ErrorMsg = styled.span`
  position: absolute;
  top: 35px;
  font-size: 12px;
  color: tomato;
`;
