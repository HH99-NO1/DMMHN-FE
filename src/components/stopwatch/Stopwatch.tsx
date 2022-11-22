import React, { FC } from "react";
import Controllers from "./Controllers";
import Laps from "./Laps";
import Time from "./Time";

const Stopwatch: React.FC = () => {
  return (
    <div>
      <Time seconds={10} />
      <Controllers
        state={"Processing"}
        record={() => {}}
        start={() => {}}
        stop={() => {}}
        reset={() => {}}
      />
      <Laps nextLap="Next" laps={["l", "a", "p", "s"]} />
    </div>
  );
};

export default Stopwatch;
