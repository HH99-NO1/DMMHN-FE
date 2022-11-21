import { useState } from "react";
import styled from "styled-components";
import { FlexCol, FlexRow, Gap, Text } from "../../elements/elements";
import SimulationSetting from "./SimulationSetting";
import { speak } from "./TextToSpeech";
import { AiOutlineRight } from "react-icons/ai";

let count = 0;

const Simulation = () => {
  const array = [
    "CSR , SSR의 차이와 SEO의 차이점에 대해서 설명하세요.",
    "아토믹 디자인에서 위치를 어떻게 잡았나요?",
    "자바스크립트 엔진과 동작 원리에 대해 서술하세요.",
    "var / let / const 의 차이점은 무엇인가요?",
    "얕은 복사와 깊은 복사의 각 개념과 구현 방법을 설명하세요.",
  ];

  const [value, setValue] = useState(array[0]);
  const [currValue, setCurrValue] = useState(value);
  const [result, setResult] = useState({});
  const onClick = () => {
    if (count < 5) {
      count++;
      setValue(array[count]);
      setCurrValue(value);
    } else {
      setValue("모의 면접이 종료되었습니다.");
      setCurrValue(value);
    }
    speechSynthesis.cancel();
    speak(value, window.speechSynthesis);
  };
  console.log(array.slice(0, count));
  return (
    <>
      <FlexCol gap="10px">
        <Text fontSize="20px" fontWeight="600">
          리액트 모의면접
        </Text>
        <Text fontSize="30px" fontWeight="600">
          {currValue}
        </Text>
        <Button
          onClick={() => {
            onClick();
          }}
        >
          다음 질문 보기
          <AiOutlineRight size="30" stroke="white" strokeWidth="100" />
        </Button>
        <Gap />
        <Text fontSize="20px" fontWeight="600">
          지금까지의 질문
        </Text>
        <FlexCol gap="10px">
          {array.slice(0, count).map((v, index) => (
            <FlexRow gap="5px">
              {index + 1}.<Text key={index}>{v}</Text>
            </FlexRow>
          ))}
        </FlexCol>
      </FlexCol>
    </>
  );
};

const Button = styled.button`
  display: flex;
  gap: 5px;
  font-size: 16px;
  align-items: center;
  border: none;
  background-color: teal;
  color: white;
  font-weight: 600;
  border-radius: 10px;
  padding: 10px 20px;
`;

export default Simulation;
