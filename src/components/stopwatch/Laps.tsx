// Laps.tsx
import * as React from "react";

interface IProps {
  nextLap: string; // 지금 랩을 누르면 시간이 이렇게 찍힐거다~
  laps: string[];
}

const Laps: React.FC<IProps> = ({ nextLap, laps }) => {
  return (
    <div>
      <div>{nextLap}</div>
      {laps.map((lap, index) => {
        return <div key={index}>{lap}</div>;
      })}
    </div>
  );
};

export default Laps;
