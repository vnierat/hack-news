import React, { useState, useEffect, FC } from "react";
import { useRecoilState } from "recoil";
import { getArticlesList } from "../../api/newsApi";
import { RankingListState } from "../../recoil/atoms";
import { ReactComponent as RefreshIcon } from "../../icons/refreshIcon.svg";
import "./Header.css";

const Header: FC = () => {
  const [, setRankingList] = useRecoilState(RankingListState);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = async () => {
    try {
      setIsRefreshing(true);
      const { articles: newArticles } = await getArticlesList(1);
      setRankingList(newArticles);
    } catch (error) {
      console.error("Error refreshing articles:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const refreshInterval = setInterval(refreshData, 30000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, [setRankingList]);

  return (
    <div className="header">
      <div>Hacker News</div>
      <button
        className="refreshButton"
        onClick={refreshData}
        disabled={isRefreshing}
      >
        {isRefreshing ? (
          <RefreshIcon className="refresh-icon rotating" />
        ) : (
          <RefreshIcon className="refresh-icon" />
        )}
      </button>
    </div>
  );
};

export default Header;
