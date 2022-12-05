import React, { useState } from "react";
import { instance } from "../../recoil/instance";

const Room = () => {
  const init = {
    roomName: "",
    // password: "",
  };
  const [roomInfo, setRoomInfo] = useState(init);

  const [roomName, setRoomName] = useState("");
  // const [roomPassword, setRoomPassword] = useState("");

  const onChangeRoomName = (e) => {
    setRoomName(e.target.value);
  };
  // const onChangeSetRoomPassword = (e) => {
  //   setRoomPassword(e.target.value);
  // };
  const addRoom = (event) => {
    event.preventDefault();
    try {
      const { data } = instance.get(`/room/${roomName}`);
      console.log(data);
      return;
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };
  console.log(roomName);
  return (
    <>
      <div>룸을 추가하는 페이지</div>
      <br />
      <form onSubmit={addRoom}>
        <label htmlFor="">룸 이름</label>
        <input
          type="text"
          placeholder="룸 이름"
          value={roomName}
          onChange={onChangeRoomName}
        />
        <br />
        {/* <label htmlFor="">비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호"
          value={roomPassword}
          onChange={onChangeSetRoomPassword}
        /> */}
        <br />
        <button onClick={() => addRoom()}>룸 추가 버튼</button>
      </form>
    </>
  );
};

export default Room;
