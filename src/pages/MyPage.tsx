import Layout from "../components/home/Layout";
import styled from "styled-components";
import { FlexRow, FlexCol, Text, Gap } from "../elements/elements";
import { instance } from "../recoil/instance";
import { useEffect, useState } from "react";

interface IUsers {
  memberEmail: string;
  _id: string;
  updatedAt: string;
  createdAt: string;
  profileImg: string;
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
            <FlexRow gap="30px">
              <img src={users?.profileImg}></img>
              <Text>{users?.memberEmail}</Text>
            </FlexRow>
          </Profile>
          <SubTitle>개인정보</SubTitle>
          <Inform>
            <FlexCol gap="30px" alignItem="left">
              <Rows>
                <Row>연결된 소셜 계정</Row>
                <Row>{users?.memberEmail}</Row>
              </Rows>
              <Rows>
                <Row>전공</Row>
                <Row>{users?.memberEmail}</Row>
              </Rows>
              <Rows>
                <Row>연락처</Row>
                <Row>{users?.memberEmail}</Row>
              </Rows>
              <Rows>
                <Row>스택</Row>
                <Row>{users?.createdAt}</Row>
              </Rows>
            </FlexCol>
          </Inform>
        </Container>
      </Layout>
    </>
  );
};
export default MyPage;

const Container = styled.div`
  width: 1290px;
  margin: 20px auto;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
`;

const Inform = styled.div`
  width: 100%;
  height: 500px;
  background-color: white;
`;

const Rows = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 100px;
  gap: 150px;
  padding-left: 50px;
`;

const Row = styled.div`
  width: 200px;
`;

const SubTitle = styled.div`
  margin: 40px 0 40px 0;
  font-size: 20px;
  font-weight: 600;
`;

// const Container = styled.div``;

// const Container = styled.div``;
