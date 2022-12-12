// Button.tsx
import * as React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

type ButtonType = "NORMAL" | "SUCCESS" | "ERROR";

interface IProps {
  type: ButtonType;
  onClick: () => void;
  children: React.ReactNode;
}

// IProps에서 onClick만 제외한 타입 -> type과 children만 있으면 됨.
type StyledProps = Omit<IProps, "onClick" | "children">;

const Button: React.FC<IProps> = ({ type, onClick, children }) => {
  return (
    <Container type={type} onClick={onClick}>
      {children}
    </Container>
  );
};

// CSS 안에서 쓸 타입 모음
const getStyleByType = (props: StyledProps) => {
  let color = "white";
  let backgroundColor = "#333333";

  switch (props.type) {
    case "NORMAL":
      color = "#fff";
      backgroundColor = "#333333";
      break;
    case "SUCCESS":
      color = "#095D22";
      backgroundColor = "#0A2A12";
      break;
    case "ERROR":
      color = "#EB594F";
      backgroundColor = "#340D0B";
  }

  return css`
    color: ${color};
    background-color: ${backgroundColor};
  `;
};

const Container = styled.div<StyledProps>`
  width: 100px;
  height: 100px;
  border-radius: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
  ${getStyleByType}

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export default Button;
// export default는 파일 하나에 하나만 할 수 있다!
// import할 때 이름을 마음대로 지어도 되고, { } 없이 import할 수 있음.
