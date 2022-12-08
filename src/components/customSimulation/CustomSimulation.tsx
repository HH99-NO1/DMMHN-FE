import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  FlexCol,
  FlexRow,
  Gap,
  HeaderBox,
  Liner,
} from "../../elements/elements";
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

  // 카테고리 선택 이벤트
  const [category, setCategory] = useState("");
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
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

    if (
      category.trim() === "" ||
      category === "none" ||
      inputQuestion.trim() === ""
    ) {
      return alert("카테고리 또는 질문을 입력하세요.");
    }

    const config = {
      _id: "",
      customMemberId: "",
      createdAt: "",
      updatedAt: "",
      __v: 0,
      category: category,
      question: inputQuestion,
    };
    console.log(config);

    if (window.confirm(`${category}에 질문을 추가하시겠습니까?`)) {
      try {
        const { data } = await instance.post(`/mockInterview/custom`, config);
        console.log(data);
        if (questions) {
          setQuestions([...questions, config]);
        } else {
          setQuestions([config]);
        }

        return;
      } catch (e) {
        console.log(e);
      }
    } else {
      return;
    }
  };

  const deleteMySimulation = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const { data } = await instance.delete(`mockInterview/detail/`);
        console.log(data);
        alert("모의 면접 결과가 정상적으로 삭제되었습니다.");
      } catch (e) {
        console.log(e);
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
          <FlexCol width="100%" gap="20px">
            <Form onSubmit={onSubmitQuestion}>
              <MiddleTitle>질문 추가하기</MiddleTitle>
              <OptionBox>
                <FlexRow gap="5px" justifyContent="space-between">
                  <Select
                    name="category"
                    id="category-select"
                    value={category}
                    onInput={onInput}
                  >
                    <option value="none">
                      -- 질문을 추가할 포지션을 선택해주세요 --
                    </option>
                    <option value="react">프론트엔드 - React.js</option>
                    <option value="node">백엔드 - Node.js</option>
                    <option value="spring">백엔드 - spring</option>
                  </Select>
                </FlexRow>
              </OptionBox>

              <InputBox>
                <>
                  <Input
                    //
                    onInput={(e) => {
                      if (
                        e.currentTarget.value.length > e.currentTarget.maxLength
                      )
                        e.currentTarget.value = e.currentTarget.value.slice(
                          0,
                          e.currentTarget.maxLength
                        );
                    }}
                    type="text"
                    value={inputQuestion}
                    onChange={onChangeInputQuestion}
                    maxLength={50}
                    placeholder="추가할 질문을 입력하세요."
                  />
                  <SubmitBtn>추가하기</SubmitBtn>
                </>
              </InputBox>
            </Form>

            <FlexRow
              width="100%"
              gap="10px"
              justifyContent="space-between"
              alignItem="flex-start"
            >
              <MiddleTitle style={{ marginTop: "10px" }}>
                모의면접 결과
              </MiddleTitle>
              <FlexCol gap="10px" alignItem="flex-start">
                <Liner />
                <Gap gap="10px" />
                <Text>질문별 소요시간</Text>
                <Liner />
                <FlexCol width="100%" gap="10px" alignItem="flex-start">
                  <FlexCol width="100%" gap="5px" alignItem="flex-start">
                    {/* {mySimulation.resultsArr.map((arr, index) => (
                          <FlexRow
                            width="100%"
                            gap="10px"
                            justifyContent="space-between"
                          >
                            <Question>
                              <NumberArea>{index + 1}.</NumberArea>{" "}
                              {arr.question}
                            </Question>
                            <Question> - [{arr.time}]</Question>
                          </FlexRow>
                        ))} */}
                  </FlexCol>
                </FlexCol>
              </FlexCol>
            </FlexRow>
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

const Text = styled.span`
  font-size: 16px;
  color: ${(props) => props.theme.__grayDark};
`;
const MiddleTitle = styled.h3`
  min-width: 150px;
  font-size: 20px;
  font-weight: 400;
`;
const OptionBox = styled.div`
  position: relative;
  min-height: 44px;
  width: 100%;
  border: 3px solid ${(props) => props.theme.__grayMedium};
  border-radius: 22px;
  box-sizing: border-box;
  padding: 10px 20px;
`;
const Select = styled.select`
  border: none;
  overflow: hidden;
  font-size: 16px;
  font-weight: 600;
  appearance: none;
  width: 100%;
  background-color: inherit;
  color: #222222;
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
interface ISubmitBtn {
  checkSucceed?: boolean;
}
const SubmitBtn = styled.button<ISubmitBtn>`
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

export default CustomSimulation;
