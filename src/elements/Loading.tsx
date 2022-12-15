import FadeLoader from "react-spinners/FadeLoader";
import { HeaderBox } from "./elements";

const Loading = () => {
  return (
    <>
      <HeaderBox />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <FadeLoader
          color="#669940"
          height={15}
          width={5}
          radius={2}
          margin={2}
        />
      </div>
    </>
  );
};

export default Loading;
