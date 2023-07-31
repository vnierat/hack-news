import axios from "axios";

export const BASE_URL = "https://hacker-news.firebaseio.com/v0";

export interface Article {
  title: string;
  score: number;
  url: string;
  id: number;
  by: string;
}

export interface GetArticlesResult {
  articles: Article[];
  responseLength: number;
}

export const getArticlesList = async (
  page: number,
  pageSize: number = 20
): Promise<GetArticlesResult> => {
  try {
    const response = await axios.get<number[]>(`${BASE_URL}/topstories.json`);
    const articleIds: number[] = response.data;
    const articlesPromises = articleIds.map((id: number) =>
      axios.get<Article>(`${BASE_URL}/item/${id}.json`)
    );

    const articlesResponses = await Promise.all(articlesPromises);
    const articles = articlesResponses.map(({ data }) => data);

    // sort articles by score
    articles.sort((a: Article, b: Article) => b.score - a.score);

    // here paginate the articles based on the page and pageSize
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedArticles = articles.slice(startIndex, endIndex);

    return {
      articles: paginatedArticles,
      responseLength: articlesResponses.length,
    };
  } catch (error) {
    throw new Error("Failed to fetch articles");
  }
};
