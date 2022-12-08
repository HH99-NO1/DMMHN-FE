import Layout from "../components/home/Layout";
import styled from "styled-components";
import { FlexRow, FlexCol, Text, Gap, HeaderBox } from "../elements/elements";
import { instance } from "../recoil/instance";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Modification from "../components/modify/Modification";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atoms/atoms";

interface IUsers {
  memberEmail: string;
  memberName: string;
  img: string;
  birth: string;
  job: string;
  gender: string;
  stack: string;
}

const MyPage = () => {
  const [users, setUsers] = useState<IUsers>();
  const [modify, setModify] = useState(false);
  const [img, setImg] = useState<any>(
    "https://i.ibb.co/jwSbV5Z/profile-default.png"
  );
  const [loginUserState, setLoginUserState] = useRecoilState(userState);
  console.log(loginUserState);

  const getUserData = async () => {
    try {
      const { data } = await instance.get(`/members/me`);
      console.log(data);
      setUsers(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // const inputRef = useRef<HTMLInputElement | null>(null);
  // const onUploadImageButtonClick = () => {
  //   if (!inputRef.current) {
  //     return;
  //   }
  //   inputRef.current.click();
  // };
  console.log(users);
  const onChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      try {
        console.log(e.target.files);
        const uploadFile = e.target.files[0];
        console.log(uploadFile);
        const formData = new FormData();
        formData.append("profileImg", uploadFile);

        const { data } = await instance({
          method: "patch",
          url: "/members/me",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(data);

        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImg(reader.result);
            setLoginUserState({
              ...loginUserState,
              img: reader.result,
            });
            sessionStorage.setItem("userImg", `${reader.result}`);
          }
        };
        reader.readAsDataURL(uploadFile);
      } catch (e) {
        console.log(e);
      }
    } else return;
  };

  // useEffect(() => {
  //   users?.img && sessionStorage.setItem("userImg", users.img);
  // }, [onChangeImg]);
  useEffect(() => {
    users?.img !== undefined && setImg(users.img);
  }, [users]);
  return (
    <>
      <HeaderBox />
      <Container>
        <Profile>
          <FlexRow gap="45px">
            {/* <Button
                label="이미지 업로드"
                onClick={onUploadImageButtonClick}
              /> */}
            <ImgBox>
              <Img src={img} alt="userImg" />
              <form>
                <ImgChangeLabel htmlFor="profileImg">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.25798 7H12.258M5.51798 21H15.998C18.758 21 19.858 19.31 19.988 17.25L20.508 8.99C20.5404 8.47783 20.4674 7.96446 20.2936 7.48161C20.1197 6.99876 19.8487 6.5567 19.4972 6.18275C19.1458 5.80879 18.7213 5.51089 18.2502 5.30746C17.779 5.10403 17.2712 4.99939 16.758 5C16.148 5 15.588 4.65 15.308 4.11L14.588 2.66C14.128 1.75 12.928 1 11.908 1H9.61798C8.58798 1 7.38798 1.75 6.92798 2.66L6.20798 4.11C5.92798 4.65 5.36798 5 4.75798 5C2.58798 5 0.86798 6.83 1.00798 8.99L1.52798 17.25C1.64798 19.31 2.75798 21 5.51798 21Z"
                      stroke="#9F9F9F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.7578 17C12.5478 17 14.0078 15.54 14.0078 13.75C14.0078 11.96 12.5478 10.5 10.7578 10.5C8.96781 10.5 7.50781 11.96 7.50781 13.75C7.50781 15.54 8.96781 17 10.7578 17Z"
                      stroke="#9F9F9F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ImgChangeLabel>
                <ImgChangeInput
                  type="file"
                  id="profileImg"
                  accept="image/*"
                  // style={{ display: "none" }}
                  // ref={inputRef}
                  onChange={onChangeImg}
                />
                {/* <button id="profileImg" onClick={onUploadImageButtonClick}>
                    저장하기
                  </button> */}
              </form>
            </ImgBox>
            <FlexCol gap="20px" alignItem="left">
              <Text>
                {users?.memberName === undefined
                  ? `입력값이 없습니다. 빈칸을 수정해주세요.`
                  : users?.memberName}
              </Text>
              <Text>
                {users?.memberEmail === undefined
                  ? `입력값이 없습니다. 빈칸을 수정해주세요.`
                  : users?.memberEmail}
              </Text>
            </FlexCol>
          </FlexRow>
        </Profile>
        <SubTitle>개인정보</SubTitle>
        {!modify ? (
          <>
            <Modify>
              <Btn onClick={() => setModify(true)}>수정하기</Btn>
            </Modify>
            <Inform>
              <InnerWrap>
                <FlexCol alignItem="left">
                  <Rows>
                    <RowOne>소셜계정</RowOne>
                    <RowTwo>
                      {users?.memberEmail === undefined
                        ? `입력값이 없습니다. 빈칸을 수정해주세요.`
                        : users?.memberEmail}
                    </RowTwo>
                  </Rows>
                  <Rows>
                    <RowOne>생년월일</RowOne>
                    <RowTwo>
                      {users?.birth === undefined
                        ? `입력값이 없습니다. 빈칸을 수정해주세요.`
                        : users?.birth}
                    </RowTwo>
                  </Rows>
                  <Rows>
                    <RowOne>직업</RowOne>
                    <RowTwo>
                      {users?.job === undefined
                        ? `입력값이 없습니다. 빈칸을 수정해주세요.`
                        : users?.job}
                    </RowTwo>
                  </Rows>
                  <Rows>
                    <RowOne>스택</RowOne>
                    <RowTwo>
                      {/* {users?.stack === undefined
                          ? `입력값이 없습니다. 빈칸을 수정해주세요.`
                          : users?.stack} */}
                    </RowTwo>
                  </Rows>
                </FlexCol>
              </InnerWrap>
            </Inform>
          </>
        ) : (
          <Modification users={users} setModify={(bool) => setModify(bool)} />
        )}
      </Container>
    </>
  );
};
export default MyPage;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 20px auto;
  padding: 20px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 400;
  img {
    width: 120px;
    height: 120px;
  }
`;

const Modify = styled.div`
  display: flex;
  justify-content: right;
  margin-bottom: 10px;
`;

const Btn = styled.button`
  width: 70px;
  text-align: center;
  color: #585858;
  cursor: pointer;
  background-color: white;
  border: 1px solid lightgray;
`;

const Inform = styled.div`
  width: 100%;
  background-color: white;
  border: 1px solid lightgray;
`;

const InnerWrap = styled.div`
  width: 100%;
  padding: 50px;
`;

const Rows = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 100px;
  gap: 140px;
  padding-left: 50px;
`;

const RowOne = styled.div`
  width: 200px;
  font-size: 20px;
  white-space: pre-line;
  &:first-child {
    color: #585858;
  }
`;

const RowTwo = styled(RowOne)`
  width: 600px;
`;

const SubTitle = styled.div`
  margin: 40px 0 20px 0;
  font-size: 20px;
  font-weight: 600;
`;

const Button = styled.button`
  width: 50px;
  height: 20px;
`;

const Img = styled.img`
  box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
`;
const ImgBox = styled(FlexCol)`
  position: relative;
`;
const ImgChangeLabel = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  width: 36px;
  height: 36px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
`;
const ImgChangeInput = styled.input`
  display: none;
  /* &::file-selector-button {
    display: none;
  } */
`;

// const Container = styled.div``;

// const Container = styled.div``;
