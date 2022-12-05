import { atom } from "recoil";

interface ITest {
  category: string;
  questionArr: [string];
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
  memberName: string;
  img: string;
  iat: number;
  exp: number;
}

export const userState = atom<IUserState>({
  key: "userState",
  default: undefined,
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
