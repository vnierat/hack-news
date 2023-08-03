import { useState, useEffect, FC } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Article } from "../../api/newsApi";
import { LoadingState, RankingListState } from "../../recoil/atoms";
import "./RankingList.css";
import ArticleItem from "./item/ArticleItem";

const RankingList: FC = () => {
  const [allArticles] = useRecoilState<Article[]>(RankingListState);
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const isLoading = useRecoilValue(LoadingState);

  const twenty = 20;

  useEffect(() => {
    const startIndex = (page - 1) * twenty;
    const endIndex = startIndex + twenty;
    const listLoaded = allArticles.slice(0, endIndex);
    setDisplayedArticles(listLoaded);
  }, [allArticles, page]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
  };

  return (
    <div className="globalWrapper">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            {displayedArticles.map((article: Article, index: number) => (
              <div key={index}>
                <ArticleItem index={index} article={article} />
              </div>
            ))}
          </div>
          {displayedArticles.length < allArticles.length && (
            <button className="moreButton" onClick={handleLoadMore}>
              Load more articles...
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default RankingList;
