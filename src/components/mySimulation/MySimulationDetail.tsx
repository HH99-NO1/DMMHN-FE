import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FlexCol, FlexRow, Gap, Liner } from "../../elements/elements";

const MySimulationDetail = () => {
  const { postId } = useParams();

  const post = {
    postId: "1",
    createdAt: "Tue Nov 15 2022 16:02:30 GMT+0000 (Coordinated Universal Time)",
    category: "react",
    number: "5",
    totalTime: "40:20",
    array: [
      {
        question: "CSR , SSR의 차이와 SEO의 차이점에 대해서 설명하세요.",
        time: "08:00",
      },
      {
        question: "아토믹 디자인에서 위치를 어떻게 잡았나요?",
        time: "05:00",
      },
      {
        question: "자바스크립트 엔진과 동작 원리에 대해 서술하세요.",
        time: "05:10",
      },
      {
        question: "var / let / const 의 차이점은 무엇인가요?",
        time: "12:10",
      },
      {
        question: "얕은 복사와 깊은 복사의 각 개념과 구현 방법을 설명하세요.",
        time: "10:00",
      },
    ],
  };

  const dateChange = (date: string) => {
    const result = new Date(date).toLocaleString("ko-KR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return result;
  };
  const category = {
    react: "프론트엔드 - React.js",
    node: "백엔드 - Node.js",
  };

  return (
    <Ctn>
      <FlexCol width="100%" gap="20px">
        <FlexRow
          width="100%"
          justifyContent="space-between"
          alignItem="flex-end"
        >
          <TitleBar>모의면접 결과</TitleBar>
          <Text>{dateChange(post.createdAt)}</Text>
        </FlexRow>
        <FlexCol width="100%" gap="20px">
          <FlexRow width="100%" gap="10px" justifyContent="space-between">
            <MiddleTitle>카테고리</MiddleTitle>
            <OptionBox>
              <Text>
                {post.category === "react" ? category.react : category.node}
              </Text>
            </OptionBox>
          </FlexRow>
          <FlexRow width="100%" gap="10px" justifyContent="space-between">
            <MiddleTitle>문항 수</MiddleTitle>
            <OptionBox>
              <Text>{post.number} 개</Text>
            </OptionBox>
          </FlexRow>
          <FlexRow
            width="100%"
            gap="10px"
            justifyContent="space-between"
            alignItem="flex-start"
          >
            <MiddleTitle style={{ marginTop: "10px" }}>
              모의면접 결과
            </MiddleTitle>
            <OptionScrollBox>
              <OptionScrollBox2>
                <FlexCol gap="10px" alignItem="flex-start">
                  <Text>총 소요시간 - {post.totalTime}</Text>
                  <Liner />
                  <Gap gap="10px" />
                  <Text>질문별 소요시간</Text>
                  <Liner />
                  <FlexCol width="100%" gap="10px" alignItem="flex-start">
                    <FlexCol width="100%" gap="5px" alignItem="flex-start">
                      {post.array.map((arr, index) => (
                        <FlexRow
                          width="100%"
                          gap="10px"
                          justifyContent="space-between"
                        >
                          <Question>
                            <NumberArea>{index + 1}.</NumberArea> {arr.question}
                          </Question>
                          <Question> - [{arr.time}]</Question>
                        </FlexRow>
                      ))}
                    </FlexCol>
                  </FlexCol>
                </FlexCol>
              </OptionScrollBox2>
            </OptionScrollBox>
          </FlexRow>
          <FlexRow width="100%" gap="10px" alignItem="flex-start">
            <MiddleTitle style={{ marginTop: "10px" }}>
              모의면접 영상
            </MiddleTitle>
            <Video src="https://www.youtube.com/watch?v=CATSTw3CRMk" autoPlay />
          </FlexRow>
        </FlexCol>
      </FlexCol>
    </Ctn>
  );
};
const Ctn = styled.div`
  /* border: 1px solid red; */
  padding: 20px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`;
const TitleBar = styled.div`
  padding: 10px 20px;
  border-radius: 20px;
  max-width: 500px;
  width: 100%;
  text-align: left;
  font-size: 20px;
  font-weight: 600;
  background-color: ${(props) => props.theme.__grayLight};
`;
const Text = styled.span`
  font-size: 16px;
  color: ${(props) => props.theme.__grayDark};
`;
const MiddleTitle = styled.h3`
  min-width: 150px;
  font-size: 20px;
  font-weight: 400;
`;
const OptionBox = styled.div`
  position: relative;
  min-height: 44px;
  width: 100%;
  border: 3px solid ${(props) => props.theme.__grayMedium};
  border-radius: 22px;
  box-sizing: border-box;
  padding: 10px 20px;
`;
const OptionScrollBox = styled(OptionBox)`
  min-height: 150px;
  max-height: 300px;

  padding: 0;
  overflow: hidden;
`;
const OptionScrollBox2 = styled.div`
  min-height: 150px;
  max-height: 300px;
  overflow: auto;
  padding: 10px 20px;
`;
const Question = styled.span`
  font-size: 12px;
  display: flex;
  gap: 10px;
`;
const NumberArea = styled.span`
  font-size: inherit;
  width: 20px;
  display: flex;
  justify-content: right;
`;
const Video = styled.video`
  width: 400px;
  height: 300px;
  background-color: black;
  border-radius: 20px;
`;

export default MySimulationDetail;
