import React, { useState } from "react";
import styled from "styled-components";

// @ts-ignore
import RecordRTC from "recordrtc";
// @ts-ignore
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { saveAs } from "file-saver";

const TestRecorder = () => {
  const [recorder, setRecorder] = useState<RecordRTC | null>();
  const [stream, setStream] = useState<MediaStream | null>();
  const [videoBlob, setVideoBlob] = useState<Blob | null>();

  const startRecording = async () => {
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

  const downloadVid = () => {
    if (videoBlob) {
      const mp4s = new File([videoBlob], "test.mp4", { type: "video" });
      saveAs(mp4s, `${Date.now()}.mp4`);
    } else {
      alert("다운로드 할 수 없습니다.");
    }
  };
  return (
    <>
      <div>
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
      </div>
    </>
  );
};

// const RecordTop = styled.div`
//   position: relative;
//   width: 1200px;
//   margin: 0 auto;
//   padding: 60px 0;
// `;

export default TestRecorder;
