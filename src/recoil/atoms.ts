import { atom } from "recoil";
import { Article } from "../api/newsApi";

export const RankingListState = atom<Article[]>({
  key: "RankingListState",
  default: [],
});

export const LoadingState = atom({
  key: "loadingState",
  default: false,
});
