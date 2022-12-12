import React from "react";
import styled from "styled-components";

const TitleArea = ({ children }: { children: React.ReactNode }) => {
  return (
    <Ctn>
      <Title>{children}</Title>
    </Ctn>
  );
};

const Ctn = styled.div`
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid ${(props) => props.theme.__lineGray};
`;
const Title = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;

  height: 60px;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 400;
  @media screen and (max-width: 600px) {
    height: 50px;
    font-size: 16px;
  }
`;

export default TitleArea;
