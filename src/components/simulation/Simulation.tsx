import { useState } from "react";
import styled from "styled-components";
import SimulationSetting from "./SimulationSetting";
import { speak } from "./TextToSpeech";

let count = 0;

const Simulation = () => {
  const array = ["1", "2", "3"];
  const [value, setValue] = useState(array[0]);
  const onClick = () => {
    speechSynthesis.cancel();
    speak(value, window.speechSynthesis);
    if (count < 3) {
      setValue(array[count]);
      count++;
    } else {
      setValue("모의 면접이 종료되었습니다.");
    }
  };
  return (
    <>
      <SimulationSetting />
      <Button
        onClick={() => {
          onClick();
        }}
      >
        {value}
      </Button>
    </>
  );
};

const Button = styled.button``;

export default Simulation;
