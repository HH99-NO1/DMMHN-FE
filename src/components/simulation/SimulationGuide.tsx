import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { FlexCol, FlexRow, HeaderBox } from "../../elements/elements";
import { useSetRecoilState } from "recoil";
import { onLoginState } from "../../recoil/atoms/atoms";
import Layout from "../home/Layout";

SwiperCore.use([Navigation, Autoplay, Pagination]);

const SimulationGuide = () => {
  const onLogin = useSetRecoilState(onLoginState);

  return (
    <Layout>
      <Ctn>
        <MainCenter>
          <MainText>
            떨리는 면접, 우리만의 방법이 있다!
            <br />
            <MainInnerText>"모의면접"</MainInnerText>을 통해 시작해보세요
          </MainText>
          <SubText>
            모의면접관의 질문을 <MainInnerText>"음성"</MainInnerText>으로 듣고,
            확실하게 준비하세요.
            <br />
            떨면뭐하니와 함께라면 긴장을 이겨낼 수 있습니다.
          </SubText>
        </MainCenter>
        <LoginBtn onClick={() => onLogin(true)}>모의면접 시작하기</LoginBtn>
        <StyledSwiper
          speed={1000}
          // navigation={{
          //   prevEl: PrevRef.current,
          //   nextEl: NextRef.current,
          // }}
          navigation={true}
          // onInit={(swiper) => {
          //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //   // @ts-ignore
          //   // eslint-disable-next-line no-param-reassign
          //   swiper.params.navigation.prevEl = PrevRef.current;
          //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //   // @ts-ignore
          //   // eslint-disable-next-line no-param-reassign
          //   swiper.params.navigation.nextEl
          // }}
          pagination={{ clickable: true }}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          centeredSlides={true}
          loop={true}
          loopedSlides={1}
        >
          <SwiperSlide>
            <Img
              src="https://user-images.githubusercontent.com/77138259/202983306-94a7eaba-80d7-4668-a7cd-cee962f7733a.png"
              alt="mainImg1"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Img
              src="https://user-images.githubusercontent.com/77138259/202984418-2b1bb93e-d88a-4387-82f0-ee4244176066.png"
              alt="mainImg2"
            />
          </SwiperSlide>
        </StyledSwiper>
      </Ctn>
    </Layout>
  );
};

const Ctn = styled(FlexCol)`
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
  @media screen and (max-height: 600px) {
    position: relative;
    top: auto;
    left: auto;
    transform: translate(0, 0);
  }
`;

const Img = styled.img`
  width: 100%;
  margin: 0 auto;
`;

const StyledSwiper = styled(Swiper)`
  max-width: 500px;
  width: 100%;
  position: relative;
  @media screen and (max-height: 800px) {
    max-width: 300px;
  }
`;

const MainCenter = styled.div`
  text-align: center;
`;

const MainText = styled.h2`
  font-size: 30px;
  font-weight: 700;
  line-height: 1.5;
  margin-bottom: 25px;
  color: white;
  @media screen and (max-width: 800px) {
    font-size: 24px;
  }
  @media screen and (max-height: 800px) {
    font-size: 24px;
  }
`;

const MainInnerText = styled.span`
  color: ${(props) => props.theme.__yellowLight};
  font-weight: 700;
`;

const SubText = styled.p`
  font-size: 20px;
  font-weight: 200;
  line-height: 1.5;
  color: white;
  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
  @media screen and (max-height: 800px) {
    font-size: 16px;
  }
`;

// const ArrowAll = styled.div`
//   position: absolute;
//   top: 50%;
//   transform: translateY(-50%);
//   z-index: 22;
// `;
const LoginBtn = styled.button`
  background-color: ${(props) => props.theme.__yellowLight};
  color: #025729;
  border: none;
  font-size: 30px;
  font-weight: 600;
  margin: 10px auto 10px auto;
  max-width: 300px;
  width: 100%;
  padding: 10px 30px;
  border-radius: 30px;
  cursor: pointer;
  transition: all, 0.2s;
  :hover {
    box-shadow: 0px 4px 8px -1px rgba(0, 0, 0, 0.5) inset;
  }
  @media screen and (max-width: 800px) {
    font-size: 24px;
  }
  @media screen and (max-height: 800px) {
    font-size: 24px;
  }
`;

export default SimulationGuide;
