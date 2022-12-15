import Layout from "../home/Layout";
import styled from "styled-components";
import { FlexRow, FlexCol, Text } from "../../elements/elements";
import { instance } from "../../recoil/instance";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useFormState } from "react-hook-form";
import DatePicker, { ReactDatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";

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
  const [startDate, setStartDate] = useState(new Date());

  const { register, handleSubmit, control } = useForm<IProps>({});

  const onSubmit = async (submitData: IProps) => {
    console.log(submitData);
    try {
      const year = startDate.getFullYear();
      const month = ("0" + (startDate.getMonth() + 1)).slice(-2);
      const day = ("0" + startDate.getDate()).slice(-2);
      const dateString = year + "년 " + month + "월 " + day + "일";
      const req = {
        memberName: submitData.users?.memberName,
        birth: dateString,
        job: submitData.users?.job,
        stack: submitData.users?.stack,
      };
      console.log(req);
      const { data } = await instance.patch(`members/me`, req);
      console.log(data);
      window.location.replace("/mypage");
    } catch (error: unknown | any) {
      return error.response;
    }
  };

  return (
    <>
      <Container onSubmit={handleSubmit(onSubmit)}>
        <Modify>
          <SubTitle>개인정보</SubTitle>
          <Btn type="button" onClick={() => setModify(false)}>
            수정취소
          </Btn>
        </Modify>
        <Inform>
          <InnerWrap>
            <FlexCol alignItem="left">
              <Rows>
                <RowOne>생년월일</RowOne>
                <RowTwo>
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
                  <SelectDiv>
                    <Label htmlFor="seeker">
                      <input
                        id="seeker"
                        {...register("users.job")}
                        type="radio"
                        value="취준생"
                        defaultChecked
                      />
                      취준생
                    </Label>
                    <Label htmlFor="frontDev">
                      <input
                        id="frontDev"
                        {...register("users.job")}
                        type="radio"
                        value="프론트개발자"
                      />
                      프론트개발자
                    </Label>
                    <Label htmlFor="backDev">
                      <input
                        id="backDev"
                        {...register("users.job")}
                        type="radio"
                        value="백엔드개발자"
                      />
                      백엔드개발자
                    </Label>
                  </SelectDiv>
                </RowTwo>
              </Rows>
              <Rows>
                <RowOne>스택</RowOne>
                <RowTwo>
                  <SelectDiv>
                    <Label htmlFor="javaScript">
                      <input
                        id="javaScript"
                        {...register("users.stack")}
                        type="checkbox"
                        value="javaScript"
                        defaultChecked
                      />
                      javaScript
                    </Label>
                    <Label htmlFor="React">
                      <input
                        id="React"
                        {...register("users.stack")}
                        type="checkbox"
                        value="React"
                      />
                      React
                    </Label>
                  </SelectDiv>
                  <SelectDiv>
                    <Label htmlFor="Nodejs">
                      <input
                        id="Nodejs"
                        {...register("users.stack")}
                        type="checkbox"
                        value="Node.js"
                      />
                      Node.js
                    </Label>
                    <Label htmlFor="Spring">
                      <input
                        id="Spring"
                        {...register("users.stack")}
                        type="checkbox"
                        value="Spring"
                      />
                      Spring
                    </Label>
                  </SelectDiv>
                </RowTwo>
              </Rows>
              <BtnBox>
                <ModifyBtn type="submit">수정완료</ModifyBtn>
              </BtnBox>
            </FlexCol>
          </InnerWrap>
        </Inform>
      </Container>
    </>
  );
};
export default MyPage;

const Container = styled.form``;

const SelectDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Label = styled.label`
  margin-right: 10px;
  font-size: 14px;
  text-align: center;
  :last-child {
    margin-left: 0;
  }
`;

const Modify = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
  margin-top: 60px;
`;

const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  @media screen and (max-width: 740px) {
    font-size: 16px;
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

const Inform = styled.div`
  width: 100%;
  background-color: #fff;
  border: 1px solid lightgray;
`;

const InnerWrap = styled.div`
  width: 100%;
  padding: 50px;
  display: flex;
  justify-content: center;
`;

const Rows = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 100px;
  padding-left: 50px;
  @media screen and (max-width: 740px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding-left: 0;
  }
`;

const RowOne = styled.div`
  width: 200px;
  font-size: 20px;
  font-weight: 600;
  white-space: pre-line;
  &:first-child {
    color: #585858;
  }
  @media screen and (max-width: 740px) {
    font-size: 16px;
  }
`;

const RowTwo = styled(RowOne)`
  width: 400px;
  display: flex;
  gap: 10px;
  input {
    padding: 8px 20px;
    border-radius: 67px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid ${(props) => props.theme.__grayLight};
    :focus {
      outline: 1px solid ${(props) => props.theme.__grayMedium};
    }
    @media screen and (max-width: 600px) {
      width: 100%;
      box-shadow: none;
      :focus {
        outline: none;
      }
    }
  }
  @media screen and (max-width: 600px) {
    width: auto;
  }
`;
const DatePickerWid = styled(DatePicker)`
  width: 100% !important;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
`;
const ModifyBtn = styled(Btn)`
  width: 140px;
`;
