import React, { FC } from "react";
import styled from "styled-components";
import useStopwatch from "../../hooks/useStopwatch";
import Controllers from "./Controllers";
import Laps from "./Laps";
import Time from "./Time";

const Stopwatch: React.FC = () => {
  const { seconds, status, laps, nextLap, start, stop, record, reset } =
    useStopwatch();

  return (
    <Container>
      <IPhone>
        <Screen>
          <Time seconds={seconds} />
          <button onClick={start}>시작</button>
          <Controllers
            state={status}
            record={record} // record={() => {}}
            start={start}
            stop={stop}
            reset={reset}
          />
          <Laps status={status} nextLap={nextLap} laps={laps} />
        </Screen>
      </IPhone>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
// 하얀색 테두리
const IPhone = styled.div`
  border-radius: 30px;
  width: 400px;
  height: 800px;

  background-color: #fbfbfd;
  padding: 20px;
  box-shadow: 7px 7px 10px rgba(0, 0, 0, 0.4),
    inset -5px -5px 15px rgba(0, 0, 0, 0.2),
    inset 2px 0px 15px rgba(0, 0, 0, 0.2);
`;

// 검은색 액정
const Screen = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 30px;
  overflow: hidden;
  background-color: #000;

  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
`;

export default Stopwatch;
