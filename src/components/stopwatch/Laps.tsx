import * as React from "react";
import styled from "styled-components";
import { Lap, STATUS } from "../../hooks/useStopwatch"; // 이걸 가져옴
import stopwatchTime from "./utils/stopwatchTime";

interface IProps {
  status: STATUS;
  nextLap: Lap; // 지금 랩을 누르면 시간이 이렇게 찍힐거다~
  laps: Lap[];
}

const LapItem: React.FC<Lap> = ({ title, lapTime }) => {
  return (
    <Box className="none">
      <span style={{ color: "white" }}>{title}</span>
      <span style={{ color: "white" }}>{stopwatchTime(lapTime)}</span>
    </Box>
  );
};

const Laps: React.FC<IProps> = ({ status, nextLap, laps }) => {
  // 랩 1도 안 찍은 상태에서 정지했을 때 사라지는 버그 -> STATUS 값을 PROCESSING, STOP 말고 INIT도 만들어야 됨.
  const showNextLap = React.useMemo(() => {
    return status === STATUS.PROCESSING || laps.length;
  }, [status, laps]);

  return (
    <Container>
      {showNextLap && <LapItem {...nextLap} />}
      {laps.map((lap, index) => {
        return <LapItem key={lap.id} {...lap} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: red;
  font-size: 24px;

  padding: 20px;

  &:not(last-of-type) {
    border-bottom: 1px solid #1d1c1e;
  }
`;

export default Laps;
