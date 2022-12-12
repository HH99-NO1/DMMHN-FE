import Layout from "../home/Layout";
import styled from "styled-components";
import { FlexRow, FlexCol, Text, Gap } from "../../elements/elements";
import { instance } from "../../recoil/instance";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useFormState } from "react-hook-form";
import DatePicker, { ReactDatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";

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
  const [startDate, setStartDate] = useState(new Date());
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<IProps>({
    // defaultValues: {
    //   email: "@naver.com",
    // },
    // mode: "onChange",
    // criteriaMode: "firstError",
  });

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
      <Modify>
        <SubTitle>개인정보</SubTitle>
        <Btn type="button" onClick={() => setModify(false)}>
          수정완료
        </Btn>
      </Modify>
      <Inform onSubmit={onSubmit}>
        <InnerWrap>
          <FlexCol alignItem="left">
            <Rows>
              <RowOne>계정</RowOne>
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
                {/* <input type="text" value={birth || ""} onChange={onBirth} /> */}
                <Controller
                  control={control}
                  name="users.birth"
                  render={() => (
                    <DatePicker
                      {...register("users.birth")}
                      locale={ko}
                      dateFormat="yyyy - MM - dd"
                      className="birth-datepicker"
                      selected={startDate}
                      minDate={new Date("1900-01-01")}
                      placeholderText="생년월일을 입력"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      onChange={(date: Date) => setStartDate(date)}
                    />
                  )}
                />
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
  justify-content: space-between;
  margin: 10px;
  margin-top: 60px;
`;

const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  @media screen and (max-width: 600px) {
    font-size: 17px;
  }
`;

const Btn = styled.button`
  width: 70px;
  height: 30px;
  color: #585858;
  cursor: pointer;
  background-color: transparent;
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
  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding-left: 0;
  }
`;

const RowOne = styled.div`
  width: 200px;
  font-size: 20px;
  white-space: pre-line;
  &:first-child {
    color: #585858;
  }
  @media screen and (max-width: 600px) {
    font-size: 17px;
  }
`;

const RowTwo = styled(RowOne)`
  width: 600px;
  input {
    width: 50%;
    height: 50px;
    padding: 8px 20px;
    border-radius: 67px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid ${(props) => props.theme.__grayLight};
    :focus {
      outline: 1px solid ${(props) => props.theme.__grayMedium};
    }
  }
`;

const Input = styled.input`
  width: 50%;
  height: 50px;
  padding: 8px 20px;
  border-radius: 67px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid ${(props) => props.theme.__grayLight};
  :focus {
    outline: 1px solid ${(props) => props.theme.__grayMedium};
  }
`;
