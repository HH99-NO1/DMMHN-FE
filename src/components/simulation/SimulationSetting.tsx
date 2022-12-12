import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FlexCol, FlexRow, HeaderBox, Text } from "../../elements/elements";
import { instance } from "../../recoil/instance";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isOK, isSimulationState, test } from "../../recoil/atoms/atoms";
import TitleArea from "../../elements/TitleArea";
import CheckModal from "./CheckModal";

const SimulationSetting = () => {
  const setTest = useSetRecoilState(test);
  const isOKState = useRecoilValue(isOK);

  const myVideoRef = useRef<HTMLVideoElement>(null);
  const [number, setNumber] = useState("");
  const [category, setCategory] = useState("");
  console.log(number);
  console.log(category);
  const setSimulation = useSetRecoilState(isSimulationState);

  // 사용자 웹캠에 접근
  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 240,
          height: 200,
        },
        audio: true,
      });

      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 문항 수 변경 이벤트
  const onChangeNumber = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setNumber(value);
  };

  // 카테고리 선택 이벤트
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };

  // 서버 제출 이벤트
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (category.trim() === "" || number.trim() === "") {
      return alert("카테고리 또는 문항 수를 입력하세요.");
    }

    const config = {
      category: category,
      number: number,
    };
    console.log(config);

    if (window.confirm("모의면접을 시작하시겠습니까?")) {
      try {
        const { data } = await instance.post(`/mockInterview`, config);
        console.log(data);
        setTest(data);
        setSimulation(true);
        return;
      } catch (e) {
        console.log(e);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    getMedia();
  }, [myVideoRef]);

  return (
    <>
      {!isOKState && <CheckModal />}
      <HeaderBox />
      <TitleArea>모의면접 입장</TitleArea>
      <BGBlack>
        <Ctn>
          <FlexCol gap="30px">
            <FlexCol as="form" gap="30px" width="100%" onSubmit={onSubmit}>
              <SubTitleMob
                width="100%"
                gap="10px"
                justifyContent="space-between"
              >
                <SubTitle>카테고리</SubTitle>
                <OptionBox>
                  <FlexRow gap="5px" justifyContent="space-between">
                    <Select
                      name="category"
                      id="category-select"
                      value={category}
                      onInput={onInput}
                    >
                      <option value="none">
                        -- 모의면접을 진행할 포지션을 선택해주세요 --
                      </option>
                      <option value="react">프론트엔드 - React.js</option>
                      <option value="node">백엔드 - Node.js</option>
                      <option value="spring">백엔드 - spring</option>
                    </Select>
                  </FlexRow>
                </OptionBox>
              </SubTitleMob>
              <SubTitleMob
                width="100%"
                gap="10px"
                justifyContent="space-between"
              >
                <SubTitle>문항 수</SubTitle>
                <OptionBox>
                  <Input
                    type="text"
                    min={1}
                    max={50}
                    placeholder="모의 면접을 진행할 문항 수를 설정해주세요."
                    name="number"
                    value={number}
                    onChange={onChangeNumber}
                  />
                  <RightAbs>개</RightAbs>
                </OptionBox>
              </SubTitleMob>
              <Video ref={myVideoRef} muted autoPlay />
              <Text color="white">준비가 완료되면 시작버튼을 클릭해주세요</Text>
              <Button>모의면접 시작</Button>
            </FlexCol>
          </FlexCol>
        </Ctn>
      </BGBlack>
    </>
  );
};

const BGBlack = styled.div`
  width: 100%;
  height: calc(100vh - 121px);
  background: #092001;
`;

const Ctn = styled.div`
  background: #002c17;
  border: 1px solid #014021;
  border-radius: 20px;
  position: fixed;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 30px;
  color: #fff;
  @media screen and (max-width: 500px) {
    width: 90%;
  }
`;

const SubTitleMob = styled(FlexRow)`
  @media screen and (max-width: 500px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const SubTitle = styled(Text)`
  min-width: 70px;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  @media screen and (max-width: 500px) {
    padding-left: 10px;
  }
`;

const OptionBox = styled.div`
  position: relative;
  min-height: 44px;
  width: 100%;
  border: 3px solid ${(props) => props.theme.__grayMedium};
  border-radius: 22px;
  box-sizing: border-box;
  padding: 10px;
`;

const Select = styled.select`
  border: none;
  overflow: hidden;
  font-size: 16px;
  font-weight: 600;
  appearance: none;
  width: 100%;
  background-color: inherit;
  color: #fff;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  font-size: 16px;
  background-color: transparent !important;
  color: #fff;
  :focus {
    background: transparent;
  }

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    appearance: none;
  }

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    -webkit-text-fill-color: #fff;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  :autofill,
  :autofill:hover,
  :autofill:focus,
  :autofill:active {
    -webkit-text-fill-color: #fff;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;
const RightAbs = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
`;
const Button = styled.button`
  color: #fff;
  max-width: 240px;
  width: 100%;
  border-radius: 20px;
  padding: 10px 20px;
  border: 3px solid ${(props) => props.theme.__grayLight};
  font-size: 16px;
  font-weight: 600;
  transition: all, 0.2s;
  background-color: transparent;
  cursor: pointer;
`;
const Video = styled.video`
  width: 240px;
  height: 200px;
  border-radius: 10px;
  background-color: #000;
  box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.5);
  margin-bottom: 30px;
`;

export default SimulationSetting;
