import styled from "styled-components";
import { Gap } from "../../elements/elements";

const Layout = (props: any) => {
  return (
    <LayoutCtn>
      <Gap />
      <LayoutBox>
        <Gap />
        {props.children}
      </LayoutBox>
    </LayoutCtn>
  );
};

const LayoutCtn = styled.div`
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  /* max-width: 2100px; */
  /* padding: 14px 50px 0 50px; */
  /* @media screen and (max-width: 800px) {
    padding: 14px 24px 0 24px;
  } */
  height: calc(100vh);
  background: linear-gradient(
    150deg,
    #004922 0%,
    #02632f 40%,
    #058841 70%,
    #ffffff 70%
  );
  overflow: hidden;
  /* @media screen and (max-height: 600px) {
    height: 100%;
  } */
`;
const LayoutBox = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

export default Layout;
