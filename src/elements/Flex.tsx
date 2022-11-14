import styled from "styled-components";

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

// const FlexRow = ({
//   width = "auto",
//   maxWidth = "auto",
//   gap = "0px",
//   alignItem = "inherit",
//   justifyContent = "auto",
//   border = "none",
//   bgColor = "transparent",
//   padding = "0",
//   borderRadius = "",
//   children,
// }: IFlexRow) => {
//   return (
//     <Ctn
//       width={width}
//       maxWidth={maxWidth}
//       gap={gap}
//       alignItem={alignItem}
//       justifyContent={justifyContent}
//       bgColor={bgColor}
//       padding={padding}
//       border={border}
//       borderRadius={borderRadius}
//     >
//       {children}
//     </Ctn>
//   );
// };

export const FlexRow = styled.div<IFlex>`
  display: flex;
  flex-direction: row;
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  gap: ${(props) => props.gap};
  align-items: ${(props) => props.alignItem};
  justify-content: ${(props) => props.justifyContent};
  background-color: ${(props) => props.bgColor};
  padding: ${(props) => props.padding};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
`;

export const FlexCol = styled.div<IFlex>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  gap: ${(props) => props.gap};
  align-items: ${(props) => props.alignItem};
  justify-content: ${(props) => props.justifyContent};
  background-color: ${(props) => props.bgColor};
  padding: ${(props) => props.padding};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
`;
