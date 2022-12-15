import FadeLoader from "react-spinners/FadeLoader";
import styled from "styled-components";
import { HeaderBox } from "./elements";

const LoadingModal = () => {
  return (
    <BGBlack>
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
    </BGBlack>
  );
};

const BGBlack = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: calc(100vh);
  background-color: rgba(0, 0, 0, 0.5);
`;

export default LoadingModal;
