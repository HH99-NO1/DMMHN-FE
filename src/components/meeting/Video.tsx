import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// const UserLabel = styled.p`
// 	display: inline-block;
// 	position: absolute;
// 	top: 230px;
// 	left: 0px;
// `;

interface Props {
  email?: string;
  stream: MediaStream;
  muted?: boolean;
  userState?: {
    id: string;
    onVideo: boolean;
    onAudio: boolean;
  };
}

const Video = ({ stream, muted }: Props) => {
  const ref = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] = useState<boolean>(true);
  // console.log(muted);

  const [inOnVideo, setInOnVideo] = useState<boolean>(true);

  const onVideo = () => {
    setInOnVideo(!inOnVideo);
  };
  // console.log(inOnVideo);

  useEffect(() => {
    if (ref.current) ref.current.srcObject = stream;
    stream.getAudioTracks()[0].enabled = false;

    stream.getVideoTracks()[0].enabled =
      inOnVideo === undefined ? false : inOnVideo;
    // console.log(stream.getVideoTracks()[0].enabled);
    if (muted) setIsMuted(muted);
    // console.log(muted);
  }, [stream, muted, inOnVideo]);

  return (
    <Container>
      <VideoContainer ref={ref} muted={isMuted} autoPlay />
      <VideoBtn onClick={() => onVideo()}>비디오 켜고 끄는 버튼</VideoBtn>
      {/* <UserLabel>{email}</UserLabel> */}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: inline-block;
  width: 240px;
  height: 270px;
`;

const VideoContainer = styled.video`
  width: 240px;
  height: 240px;
  background-color: gray;
  border-radius: 10px;
  margin: 5px;
`;
const VideoBtn = styled.button`
  border-radius: 10px;
`;

export default Video;
