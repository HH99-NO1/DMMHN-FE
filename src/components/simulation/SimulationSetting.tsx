import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FlexCol, FlexRow, Text } from "../../elements/elements";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { instance } from "../../recoil/instance";
import { useSetRecoilState } from "recoil";
import { isSimulationState, test } from "../../recoil/atoms/atoms";
import axios from "axios";

const SimulationSetting = () => {
  const setTest = useSetRecoilState(test);

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
        // url 바꿔야 함
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
    <Ctn>
      <FlexCol gap="30px">
        <TitleBar>모의면접 준비</TitleBar>
        <FlexCol as="form" gap="20px" width="100%" onSubmit={onSubmit}>
          <FlexRow width="100%" gap="10px" justifyContent="space-between">
            <Text style={{ minWidth: "70px" }} fontSize="16px" fontWeight="400">
              카테고리
            </Text>
            <OptionBox>
              <FlexRow gap="5px" justifyContent="space-between">
                <Select
                  name="category"
                  id="category-select"
                  defaultValue=""
                  value={category}
                  onInput={onInput}
                >
                  <option value="">
                    -- 모의면접을 진행할 포지션을 선택해주세요 --
                  </option>
                  <option value="react">프론트엔드 - React.js</option>
                  <option value="node">백엔드 - Node.js</option>
                </Select>
                <HiOutlineChevronUpDown size="20" />
              </FlexRow>
            </OptionBox>
          </FlexRow>
          <FlexRow width="100%" gap="10px" justifyContent="space-between">
            <Text style={{ minWidth: "70px" }} fontSize="16px" fontWeight="400">
              문항 수
            </Text>
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
          </FlexRow>
          <Video ref={myVideoRef} muted autoPlay />
          <Button>모의면접 시작</Button>
        </FlexCol>
      </FlexCol>
    </Ctn>
  );
};

const Ctn = styled.div`
  border: 1px solid red;
  padding: 20px;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
`;
const Form = styled(FlexCol)``;
const TitleBar = styled.div`
  padding: 10px 20px;
  border-radius: 20px;
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  background-color: ${(props) => props.theme.__grayLight};
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
`;
const Input = styled.input`
  border: none;
  width: 100%;
  font-size: 16px;
  background-color: inherit;

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    appearance: none;
  }
`;
const RightAbs = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
`;
const Button = styled.button`
  max-width: 240px;
  width: 100%;
  border-radius: 20px;
  padding: 10px 20px;
  border: 3px solid ${(props) => props.theme.__grayLight};
  font-size: 16px;
  font-weight: 600;
  transition: all, 0.3s;
  background-color: inherit;
  cursor: pointer;
  :hover {
    border: 3px solid ${(props) => props.theme.__greenMidium};
    /* color: ${(props) => props.theme.__greenMidium}; */
  }
`;
const Video = styled.video`
  border-radius: 10px;
  box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.5);
`;

export default SimulationSetting;
