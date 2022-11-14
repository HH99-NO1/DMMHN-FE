import styled from "styled-components";
import { FlexCol, FlexRow } from "../../elements/Flex";

const Header = () => {
  return (
    <Ctn>
      <Wrap>
        <FlexRow>
          <span style={{ backgroundColor: "red" }}>hello</span>
          <span style={{ backgroundColor: "green" }}>how</span>
        </FlexRow>
        <FlexCol>
          <span style={{ backgroundColor: "red" }}>hello</span>
          <span style={{ backgroundColor: "green" }}>how</span>
        </FlexCol>
        <Img src="https://user-images.githubusercontent.com/77138259/201538983-41eebf77-47ad-4db0-b489-c119066daf20.png" />
      </Wrap>
    </Ctn>
  );
};

const Ctn = styled.div`
  border: 1px solid red;
`;
const Wrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;

  border: 1px solid green;
`;
const Img = styled.img`
  width: 30px;
  height: 30px;
  scale: 1.7;
  object-fit: cover;
`;

export default Header;
