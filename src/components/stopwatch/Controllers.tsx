import React, * as react from "react";
import styled from "styled-components";
import { STATUS } from "../../hooks/useStopwatch"; // 이걸 가져옴
import Button from "./Button";

// 시작 후 : 랩      정지
// 정지    : 초기화   시작

interface IProps {
  state: STATUS;
  record: () => void;
  stop: () => void;
  reset: () => void;
  start: () => void;
}

const Controllers: React.FC<IProps> = ({
  state,
  record,
  stop,
  reset,
  start,
}) => {
  return (
    <Container>
      {state === STATUS.PROCESSING ? (
        <>
          <Button type="NORMAL" onClick={record}>
            랩
          </Button>
          <Button type="ERROR" onClick={stop}>
            정지
          </Button>
        </>
      ) : (
        <>
          <Button type="NORMAL" onClick={reset}>
            초기화
          </Button>
          <Button type="SUCCESS" onClick={start}>
            시작
          </Button>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  flex: none;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;

  border-bottom: 1px solid #1d1c1e;
`;

export default Controllers;
