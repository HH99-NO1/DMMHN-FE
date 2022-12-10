import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FlexRow, HeaderBox } from "../../elements/elements";
import { instance } from "../../recoil/instance";
import Loading from "../Loading";
import Post from "./Post";

const MySimulation = () => {
  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
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
      setIsLoading(true);
      const { data } = await instance.get("/mockInterview/getResults");
      console.log(data);
      setMySimulations(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMySimulations();
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <HeaderBox />
        <Ctn>
          <TitleBar>나의 모의면접 현황</TitleBar>
          <FlexRow style={{ flexWrap: "wrap" }} gap="1.7%">
            {mySimulations.map((post) => (
              <LinkBtn
                key={post.sequence}
                onClick={() => navigate(`/mysimulation/${post.sequence}`)}
              >
                <Post key={post.sequence} post={post} />
              </LinkBtn>
            ))}
          </FlexRow>
        </Ctn>
      </>
    );
  }
};

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
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

export default MySimulation;
