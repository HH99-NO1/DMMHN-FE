import styled from "styled-components";

const Home = () => {
  return (
    <Ctn>
      <Wrap>
        <Img
          src="https://user-images.githubusercontent.com/77138259/202983306-94a7eaba-80d7-4668-a7cd-cee962f7733a.png"
          alt="mainImg1"
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
  width: 100%;
  margin: 0 auto;
`;

export default Home;
