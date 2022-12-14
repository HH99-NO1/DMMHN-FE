import React from "react";
import styled from "styled-components";
import { FlexCol, FlexRow, Text } from "../../elements/elements";

interface IPost {
  post: {
    category: string;
    createdAt: string;
    number: number;
    sequence: number;
    totalTime: string;
  };
}

const Post = ({ post }: IPost) => {
  const dateChange = (date: string) => {
    const result = new Date(date).toLocaleDateString("ko-KR", {
      month: "numeric",
      day: "numeric",
    });
    return result;
  };

  const category = {
    react: "프론트엔드 - React.js",
    node: "백엔드 - Node.js",
    spring: "백엔드 - spring",
    custom: "커스텀 질문 - custom",
  };

  return (
    <PostCtn>
      <PostBox>
        <PostHeader>
          <DateText fontSize="30px" fontWeight="600">
            {dateChange(post.createdAt)}
          </DateText>
          <SmallText>
            {post.totalTime} / {post.number} 문항
          </SmallText>
        </PostHeader>
        <TextEl>
          {post.category === "react"
            ? category.react
            : post.category === "node"
            ? category.node
            : post.category === "spring"
            ? category.spring
            : category.custom}
        </TextEl>
      </PostBox>
    </PostCtn>
  );
};

const PostCtn = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding: 20px;
  border-radius: 10px;
  border: 3px solid ${(props) => props.theme.__grayLight};
  transition: all, 0.3s;
  cursor: pointer;
  :hover {
    border: 3px solid ${(props) => props.theme.__greenMidium};
  }
`;

const PostBox = styled(FlexCol)`
  gap: 20px;
  align-items: flex-start;
  @media screen and (max-width: 600px) {
    align-items: flex-end;
  }
`;

const PostHeader = styled(FlexRow)`
  width: 100%;
  gap: 10px;
  justify-content: space-between;
  align-items: flex-end;
  @media screen and (max-width: 850px) {
    justify-content: left;
  }
`;

const DateText = styled(Text)`
  @media screen and (max-width: 600px) {
    font-size: 17px;
  }
`;

const SmallText = styled.span`
  color: ${(props) => props.theme.__grayDark};
  @media screen and (max-width: 600px) {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 15px;
  }
`;

const TextEl = styled(Text)`
  font-size: 20px;
  font-weight: 400;
  width: 100%;
  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
`;

export default Post;
