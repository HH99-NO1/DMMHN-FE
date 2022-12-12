import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  FlexCol,
  FlexRow,
  Gap,
  HeaderBox,
  Liner,
} from "../../elements/elements";
import { isSimulationState, test } from "../../recoil/atoms/atoms";
import { instance } from "../../recoil/instance";

interface IQuestions {
  _id: string;
  category: string;
  question: string;
  customMemberId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const CustomSimulation = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<IQuestions[]>();
  console.log(questions);

  const getCustomQuestion = async () => {
    try {
      const { data } = await instance.get(`mockInterview/custom/`);
      console.log(data);
      setQuestions(data);
    } catch (e) {
      console.log(e);
    }
  };

  // 질문 입력
  const [inputQuestion, setInputQuestion] = useState("");
  const onChangeInputQuestion = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputQuestion(event.currentTarget.value);
  };

  const onSubmitQuestion = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputQuestion.trim() === "") {
      return alert("추가할 질문을 입력하세요.");
    }

    const config = {
      _id: "",
      customMemberId: "",
      createdAt: "",
      updatedAt: "",
      __v: 0,
      category: "custom",
      question: inputQuestion,
    };
    console.log(config);

    if (window.confirm(`질문을 추가하시겠습니까?`)) {
      try {
        const { data } = await instance.post(`/mockInterview/custom`, {
          category: "custom",
          question: inputQuestion,
        });
        console.log(data);
        if (questions) {
          setQuestions([...questions, config]);
        } else {
          setQuestions([config]);
        }
        setInputQuestion("");
        alert("질문이 추가되었습니다.");
        return;
      } catch (e) {
        console.log(e);
      }
    } else {
      return;
    }
  };
  const setTest = useSetRecoilState(test);
  const setSimulation = useSetRecoilState(isSimulationState);
  const goToCustomSimulation = () => {
    console.log("가즈아");
    const userName = sessionStorage.getItem("userName");
    if (
      window.confirm(
        `${userName}님의 질문은 총 ${questions?.length}개 입니다.\n커스텀 모의면접을 진행하시겠습니까?`
      )
    ) {
      const questionArr = questions?.map((question) => question.question);
      if (questionArr) {
        const customQuestions = {
          category: "custom",
          questionArr: questionArr,
        };
        console.log(customQuestions);
        setTest(customQuestions);
        setSimulation(true);
        navigate("/simulation");
      } else {
        alert("커스텀 모의면접 통신에 문제가 발생했습니다.");
      }
    }
  };

  const deleteQuestion = async (id: string) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const { data } = await instance.delete(`mockInterview/custom/${id}`);
        console.log(data);

        const newQuestions = questions?.filter((curr) => {
          return !(id === curr._id);
        });
        console.log(newQuestions);
        setQuestions(newQuestions);

        alert("커스텀 질문이 정상적으로 삭제되었습니다.");
      } catch (e) {
        console.log(e);
        alert("커스텀 질문 삭제에 오류가 발생했습니다.");
      }
    } else {
      return;
    }
  };
  useEffect(() => {
    getCustomQuestion();
  }, []);

  return (
    <>
      <HeaderBox />
      <Ctn>
        <FlexCol width="100%" gap="20px">
          <FlexRow
            width="100%"
            justifyContent="space-between"
            alignItem="flex-end"
          >
            <TitleBar>나만의 모의면접 질문 현황</TitleBar>
          </FlexRow>
          <FlexCol width="100%" gap="30px">
            <Form onSubmit={onSubmitQuestion}>
              <MiddleTitle>질문 추가하기</MiddleTitle>
              <InputBox>
                <Input
                  type="text"
                  value={inputQuestion}
                  onChange={onChangeInputQuestion}
                  maxLength={50}
                  placeholder="추가할 질문을 입력하세요."
                />
                <SubmitBtn>추가하기</SubmitBtn>
              </InputBox>
            </Form>

            <FlexCol width="100%" gap="20px">
              <MiddleTitle style={{ marginTop: "10px" }}>
                나만의 질문 리스트
              </MiddleTitle>
              <QuestionsList gap="10px" width="100%" alignItem="flex-start">
                {!questions
                  ? "나만의 질문이 없습니다."
                  : questions?.map((question, index) => (
                      <QuestionBox key={index}>
                        <Question>
                          <NumberArea>{index + 1}.</NumberArea>{" "}
                          {question.question}
                        </Question>
                        <DeleteBtn onClick={() => deleteQuestion(question._id)}>
                          삭제
                        </DeleteBtn>
                      </QuestionBox>
                    ))}
              </QuestionsList>
              <SignupBtn onClick={() => goToCustomSimulation()}>
                나만의 질문으로 모의면접하기
              </SignupBtn>
            </FlexCol>
          </FlexCol>
        </FlexCol>
      </Ctn>
    </>
  );
};
const Ctn = styled.div`
  /* border: 1px solid red; */
  padding: 20px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`;
const TitleBar = styled.div`
  padding: 10px 20px;
  border-radius: 20px;
  max-width: 500px;
  width: 100%;
  text-align: left;
  font-size: 20px;
  font-weight: 600;
  background-color: ${(props) => props.theme.__grayLight};
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
`;
const MiddleTitle = styled.h3`
  min-width: 150px;
  font-size: 20px;
  font-weight: 400;
`;
const Input = styled.input`
  height: 50px;
  padding: 8px 20px;
  border-radius: 67px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid ${(props) => props.theme.__grayLight};
  :focus {
    outline: 1px solid ${(props) => props.theme.__grayMedium};
  }
`;
const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 50px;
  width: 100%;
  min-width: 400px;
`;
const SubmitBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  color: black;
  border: 1px solid ${(props) => props.theme.__greenMidium};
  border-radius: 20px;
  padding: 4px 12px;
  cursor: pointer;
`;
const DeleteBtn = styled(SubmitBtn)`
  right: 0;
  border: 1px solid tomato;
`;
const Question = styled.span`
  font-size: 14px;
  display: flex;
  gap: 15px;
`;
const NumberArea = styled.span`
  font-size: inherit;
  width: 20px;
  display: flex;
  justify-content: right;
`;
const QuestionsList = styled(FlexCol)`
  background-color: white;
  padding: 20px 10px;
  gap: 20px;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
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
const QuestionBox = styled(FlexRow)`
  position: relative;
  width: 100%;
  gap: 10px;
  justify-content: space-between;
`;

export default CustomSimulation;
