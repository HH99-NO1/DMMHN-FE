import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { FlexRow, HeaderBox } from "../../elements/elements";
import { isCustom } from "../../recoil/atoms/atoms";
import { instance } from "../../recoil/instance";
import Post from "./Post";

const MySimulation = () => {
  const navigate = useNavigate();
  const setIsCustomState = useSetRecoilState(isCustom);
  const init = [
    {
      category: "",
      createdAt: "",
      number: 0,
      sequence: 0,
      totalTime: "",
    },
  ];

  const [mySimulations, setMySimulations] = useState(init);
  console.log(mySimulations);

  const getMySimulations = async () => {
    try {
      const { data } = await instance.get("/mockInterview/getResults");
      console.log(data);
      setMySimulations(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMySimulations();
  }, []);
  return (
    <>
      <HeaderBox />
      <Ctn>
        <TitleBar>나의 모의면접 현황</TitleBar>
        <button onClick={() => setIsCustomState(true)}>
          나만의 모의면접 질문
        </button>
        <GridMob style={{ flexWrap: "wrap", margin: "40px 0" }} gap="1.7%">
          {mySimulations.map((post) => (
            <LinkBtn
              key={post.sequence}
              onClick={() => navigate(`/mysimulation/${post.sequence}`)}
            >
              <Post key={post.sequence} post={post} />
            </LinkBtn>
          ))}
        </GridMob>
      </Ctn>
    </>
  );
};

const GridMob = styled(FlexRow)`
  @media screen and (max-width: 820px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Ctn = styled.div`
  /* border: 1px solid red; */
  padding: 20px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const TitleBar = styled.div`
  padding: 10px 20px;
  margin: 0 auto 30px auto;
  border-radius: 20px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  background-color: ${(props) => props.theme.__grayLight};
`;

const LinkBtn = styled.div`
  width: 32.2%;
  @media screen and (max-width: 820px) {
    width: 100%;
  }
`;

export default MySimulation;
