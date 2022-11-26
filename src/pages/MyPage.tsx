import Layout from "../components/home/Layout";
import styled from "styled-components";
import { FlexRow, FlexCol, Text, Gap } from "../elements/elements";
import { instance } from "../recoil/instance";
import { useEffect, useState } from "react";
import { RepeatOneSharp } from "@material-ui/icons";

interface IUsers {
  memberEmail: string;
  _id: string;
  updatedAt: string;
  createdAt: string;
  profileImg: string;
  major: string;
  stack: string;
  phoneNumber: string;
}

const MyPage = () => {
  const [users, setUsers] = useState<IUsers>();
  useEffect(() => {
    instance.get(`/members/me`).then((response) => {
      return setUsers(response.data);
    });
  }, []);

  console.log(users?.profileImg);
  return (
    <>
      <Layout>
        <Container>
          <Profile>
            <FlexRow gap="45px">
              <img src={users?.profileImg}></img>
              <FlexCol gap="20px" alignItem="left">
                <Text>홍길동</Text>
                <Text>{users?.memberEmail}</Text>
              </FlexCol>
            </FlexRow>
          </Profile>
          <SubTitle>개인정보</SubTitle>
          <Modify>
            <Btn>수정하기</Btn>
          </Modify>
          <Inform>
            <InnerWrap>
              <FlexCol alignItem="left">
                <Rows>
                  <RowOne>소셜 계정</RowOne>
                  <RowTwo>{users?.memberEmail}</RowTwo>
                </Rows>
                <Rows>
                  <RowOne>전공</RowOne>
                  <RowTwo>
                    {users?.major === undefined
                      ? `입력값이 없습니다. 빈칸을 수정해주세요.`
                      : users?.major}
                  </RowTwo>
                </Rows>
                <Rows>
                  <RowOne>연락처</RowOne>
                  <RowTwo>
                    {users?.phoneNumber === undefined
                      ? `입력값이 없습니다. 빈칸을 수정해주세요.`
                      : users?.phoneNumber}
                  </RowTwo>
                </Rows>
                <Rows>
                  <RowOne>스택</RowOne>
                  <RowTwo>
                    {users?.stack === undefined
                      ? `입력값이 없습니다. 빈칸을 수정해주세요.`
                      : users?.stack}
                  </RowTwo>
                </Rows>
              </FlexCol>
            </InnerWrap>
          </Inform>
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

// const Container = styled.div``;

// const Container = styled.div``;
