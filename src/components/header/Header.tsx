import { useEffect, FC, useCallback } from "react";
import { useRecoilState } from "recoil";
import { getArticlesList } from "../../api/newsApi";
import { LoadingState, RankingListState } from "../../recoil/atoms";
import { ReactComponent as RefreshIcon } from "../../icons/refreshIcon.svg";
import "./Header.css";

const Header: FC = () => {
  const [, setRankingList] = useRecoilState(RankingListState);
  const [isLoading, setIsLoading] = useRecoilState(LoadingState);

  const refreshData = useCallback(async () => {
    try {
      setIsLoading(true);
      const newArticles = await getArticlesList();
      setRankingList(newArticles);
    } catch (error) {
      console.error("Error refreshing articles:", error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setRankingList]);

  useEffect(() => {
    if (!isLoading) {
      const refreshInterval = setInterval(refreshData, 30000);

      return () => {
        clearInterval(refreshInterval);
      };
    }
  }, [setRankingList, isLoading, refreshData]);

  return (
    <div className="header">
      <div>Hacker News</div>
      <button
        className="refreshButton"
        onClick={refreshData}
        disabled={isLoading}
      >
        <RefreshIcon
          className={
            isLoading ? "refresh-icon rotating notAllowed" : "refresh-icon"
          }
        />
      </button>
    </div>
  );
};

export default Header;
