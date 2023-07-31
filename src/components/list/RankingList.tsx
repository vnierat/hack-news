import { useState, useEffect, FC } from "react";
import { useRecoilState } from "recoil";
import { Article } from "../../api/newsApi";
import { RankingListState } from "../../recoil/atoms";
import { getArticlesList } from "../../api/newsApi";
import "./RankingList.css";
import ArticleItem from "./item/ArticleItem";

const RankingList: FC = () => {
  const [articles, setRankingList] =
    useRecoilState<Article[]>(RankingListState);
  const [page, setPage] = useState(1);
  const [responseLength, setResponseLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getInitialArticles = async () => {
      setIsLoading(true);
      try {
        const {
          articles: initialArticles,
          responseLength: initialResponseLength,
        } = await getArticlesList(page);
        setRankingList(initialArticles);
        setResponseLength(initialResponseLength);
      } catch (error) {
        console.error("Error fetching initial articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch initial articles only if the articles array is empty
    if (articles.length === 0) {
      getInitialArticles();
    }
  }, [articles.length, page, setRankingList]);

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const { articles: newArticles, responseLength: newResponseLength } =
        await getArticlesList(nextPage);
      setRankingList((prevArticles) => [...prevArticles, ...newArticles]);
      setResponseLength(newResponseLength);
      setPage(nextPage);
    } catch (error) {
      console.error("Error fetching more articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="globalWrapper">
      <div>
        {articles.map((article: Article, index: number) => (
          <div key={index}>
            <ArticleItem index={index} article={article} />
          </div>
        ))}
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        responseLength > articles.length && (
          <button className="moreButton" onClick={handleLoadMore}>
            Load more articles...
          </button>
        )
      )}
    </div>
  );
};

export default RankingList;
