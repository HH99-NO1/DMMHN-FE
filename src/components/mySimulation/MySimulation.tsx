import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FlexRow, Text } from "../../elements/elements";
import Post from "./Post";

const MySimulation = () => {
  const navigate = useNavigate();
  const Posts = [
    {
      postId: "1",
      createdAt:
        "Tue Nov 15 2022 16:02:30 GMT+0000 (Coordinated Universal Time)",
      category: "react",
      number: "5",
      totalTime: "40:20",
    },
    {
      postId: "2",
      createdAt:
        "Tue Nov 13 2022 16:02:30 GMT+0000 (Coordinated Universal Time)",
      category: "react",
      number: "5",
      totalTime: "12:08",
    },
    {
      postId: "3",
      createdAt:
        "Tue Nov 1 2022 16:02:30 GMT+0000 (Coordinated Universal Time)",
      category: "node",
      number: "10",
      totalTime: "21:19",
    },
    {
      postId: "4",
      createdAt:
        "Tue Oct 25 2022 16:02:30 GMT+0000 (Coordinated Universal Time)",
      category: "node",
      number: "20",
      totalTime: "42:05",
    },
  ];

  return (
    <Ctn>
      <TitleBar>나의 모의면접 현황</TitleBar>
      <FlexRow style={{ flexWrap: "wrap" }} gap="1.7%">
        {Posts.map((post) => (
          <LinkBtn
            key={post.postId}
            onClick={() => navigate(`/mysimulation/${post.postId}`)}
          >
            <Post key={post.postId} post={post} />
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
