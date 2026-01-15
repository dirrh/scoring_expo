import { supabase } from '../services/supabaseClient'; // Skontroluj, či máš priečinok 'service' alebo 'services'
import { NewsArticle, NewsFilterState } from '../types/news';

export const fetchNewsFromDB = async (filters: NewsFilterState): Promise<NewsArticle[]> => {
  try {
    // 1. Zostavíme query len z existujúcich stĺpcov v 'public.posts'
    // Pripájame tabuľky post_media (obrázky), user_profiles (autor) a leagues (kategória)
    let query = supabase
      .from('posts')
      .select(`
        id,
        body,       
        created_at,
        league_id,
        author:user_profiles!author_id (id, display_name, avatar_url), 
        media:post_media (url, type),
        league:leagues (name, type)
      `)
      .is('deleted_at', null);

    // Sort (Zoradenie funguje v DB, lebo created_at existuje)
    const isAscending = filters.sortBy === 'oldest';
    query = query.order('created_at', { ascending: isAscending });

    // 2. Spustíme query (limitujeme na 50, aby sme mali z čoho filtrovať)
    const { data, error } = await query.limit(50);

    if (error) {
      console.error('Supabase error:', error);
      throw error; 
    }

    if (!data) return [];

    // 3. Mapovanie 'Post' -> 'NewsArticle'
    // Tu vytvárame "fake" dáta pre stĺpce, ktoré v DB chýbajú
    let mappedArticles: NewsArticle[] = data.map((post: any) => {
      // Obrázok: Zoberieme prvý z post_media alebo fallback
      const image = post.media && post.media.length > 0 ? post.media[0].url : null;

      // Titulok: Keďže nemáš title, zoberieme prvých 60 znakov z body a odstránime nové riadky
      const cleanBody = post.body || '';
      const generatedTitle = cleanBody.length > 0
        ? cleanBody.substring(0, 60).split('\n')[0] + (cleanBody.length > 60 ? '...' : '')
        : 'New Update';

      // Kategória: Zoberieme názov ligy (napr. Premier League) alebo fallback
      const categoryName = post.league?.name || 'General';
      
      // Typ: Keďže neexistuje v DB, skúsime ho "uhadnúť" alebo dáme default.
      // Ak by si chcel byť kreatívny, môžeš striedať typy podľa ID, ale tu dáme bezpečný default.
      const generatedType = 'match-report'; 

      // Fallback pre autora
      const authorObj = {
        id: post.author?.id || 'unknown',
        name: post.author?.display_name || 'SportSphere User',
        avatar: post.author?.avatar_url || null,
      };

      return {
        id: post.id.toString(),
        title: generatedTitle,
        slug: `post-${post.id}`,
        excerpt: cleanBody.substring(0, 100).replace(/\n/g, ' ') + '...',
        content: cleanBody,
        image: image,
        // OPRAVENÉ: Vraciame objekt author, nie authorName
        author: authorObj,
        category: categoryName,
        categorySlug: categoryName.toLowerCase().replace(/\s+/g, '-'),
        // Pretypovanie na string (aby sedelo s NewsArticle interface)
        type: generatedType, 
        publishedAt: post.created_at,
        readTime: 3, // Fake hodnota
        views: 0,    // Fake hodnota
        tags: [],
      };
    });

    // 4. Client-side Filtrovanie (pretože nemáme stĺpce v DB)
    
    // Filter Category
    if (filters.category && filters.category !== 'All Categories') {
      mappedArticles = mappedArticles.filter(article => 
        article.category.toLowerCase().includes(filters.category!.toLowerCase())
      );
    }

    // Filter Type
    if (filters.type && filters.type !== 'All Types') {
      mappedArticles = mappedArticles.filter(article => 
        article.type.toLowerCase() === filters.type!.toLowerCase()
      );
    }

    return mappedArticles;

  } catch (error) {
    console.error('Fetch news unexpected error:', error);
    return [];
  }
};