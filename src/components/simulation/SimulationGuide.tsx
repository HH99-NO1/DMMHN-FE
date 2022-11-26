import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { FlexCol } from "../../elements/elements";
import { useSetRecoilState } from "recoil";
import { onLoginState } from "../../recoil/atoms/atoms";

SwiperCore.use([Navigation, Autoplay, Pagination]);

const SimulationGuide = () => {
  const onLogin = useSetRecoilState(onLoginState);

  const [swiper, setSwiper] = useState(null);
  const navigate = useNavigate();
  const PrevRef = useRef(null);
  const NextRef = useRef(null);

  return (
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
  );
};

const Ctn = styled(FlexCol)`
  margin: 20px auto 0 auto;
  gap: 10px;
`;

const Img = styled.img`
  max-width: 500px;
  max-height: 500px;
  width: 100%;
  margin: 0 auto;
`;

const StyledSwiper = styled(Swiper)`
  width: 500px;
  position: relative;
`;

const MainCenter = styled.div`
  text-align: center;
`;

const MainText = styled.h2`
  font-size: 36px;
  font-weight: 700;
  line-height: 49px;
  margin-bottom: 25px;
`;

const MainInnerText = styled.span`
  color: #025729;
  font-weight: 700;
`;

const SubText = styled.p`
  font-size: 24px;
  font-weight: 200;
  line-height: 32.69px;
`;

// const ArrowAll = styled.div`
//   position: absolute;
//   top: 50%;
//   transform: translateY(-50%);
//   z-index: 22;
// `;

const LoginBtn = styled.button`
  background-color: ${(props) => props.theme.__greenMidium};
  color: white;
  border: none;
  font-size: 20px;
  font-weight: 600;
  margin: 30px auto 30px auto;
  max-width: 300px;
  width: 100%;
  padding: 20px 30px;
  border-radius: 30px;
  cursor: pointer;
  transition: all, 0.2s;
  :hover {
    box-shadow: 0px 4px 8px -1px rgba(0, 0, 0, 0.5) inset;
  }
`;

export default SimulationGuide;
