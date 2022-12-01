// // import { disconnect } from "process";
// import { useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { io, Socket } from "socket.io-client";
// import { FlexCol } from "../../elements/elements";
// import { instance } from "../../recoil/instance";

// const RoomDetail = () => {
//   const socketRef = useRef<Socket>();
//   const myVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);
//   const pcRef = useRef<RTCPeerConnection>();

//   const { roomName } = useParams();
//   console.log(roomName);

//   const SOCKET_SERVER_URL = "https://dgbnb.shop/";
//   // function stopStreamedVideo(myVideoRef: any) {
//   //   const stream = myVideoRef.current.srcObject;
//   //   const tracks = stream.getTracks();

//   //   tracks.forEach(function (track: any) {
//   //     track.stop();
//   //   });

//   //   myVideoRef.current.srcObject = null;
//   // }
//   // const refreshMedia = () => setInterval(() => getMedia(), 3000);
//   // setInterval(() => {
//   //   getMedia();
//   // }, 3000);
//   const getMedia = async () => {
//     try {
//       console.log("getMedia 시작");
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });

//       if (myVideoRef.current) {
//         // console.log(pcRef.current);
//         myVideoRef.current.srcObject = stream;
//         console.log("내 비디오를 스트림에 저장했다!");
//       }
//       if (!(pcRef.current && socketRef.current)) {
//         console.log("남의 비디오와 서버가 문제가 있다!");
//         return;
//       }
//       stream.getTracks().forEach((track) => {
//         if (!pcRef.current) {
//           console.log("남의 비디오에서 track을 가져올 수 없다! ");
//           return;
//         }
//         pcRef.current.addTrack(track, stream);

//         console.log("남의 비디오에서 track을 가져왔다! ");
//       });
//       console.log(pcRef.current.onicecandidate);
//       console.log(pcRef.current.ontrack);
//       console.log(pcRef.current);
//       // console.log(socketRef.current);

//       pcRef.current.onicecandidate = (e) => {
//         console.log("candidate");
//         if (e.candidate) {
//           if (!socketRef.current) {
//             console.log("소켓에 정보가 없대!");
//             return;
//           }
//           console.log("recv candidate");
//           socketRef.current.emit("candidate", e.candidate, roomName);
//         }
//       };

//       pcRef.current.ontrack = (e) => {
//         console.log("pcRef, ontrack?");
//         if (remoteVideoRef.current) {
//           remoteVideoRef.current.srcObject = e.streams[0];
//           console.log(e.streams[0]);
//         } else {
//           console.log("noop");
//         }
//       };
//       console.log("????");
//       return stream;
//     } catch (e) {
//       console.log(e);
//       console.error(e);
//     }
//   };

//   const createOffer = async () => {
//     console.log("create Offer");
//     if (!(pcRef.current && socketRef.current)) {
//       return;
//     }
//     try {
//       const sdp = await pcRef.current.createOffer();
//       pcRef.current.setLocalDescription(sdp);
//       console.log("sent the offer");
//       socketRef.current.emit("offer", sdp, roomName);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const createAnswer = async (sdp: RTCSessionDescription) => {
//     console.log("createAnswer");
//     if (!(pcRef.current && socketRef.current)) {
//       return;
//     }

//     try {
//       pcRef.current.setRemoteDescription(sdp);
//       const answerSdp = await pcRef.current.createAnswer();
//       pcRef.current.setLocalDescription(answerSdp);

//       console.log("sent the answer");
//       socketRef.current.emit("answer", answerSdp, roomName);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     socketRef.current = io(SOCKET_SERVER_URL, {
//       transports: ["polling"],
//     });
//     // console.log(socketRef.current);

//     pcRef.current = new RTCPeerConnection({
//       iceServers: [
//         {
//           urls: [
//             "stun:stun.l.google.com:19302",
//             "stun:stun1.l.google.com:19302",
//             "stun:stun2.l.google.com:19302",
//             "stun:stun3.l.google.com:19302",
//             "stun:stun4.l.google.com:19302",
//           ],
//         },
//       ],
//     });

//     socketRef.current.on("all_users", (allUsers: Array<{ id: string }>) => {
//       console.log("connected!");
//       console.log(allUsers);
//       if (allUsers.length > 0) {
//         createOffer();
//       }
//     });

