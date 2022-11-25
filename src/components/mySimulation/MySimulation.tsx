import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FlexRow, Text } from "../../elements/elements";
import { instance } from "../../recoil/instance";
import Post from "./Post";

const MySimulation = () => {
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
      const { data } = await instance.get("/mockInterview/getResults");
      console.log(data);
      setMySimulations(data);
    } catch (e) {
      console.log(e);
    }
  };
  const Posts = [
    {
      sequence: "1",
      createdAt:
        "Tue Nov 15 2022 16:02:30 GMT+0000 (Coordinated Universal Time)",
      category: "react",
      number: "5",
      totalTime: "40:20",
    },
    {
      sequence: "2",
      createdAt:
        "Tue Nov 13 2022 16:02:30 GMT+0000 (Coordinated Universal Time)",
      category: "react",
      number: "5",
      totalTime: "12:08",
    },
    {
      sequence: "3",
      createdAt:
        "Tue Nov 1 2022 16:02:30 GMT+0000 (Coordinated Universal Time)",
      category: "node",
      number: "10",
      totalTime: "21:19",
    },
    {
      sequence: "4",
      createdAt:
        "Tue Oct 25 2022 16:02:30 GMT+0000 (Coordinated Universal Time)",
      category: "node",
      number: "20",
      totalTime: "42:05",
    },
  ];
  useEffect(() => {
    getMySimulations();
  }, []);
  return (
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
  );
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
`;

export default MySimulation;
