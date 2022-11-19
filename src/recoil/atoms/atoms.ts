import { atom, selector } from "recoil";

export interface IStream {
  videoState: string;
  audioState: string;
}

export const StreamState = atom<IStream[]>({
  key: "streamControl",
  default: [],
});

// export interface ILocalVideo {
// 	onChange: boolean;
// }

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
