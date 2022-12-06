import Layout from "../components/home/Layout";
import styled from "styled-components";
import { FlexRow, FlexCol, Text, Gap } from "../elements/elements";
import { instance } from "../recoil/instance";
<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Modification from "../components/modify/Modification";
>>>>>>> ddf71c19612fac9034d8197e9ff1d37d8d060036

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

  console.log(users?.job);
  useEffect(() => {
    instance.get(`/members/me`).then((response) => {
      console.log(response);
      return setUsers(response.data);
    });
  }, []);

  // const inputRef = useRef<HTMLInputElement | null>(null);
  // const onUploadImageButtonClick = () => {
  //   if (!inputRef.current) {
  //     return;
  //   }
  //   inputRef.current.click();
  // };

  const onChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      console.log(e.target.files);
      const uploadFile = e.target.files[0];
      console.log(uploadFile);
      const formData = new FormData();
      formData.append("profileImg", uploadFile);

      await instance({
        method: "patch",
        url: "/members/me",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
  };

  return (
    <>
      <Layout>
        <Container>
          <Profile>
            <FlexRow gap="45px">
              {/* <Button
                label="이미지 업로드"
                onClick={onUploadImageButtonClick}
              /> */}
              <FlexCol>
                <img src={users?.img}></img>
                <form>
                  <label htmlFor="profileImg" />
                  <input
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
              </FlexCol>
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
      </Layout>
    </>
  );
};
export default MyPage;

const Container = styled.div`
  width: 1290px;
  margin: 0 auto;
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

// const Container = styled.div``;

// const Container = styled.div``;
