import stopwatchTime from "../stopwatch/utils/stopwatchTime";
import useStopwatch from "../../hooks/useStopwatch";
import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  isRecordState,
  isStopState,
  isTimeStartState,
  timeLapsValue,
  timeSecondsValue,
} from "../../recoil/atoms/atoms";
import Laps from "../stopwatch/Laps";

interface ISeconds {
  timeset: string;
}

const Timer = ({ timeset }: ISeconds) => {
  const { seconds, start, stop, record, nextLap, laps } = useStopwatch();
  const isTimeStart = useRecoilValue(isTimeStartState);
  const isStop = useRecoilValue(isStopState);
  const setTimeSeconds = useSetRecoilState(timeSecondsValue);
  const setTimeLaps = useSetRecoilState(timeLapsValue);
  const timeLaps = useRecoilValue(timeLapsValue);
  const isRecord = useRecoilValue(isRecordState);

  useEffect(() => {
    setTimeSeconds(stopwatchTime(seconds));
    // setTimeLaps(stopwatchTime(nextLap.lapTime));
    isTimeStart && start();
  }, [isTimeStart]);

  useEffect(() => {
    if (isStop) {
      stop();
      setTimeSeconds(stopwatchTime(seconds));
    }
  }, [isStop]);

  useEffect(() => {
    setTimeLaps(stopwatchTime(nextLap.lapTime));
    if (isRecord) {
      record();
    }
  }, [isRecord]);
  setTimeLaps(stopwatchTime(nextLap.lapTime));
  // console.log(laps);
  if (timeset === "seconds") {
    return <>{stopwatchTime(seconds)}</>;
  } else if (timeset === "laps") {
    return <>{stopwatchTime(nextLap.lapTime)}</>;
  } else {
    return <>not a time</>;
  }
};

export default React.memo(Timer);
