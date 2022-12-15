import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { FlexRow, Text } from "../../elements/elements";
import { isOK } from "../../recoil/atoms/atoms";

const CheckModal = () => {
  const navigate = useNavigate();
  const setIsOKState = useSetRecoilState(isOK);

  return (
    <BGBlack>
      <Ctn>
        <CheckCtn>
          <TitleBar>모의면접 안내</TitleBar>
          <TextArea>
            떨면뭐하니가 제공하는 모의면접 서비스는
            <br />
            모의면접관의 질문을 <MainInnerText>"음성"</MainInnerText>으로 듣고,
            <br />
            영상을 통해 나의 억양과 표정을 확인하며
            <br />
            실제 면접을 준비해나가는 서비스입니다.
            <br />
            <br />
            사용자는 웹캡을 통해 화면을 녹화하여 영상을 저장할 수 있으나,
            <br />
            <MainInnerText>
              해당 서비스 내 영상이 저장되지 않으므로
            </MainInnerText>
            <br />
            영상의 저장이 필요하신 경우, 모의면접 종료 후 저장하시기 바랍니다.
            <br />
            <br />
            위의 사항에 동의하신다면 <MainInnerText>
              "동의하기"
            </MainInnerText>{" "}
            버튼을 눌러주세요.
          </TextArea>
          <Img src="/img/simulationGuide.png" alt="guide" />
          <BtnArea>
            <Btn onClick={() => navigate(-1)}>이전으로</Btn>
            <Btn onClick={() => setIsOKState(true)} isOK={true}>
              동의하기
            </Btn>
          </BtnArea>
        </CheckCtn>
      </Ctn>
    </BGBlack>
  );
};

// 모달 배경화면
const BGBlack = styled.div`
  z-index: 6;
  width: 100%;
  height: calc(100vh);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

// 모달 위치 고정
const Ctn = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 800px;
  min-width: 300px;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;

const CheckCtn = styled.div`
  background-color: #fff;
  height: 100%;
  position: relative;
  border: 1px solid #ebebeb;
  border-radius: 10px;
  padding: 20px;
  margin: 3% 3%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  box-sizing: border-box;
  overflow: auto;
  @media screen and (max-height: 800px) {
    height: calc(100vh - 40px);
  }
`;
const TitleBar = styled.div`
  padding: 10px 0;
  margin: 0 auto 0 auto;
  border-bottom: 2px solid ${(props) => props.theme.__grayMedium};
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  @media screen and (max-width: 550px) {
    font-size: 16px;
  }
`;
const TextArea = styled(Text)`
  font-size: 16px;
  line-height: 1.5;
  @media screen and (max-width: 550px) {
    font-size: 12px;
  }
`;
const MainInnerText = styled.span`
  color: ${(props) => props.theme.__greenMidium};
  font-weight: 700;
`;
const Img = styled.img`
  width: 100%;
  border-radius: 10px;
  display: block;
  box-shadow: 0px 4px 8px -1px rgba(0, 0, 0, 0.5);
`;

interface IBtn {
  isOK?: boolean;
}

const Btn = styled.button<IBtn>`
  background-color: ${(props) => {
    if (props.isOK) {
      return props.theme.__yellowLight;
    } else {
      return props.theme.__grayDark;
    }
  }};
  color: ${(props) => {
    if (props.isOK) {
      return "#025729";
    } else {
      return "white";
    }
  }};
  border: none;
  font-size: 20px;
  font-weight: 600;
  margin: 0 auto;
  max-width: 200px;
  width: 100%;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  transition: all, 0.2s;
  :hover {
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.1);
  }
  @media screen and (max-width: 550px) {
    font-size: 16px;
  }
`;
const BtnArea = styled(FlexRow)`
  gap: 20px;
`;

export default CheckModal;
