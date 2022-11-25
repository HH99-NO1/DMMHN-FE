import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/pagination";

SwiperCore.use([Navigation, Autoplay, Pagination]);

const Home = () => {
  const [swiper, setSwiper] = useState(null);
  const navigate = useNavigate();
  const PrevRef = useRef(null);
  const NextRef = useRef(null);

  return (
    <Ctn>
      {/* <Wrap>
        <Btn onClick={() => navigate("/login")}>로그인 창으로 이동</Btn>
        <Btn onClick={() => navigate("/signup")}>회원가입 창으로 이동</Btn>
        <Btn onClick={() => navigate("/interview")}>면접 관리 페이지 입장</Btn>
        <Btn onClick={() => navigate("/meeting")}>면접 룸 입장</Btn>
        <Btn onClick={() => navigate("/simulation")}>모의면접 입장</Btn>
        <Btn onClick={() => navigate("/mysimulation")}>나의 모의면접 현황</Btn>
        <Btn onClick={() => navigate("/mypage")}>마이페이지 입장</Btn>
      </Wrap> */}
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
      </MainCenter>

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
        {/* <div>
          <button ref={PrevRef}>
            <img src="" alt="prevArrow" />
          </button>
          <button ref={NextRef}>
            <img src="" alt="nextArrow" />
          </button>
        </div> */}
      </StyledSwiper>
    </Ctn>
  );
};

const Ctn = styled.div`
  margin: 10px auto 0 auto;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
`;

const Img = styled.img`
  max-width: 500px;
  max-height: 500px;
  margin: 0 auto;
`;

const StyledSwiper = styled(Swiper)`
  width: 500px;
  position: relative;
`;

const MainCenter = styled.div`
  text-align: center;
  margin-bottom: 80px;
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

const ArrowAll = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 22;
`;

export default Home;
