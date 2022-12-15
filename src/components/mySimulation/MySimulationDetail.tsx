import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  FlexCol,
  FlexRow,
  Gap,
  HeaderBox,
  Liner,
} from "../../elements/elements";
import { instance } from "../../recoil/instance";
import Loading from "../Loading";

const MySimulationDetail = () => {
  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false);

  const { postId } = useParams();
  const navigate = useNavigate();
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
      setIsLoading(true);
      const { data } = await instance.get(
        `mockInterview/getResultDetails/${postId}`
      );
      console.log(data);
      setMySimulation(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  const deleteMySimulation = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const { data } = await instance.delete(
          `mockInterview/detail/${postId}`
        );
        console.log(data);
        alert("모의 면접 결과가 정상적으로 삭제되었습니다.");
        navigate("/mysimulation");
      } catch (e) {
        console.log(e);
      }
    } else {
      return;
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
    spring: "백엔드 - spring",
    custom: "커스텀 질문 - custom",
  };
  if (isLoading) {
    return <Loading />;
  } else {
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
              <TitleBar>
                모의면접 결과
                <Text>{dateChange(mySimulation.createdAt)}</Text>
              </TitleBar>
            </FlexRow>
            <FlexCol width="100%" gap="20px">
              <FlexCol width="100%" gap="10px" alignItem="none">
                <MiddleTitle>카테고리</MiddleTitle>
                <OptionBox>
                  <Text style={{ fontSize: "15px" }}>
                    {mySimulation.category === "react"
                      ? category.react
                      : mySimulation.category === "node"
                      ? category.node
                      : mySimulation.category === "spring"
                      ? category.spring
                      : category.custom}
                  </Text>
                </OptionBox>
              </FlexCol>
              <FlexCol width="100%" gap="10px" alignItem="none">
                <MiddleTitle>문항 수</MiddleTitle>
                <OptionBox>
                  <Text style={{ fontSize: "15px" }}>
                    {mySimulation.number} 개
                  </Text>
                </OptionBox>
              </FlexCol>
              <FlexCol width="100%" gap="10px" alignItem="none">
                <MiddleTitle style={{ marginTop: "10px" }}>
                  모의면접 결과
                </MiddleTitle>
                <OptionScrollBox>
                  <OptionScrollBox2>
                    <FlexCol gap="10px" alignItem="flex-start">
                      <Text style={{ fontSize: "15px" }}>
                        총 소요시간 - {mySimulation.totalTime}
                      </Text>
                      <Liner />
                      <Gap gap="10px" />
                      <Text style={{ fontSize: "15px" }}>질문별 소요시간</Text>
                      <Liner />
                      <FlexCol width="100%" gap="10px" alignItem="flex-start">
                        <FlexCol width="100%" gap="10px" alignItem="flex-start">
                          {mySimulation.resultsArr.map((arr, index) => (
                            <FrowMob
                              key={index}
                              width="100%"
                              gap="10px"
                              justifyContent="space-between"
                            >
                              <Question>
                                <NumberArea>{index + 1}.</NumberArea>{" "}
                                {arr.question}
                              </Question>
                              <Question> - [{arr.time}]</Question>
                            </FrowMob>
                          ))}
                        </FlexCol>
                      </FlexCol>
                    </FlexCol>
                  </OptionScrollBox2>
                </OptionScrollBox>
                <RightDiv>
                  <DelBtn onClick={() => deleteMySimulation()}>삭제</DelBtn>
                </RightDiv>
              </FlexCol>
            </FlexCol>
          </FlexCol>
        </Ctn>
      </>
    );
  }
};
const Ctn = styled.div`
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
  font-size: 20px;
  font-weight: 600;
  background-color: ${(props) => props.theme.__grayLight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    font-size: 17px;
  }
`;

const FrowMob = styled(FlexRow)`
  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Text = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.__grayDark};
`;
const MiddleTitle = styled.h3`
  min-width: 150px;
  font-size: 20px;
  font-weight: 400;
  padding-left: 10px;
  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
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

const DelBtn = styled.button`
  cursor: pointer;
  background: none;
  width: 100px;
  height: 30px;
  box-sizing: border-box;
  border: 2px solid tomato;
  font-weight: 600;
  border-radius: 10px;
`;

const RightDiv = styled.div`
  text-align: right;
  margin-top: 10px;
`;

export default MySimulationDetail;
