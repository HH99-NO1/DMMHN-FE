import * as React from "react";
import { INTERVAL, MILLISEC_PER_SECOND } from "./constants";

export enum STATUS {
  PROCESSING,
  STOP,
}

export interface Lap {
  id: number; // 쌓이는 기록이니까
  title: string;
  lapTime: number; // 직전 랩으로부터의 시간
  seconds: number;
}

interface UseStopwatchReturnType {
  seconds: number;
  status: STATUS;
  laps: Lap[];
  nextLap: Lap;

  start: () => void;
  stop: () => void;
  reset: () => void;
  record: () => void;
}

const useStopwatch: () => UseStopwatchReturnType = () => {
  // state
  const [seconds, setSeconds] = React.useState(0);
  const [status, setStatus] = React.useState<STATUS>(STATUS.STOP);
  const [laps, setLaps] = React.useState<Lap[]>([]);

  const nextLap = React.useMemo<Lap>(() => {
    return {
      id: laps.length + 1,
      title: `랩 ${laps.length + 1}`,
      lapTime: seconds - (laps[0]?.seconds ?? 0),
      seconds,
    };
  }, [seconds, laps]);

  const start = React.useCallback(() => {
    if (status !== STATUS.STOP) {
      console.debug("Status is not STOP");
      return;
    }

    setStatus(STATUS.PROCESSING);
    console.debug("Stopwatch just starts");
  }, [status]);

  const stop = React.useCallback(() => {
    if (status !== STATUS.PROCESSING) {
      console.debug("Status is not PROCESSING");
      return;
    }

    setStatus(STATUS.STOP);
    console.debug("Stopwatch just stops");
  }, [status]);
  const reset = React.useCallback(() => {
    // 이미 상태가 정지일 때야 가능
    if (status !== STATUS.STOP) {
      console.debug("Status is not STOP");
    }

    setSeconds(0);
    setLaps([]);
    console.debug("Stopwatch just resets");
  }, [status]);

  const record = React.useCallback(() => {
    if (status !== STATUS.PROCESSING) {
      console.debug("Status is not PROCESSING");
      return;
    }

    setLaps((prev) => [nextLap, ...prev]); // 배열을 단순히 추가만 하면 안됨. 의존성은 주소를 참조하고 있어서 안 바뀜
    console.debug("Stopwatch just records");
  }, [status, nextLap]);

  React.useEffect(() => {
    let intervalId: number;

    if (status === STATUS.PROCESSING) {
      intervalId = window.setInterval(() => {
        setSeconds((prev) => {
          return prev + INTERVAL / MILLISEC_PER_SECOND;
        });
      }, INTERVAL); // 0.01s마다
    }

    return () => {
      // cleanup 함수로, 컴포넌트가 사라질 때 실행됨
      window.clearInterval(intervalId);
    };
  }, [status]); // status가 바뀔 때 useEffect에 있는 함수 실행

  return {
    seconds,
    status,
    laps,

    nextLap,

    start,
    stop,
    reset,
    record,
  };
};

export default useStopwatch;
