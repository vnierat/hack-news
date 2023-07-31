import React, { useEffect, useState, FC } from "react";
import { useRecoilState } from "recoil";
import Header from "./components/header/Header";
import RankingList from "./components/list/RankingList";
import { getArticlesList, Article } from "./api/newsApi";
import { RankingListState } from "./recoil/atoms";

const App: FC = () => {
  const [, setRankingList] = useRecoilState<Article[]>(RankingListState);
  const [page] = useState(1);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const { articles: fetchedArticles } = await getArticlesList(page);
        setRankingList(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    getArticles();
  }, [setRankingList, page]);

  return (
    <div>
      <Header />
      <RankingList />
    </div>
  );
};

export default App;
