import * as react from "react";
import styled from "styled-components";
import stopwatchTime from "./utils/stopwatchTime";

interface IProps {
  seconds: number;
}

// 00:00:00:00
const Time: React.FC<IProps> = ({ seconds }) => {
  return <Container>{stopwatchTime(seconds)}</Container>;
};

const Container = styled.div`
  color: #fff;
  font-size: 60px;

  display: flex;
  justify-content: center;
  align-items: center;

  flex: 1;
`;

export default Time;
