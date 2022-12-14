import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { FlexCol } from "../../elements/elements";
import {
  checkSucceedState,
  serverCodeNumber,
  userEmailValue,
} from "../../recoil/atoms/atoms";
import { UserApi } from "../../recoil/instance";

interface IForm {
  memberEmail: string;
}
const FindPWCheckEmail = () => {
  const [checkSucceed, setCheckSucceed] = useRecoilState(checkSucceedState);
  const [serverCode, setServerCode] = useRecoilState(serverCodeNumber);
  const [isChecked, setIsChecked] = useState(false);

  // 유저 이메일
  const [userEmail, setUserEmail] = useRecoilState(userEmailValue);
  const onChangeUserEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.currentTarget.value);
  };

  // use form 등록
  const {
    register,
    formState: { errors },
    setError,
    control,
  } = useForm<IForm>({});
  console.log(errors);

  // 이메일 인증코드 발송
  const checkEmail = async () => {
    if (userEmail.trim() === "") {
      return alert("이메일을 입력해주세요.");
    } else {
      const emailRegex = /^[a-z0-9+-\_.]{4,30}@[a-z]{4,30}\.[a-z]{2,4}$/;
      console.log(emailRegex.test(userEmail));
      if (emailRegex.test(userEmail)) {
        try {
          const { data } = await UserApi.post("/members/authCodeForPassword", {
            memberEmail: userEmail,
          });
          alert(`${userEmail}로 인증코드를 발송했습니다.`);
          console.log("serverCode :", data.data);
          setServerCode(data.data);
          setUserEmail(userEmail);
          setIsChecked(true);
        } catch (e: any | unknown) {
          if (e.response.status === 400) {
            alert("등록되지 않은 이메일입니다.");
          }
        }
      } else {
        return alert("이메일 형식을 확인해주세요.");
      }
    }
  };

  // 이메일 인증 코드 입력
  const [checkCode, setCheckCode] = useState("");
  const onChangeCheckCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckCode(event.currentTarget.value);
  };

  const checkServerCode = () => {
    if (serverCode + "" === checkCode) {
      alert("인증이 완료되었습니다.");
      return setCheckSucceed(true);
    } else if (!isChecked) {
      return alert("인증코드 요청 버튼을 눌러주세요.");
    } else {
      return alert("잘못된 코드입니다. 다시 확인해주세요.");
    }
  };

  return (
    <Ctn>
      <InputBox>
        <Input
          {...register("memberEmail", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^[a-z0-9+-\_.]{4,30}@[a-z]{4,30}\.[a-z]{2,4}$/,
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
          onInput={(e) => {
            if (e.currentTarget.value.length > e.currentTarget.maxLength)
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
          disabled={!isChecked}
        />
      </InputBox>

      <CheckBtn
        onClick={() => {
          checkServerCode();
        }}
      >
        이메일 인증하기
      </CheckBtn>
    </Ctn>
  );
};

const Ctn = styled(FlexCol)``;
const InputBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
interface IInput {
  isError?: boolean;
}
const Input = styled.input<IInput>`
  font-size: 14px;
  padding: 20px;
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.isError ? "tomato" : props.theme.__grayLight)};
  padding-right: 115px;

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

const CheckBtn = styled.button`
  background-color: ${(props) => props.theme.__greenMidium};
  color: #fff;
  border: none;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  padding: 20px 10%;
  margin-top: 20px;
  border-radius: 30px;
  cursor: pointer;
  transition: all, 0.2s;
  :hover {
    box-shadow: 0px 4px 8px -1px rgba(0, 0, 0, 0.5) inset;
  }
`;

export default FindPWCheckEmail;
