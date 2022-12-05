import Layout from "../home/Layout";
import styled from "styled-components";
import { FlexRow, FlexCol, Text, Gap } from "../../elements/elements";
import { instance } from "../../recoil/instance";
import React, { useEffect, useState } from "react";

interface IUsers {
  memeberName: string;
  memberEmail: string;
  img: string;
  stack: string;
  birth: string;
  job: string;
  gender: string;
}

interface IProps {
  users:
    | {
        memberName: string;
        memberEmail: string;
        img: string;
        stack: string;
        birth: string;
        job: string;
        gender: string;
      }
    | undefined;
  setModify: (state: boolean) => void;
}

const MyPage = ({ users, setModify }: IProps) => {
  const [membersEmail, setMembersEmail] = useState(users?.memberEmail);
  const [birth, setBirth] = useState(users?.birth);
  const [job, setJob] = useState(users?.job);
  const [stack, setStack] = useState(users?.stack);
  // const [, ] = useState(users?.phoneNum);

  const onChangeEmail = (e: any) => {
    setMembersEmail(e?.currentTarget.value);
  };
  const onBirth = (e: any) => {
    setBirth(e?.currentTarget.value);
  };
  const onChangeMajor = (e: any) => {
    setJob(e?.currentTarget.value);
  };
  const onChangeStack = (e: any) => {
    setStack(e?.currentTarget.value);
  };
  // const  = (e: any) => {
  //   (e?.currentTarget.value);
  // };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(formData);
    formData.append("membersEmail", JSON.stringify(membersEmail));
    formData.append("birth", JSON.stringify(birth));
    formData.append("job", JSON.stringify(job));
    formData.append("stack", JSON.stringify(stack));

    await instance({
      method: "patch",
      url: "/members/me",
      data: formData,
      headers: {
        "content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <>
      <Inform onSubmit={onSubmit}>
        <Modify>
          <Btn type="button" onClick={() => setModify(false)}>
            수정완료
          </Btn>
        </Modify>
        <InnerWrap>
          <FlexCol alignItem="left">
            <Rows>
              <RowOne>소셜계정</RowOne>
              <RowTwo>
                <input
                  type="text"
                  value={membersEmail || ""}
                  onChange={onChangeEmail}
                />
              </RowTwo>
            </Rows>
            <Rows>
              <RowOne>생년월일</RowOne>
              <RowTwo>
                <input type="text" value={birth || ""} onChange={onBirth} />
              </RowTwo>
            </Rows>
            <Rows>
              <RowOne>직업</RowOne>
              <RowTwo>
                <input type="text" value={job || ""} onChange={onChangeMajor} />
              </RowTwo>
            </Rows>
            <Rows>
              <RowOne>스택</RowOne>
              <RowTwo>
                <input
                  type="text"
                  value={stack || ""}
                  onChange={onChangeStack}
                />
              </RowTwo>
            </Rows>
          </FlexCol>
        </InnerWrap>
      </Inform>
      {/* </Container> */}
    </>
  );
};
export default MyPage;

// const Container = styled.form``;

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

const Inform = styled.form`
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
  input {
    width: 300px;
    height: 40px;
  }
`;