//     socketRef.current.on("getOffer", (sdp: RTCSessionDescription) => {
//       createAnswer(sdp);
//       console.log("recv Offer");
//     });

//     socketRef.current.on("getAnswer", (sdp: RTCSessionDescription) => {
//       console.log("recv Answer");
//       if (!pcRef.current) {
//         console.log("getAnswer is false");
//         return;
//       }
//       pcRef.current.setRemoteDescription(sdp);
//       console.log("recv Answer2");
//     });

//     socketRef.current.on("getCandidate", async (candidate: RTCIceCandidate) => {
//       console.log("getCandidate");
//       if (!pcRef.current) {
//         console.log("getCandidate is false");
//         return;
//       }

//       await pcRef.current.addIceCandidate(candidate);
//     });

//     socketRef.current.emit("join_room", {
//       room: roomName,
//     });

//     getMedia();

//     console.log("두번째때는 출력 안될껄");
//     return () => {
//       console.log("리턴 도는지 체크");
//       if (socketRef.current) {
//         try {
//           console.log("내가 값이 있대잖아");
//           socketRef.current.disconnect();
//           // stopStreamedVideo(myVideoRef);
//           console.log("내 비디오를 스트림에서 뺐다!");
//         } catch (e) {
//           console.log(e);
//         }

//         // ??.getTracks().forEach((track) => track.stop());
//       }
//       if (pcRef.current) {
//         try {
//           console.log("남의 값이 있대잖아");
//           pcRef.current.close();
//           // stopStreamedVideo(pcRef);
//           console.log("남의 비디오를 스트림에서 뺐다!");
//         } catch (e) {
//           console.log(e);
//         }
//       }
//     };
//     // }, [
//     //   myVideoRef.current,
//     //   pcRef.current,
//     //   socketRef.current,
//     //   remoteVideoRef.current,
//     // ]);
//   }, []);

//   // useEffect(() => {
//   //   console.log("??????");
//   //   if (pcRef?.current?.connectionState === "disconnected" || "failed") {
//   //     console.log("남의 값이 있대잖아");
//   //     pcRef?.current?.close();
//   //     stopStreamedVideo(pcRef);
//   //     console.log("남의 비디오를 스트림에서 뺐다!");
//   //   } else {
//   //     console.log("아마 값이 new 일껄");
//   //   }
//   // }, []);

//   // 사용자가 유효한 사용자인지 체크
//   useEffect(() => {
//     const authorizeCheck = () => {
//       try {
//         const { data }: any = instance.get(`/room/${roomName}`);
//         console.log(data);
//         return;
//       } catch (error: any) {
//         console.log(error.response.data.message);
//       }
//     };
//     // authorizeCheck();
//   }, []);

//   return (
//     <FlexCol gap="10px">
//       <video
//         id="remotevideo"
//         style={{
//           width: 240,
//           height: 240,
//           backgroundColor: "black",
//         }}
//         ref={myVideoRef}
//         muted
//         autoPlay
//       />
//       <video
//         id="remotevideo"
//         style={{
//           width: 240,
//           height: 240,
//           backgroundColor: "black",
//         }}
//         ref={remoteVideoRef}
//         muted
//         autoPlay
//       />
//     </FlexCol>
//   );
// };

// export default RoomDetail;

////////////////////

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";

