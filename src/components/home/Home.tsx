import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { FlexRow } from "../../elements/elements";
import { onLoginState } from "../../recoil/atoms/atoms";

const Home = () => {
  const onLogin = useSetRecoilState(onLoginState);
  return (
    <Ctn>
      <MainCenter>
        <MainText>
          어떤 면접이든 연습을 통해 대비해보세요
          <br />
          <MainInnerText>"떨면 뭐하니"</MainInnerText>가 도와드립니다
        </MainText>
        <SubText>
          떨면뭐하니의 신뢰할 수 있는 비디오 미팅 솔루션을 사용하여
          <br />
          소통하고, 협업하고, 함께 더욱 많은 것을 해내세요.
        </SubText>
        <LoginBtn onClick={() => onLogin(true)}>모의면접</LoginBtn>
      </MainCenter>

      <Img src="/img/mainPage.png" alt="mainImg2" />
    </Ctn>
  );
};

const Ctn = styled(FlexRow)`
  position: absolute;
  padding: 20px;
  max-width: 1200px;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 10px auto 0 auto;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1180px) {
    flex-direction: column;
  }
`;

const Img = styled.img`
  max-width: 600px;
  width: 100%;
  height: auto;
`;

const MainCenter = styled.div`
  text-align: center;
`;

const MainText = styled.h2`
  font-size: 30px;
  font-weight: 700;
  line-height: 49px;
  margin-bottom: 25px;
  color: white;
`;

const MainInnerText = styled.span`
  color: ${(props) => props.theme.__yellowLight};
  font-weight: 700;
`;

const SubText = styled.p`
  font-size: 20px;
  font-weight: 200;
  line-height: 32.69px;
  color: white;
`;
const LoginBtn = styled.button`
  background-color: ${(props) => props.theme.__yellowLight};
  color: #025729;
  border: none;
  font-size: 30px;
  font-weight: 600;
  margin: 30px auto 30px auto;
  max-width: 240px;
  width: 100%;
  padding: 10px 30px;
  border-radius: 30px;
  cursor: pointer;
  transition: all, 0.2s;
  :hover {
    box-shadow: 0px 4px 8px -1px rgba(0, 0, 0, 0.5) inset;
  }
`;
export default Home;
