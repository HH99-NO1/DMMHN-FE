import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { FlexRow, Text } from "../../elements/elements";
import { userState } from "../../recoil/atoms/atoms";

const UserState = () => {
  const loginUserState = useRecoilValue(userState);
  console.log(loginUserState);
  return (
    <>
      <FlexRow gap="10px">
        <Img src={`${loginUserState?.img}`} />
        <Text fontSize="14px" color="white">
          {loginUserState?.memberName}
        </Text>
      </FlexRow>
    </>
  );
};

const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export default UserState;
