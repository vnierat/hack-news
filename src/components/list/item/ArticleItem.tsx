import React from "react";
import { Article } from "../../../api/newsApi";
import "./ArticleItem.css";

interface ArticleItemProps {
  index: number;
  article: Article;
}

const ArticleItem: React.FC<ArticleItemProps> = ({ index, article }) => {
  const { title, score, url, by } = article;

  return (
    <div className="articleWrapper">
      <div className="infosWrapper">
        <span className="circle">
          <div className="number">{index + 1}</div>
        </span>
        <span>{title}</span>
      </div>
      <div className="additionalInfos">
        <span>Score: {score} | </span> <span>By: {by} </span>{" "}
        {url && <span> | Source: ({new URL(url).origin}) </span>}
      </div>
    </div>
  );
};

export default ArticleItem;
