import React, { useState, useEffect, FC } from "react";
import { useRecoilState } from "recoil";
import { Article } from "../api/hackerNewsApi";
import { articleListState } from "../recoil/atoms";
import { fetchArticles } from "../api/hackerNewsApi";
import "./ArticleList.css";

const ArticleList: FC = () => {
  const [articles, setArticleList] =
    useRecoilState<Article[]>(articleListState);
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
        } = await fetchArticles(page);
        setArticleList(initialArticles);
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
  }, [articles.length, page, setArticleList]);

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const { articles: newArticles, responseLength: newResponseLength } =
        await fetchArticles(nextPage);
      setArticleList((prevArticles) => [...prevArticles, ...newArticles]);
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
        {articles.map(({ title, score, by, url }: Article, index: number) => (
          <div className="articleWrapper" key={index}>
            <div className="infosWrapper">
              <span className="circle">
                <div className="number">{index + 1}</div>
              </span>
              <span>{title}</span>
            </div>
            <div className="additionalInfos">
              <span>Score: {score} - </span> <span>By: {by} - </span>{" "}
              {url && <span>Source: {new URL(url).origin} </span>}
            </div>
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

export default ArticleList;
