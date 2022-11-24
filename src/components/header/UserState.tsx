import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexRow } from "../../elements/elements";
import { instance } from "../../recoil/instance";
import { GiHamburgerMenu } from "react-icons/gi";

const UserState = () => {
  const init = {
    createdAt: "",
    memberEmail: "",
    profileImg: "",
    updatedAt: "",
    _id: "",
  };
  const [userLoginData, setUserLoginData] = useState(init);
  console.log(userLoginData);
  const getUserLoginData = async () => {
    try {
      const { data } = await instance.get(`/members/me`);
      setUserLoginData(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUserLoginData();
  }, []);

  useEffect(() => {}, [userLoginData]);
  return (
    <>
      <FlexRow>
        <Img src={userLoginData?.profileImg} />
        <GiHamburgerMenu size={30} />
        <HamburgerMenu />
      </FlexRow>
    </>
  );
};

const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 20px;
`;
const HamburgerMenu = styled.div``;

export default UserState;
