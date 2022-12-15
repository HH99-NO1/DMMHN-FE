import { atom } from "recoil";

interface ITest {
  category: string;
  questionArr: string[];
}

export const test = atom<ITest>({
  key: "test",
  default: undefined,
});

export const isSimulationState = atom({
  key: "isSimulation",
  default: false,
});

// 로그인 창을 띄워주기 위한 상태
export const onLoginState = atom({
  key: "onLogin",
  default: false,
});

// 로그인이 되어있는지 체크하기 위한 상태
const preAccessToken = sessionStorage.getItem("accessToken");
const checkDefaultLoginState = preAccessToken ? true : false;
// console.log(checkDefaultLoginState);

export interface IUserState {
  memberName: string | null;
  img: string | ArrayBuffer | null;
}

const userName = sessionStorage.getItem("userName");
const userImg = sessionStorage.getItem("userImg");
export const userState = atom<IUserState>({
  key: "userState",
  default: {
    memberName: userName,
    img: userImg,
  },
});

export const isLoginState = atom({
  key: "isLogin",
  default: checkDefaultLoginState,
});

// 모의면접 안내 및 영상녹화 동의
export const isOK = atom({
  key: "isOK",
  default: false,
});

// 이메일 인증 모달 처리
export const isCheckEmail = atom({
  key: "isCheckEmail",
  default: false,
});

// 이메일 인증 서버코드
export const serverCodeNumber = atom({
  key: "serverCodeNumber",
  default: 0,
});

// 인증코드를 발송한 유저 이메일
export const userEmailValue = atom({
  key: "userEmailValue",
  default: "",
});

// 이메일 체크 성공여부
export const checkSucceedState = atom({
  key: "checkSucceedState",
  default: false,
});
