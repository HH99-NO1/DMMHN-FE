import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  FlexCol,
  FlexRow,
  Gap,
  HeaderBox,
  Liner,
} from "../../elements/elements";
import { instance } from "../../recoil/instance";

const MySimulationDetail = () => {
  const { postId } = useParams();
  const init = {
    category: "",
    createdAt: "",
    number: 0,
    resultsArr: [
      {
        question: "",
        time: "",
      },
    ],
    sequence: 0,
    totalTime: "",
  };
  const [mySimulation, setMySimulation] = useState(init);
  console.log(mySimulation);

  const getMySimulation = async () => {
    try {
      const { data } = await instance.get(
        `mockInterview/getResultDetails/${postId}`
      );
      console.log(data);
      setMySimulation(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMySimulation();
  }, []);

  const dateChange = (date: string) => {
    console.log(date);
    const result = new Date(date).toLocaleString("ko-KR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    console.log("result: ", result);
    return result;
  };
  const category = {
    react: "프론트엔드 - React.js",
    node: "백엔드 - Node.js",
  };

  return (
    <>
      <HeaderBox />
      <Ctn>
        <FlexCol width="100%" gap="20px">
          <FlexRow
            width="100%"
            justifyContent="space-between"
            alignItem="flex-end"
          >
            <TitleBar>모의면접 결과</TitleBar>
            <Text>{dateChange(mySimulation.createdAt)}</Text>
          </FlexRow>
          <FlexCol width="100%" gap="20px">
            <FlexCol width="100%" gap="10px" alignItem="none">
              <MiddleTitle>카테고리</MiddleTitle>
              <OptionBox>
                <Text>
                  {mySimulation.category === "react"
                    ? category.react
                    : category.node}
                </Text>
              </OptionBox>
            </FlexCol>
            <FlexCol width="100%" gap="10px" alignItem="none">
              <MiddleTitle>문항 수</MiddleTitle>
              <OptionBox>
                <Text>{mySimulation.number} 개</Text>
              </OptionBox>
            </FlexCol>
            <FlexCol width="100%" gap="10px" alignItem="none">
              <MiddleTitle style={{ marginTop: "10px" }}>
                모의면접 결과
              </MiddleTitle>
              <OptionScrollBox>
                <OptionScrollBox2>
                  <FlexCol gap="10px" alignItem="flex-start">
                    <Text>총 소요시간 - {mySimulation.totalTime}</Text>
                    <Liner />
                    <Gap gap="10px" />
                    <Text>질문별 소요시간</Text>
                    <Liner />
                    <FlexCol width="100%" gap="10px" alignItem="flex-start">
                      <FlexCol width="100%" gap="10px" alignItem="flex-start">
                        {mySimulation.resultsArr.map((arr, index) => (
                          <FlexRow
                            width="100%"
                            gap="10px"
                            justifyContent="space-between"
                          >
                            <Question>
                              <NumberArea>{index + 1}.</NumberArea>{" "}
                              {arr.question}
                            </Question>
                            <Question> - [{arr.time}]</Question>
                          </FlexRow>
                        ))}
                      </FlexCol>
                    </FlexCol>
                  </FlexCol>
                </OptionScrollBox2>
              </OptionScrollBox>
            </FlexCol>
            {/* <FlexRow width="100%" gap="10px" alignItem="flex-start">
              <MiddleTitle style={{ marginTop: "10px" }}>
                모의면접 영상
              </MiddleTitle>
              <Video
                src="https://www.youtube.com/watch?v=CATSTw3CRMk"
                autoPlay
              />
            </FlexRow> */}
          </FlexCol>
        </FlexCol>
      </Ctn>
    </>
  );
};
const Ctn = styled.div`
  /* border: 1px solid red; */
  padding: 20px;
  max-width: 500px;
  width: 100%;
  margin: 30px auto;
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
  padding-left: 10px;
`;
const OptionBox = styled.div`
  position: relative;
  min-height: 44px;
  width: 100%;
  border: 2px solid ${(props) => props.theme.__grayMedium};
  border-radius: 22px;
  box-sizing: border-box;
  padding: 10px 20px;
`;
const OptionScrollBox = styled(OptionBox)`
  min-height: 150px;
  padding: 0;
  overflow: hidden;
`;
const OptionScrollBox2 = styled.div`
  min-height: 150px;
  overflow: auto;
  padding: 20px;
`;
const Question = styled.span`
  font-size: 14px;
  display: flex;
  gap: 15px;
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
