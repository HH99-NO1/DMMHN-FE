import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { FlexCol, Liner, Text } from "../../elements/elements";
import { checkSucceedState, userEmailValue } from "../../recoil/atoms/atoms";
import { UserApi } from "../../recoil/instance";
import { useState } from "react";
import {
  OutlineEyeInvisibleItem,
  OutlineEyeItem,
} from "../../elements/EyeItem";
import AlertItem from "../../elements/AlertItem";

interface IForm {
  password: string;
  confirmPw: string;
}

const ChangePassword = ({
  setIsFindPW,
}: {
  setIsFindPW: (state: boolean) => void;
}) => {
  const setCheckSucceed = useSetRecoilState(checkSucceedState);
  const [userEmail, setUserEmail] = useRecoilState(userEmailValue);

  // 패스워드 보이는 상태
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({});

  const onValid = async (submitData: IForm) => {
    if (submitData.password !== submitData.confirmPw) {
      setError(
        "confirmPw",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    } else {
      try {
        const req = {
          memberEmail: userEmail,
          password: submitData.password,
          confirmPassword: submitData.confirmPw,
          validate: process.env.REACT_APP_CHECK_SIGNUP_KEY,
        };
        console.log(req);
        const { data } = await UserApi.patch(`members/password`, req);
        if (data.message) {
          alert(`${userEmail}의 비밀번호가 변경되었습니다.`);
          setUserEmail("");
          setCheckSucceed(false);
          return setIsFindPW(false);
        }
      } catch (error: unknown | any) {
        if (error.response.status === 400) {
          alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        }
        return error.response;
      }
    }
  };

  const totalError = () => {
    if (errors.password) {
      return errors.password.message;
    } else if (errors.confirmPw) {
      return errors.confirmPw.message;
    }
  };

  return (
    <Ctn>
      <UserEmailArea>
        <SubTitle>아래 이메일의 비밀번호를 변경합니다.</SubTitle>
        <UserEmailCall>{userEmail}</UserEmailCall>
      </UserEmailArea>
      <Liner />
      <PasswordArea onSubmit={handleSubmit(onValid)}>
        <InputBox>
          <Input
            type={!isShowPassword ? "password" : "text"}
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,16}$/,
                message:
                  "8~16자 영문 대소문자, 숫자, 특수문자(@!%*#?&) 한 자 이상 조합",
              },
            })}
            placeholder="비밀번호"
          />
          <ToggleBtn
            type="button"
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            {!isShowPassword ? <OutlineEyeInvisibleItem /> : <OutlineEyeItem />}
          </ToggleBtn>
        </InputBox>
        <InputBox>
          <Input
            type={!isShowPassword ? "password" : "text"}
            {...register("confirmPw", {
              required: "비밀번호를 확인해주세요.",
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,16}$/,
                message:
                  "8~16자 영문 대소문자, 숫자, 특수문자(@!%*#?&) 한 자 이상 조합",
              },
            })}
            placeholder="비밀번호 확인"
          />
          <ToggleBtn
            type="button"
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            {!isShowPassword ? <OutlineEyeInvisibleItem /> : <OutlineEyeItem />}
          </ToggleBtn>
        </InputBox>
        <Height40>
          {totalError() && (
            <ErrorMsg>
              <AlertItem />

              {/* <AiOutlineAlert
                fill="tomato"
                stroke="tomato"
                strokeWidth={30}
                size={16}
              /> */}
              {totalError()}
            </ErrorMsg>
          )}
        </Height40>

        <CheckBtn>비밀번호 변경하기</CheckBtn>
      </PasswordArea>
    </Ctn>
  );
};
const Ctn = styled(FlexCol)``;
const UserEmailArea = styled(FlexCol)`
  gap: 10px;
  padding: 0 0 20px 0;
`;
const SubTitle = styled(Text)`
  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`;
const UserEmailCall = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  @media screen and (max-width: 600px) {
    font-size: 16px;
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
const PasswordArea = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  margin: 20px 0 0 0;
`;
const CheckBtn = styled.button`
  background-color: ${(props) => props.theme.__greenMidium};
  color: #fff;
  border: none;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  padding: 16px 10%;
  border-radius: 30px;
  cursor: pointer;
  transition: all, 0.2s;
  :hover {
    box-shadow: 0px 4px 8px -1px rgba(0, 0, 0, 0.5) inset;
  }
`;

const Height40 = styled.div`
  width: 100%;
  height: 40px;
`;
const ErrorMsg = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  width: 100%;
  font-size: 13px;
  background: rgba(210, 18, 18, 0.1);
  border: 1px solid #fff;
  border-radius: 67px;
  padding: 4px 10px;
  color: #747373;
  & svg {
    fill: tomato;
    stroke: tomato;
    stroke-width: 30;
    width: 16px;
  }
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
export default ChangePassword;
