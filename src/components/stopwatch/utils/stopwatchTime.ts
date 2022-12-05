import { SECOND_PER_HOUR, SECOND_PER_MINUTE } from "../../../hooks/constants";

const stopwatchTime = (seconds: number) => {
  const h = Math.floor(seconds / SECOND_PER_HOUR);
  const m = Math.floor((seconds % SECOND_PER_HOUR) / SECOND_PER_MINUTE);
  const s = seconds - h * SECOND_PER_HOUR - m * SECOND_PER_MINUTE;

  // 00:00:00:00
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(
    s
  ).padStart(2, "0")}`;
};

export default stopwatchTime;
