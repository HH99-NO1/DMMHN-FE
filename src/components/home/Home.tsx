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
`;
const Btn = styled.button`
  width: 200px;
  margin: 0 auto;
`;

export default Home;
