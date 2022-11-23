import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { FlexCol } from "../../elements/elements";

const MeetingTest = () => {
  const socketRef = useRef<Socket>();
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection>();

  const { roomName } = useParams();
  console.log(roomName);
  // const SOCKET_SERVER_URL = "https://chamchimayo.shop/";
  const SOCKET_SERVER_URL = "https://dgbnb.shop/";
  const getMedia = async () => {
    try {
      console.log("getMedia 시작");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (myVideoRef.current) {
        console.log("내 비디오를 스트림에 저장했다!");
        myVideoRef.current.srcObject = stream;
      }
      if (!(pcRef.current && socketRef.current)) {
        console.log("남의 비디오와 서버가 문제가 있다!");
        return;
      }
      stream.getTracks().forEach((track) => {
        if (!pcRef.current) {
          console.log("남의 비디오에서 track을 가져올 수 없다! ");
          return;
        }
        // console.log("남의 비디오에서 track을 가져왔다! ");
        pcRef.current.addTrack(track, stream);
      });

      pcRef.current.onicecandidate = (e) => {
        if (e.candidate) {
          if (!socketRef.current) {
            return;
          }
          console.log("recv candidate");
          socketRef.current.emit("candidate", e.candidate, roomName);
        }
      };

      pcRef.current.ontrack = (e) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = e.streams[0];
        }
      };
    } catch (e) {
      console.error(e);
    }
  };

  const createOffer = async () => {
    console.log("create Offer");
    if (!(pcRef.current && socketRef.current)) {
      return;
    }
    try {
      const sdp = await pcRef.current.createOffer();
      pcRef.current.setLocalDescription(sdp);
      console.log("sent the offer");
      socketRef.current.emit("offer", sdp, roomName);
    } catch (e) {
      console.error(e);
    }
  };

  const createAnswer = async (sdp: RTCSessionDescription) => {
    console.log("createAnswer");
    if (!(pcRef.current && socketRef.current)) {
      return;
    }

    try {
      pcRef.current.setRemoteDescription(sdp);
      const answerSdp = await pcRef.current.createAnswer();
      pcRef.current.setLocalDescription(answerSdp);

      console.log("sent the answer");
      socketRef.current.emit("answer", answerSdp, roomName);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, { transports: ["polling"] });
    console.log(socketRef.current);

    pcRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    socketRef.current.on("all_users", (allUsers: Array<{ id: string }>) => {
      console.log("connected!");
      if (allUsers.length > 0) {
        createOffer();
      }
    });

    socketRef.current.on("getOffer", (sdp: RTCSessionDescription) => {
      console.log("recv Offer");
      createAnswer(sdp);
    });

    socketRef.current.on("getAnswer", (sdp: RTCSessionDescription) => {
      console.log("recv Answer");
      if (!pcRef.current) {
        return;
      }
      pcRef.current.setRemoteDescription(sdp);
    });

    socketRef.current.on("getCandidate", async (candidate: RTCIceCandidate) => {
      console.log("getCandidate");
      if (!pcRef.current) {
        console.log("getCandidate is false");
        return;
      }

      await pcRef.current.addIceCandidate(candidate);
    });

    console.log("roomname을 보냈다!");
    socketRef.current.emit("join_room", {
      room: roomName,
    });

    getMedia();

    return () => {
      if (socketRef.current) {
        console.log("test1");
        socketRef.current.disconnect();
      }
      if (pcRef.current) {
        console.log("test2");
        pcRef.current.close();
      }
    };
  }, []);

  return (
    <FlexCol gap="10px">
      <video
        id="remotevideo"
        style={{
          width: 240,
          height: 240,
          backgroundColor: "black",
        }}
        ref={myVideoRef}
        muted
        autoPlay
      />
      <video
        id="remotevideo"
        style={{
          width: 240,
          height: 240,
          backgroundColor: "black",
        }}
        ref={remoteVideoRef}
        muted
        autoPlay
      />
    </FlexCol>
  );
};

export default MeetingTest;
