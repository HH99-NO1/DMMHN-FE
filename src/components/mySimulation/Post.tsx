import React from "react";
import styled from "styled-components";
import { FlexCol, FlexRow, Text } from "../../elements/elements";

interface IPost {
  post: {
    postId: string;
    createdAt: string;
    category: string;
    number: string;
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
  };

  return (
    <PostCtn>
      <FlexCol gap="20px" alignItem="left">
        <FlexRow
          width="100%"
          gap="10px"
          justifyContent="space-between"
          alignItem="flex-end"
        >
          <Text fontSize="30px" fontWeight="600">
            {dateChange(post.createdAt)}
          </Text>
          <SmallText>
            {post.totalTime} / {post.number} 문항
          </SmallText>
        </FlexRow>
        <Text fontSize="20px" fontWeight="400">
          {post.category === "react" ? category.react : category.node}
        </Text>
      </FlexCol>
    </PostCtn>
  );
};

const PostCtn = styled.div`
  width: 100%;
  height: auto;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 3px solid ${(props) => props.theme.__grayLight};
  transition: all, 0.3s;
  cursor: pointer;
  :hover {
    border: 3px solid ${(props) => props.theme.__greenMidium};
  }
`;
const SmallText = styled.span`
  color: ${(props) => props.theme.__grayDark};
`;

export default Post;