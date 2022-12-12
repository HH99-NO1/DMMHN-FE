import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { FlexRow, Text } from "../../elements/elements";
import { userState } from "../../recoil/atoms/atoms";

const UserState = () => {
  const navigate = useNavigate();
  const loginUserState = useRecoilValue(userState);
  console.log(loginUserState);
  return (
    <>
      <UserStateArea onClick={() => navigate("/mypage")}>
        <Img src={`${loginUserState?.img}`} alt="userImg" />
        <Text fontSize="14px" color="white">
          {loginUserState?.memberName}
        </Text>
      </UserStateArea>
    </>
  );
};

const UserStateArea = styled(FlexRow)`
  gap: 10px;
  cursor: pointer;
`;
const Img = styled.img`
  background-color: ${(props) => props.theme.__grayLight};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid white;
`;

export default UserState;
