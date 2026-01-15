export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  category: string;
  categorySlug: string;
  type: string;
  publishedAt: string;
  readTime: number;
  views: number;
  tags: string[];
  isFavorite?: boolean;
}

export type SortOption = 'newest' | 'oldest';

export interface NewsFilterState {
  category: string | null;
  type: string | null;
  sortBy: SortOption;
  showFavoritesOnly: boolean;
}