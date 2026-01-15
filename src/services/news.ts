// POZOR: Uisti sa, že cesta k json súboru je správna
import newsData from '../data/news.json'; 
import { NewsArticle, NewsFilterState } from '../types/news';

export const fetchNews = async (filters: NewsFilterState): Promise<NewsArticle[]> => {
  // Simulácia delayu
  await new Promise((resolve) => setTimeout(resolve, 300));

  // TypeScript hack
  let articles: NewsArticle[] = newsData.articles as unknown as NewsArticle[];

  // 1. Filter Category
  if (filters.category && filters.category !== 'All Categories') {
    articles = articles.filter(article => 
      article.category.toLowerCase() === filters.category!.toLowerCase()
    );
  }

  // 2. Filter Type
  if (filters.type && filters.type !== 'All Types') {
    articles = articles.filter(article => 
      article.type.toLowerCase() === filters.type!.toLowerCase()
    );
  }

  // 3. Filter Favorites
  if (filters.showFavoritesOnly) {
    articles = articles.filter(article => article.isFavorite === true);
  }

  // 4. Sort
  articles.sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return filters.sortBy === 'newest' ? dateB - dateA : dateA - dateB;
  });

  return articles;
};