import styled from "styled-components";
import { FlexCol, FlexRow, Text } from "../../elements/elements";

const Header = () => {
  return (
    <Ctn>
      <Wrap>
        <FlexRow gap="10px">
          <Img src="https://user-images.githubusercontent.com/77138259/201538983-41eebf77-47ad-4db0-b489-c119066daf20.png" />
          <FlexCol alignItem="left" gap="5px">
            <Text fontWeight="600">떨면뭐하니</Text>
            <Text fontSize="small">떨리는 면접, 우리만 아는 방법이 있다!</Text>
          </FlexCol>
        </FlexRow>
      </Wrap>
    </Ctn>
  );
};

const Ctn = styled.div`
  position: fixed;
  width: 100%;
  background-color: white;
  z-index: 2;
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
  scale: 1;
  object-fit: cover;
`;

export default Header;
