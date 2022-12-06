import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FlexCol, FlexRow, Gap, Text } from "../../elements/elements";
import RecordRTC, { invokeSaveAsDialog } from "recordrtc";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isSimulationState, test } from "../../recoil/atoms/atoms";
import { instance } from "../../recoil/instance";
import { useNavigate } from "react-router-dom";
import PersonItem from "../../elements/PersonItem";
import ResultIconItem from "../../elements/ResultIconItem";
import useStopwatch from "../../hooks/useStopwatch";
import stopwatchTime from "../stopwatch/utils/stopwatchTime";

let count = 0;

const Simulation = () => {
  const navigate = useNavigate();
  const [isStart, setIsStart] = useState(false);
  const [isResult, setIsResult] = useState(false);
  console.log(isResult);

  const setSimulation = useSetRecoilState(isSimulationState);
  const testSimulation = useRecoilValue(test);
  console.log(testSimulation);

  //recordrtc
  const [stream, setStream] = useState<MediaStream>();
  const [blob, setBlob] = useState<Blob | null>();
  const refVideo = useRef<HTMLVideoElement>(null);
  const recorderRef = useRef<RecordRTC>();
  const myVideoRef = useRef<HTMLVideoElement>(null);

  // 유저 비디오 연결 테스트
  const getMedia = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: 400,
        height: 300,
        frameRate: 30,
      },
      audio: false,
    });
    if (myVideoRef.current) {
      myVideoRef.current.srcObject = stream;
    }
  };

  const stopStreamedVideo = (myVideoRef: any) => {
    const stream = myVideoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(function (track: MediaStreamTrack) {
      track.stop();
    });

    myVideoRef.current.srcObject = null;
  };

  const handleRecording = async () => {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        width: 800,
        height: 600,
        frameRate: 60,
      },
      audio: true,
    });

    setStream(mediaStream);
    recorderRef.current = new RecordRTC(mediaStream, { type: "video" });
    recorderRef.current.startRecording();
  };

  const handleStop = () => {
    if (recorderRef.current) {
      recorderRef.current.stopRecording(() => {
        stopStreamedVideo(myVideoRef);
        setBlob(recorderRef?.current?.getBlob() as Blob);
      });
    }
  };

  const handleSave = () => {
    invokeSaveAsDialog(blob as Blob);
  };

  useEffect(() => {
    if (!refVideo.current) {
      return;
    }
  }, [stream, refVideo]);

  // 스톱워치 영역
  const { seconds, nextLap, start, stop, record } = useStopwatch();
  const [isStop, setIsStop] = useState(false);

  // naver CLOVA VOICE api
  const [value, setValue] = useState(testSimulation?.questionArr[0]);
  const [currValue, setCurrValue] = useState(value);
  const [result, setResult] = useState<
    Array<{ question: string; time: string }>
  >([]);

  console.log(`result.length: ${result.length}`);
  console.log(`count: ${count}`);

  const requestAudioFile = async (event: any) => {
    isStop && stop();

    // if (!isStart) {
    //   event.target.disabled = true;
    //   event.target.style.backgroundColor = "black";

    //   setTimeout(() => {
    //     event.target.disabled = false;
    //     event.target.style.backgroundColor = "#092304";
    //     console.log("버튼 사용 가능");
    //   }, 3000);

    //   return;
    // }

    console.log("request Audio");

    try {
      const config = {
        question: value,
      };
      const response = await instance.post(
        "mockInterview/getQuestionsVoice",
        config,
        {
          responseType: "arraybuffer",
        }
      );
      console.log("response : ", response);

      // let arr = toArrayBuffer(response.data);
      // makeAudio(arr);
      const audioContext = getAudioContext();
      console.log("실행하기 전에 상태 :", audioContext.state);
      // makeAudio(response)
      const audioBuffer = await audioContext.decodeAudioData(response.data);

      //create audio source
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);

      // 오디오 시작
      source.start();

      // 오디오 재생 중 버튼 비활성화 처리
      event.target.disabled = true;
      event.target.style.backgroundColor = "black";

      console.log("source : ", source.buffer.duration);
      setTimeout(() => {
        event.target.disabled = false;
        event.target.style.backgroundColor = "#092304";
        console.log("버튼 사용 가능");
      }, source.buffer.duration * 1000 + 500);

      console.log("source : ", source);

      let resultEl = {
        question: currValue,
        time: stopwatchTime(nextLap.lapTime),
      };
      // 유효한 배열이 있을때만 result에 값을 저장함
      testSimulation.questionArr.length + 1 > count &&
        setResult([...result, resultEl]);

      if (count < testSimulation.questionArr.length - 1) {
        count++;
        setValue(testSimulation.questionArr[count]);
        setCurrValue(value);
      } else {
        setValue("모의 면접이 종료되었습니다.");
        setCurrValue(value);
        setIsStop(true);
        count++;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getAudioContext = () => {
    AudioContext = window.AudioContext; /* || window.webkitAudioContext */
    const audioContent = new AudioContext();
    return audioContent;
  };

  console.log(testSimulation.questionArr.slice(0, count));

  const onResult = async () => {
    if (result) {
      const newResult = result.slice(1, result.length);
      const req = {
        category: testSimulation.category,
        number: newResult.length,
        result: newResult,
        totalTime: stopwatchTime(seconds),
      };
      try {
        const { data } = await instance.post(`/mockInterview/saveResults`, req);

        console.log(data);
        alert("모의면접의 결과가 정상적으로 저장되었습니다.");
        setSimulation(false);
        navigate(`/mysimulation/${data.sequence}`);
      } catch (e) {
        console.log(e);
      }
    }
  };
  // useEffect(() => {
  //   window.speechSynthesis.cancel();
  // }, []);

  useEffect(() => {
    getMedia();
  }, []);
  return (
    <>
      <BGBlack>
        <Gap gap="60px" />
        <Padding20>
          <Ctn>
            <CategoryArea>
              모의면접 -{" "}
              {testSimulation.category === "react"
                ? "React.js"
                : testSimulation.category === "node"
                ? "Node.js"
                : "spring"}
            </CategoryArea>
            <CheckQuestion>
              {currValue !== "모의 면접이 종료되었습니다."
                ? `Q${result.length}`
                : `Q${result.length - 1}`}
              / Q{testSimulation.questionArr.length}
            </CheckQuestion>
            <SimulationHeader>
              {isStart ? (
                <>
                  {currValue !== "모의 면접이 종료되었습니다." ? (
                    <TextEl fontSize="24px" fontWeight="600">
                      Q{result.length}.
                    </TextEl>
                  ) : null}
                  <TextEl fontSize="30px" fontWeight="600">
                    {currValue}
                  </TextEl>
                </>
              ) : (
                <>
                  <PersonItem />
                  <TextEl fontSize="20px" fontWeight="400">
                    준비가 완료되면 시작버튼을 클릭해주세요
                  </TextEl>
                </>
              )}
            </SimulationHeader>

            <FlexCol gap="10px">
              {isResult && (
                <ResultArea>
                  <Text fontSize="20px" fontWeight="600">
                    모의면접 진행 현황
                  </Text>
                  <Gap gap="30px" />
                  <FlexCol gap="10px" width="100%">
                    {result &&
                      result
                        ?.slice(1, count)
                        .map(
                          (
                            v: { question: string; time: string },
                            index: number
                          ) => (
                            <FlexRow
                              gap="20px"
                              width="100%"
                              justifyContent="space-between"
                              alignItem="flex-start"
                              key={index}
                            >
                              <Text key={index}>
                                Q{index + 1}.{v.question}
                              </Text>
                              <Text>{v.time}</Text>
                            </FlexRow>
                          )
                        )}
                  </FlexCol>
                </ResultArea>
              )}
            </FlexCol>

            {/* 중간 컨텐츠 영역 */}
            <SimulationContent>
              <ContentWrap>
                {blob ? (
                  <Video
                    src={URL.createObjectURL(blob)}
                    controls
                    autoPlay
                    ref={refVideo}
                  />
                ) : (
                  <Video ref={myVideoRef} autoPlay />
                )}
                <FlexRow gap="10px" justifyContent="space-between">
                  <SmallBtn onClick={handleRecording}>시작</SmallBtn>
                  <SmallBtn onClick={handleStop}>멈춤</SmallBtn>
                  <SmallBtn onClick={handleSave}>저장</SmallBtn>
                </FlexRow>
              </ContentWrap>
              <ContentWrap>
                <TimeIndicatorBox>
                  <TotalTimeTitle>총 모의면접 답변시간</TotalTimeTitle>
                  <TimeBlackBox>
                    <TimeGreenBox bgColor="#5ec694">
                      <TotalTime>{stopwatchTime(seconds)}</TotalTime>
                    </TimeGreenBox>
                  </TimeBlackBox>
                </TimeIndicatorBox>
                <Gap gap="30px" />
                <TimeIndicatorBox>
                  <TotalTimeTitle>현재 질문 답변시간</TotalTimeTitle>
                  <TimeBlackBox>
                    <TimeGreenBox bgColor="#397055">
                      <TotalTime>{stopwatchTime(nextLap.lapTime)}</TotalTime>
                    </TimeGreenBox>
                  </TimeBlackBox>
                </TimeIndicatorBox>
              </ContentWrap>
            </SimulationContent>
            <Gap gap="20px" />
            {currValue !== "모의 면접이 종료되었습니다." ? (
              <>
                {!isStart ? (
                  <Button
                    id="startBtn"
                    onClick={(event) => {
                      requestAudioFile(event);
                      // startTotalTime()
                      setIsStart(true);
                      start();
                    }}
                  >
                    시작
                  </Button>
                ) : (
                  <Button
                    onClick={(event) => {
                      record();
                      requestAudioFile(event);
                    }}
                  >
                    다음 질문으로
                  </Button>
                )}
              </>
            ) : (
              <Button
                onClick={() => {
                  onResult();
                }}
              >
                결과 보기
              </Button>
            )}

            <IconArea onClick={() => setIsResult(!isResult)}>
              <ResultIconItem />
            </IconArea>
          </Ctn>
        </Padding20>
      </BGBlack>
    </>
  );
};
const BGBlack = styled.div`
  width: 100%;
  height: calc(100vh);
  background: #092001;
`;
const Padding20 = styled.div`
  padding: 0 20px;
  margin-top: 50px;
`;
const Ctn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #002c17;
  border: 1px solid #014021;
  border-radius: 20px;
  max-width: 1160px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  color: white;
`;
const CategoryArea = styled(Text)`
  position: absolute;
  border-bottom: 1px solid white;
  top: 30px;
  color: white;
  padding-bottom: 10px;
  width: auto;
  font-size: 20px;
  font-weight: 400;
`;
const CheckQuestion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  font-size: 20px;
  font-weight: 600;
  border-radius: 5px;
  margin: 0 auto;
  border: 1px solid #014021;
  background-color: #092304;
  color: white;
`;
const SimulationHeader = styled(FlexCol)`
  height: 110px;
  gap: 10px;
  justify-content: center;
`;
const SimulationContent = styled(FlexRow)`
  padding: 0 50px;
  gap: 20px;
  justify-content: space-between;
`;

const Button = styled.button`
  margin: 0 auto;
  width: 200px;
  display: flex;
  justify-content: center;
  gap: 5px;
  font-size: 20px;
  align-items: center;
  border: 1px solid #014021;
  background-color: #092304;
  color: white;
  font-weight: 600;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all, 0.3s;
`;
const TextEl = styled(Text)`
  color: white;
`;
const Video = styled.video`
  max-width: 400px;
  width: 100%;
  height: auto;
  border-radius: 20px;
`;

const ResultArea = styled(FlexCol)`
  position: absolute;
  right: 20px;
  bottom: 90px;
  z-index: 5;
  background-color: white;
  width: 400px;
  height: 300px;
  border-radius: 10px;
  padding: 15px;
`;
const IconArea = styled.div`
  position: absolute;
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: 1px solid #014021;
  background-color: #092304;
  border-radius: 50%;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
`;

const ContentWrap = styled(FlexCol)`
  width: 100%;
  padding: 0 20px;
  gap: 10px;
`;
const TimeIndicatorBox = styled(FlexCol)`
  width: 100%;
  gap: 10px;
  align-items: flex-start;
`;
const TotalTimeTitle = styled(Text)`
  color: white;
  font-weight: 400;
`;

const TimeBlackBox = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: black;
  border-radius: 20px;
  padding: 5px;
`;
interface ITimeGreenBox {
  bgColor?: string;
}
const TimeGreenBox = styled.div<ITimeGreenBox>`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 60%;
  height: 100%;
  background-color: ${(props) => props.bgColor};
  border-radius: 20px;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding-left: 20px;
`;
const TotalTime = styled(Text)`
  color: white;
  font-weight: 400;
`;
const SmallBtn = styled(Button)`
  font-size: 16px;
  max-width: 100px;
`;

export default Simulation;
