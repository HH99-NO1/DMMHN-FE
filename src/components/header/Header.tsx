import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FlexCol, FlexRow, Text } from "../../elements/elements";
import UserState from "./UserState";

const Header = () => {
  const [loginUser, setLoginUser] = useState(false);

  const preRefreshToken = sessionStorage.getItem("refreshtoken");
  const preAccessToken = sessionStorage.getItem("accesstoken");

  const navigate = useNavigate();

  console.log("Authorization: " + preAccessToken);
  console.log("refresh: " + preRefreshToken);

  const checkLogin = () => {
    if (preRefreshToken) {
      const response = axios
        .get("https://dgbnb.shop/members/me", {
          headers: {
            Authorization: preAccessToken,
            refresh: preRefreshToken,
          },
        })
        .then(async (res) => {
          console.log("loginUser_State: ", res.data);
        });
      return response;
    } else {
      return;
    }
  };

  useEffect(() => {
    console.log(checkLogin());
    checkLogin() !== undefined ? setLoginUser(true) : setLoginUser(false);
  }, [checkLogin()]);

  return (
    <Ctn>
      <Wrap>
        <FlexRow gap="10px" justifyContent="space-between">
          <FlexRow gap="10px">
            <Img src="https://user-images.githubusercontent.com/77138259/201538983-41eebf77-47ad-4db0-b489-c119066daf20.png" />
            <FlexCol alignItem="left" gap="5px">
              <Text fontWeight="600">떨면뭐하니</Text>
              <Text fontSize="small">
                떨리는 면접, 우리만 아는 방법이 있다!
              </Text>
            </FlexCol>
          </FlexRow>
          {loginUser ? (
            <UserState />
          ) : (
            <FlexRow gap="10px">
              <Btn onClick={() => navigate("/login")}>로그인 창으로 이동</Btn>
              <Btn onClick={() => navigate("/signup")}>
                회원가입 창으로 이동
              </Btn>
            </FlexRow>
          )}
        </FlexRow>
      </Wrap>
    </Ctn>
  );
};

const Ctn = styled.div`
  position: fixed;
  width: 100%;
  background-color: white;
  z-index: 2;
  border: 1px solid red;
`;
const Wrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;

  border: 1px solid green;
`;
const Img = styled.img`
  width: 30px;
  height: 30px;
  scale: 1;
  object-fit: cover;
`;
const Btn = styled.button`
  width: 200px;
  margin: 0 auto;
`;

export default Header;
