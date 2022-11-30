import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FlexCol, FlexRow, Gap, Text } from "../../elements/elements";
import { speak } from "./TextToSpeech";
import { AiOutlineRight } from "react-icons/ai";
import RecordRTC, { invokeSaveAsDialog } from "recordrtc";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isSimulationState, test } from "../../recoil/atoms/atoms";
import { instance } from "../../recoil/instance";
import { useNavigate } from "react-router-dom";
import TitleArea from "../../elements/TitleArea";
import PersonItem from "../../elements/PersonItem";
import ResultIconItem from "../../elements/ResultIconItem";

let count = 0;

const Simulation = () => {
  const navigate = useNavigate();
  const [isStart, setIsStart] = useState(false);
  const [isResult, setIsResult] = useState(false);
  console.log(isResult);

  const testSimulation = useRecoilValue(test);
  const setSimulation = useSetRecoilState(isSimulationState);
  console.log(testSimulation);

  //recordrtc
  const [stream, setStream] = useState(null);
  const [blob, setBlob] = useState(null);
  const refVideo = useRef(null);
  const recorderRef = useRef(null);
  const myVideoRef = useRef(null);

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

  const stopStreamedVideo = (myVideoRef) => {
    const stream = myVideoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(function (track) {
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
    recorderRef.current.stopRecording(() => {
      stopStreamedVideo(myVideoRef);
      setBlob(recorderRef.current.getBlob());
    });
  };

  const handleSave = () => {
    invokeSaveAsDialog(blob);
  };

  useEffect(() => {
    if (!refVideo.current) {
      return;
    }
  }, [stream, refVideo]);
  useEffect(() => {
    window.speechSynthesis.cancel();
  }, []);

  // naver CLOVA VOICE api 영역
  const [value, setValue] = useState(testSimulation?.questionArr[0]);
  const [currValue, setCurrValue] = useState(value);
  const [result, setResult] = useState([]);
  console.log(`result.length: ${result.length}`);
  console.log(`count: ${count}`);
  const onClick = () => {
    speechSynthesis.cancel();
    speak(value, window.speechSynthesis);

    let resultEl = {
      question: testSimulation.questionArr[count],
      time: "05:00",
    };

    // 유효한 배열이 있을때만 result에 값을 저장함
    testSimulation.questionArr[count] && setResult([...result, resultEl]);
    if (count < testSimulation.questionArr.length - 1) {
      count++;
      setValue(testSimulation.questionArr[count]);
      setCurrValue(value);
    } else {
      setValue("모의 면접이 종료되었습니다.");
      setCurrValue(value);
      count++;
    }
  };
  console.log(testSimulation.questionArr.slice(0, count));
  const onResult = async () => {
    if (result) {
      const req = {
        category: testSimulation.category,
        number: result.length,
        result: result,
        totalTime: "20:00",
      };
      try {
        const { data } = await instance.post(`/mockInterview/saveResults`, req);

        console.log(data);
        setSimulation(false);
        alert("모의면접의 결과가 정상적으로 저장되었습니다.");
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
      <TitleArea>
        모의면접 -{" "}
        {testSimulation.category === "react" ? "React.js" : "Node.js"}
      </TitleArea>
      <BGBlack>
        <Gap gap="20px" />
        <Padding20>
          <Ctn>
            <CheckQuestion>
              Q{result.length} / Q{testSimulation.questionArr.length}
            </CheckQuestion>
            <SimulationHeader>
              {isStart ? (
                <>
                  {result.length >= count ? (
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

            <Gap gap="20px" />

            <FlexCol gap="10px">
              {isResult && (
                <ResultArea>
                  <Text fontSize="20px" fontWeight="600">
                    모의면접 진행 현황
                  </Text>
                  <FlexCol gap="10px">
                    {testSimulation.questionArr
                      .slice(0, count)
                      .map((v, index) => (
                        <FlexRow gap="5px" key={index}>
                          {index + 1}.<Text key={index}>{v}</Text>
                        </FlexRow>
                      ))}
                  </FlexCol>
                </ResultArea>
              )}
            </FlexCol>
            <FlexCol>
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
              <button onClick={handleRecording}>시작</button>
              <button onClick={handleStop}>멈춤</button>
              <button onClick={handleSave}>저장</button>
            </FlexCol>

            {result.length >= count ? (
              <Button
                onClick={() => {
                  onClick();
                  setIsStart(true);
                }}
              >
                {isStart ? "다음 질문으로" : "시작"}
              </Button>
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
  height: calc(100vh - 121px);
  background: radial-gradient(
    93.71% 307.5% at 86.33% 0%,
    #1b172f 0%,
    #1a1a1a 47.92%,
    #1b172f 100%
  );
`;
const Padding20 = styled.div`
  padding: 0 20px;
`;
const Ctn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #222844;
  border: 1px solid #5351a5;
  border-radius: 20px;
  max-width: 1160px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  color: white;
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
  border: 1px solid #5351a5;
  background-color: #1b172f;
  color: white;
`;
const SimulationHeader = styled(FlexCol)`
  height: 110px;
  gap: 10px;
  justify-content: center;
`;

const Button = styled.button`
  margin: 0 auto;
  width: 200px;

  display: flex;
  justify-content: center;
  gap: 5px;
  font-size: 20px;
  align-items: center;
  border: 1px solid #5351a5;
  background-color: #1b172f;
  color: white;
  font-weight: 600;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
`;
const TextEl = styled(Text)`
  color: white;
`;
const Video = styled.video`
  width: 400px;
  height: 300px;
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
  padding: 10px;
`;
const IconArea = styled.div`
  position: absolute;
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: 1px solid #5351a5;
  background-color: #1b172f;
  border-radius: 50%;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
`;

export default Simulation;
