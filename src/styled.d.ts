import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    __lineGray?: string;
    __grayLight?: string;
    __grayMedium?: string;
    __grayDark?: string;
    __red?: string;
    __greenMidium?: string;

  }
}
