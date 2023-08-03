export const BASE_URL = "https://hacker-news.firebaseio.com/v0";

export interface Article {
  title: string;
  score: number;
  by: string;
  id: number;
  url: string;
}

export const getArticlesList = async (): Promise<Article[]> => {
  try {
    const response = await fetch(`${BASE_URL}/topstories.json`);
    const articleIds: number[] = await response.json();

    const articlesPromises = articleIds.map(async (id: number) => {
      const articleResponse = await fetch(`${BASE_URL}/item/${id}.json`);
      return articleResponse.json();
    });

    const articlesResponses = await Promise.all(articlesPromises);
    const articles = articlesResponses;

    // sort articles by score
    const rankedItems = articles.sort(
      (a: Article, b: Article) => b.score - a.score
    );

    return rankedItems;
  } catch (error) {
    throw new Error("Failed to fetch articles");
  }
};
