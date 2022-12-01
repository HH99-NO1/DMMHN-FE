import React, { useEffect, useState } from "react";
import { instance } from "../recoil/instance";
import TestPageModal from "./TestPageModal";

interface Ires {
  email: string;
  nickname: string;
  profilePic: string;
}

const TestPage = () => {
  const resInit = {
    email: "test@gmail.com",
    nickname: "테스터",
    profilePic:
      "https://dmmhn-bucket.s3.ap-northeast-2.amazonaws.com/mock-interview/1669798251820_freeicon.png",
  };

  const [userProfile, setUserProfile] = useState<Ires>(resInit);
  const [isClick, setIsClick] = useState(false);

  // const getUserProfile = () => {
  //   try {
  //     const response = instance.get("/getUserProfile");
  //     console.log("response :", response);
  //     setUserProfile(response as any);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   getUserProfile();
  // }, []);

  return (
    <>
      <h1>TestPage</h1>
      <br />
      <div>{userProfile.email}</div>
      <div>{userProfile.nickname}</div>
      <img
        style={{ width: "50px" }}
        src={userProfile.profilePic}
        alt="userImg"
      />
      <button onClick={() => setIsClick(true)}>회원수정 버튼</button>
      {isClick && (
        <TestPageModal
          userProfile={userProfile}
          setIsClick={(bool) => setIsClick(bool)}
        />
      )}
    </>
  );
};

export default TestPage;
