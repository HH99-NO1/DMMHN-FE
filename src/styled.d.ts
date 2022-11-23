import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    __grayLight?: string;
    __grayMedium?: string;
    __grayDark?: string;
    __greenMidium?: string;
  }
}
