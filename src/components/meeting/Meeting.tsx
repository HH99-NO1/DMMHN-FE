import React, { useState, useRef, useEffect, useCallback } from "react";
import io, { Socket } from "socket.io-client";
import styled from "styled-components";
import Video from "./Video";
import { WebRTCUser } from "./types";
import {
  IStream,
  StreamState,
  LocalVideoState,
} from "../../recoil/atoms/atoms";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
// import { AnyAaaaRecord } from "dns";
import { BsCameraVideo } from "react-icons/bs";

const pc_config = {
  iceServers: [
    // {
    //   urls: 'stun:[STUN_IP]:[PORT]',
    //   'credentials': '[YOR CREDENTIALS]',
    //   'username': '[USERNAME]'
    // },
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};
const SOCKET_SERVER_URL = "https://chamchimayo.shop/";

const Meeting = () => {
  // const [isLocalVideo, setIsLocalVideo] = useRecoilState(LocalVideoState);

  const isLocalVideo = useRecoilValue(LocalVideoState);
  const setIsLocalVideo = useSetRecoilState(LocalVideoState);

  console.log(isLocalVideo);
  const socketRef = useRef<Socket>();
  const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream>();
  const [users, setUsers] = useState<WebRTCUser[]>([]);

  const onClickVideo = () => {
    setIsLocalVideo(!isLocalVideo);
  };

  const getLocalStream = useCallback(async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 240,
          height: 240,
        },
      });
      localStream.getAudioTracks()[0].enabled = true;
      localStream.getVideoTracks()[0].enabled = isLocalVideo;
      console.log(isLocalVideo);
      // console.log(localStream.getAudioTracks()[0].enabled);
      // localStream.getAudioTracks()[0].enabled = type === 'mute' ? true : false;
      console.log(localStream);
      console.log(localStreamRef);
      // 렌더 될때마다 localStream의 값을 담아줘!
      localStreamRef.current = localStream;
      if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
      if (!socketRef.current) return;
      socketRef.current.emit("join_room", {
        room: "1234",
        email: "sample@naver.com",
      });

      // 방 생성: true, 방 폭파: false 가능!
      socketRef.current.connected = true;

      console.log(socketRef.current);
    } catch (e) {
      console.log(`getUserMedia error: ${e}`);
    }
  }, [isLocalVideo]);

  const createPeerConnection = useCallback(
    (socketID: string, email: string) => {
      try {
        const pc = new RTCPeerConnection(pc_config);
        console.log(pc);

        pc.onicecandidate = (e) => {
          if (!(socketRef.current && e.candidate)) return;
          // console.log('onicecandidate');
          socketRef.current.emit("candidate", {
            candidate: e.candidate,
            candidateSendID: socketRef.current.id,
            candidateReceiveID: socketID,
          });
        };

        pc.oniceconnectionstatechange = (e) => {
          console.log(e);
        };

        pc.ontrack = (e) => {
          console.log(e);
          console.log("ontrack success");
          setUsers((oldUsers) =>
            oldUsers
              .filter((user) => user.id !== socketID)
              .concat({
                id: socketID,
                email,
                stream: e.streams[0],
              })
          );
          console.log(e.track);
        };

        if (localStreamRef.current) {
          console.log("localstream add");
          localStreamRef.current.getTracks().forEach((track) => {
            if (!localStreamRef.current) return;
            pc.addTrack(track, localStreamRef.current);
          });
        } else {
          console.log("no local stream");
        }

        return pc;
      } catch (e) {
        console.error(e);
        return undefined;
      }
    },
    []
  );

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);
    getLocalStream();

    socketRef.current.on(
      "all_users",
      (allUsers: Array<{ id: string; email: string }>) => {
        allUsers.forEach(async (user) => {
          if (!localStreamRef.current) return;
          const pc = createPeerConnection(user.id, user.email);
          if (!(pc && socketRef.current)) return;

          pcsRef.current = { ...pcsRef.current, [user.id]: pc };
          try {
            // 내 자신이 남의 비디오나 오디오를 통제. 내가 보는 값만 바뀐다.
            const localSdp = await pc.createOffer({
              offerToReceiveAudio: true,
              offerToReceiveVideo: true,
            });
            console.log("create offer success");
            await pc.setLocalDescription(new RTCSessionDescription(localSdp));
            socketRef.current.emit("offer", {
              sdp: localSdp,
              offerSendID: socketRef.current.id,
              offerSendEmail: "offerSendSample@sample.com",
              offerReceiveID: user.id,
            });
          } catch (e) {
            console.error(e);
          }
        });
      }
    );

    socketRef.current.on(
      "getOffer",
      async (data: {
        sdp: RTCSessionDescription;
        offerSendID: string;
        offerSendEmail: string;
      }) => {
        const { sdp, offerSendID, offerSendEmail } = data;
        console.log("get offer");
        if (!localStreamRef.current) return;
        const pc = createPeerConnection(offerSendID, offerSendEmail);
        if (!(pc && socketRef.current)) return;
        pcsRef.current = { ...pcsRef.current, [offerSendID]: pc };
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          console.log("answer set remote description success");
          const localSdp = await pc.createAnswer({
            offerToReceiveVideo: true,
            offerToReceiveAudio: true,
          });
          await pc.setLocalDescription(new RTCSessionDescription(localSdp));
          socketRef.current.emit("answer", {
            sdp: localSdp,
            answerSendID: socketRef.current.id,
            answerReceiveID: offerSendID,
          });
        } catch (e) {
          console.error(e);
        }
      }
    );

    socketRef.current.on(
      "getAnswer",
      (data: { sdp: RTCSessionDescription; answerSendID: string }) => {
        const { sdp, answerSendID } = data;
        console.log("get answer");
        const pc: RTCPeerConnection = pcsRef.current[answerSendID];
        if (!pc) return;
        pc.setRemoteDescription(new RTCSessionDescription(sdp));
      }
    );

    socketRef.current.on(
      "getCandidate",
      async (data: {
        candidate: RTCIceCandidateInit;
        candidateSendID: string;
      }) => {
        console.log("get candidate");
        const pc: RTCPeerConnection = pcsRef.current[data.candidateSendID];
        if (!pc) return;
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        console.log("candidate add success");
      }
    );

    socketRef.current.on("user_exit", (data: { id: string }) => {
      if (!pcsRef.current[data.id]) return;
      pcsRef.current[data.id].close();
      delete pcsRef.current[data.id];
      setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      users.forEach((user) => {
        if (!pcsRef.current[user.id]) return;
        pcsRef.current[user.id].close();
        delete pcsRef.current[user.id];
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createPeerConnection, getLocalStream]);
  // useEffect(() => {
  // 	getLocalStream();
  // }, [getLocalStream, isLocalVideo]);

  return (
    <div>
      <FlexCol gap="30px">
        <FlexCol>
          내 비디오
          <VideoBox>
            <LocalVideo muted ref={localVideoRef} autoPlay />
            <IconBox onClick={() => onClickVideo()}>
              <BsCameraVideo size={24} strokeWidth={1} stroke="white" />
            </IconBox>
          </VideoBox>
        </FlexCol>
        <FlexCol>
          남의 비디오
          <FlexRow gap="20px">
            {users.map((user, index) => {
              // console.log(user);
              const userState = {
                id: user.stream.id,
                onVideo: true,
                onAudio: false,
              };
              // setGetStream([...getStream, stream]);
              return (
                <Video key={index} stream={user.stream} userState={userState} />
              );
            })}
          </FlexRow>
        </FlexCol>
      </FlexCol>
    </div>
  );
};

const VideoBox = styled.div`
  position: relative;
`;
const IconBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 10px;
  left: 10px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all, 0.2s;
  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;
const LocalVideo = styled.video`
  width: 300px;
  height: 300px;
  margin: 5;
  background-color: black;
  border-radius: 10px;
`;

interface IFlex {
  width?: string;
  maxWidth?: string;
  gap?: string;
  alignItem?: string;
  justifyContent?: string;
  border?: string;
  bgColor?: string;
  padding?: string;
  borderRadius?: string;
}

const FlexRow = styled.div<IFlex>`
  display: flex;
  flex-direction: row;
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  gap: ${(props) => props.gap};
  align-items: ${(props) =>
    props.alignItem === undefined ? "center" : props.alignItem};
  justify-content: ${(props) => props.justifyContent};
  background-color: ${(props) => props.bgColor};
  padding: ${(props) => props.padding};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
`;
const FlexCol = styled(FlexRow)<IFlex>`
  flex-direction: column;
`;

export default Meeting;
