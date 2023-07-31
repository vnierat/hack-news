import { atom } from "recoil";

export const articleListState = atom<any[]>({
  key: "articleListState",
  default: [],
});
