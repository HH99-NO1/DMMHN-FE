// Controllers.tsx
import * as react from "react";

// 작동중 : 랩      정지
// 정지   : 초기화   시작

interface IProps {
  state: unknown;
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
    <div>
      {state === "Processing" ? (
        <>
          <button onClick={record}>랩</button>
          <button onClick={stop}>정지</button>
        </>
      ) : (
        <>
          <button onClick={reset}>초기화</button>
          <button onClick={start}>시작</button>
        </>
      )}
    </div>
  );
};

export default Controllers;
