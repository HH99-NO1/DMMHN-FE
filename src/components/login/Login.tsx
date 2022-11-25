import { useForm } from "react-hook-form";
import axios from "axios";
import { instance } from "../../recoil/instance";
import styled from "styled-components";
import { FlexCol } from "../../elements/elements";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface IForm {
  memberEmail: string;
  password: string;
  password1: string;
}

export const ACCESS_TOKEN = sessionStorage.getItem("accessToken");
export const REFRESH_TOKEN = sessionStorage.getItem("refreshToken");

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({});

  const onValid = async (submitData: IForm) => {
    console.log(submitData);
    try {
      const req = {
        memberEmail: submitData.memberEmail,
        password: submitData.password,
      };
      // console.log(req);
      const { data } = await instance.post(`/members/login`, req);
      // console.log(data.data.accessToken);
      // console.log(data.data.refreshToken);
      sessionStorage.setItem("accessToken", data.data.accessToken);
      sessionStorage.setItem("refreshToken", data.data.refreshToken);
      alert("로그인이 완료되었습니다. 메인 페이지로 이동합니다.");
      navigate("/");
      return data;
    } catch (error: any) {
      console.log(error.message);
      return error.message;
    }
  };

  console.log(errors);

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      alert("이미 로그인 되어있습니다.");
      navigate(-1);
    }
  }, []);

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
          <button>로그인</button>
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
