import Layout from "../components/home/Layout";
import styled from "styled-components";
import { FlexRow, FlexCol } from "../elements/elements";
import { instance } from "../recoil/instance";
import { useEffect, useState } from "react";

interface IUsers {
  memberEmail: string;
  _id: string;
  updatedAt: string;
  createdAt: string;
}

const MyPage = () => {
  const [users, setUsers] = useState<IUsers>();
  useEffect(() => {
    instance.get(`/members/me`).then((response) => {
      return setUsers(response.data);
    });
  }, []);
  console.log(users?.memberEmail);
  return (
    <>
      <Layout>
        <Container>
          <Tap>
            <TapMenu>
              <li>모의 면접 시작</li>
              <li>모의 면접 현황</li>
              <li>프로필</li>
            </TapMenu>
            <Content>
              <Indicate>
                <span>개인정보</span>
              </Indicate>
              <FlexCol gap="20px" alignItem="left">
                <Rows>
                  <Wrap>
                    <Photo></Photo>
                  </Wrap>
                  <Row>{users?.memberEmail}</Row>
                </Rows>
                <Rows>
                  <Row>연결된 소셜 계정</Row>
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
            </Content>
          </Tap>
        </Container>
      </Layout>
    </>
  );
};
export default MyPage;

const Container = styled.div``;

const Tap = styled.div`
  height: 50px;
  border: 3px solid lightgrey;
  border-radius: 50px;
`;

const TapMenu = styled.ul`
  display: flex;
  height: 50px;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
`;

const Indicate = styled.div`
  margin: 50px auto;
  height: 50px;
  background-color: lightgray;
  border-radius: 50px;
  line-height: 50px;
  span {
    padding-left: 30px;
  }
`;

const Content = styled.div`
  margin: 0 auto;
  width: 1000px;
`;

const Photo = styled.img`
  background-color: aliceblue;
  width: 100px;
  height: 100px;
  border-radius: 100%;
`;

const Rows = styled.div`
  width: 1000px;
  display: flex;
  align-items: center;
  flex-basis: 100px;
  gap: 250px;
  padding-left: 30px;
`;

const Row = styled.div`
  width: 200px;
`;

const Wrap = styled.div`
  width: 200px;
`;
