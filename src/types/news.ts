export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string | null;
  // Tu definujeme presný tvar autora, žiadne any
  author: {
    id: string;
    name: string;
    avatar: string | null;
  };
  category: string;
  categorySlug: string;
  type: string; // Alebo union type 'breaking' | 'analysis' atď.
  publishedAt: string;
  readTime: number;
  views: number;
  tags: string[];
}

export type SortOption = 'newest' | 'oldest';

export interface NewsFilterState {
  category: string | null;
  type: string | null;
  sortBy: SortOption;
  showFavoritesOnly: boolean;
}