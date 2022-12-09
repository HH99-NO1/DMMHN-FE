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

// 로그인의 필요 여부를 체크하기 위한 상태
export const isReqLoginState = atom({
  key: "isReqLogin",
  default: false,
});

// interface ILoginUser {
//   createdAt: string;
//   memberEmail: string;
//   updatedAt: string;
//   _id: string;
// }

// export const loginUserState = atom<ILoginUser[]>({
//   key: "loginUser",
//   default: [
//     {
//       createdAt: "",
//       memberEmail: "",
//       updatedAt: "",
//       _id: "",
//     },
//   ],
// });

export interface IStream {
  videoState: string;
  audioState: string;
}

export const StreamState = atom<IStream[]>({
  key: "streamControl",
  default: [],
});

export interface ILocalVideo {
  onChange: boolean;
}

export const LocalVideoState = atom({
  key: "LocalVideo",
  default: true,
});

// selector 때 쓰던거. 지금 필요 없음
// export enum Categories {
// 	'TO_DO' = 'TO_DO',
// 	'DOING' = 'DOING',
// 	'DONE' = 'DONE',
// }

// export interface IToDo {
// 	text: string;
// 	id: number;
// 	// category: Categories;
// }

// export const categoryState = atom<Categories>({
// 	key: 'category',

// 	default: Categories.TO_DO,
// });

// export const toDoState = atom<IToDo[]>({
// 	key: 'toDo',
// 	default: [],
// });
// export const toDoSelector = selector({
// 	key: 'toDoSelector',
// 	get: ({ get }) => {
// 		const toDos = get(toDoState);
// 		const category = get(categoryState);
// 		return toDos.filter((toDo) => toDo.category === category);
// 	},
// });

// 모의면접 커스텀 질문페이지 상태
export const isCustom = atom({
  key: "isCustom",
  default: false,
});

// 모의면접 안내 및 영상녹화 동의
export const isOK = atom({
  key: "isOK",
  default: false,
});
