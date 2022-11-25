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
export const Gap = styled.div`
  width: 100%;
  border-bottom: 1px solid lightgray;
  height: 100px;
`;
// Gap element 끝
// --------------------------
