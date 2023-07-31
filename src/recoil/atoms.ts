import { atom } from "recoil";
import { Article } from "../api/newsApi";

export const RankingListState = atom<Article[]>({
  key: "RankingListState",
  default: [],
});
