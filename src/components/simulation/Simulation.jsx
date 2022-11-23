import { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexCol, FlexRow, Gap, Text } from "../../elements/elements";
import SimulationSetting from "./SimulationSetting";
import { speak } from "./TextToSpeech";
import { AiOutlineRight } from "react-icons/ai";
import axios from "axios";

let count = 0;

const Simulation = () => {
  const array = [
    "CSR , SSR의 차이와 SEO의 차이점에 대해서 설명하세요.",
    "아토믹 디자인에서 위치를 어떻게 잡았나요?",
    "자바스크립트 엔진과 동작 원리에 대해 서술하세요.",
    "var / let / const 의 차이점은 무엇인가요?",
    "얕은 복사와 깊은 복사의 각 개념과 구현 방법을 설명하세요.",
  ];

  // let voices = [];

  // function setVoiceList() {
  //   voices = window.speechSynthesis.getVoices();
  //   return voices;
  // }
  // const test = setVoiceList();
  // console.log(test);

  const [value, setValue] = useState(array[0]);
  const [currValue, setCurrValue] = useState(value);

  const onClick = () => {
    if (count < 5 - 1) {
      count++;
      setValue(array[count]);
      setCurrValue(value);
    } else {
      setValue("모의 면접이 종료되었습니다.");
      setCurrValue(value);
      count++;
    }
    speechSynthesis.cancel();
    speak(value, window.speechSynthesis);
  };
  console.log(array.slice(0, count));

  useEffect(() => {
    window.speechSynthesis.cancel();
  }, []);
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
            <FlexRow gap="5px" key={index}>
              {index + 1}.<Text key={index}>{v}</Text>
            </FlexRow>
          ))}
        </FlexCol>
      </FlexCol>
      <FlexCol>
        <div id="container">
          <video id="gum" playsInline autoPlay muted></video>
          <video id="recorded" playsInline loop></video>
          <div>
            <button id="start">Start camera</button>
            <button id="record" disabled>
              Start Recording
            </button>
            <button id="play" disabled>
              Play
            </button>
            <button id="download" disabled>
              Download
            </button>
          </div>
          <div>
            Recording format: <select id="codecPreferences" disabled></select>
          </div>
          <div>
            <h4>Media Stream Constraints options</h4>
            <p>
              Echo cancellation: <input type="checkbox" id="echoCancellation" />
            </p>
          </div>

          <div>
            <span id="errorMsg"></span>
          </div>
        </div>
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