const RoomDetail = () => {
  const socketRef = useRef<Socket>();
  const [socket, setSocket] = useState<Socket>();

  const myVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection>();

  const { roomName } = useParams();

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }
      if (!(pcRef.current && socketRef.current)) {
        return;
      }
      stream.getTracks().forEach((track) => {
        if (!pcRef.current) {
          return;
        }
        pcRef.current.addTrack(track, stream);
      });

      pcRef.current.onicecandidate = (e) => {
        if (e.candidate) {
          if (!socketRef.current) {
            return;
          }
          console.log("recv candidate");
          socketRef.current?.emit("candidate", e.candidate, roomName);
        }
      };

      pcRef.current.ontrack = (e) => {
        console.log("어라?????????????????");
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
      socketRef.current?.emit("offer", sdp, roomName);
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
      socketRef.current?.emit("answer", answerSdp, roomName);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log(socketRef.current);
    console.log(pcRef.current);

    console.log("첫번째");
    socketRef.current = io("https://dgbnb.shop/", {
      transports: ["polling"],
      forceNew: true,
    });

    pcRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.services.mozilla.com",
        },
        // {
        //   urls: "stun:stun.l.google.com:19302",
        // },
      ],
    });

    socketRef.current?.on("all_users", (allUsers: Array<{ id: string }>) => {
      if (allUsers.length > 0) {
        createOffer();
      }
    });

    socketRef.current?.on("getOffer", (sdp: RTCSessionDescription) => {
      console.log("recv Offer");
      createAnswer(sdp);
    });

    socketRef.current?.on("getAnswer", (sdp: RTCSessionDescription) => {
      console.log("recv Answer");
      if (!pcRef.current) {
        return;
      }
      pcRef.current.setRemoteDescription(sdp);
    });

    socketRef.current?.on(
      "getCandidate",
      async (candidate: RTCIceCandidate) => {
        if (!pcRef.current) {
          return;
        }

        await pcRef.current?.addIceCandidate(candidate);
      }
    );

    socketRef.current?.emit("join_room", {
      room: roomName,
    });

    getMedia();

    return () => {
      if (socketRef.current) {
        console.log("새로 연결?");
        socketRef.current?.disconnect();
      }
      if (pcRef.current) {
        console.log("새로 연결?22");
        pcRef.current.close();
      }
    };
    // }, [io]);
  }, [
    socketRef.current?.connected,
    socket,
    pcRef.current?.onicecandidate,
    pcRef.current?.connectionState,
    pcRef.current?.ontrack,
    io,
  ]);

  useEffect(() => {
    const exSocket = socket;
    exSocket?.disconnect();
    const newSocket = io("https://dgbnb.shop/", {
      transports: ["polling"],
      forceNew: true,
    });
    setSocket(newSocket);
  }, []);

  // useEffect(() => {
  //   const exSocket = socket;
  //   exSocket?.disconnect();
  //   const newSocket = io("https://dgbnb.shop/", {
  //     transports: ["polling"],
  //     forceNew: true,
  //   });
  //   setSocket(newSocket);

  //   console.log("두번째");

  //   pcRef.current = new RTCPeerConnection({
  //     iceServers: [
  //       {
  //         urls: "stun:stun.l.google.com:19302",
  //       },
  //     ],
  //   });

  //   socket?.on("all_users", (allUsers: Array<{ id: string }>) => {
  //     if (allUsers.length > 0) {
  //       createOffer();
  //     }
  //   });

  //   socket?.on("getOffer", (sdp: RTCSessionDescription) => {
  //     console.log("recv Offer");
  //     createAnswer(sdp);
  //   });

  //   socket?.on("getAnswer", (sdp: RTCSessionDescription) => {
  //     console.log("recv Answer");
  //     if (!pcRef.current) {
  //       return;
  //     }
  //     pcRef.current.setRemoteDescription(sdp);
  //   });

  //   socket?.on("getCandidate", async (candidate: RTCIceCandidate) => {
  //     if (!pcRef.current) {
  //       return;
  //     }

  //     await pcRef.current.addIceCandidate(candidate);
  //   });

  //   socket?.emit("join_room", {
  //     room: roomName,
  //   });

  //   getMedia();

  //   return () => {
  //     if (socketRef.current) {
  //       console.log("새로 연결?");
  //       socketRef.current.disconnect();
  //     }
  //     if (pcRef.current) {
  //       console.log("새로 연결?22");
  //       pcRef.current.close();
  //     }
  //   };
  // }, []);

  return (
    <div>
      <video
        id="remotevideo"
        style={{
          width: 240,
          height: 240,
          backgroundColor: "black",
        }}
        muted
        ref={myVideoRef}
        autoPlay
      />
      <video
        id="remotevideo"
        style={{
          width: 240,
          height: 240,
          backgroundColor: "black",
        }}
        muted
        ref={remoteVideoRef}
        autoPlay
      />
    </div>
  );
};

export default RoomDetail;
