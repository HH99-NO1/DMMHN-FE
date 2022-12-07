import React, { useState } from "react";
import styled from "styled-components";

// @ts-ignore
import RecordRTC from "recordrtc";
// @ts-ignore
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { saveAs } from "file-saver";

type RecordType = "video" | "screen";

const TestRecorder = () => {
  const [recorder, setRecorder] = useState<RecordRTC | null>();
  const [stream, setStream] = useState<MediaStream | null>();
  const [videoBlob, setVideoBlob] = useState<Blob | null>();
  const [type, setType] = useState<RecordType>("video");

  const startRecording = async () => {
    const mediaDevices = navigator.mediaDevices;
    const stream: MediaStream = await mediaDevices.getUserMedia({
      video: {
        width: 400,
        height: 300,
        frameRate: 30,
      },
      audio: true,
    });
    const recorder: RecordRTC = new RecordRTC(stream, {
      type: "video",
    });
    if (recorder) recorder.startRecording();
    setRecorder(recorder);
    setStream(stream);
  };
  console.log("recorder: ", recorder);
  const stopRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const blob: Blob = recorder.getBlob();
        console.log(blob);
        setVideoBlob(blob);
        setStream(null);
        setRecorder(null);
      });
      // (stream as any).stop();
    }
  };

  // const changeType = () => {
  //   if (type === "screen") {
  //     setType("video");
  //   } else {
  //     setType("screen");
  //   }
  // };

  const downloadVid = () => {
    if (videoBlob) {
      const mp4s = new File([videoBlob], "test.mp4", { type: "video" });
      saveAs(mp4s, `${Date.now()}.mp4`);
    } else {
      alert("다운로드 할 수 없습니다.");
    }
  };
  console.log(videoBlob);
  return (
    <>
      <RecordTop>
        {/* <button onClick={changeType}>비디오 녹화</button> */}
        <button onClick={() => startRecording()}>녹화 시작</button>
        <button onClick={() => stopRecording()}>녹화 중지</button>
        <button onClick={downloadVid}>다운받기</button>
        <div style={{ width: "600px", height: "600px" }}>
          {videoBlob ? (
            <Player src={window.URL.createObjectURL(videoBlob)} />
          ) : (
            "blob is false"
          )}
        </div>
      </RecordTop>
    </>
  );
};

const RecordTop = styled.div`
  position: relative;
  width: 1200px;
  margin: 0 auto;
  padding: 60px 0;
`;

export default TestRecorder;
