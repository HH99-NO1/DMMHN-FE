import { useForm } from "react-hook-form";
import styled from "styled-components";
import { FlexCol, Text } from "../../elements/elements";
import { instance } from "../../recoil/instance";

interface IForm {
  interviewManager: string;
  // interviewTime: {
  //   start: string;
  //   end: string;
  // };
  interviewTimeStart: string;
  interviewTimeEnd: string;
  interviewTopic: string;
  interviewOption: {
    onMuted: boolean;
  };
  extraError?: string;
}

const Meet = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<IForm>();
  const handleValid = async (data: IForm) => {
    try {
      const req = {
        userId: "",
        password: "",
      };
      const { data } = await instance.post(`https://dgbnb.com/signup`, req);
      return data.data;
    } catch (error: any) {
      return error.message;
    }
  };

  return (
    <>
      <h1>면접 관리 페이지</h1>
      <form onSubmit={handleSubmit(handleValid)}>
        <FlexCol gap="10px">
          <InputBox>
            <Input
              {...register("interviewManager", {
                required: "면접 담당자는 필수입니다.",
              })}
              type="text"
              placeholder="홍길동"
            />
            <ErrorMsg>{errors.interviewManager?.message}</ErrorMsg>
          </InputBox>
          <InputBox>
            <Input
              {...register("interviewTimeStart", {
                required: "면접 담당자는 필수입니다.",
              })}
              type="text"
              placeholder="홍길동"
            />
            <ErrorMsg>{errors.interviewManager?.message}</ErrorMsg>
          </InputBox>
          <button>제출하기</button>
          <span>{errors.extraError?.message}</span>
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
`;
const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 50px;
`;
const ErrorMsg = styled.span`
  position: absolute;
  top: 35px;
  font-size: 12px;
  color: tomato;
`;

export default Meet;
