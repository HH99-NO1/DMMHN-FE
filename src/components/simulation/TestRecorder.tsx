import React, { useEffect, useState } from "react";
import styled from "styled-components";

// @ts-ignore
import RecordRTC from "recordrtc";
// @ts-ignore
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { saveAs } from "file-saver";
import { useRecoilValue } from "recoil";

const TestRecorder = () => {
  const [recorder, setRecorder] = useState<RecordRTC | null>();
  const [stream, setStream] = useState<MediaStream | null>();
  const [videoBlob, setVideoBlob] = useState<Blob | null>();

  const startRecording = async () => {
    console.log("start");
    const mediaDevices = navigator.mediaDevices;
    const stream: MediaStream = await mediaDevices.getUserMedia({
      video: {
        width: 400,
        height: 300,
        frameRate: 60,
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

  const stopRecording = () => {
    console.log("stop");
    if (recorder) {
      recorder.stopRecording(() => {
        const blob: Blob = recorder.getBlob();
        setVideoBlob(blob);
        setStream(null);
        setRecorder(null);
      });
      // (stream as any).stop();
    }
  };

  const downloadVideo = () => {
    console.log("down");
    if (videoBlob) {
      const mp4s = new File([videoBlob], "test.mp4", { type: "video" });
      saveAs(mp4s, `${Date.now()}.mp4`);
    } else {
      alert("다운로드 할 수 없습니다.");
    }
  };

  return (
    <>
      {/* <button onClick={() => startRecording()}>녹화 시작</button>
        <button onClick={() => stopRecording()}>녹화 중지</button>
         */}
      <VideoBox style={{ width: "500px" }}>
        {videoBlob ? (
          <Player src={window.URL.createObjectURL(videoBlob)} />
        ) : (
          "blob is false"
        )}
      </VideoBox>
      <button onClick={downloadVideo}>다운받기</button>
    </>
  );
};

const VideoBox = styled.div`
  max-width: 500px;
  width: 100%;
  border-radius: 10px;
`;

// const RecordTop = styled.div`
//   position: relative;
//   width: 1200px;
//   margin: 0 auto;
//   padding: 60px 0;
// `;

export default TestRecorder;
