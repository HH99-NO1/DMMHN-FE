import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Ctn>
      <Wrap>
        <Btn onClick={() => navigate("/login")}>로그인 창으로 이동</Btn>
        <Btn onClick={() => navigate("/signup")}>회원가입 창으로 이동</Btn>
        <Btn onClick={() => navigate("/interview")}>면접 관리 페이지 입장</Btn>
        <Btn onClick={() => navigate("/meeting")}>면접 룸 입장</Btn>
        <Btn onClick={() => navigate("/simulation")}>모의면접 입장</Btn>
        <Btn onClick={() => navigate("/mypage")}>마이페이지 입장</Btn>
        <Img
          src="https://user-images.githubusercontent.com/77138259/202983306-94a7eaba-80d7-4668-a7cd-cee962f7733a.png"
          alt="mainImg1"
        />
        <Img
          src="https://user-images.githubusercontent.com/77138259/202984418-2b1bb93e-d88a-4387-82f0-ee4244176066.png"
          alt="mainImg2"
        />
      </Wrap>
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
const Btn = styled.button`
  width: 200px;
  margin: 0 auto;
`;
const Img = styled.img`
  max-width: 500px;
  margin: 0 auto;
`;

export default Home;
