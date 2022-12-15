import styled from "styled-components";

const Layout = (props: any) => {
  return (
    <LayoutCtn>
      <LayoutBox>{props.children}</LayoutBox>
    </LayoutCtn>
  );
};

const LayoutCtn = styled.div`
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  height: calc(100vh);
  background: linear-gradient(
    150deg,
    #004922 0%,
    #02632f 40%,
    #058841 70%,
    ${(props) => props.theme.bgColor} 70%
  );
  @media screen and (max-height: 600px) {
    height: 100%;
  }
`;
const LayoutBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 1180px) {
    height: auto;
  }
`;

export default Layout;
