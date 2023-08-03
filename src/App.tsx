import React, { useEffect, FC } from "react";
import { useRecoilState } from "recoil";
import Header from "./components/header/Header";
import RankingList from "./components/list/RankingList";
import { getArticlesList, Article } from "./api/newsApi";
import { LoadingState, RankingListState } from "./recoil/atoms";

const App: FC = () => {
  const [, setRankingList] = useRecoilState<Article[]>(RankingListState);
  const [, setIsLoading] = useRecoilState(LoadingState);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const newArticles = await getArticlesList();
        setRankingList(newArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [setRankingList, setIsLoading]);

  return (
    <div>
      <Header />
      <RankingList />
    </div>
  );
};

export default App;
