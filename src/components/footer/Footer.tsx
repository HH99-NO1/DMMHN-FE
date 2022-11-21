import styled from "styled-components";
import { FlexCol, FlexRow } from "../../elements/elements";

const Footer = () => {
  return (
    <CtnBox>
      <Ctn>
        <Wrap>
          <FlexRow gap="10px" justifyContent="space-between">
            <FlexCol gap="5px" alignItem="left">
              <Text>상호명: 비지트</Text>
              <Text>대표자: 안정찬, 안태건</Text>
              <Text>사업자등록번호: 463-07-02004</Text>
            </FlexCol>
            <FlexCol gap="5px" alignItem="left">
              <Text>
                주소: 세종특별자치시 새롬중앙로 34, 2층 204, 205호(새롬동
                크리스마스빌딩)
              </Text>
              <Text>Tel: 044-865-3399</Text>
              <Text>E-mail. contestcrew@naver.com</Text>
            </FlexCol>
            <FlexCol gap="10px" alignItem="left">
              <FlexRow gap="10px">
                <Img
                  src="https://communityseum.org/storage/2019/05/blog.png"
                  alt="blog"
                />
                <Img
                  src="https://communityseum.org/storage/2019/05/band.png"
                  alt="band"
                />
                <Img
                  src="https://communityseum.org/storage/2019/05/youtube.png"
                  alt="youtube"
                />
                <Img
                  src="https://communityseum.org/storage/2019/05/facebook.png"
                  alt="facebook"
                />
              </FlexRow>
              <Text>
                Copyright © 2022 Contestcrew. <br />
                All Rights Reserved.
              </Text>
            </FlexCol>
          </FlexRow>
        </Wrap>
      </Ctn>
    </CtnBox>
  );
};

const CtnBox = styled.div`
  /* position: relative; */
  width: 100%;
  min-height: 130px;
`;
const Ctn = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.__grayMedium};
`;
const Wrap = styled.div`
  max-width: 1200px;

  margin: 20px auto;
  padding: 10px;
`;

const Text = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.__grayMedium}; // 기본: #222222
`;

const Img = styled.img`
  height: 30px;
  width: auto;
`;

export default Footer;
