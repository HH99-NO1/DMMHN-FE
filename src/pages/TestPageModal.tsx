import React, { useState } from "react";
import styled from "styled-components";
import { instance } from "../recoil/instance";

interface IProp {
  userProfile: {
    email: string;
    nickname: string;
    profilePic: string;
  };
  setIsClick: (state: boolean) => void;
}

const TestPageModal = ({ userProfile, setIsClick }: IProp) => {
  const [email, setEmail] = useState(userProfile.email);
  const [nickname, setNickname] = useState(userProfile.nickname);
  const [profilePic, setProfilePic] = useState(userProfile.profilePic);

  const onChangeEmail = (event: any) => {
    setEmail(event?.currentTarget.value);
  };
  const onChangeNickname = (event: any) => {
    setNickname(event?.currentTarget.value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formdata = new FormData();

    formdata.append("email", email);
    formdata.append("nickname", nickname);
    formdata.append("profilePic", profilePic);

    try {
      const response = await instance.patch("/url", formdata, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      console.log("response: ", response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <BGColor>
      <Modal>
        <span>회원수정 창</span>
        <span onClick={() => setIsClick(false)}>close</span>
        <br />
        <form onSubmit={onSubmit}>
          <label htmlFor="">이메일</label>
          <input type="text" value={email} onChange={onChangeEmail} />
          <br />
          <label htmlFor="">닉네임</label>
          <input type="text" value={nickname} onChange={onChangeNickname} />
          <br />
          <input type="file" />
          <img style={{ width: "50px" }} src={profilePic} alt="userImg" />
          <br />
          <button>회원정보 변경하기</button>
        </form>
      </Modal>
    </BGColor>
  );
};

const BGColor = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: calc(100vh);
  background-color: rgba(0, 0, 0, 0.5);
`;
const Modal = styled.div`
  position: absolute;
  width: 500px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
`;

export default TestPageModal;
