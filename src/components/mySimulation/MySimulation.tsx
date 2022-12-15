import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { FlexRow, HeaderBox } from "../../elements/elements";
import { isLoginState } from "../../recoil/atoms/atoms";
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

  const isLogin = useRecoilValue(isLoginState);
  useEffect(() => {
    if (!isLogin) {
      alert("잘못된 접근 경로입니다.");
      return navigate(-1);
    } else return;
  }, [isLogin, navigate]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <HeaderBox />
        <Ctn>
          <TitleBar>나의 모의면접 현황</TitleBar>
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
  }
};

const GridMob = styled(FlexRow)`
  @media screen and (max-width: 850px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Ctn = styled.div`
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
  @media screen and (max-width: 600px) {
    font-size: 17px;
  }
`;

const LinkBtn = styled.div`
  width: 32.2%;
  margin-bottom: 20px;
  @media screen and (max-width: 850px) {
    width: 100%;
  }
  @media screen and (max-width: 600px) {
    margin-bottom: 0;
  }
`;

export default MySimulation;
