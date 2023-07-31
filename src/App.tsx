import React, { useEffect, useState, FC } from "react";
import { useRecoilState } from "recoil";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import { fetchArticles, Article } from "./api/hackerNewsApi";
import { articleListState } from "./recoil/atoms";

const App: FC = () => {
  const [, setArticleList] = useRecoilState<Article[]>(articleListState);
  const [page] = useState(1);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const { articles: fetchedArticles } = await fetchArticles(page);
        setArticleList(fetchedArticles); // Use the articles array directly
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    getArticles();
  }, [setArticleList, page]);

  return (
    <div>
      <Header />
      <ArticleList />
    </div>
  );
};

export default App;
