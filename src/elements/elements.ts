import styled from "styled-components";

// FlexRow, FlexCol element 시작
interface IFlex {
  width?: string;
  maxWidth?: string;
  gap?: string;
  alignItem?: string;
  justifyContent?: string;
  border?: string;
  bgColor?: string;
  padding?: string;
  borderRadius?: string;
  fontSize?: string;
}

export const FlexRow = styled.div<IFlex>`
  display: flex;
  flex-direction: row;
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  gap: ${(props) => props.gap};
  align-items: ${(props) =>
    props.alignItem === undefined ? "center" : props.alignItem};
  justify-content: ${(props) => props.justifyContent};
  background-color: ${(props) => props.bgColor};
  padding: ${(props) => props.padding};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  /* font-family: "Noto Sans KR", sans-serif; */
`;

export const FlexCol = styled(FlexRow)<IFlex>`
  flex-direction: column;
`;
// FlexRow, FlexCol element 끝
// --------------------------
// Text element 시작
interface IText {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
}

export const Text = styled.span<IText>`
  /* font-family: "Noto Sans KR", sans-serif; */
  font-size: ${(props) => props.fontSize}; // 기본: 14px
  font-weight: ${(props) => props.fontWeight}; // 기본: 300
  color: ${(props) => props.color}; // 기본: #222222
`;
// Text element 끝
// --------------------------
// Liner element 시작
export const Liner = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ebebeb;
`;
// Liner element 끝
// --------------------------
// Gap element 시작
interface IGap {
  gap?: string;
}
export const Gap = styled.div<IGap>`
  width: 100%;
  /* border: 2px solid blue; */
  height: ${(props) => (props.gap === undefined ? "60px" : props.gap)};
`;
// Gap element 끝
// --------------------------
// HeaderBox element 시작
export const HeaderBox = styled(Gap)`
  height: 60px;
  background-color: #004922;
`;
// HeaderBox element 끝
// --------------------------
