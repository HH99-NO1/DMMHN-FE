import { useForm } from "react-hook-form";
import axios from "axios";
import { instance } from "../../recoil/instance";
import styled from "styled-components";
import { FlexCol } from "../../elements/elements";

interface IForm {
  memberEmail: string;
  password: string;
  password1: string;
}

export const ACCESS_TOKEN = sessionStorage.getItem("accesstoken");
export const REFRESH_TOKEN = sessionStorage.getItem("refreshtoken");
console.log(ACCESS_TOKEN);
console.log(REFRESH_TOKEN);

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({});

  const onValid = async (submitData: IForm) => {
    console.log(submitData);
    if (submitData.password !== submitData.password1) {
      setError(
        "password1",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    } else {
      try {
        const req = {
          memberEmail: submitData.memberEmail,
          password: submitData.password,
        };
        console.log(req);
        const { data } = await instance.post(`/members/login`, req);
        console.log(data.data.accessToken);
        console.log(data.data.refreshToken);
        sessionStorage.setItem("accesstoken", data.data.accessToken);
        sessionStorage.setItem("refreshtoken", data.data.refreshToken);
        return data;
      } catch (error: any) {
        console.log(error.message);
        return error.message;
      }
    }
  };
  console.log(errors);
  return (
    <>
      <h1>로그인 페이지</h1>
      <form onSubmit={handleSubmit(onValid)}>
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
            <ErrorMsg>{errors?.memberEmail?.message}</ErrorMsg>
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
              {...register("password1", {
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
            <ErrorMsg>{errors?.password1?.message}</ErrorMsg>
          </InputBox>
          <button>add</button>
          {/* <span>{errors?.extraError?.message}</span> */}
        </FlexCol>
      </form>
    </>
  );
};

// styled-components 영역
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

export default Login;
