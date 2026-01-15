import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StatusBar, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Header } from '../components/Header';
import { BottomTabs } from '../components/BottomTabs';
import { NewsCard } from '../components/NewsCard';
import { FilterModal } from '../components/FilterModal';
import { fetchNews } from '../services/news'; 
import { NewsArticle, NewsFilterState } from '../types/news';

export default function NewsScreen() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterVisible, setFilterVisible] = useState(false);

  // Defaultné nastavenie filtrov
  const [filters, setFilters] = useState<NewsFilterState>({
    category: null,
    type: null,
    sortBy: 'newest',
    showFavoritesOnly: false, 
  });

  const loadData = async () => {
    try {
      setLoading(true);
      // Voláme service, ktorý ťahá dáta z news.json a filtruje ich
      const data = await fetchNews(filters);
      setArticles(data);
    } catch (e) {
      console.error("Chyba pri načítaní noviniek:", e);
    } finally {
      setLoading(false);
    }
  };

  // Reload pri zmene filtrov
  useEffect(() => {
    loadData();
  }, [filters]);

  // Text pre tlačidlo filtra
  const getFilterLabel = () => {
    if (filters.showFavoritesOnly) return "Favorites";
    if (filters.category) return filters.category;
    if (filters.type) return filters.type;
    return "All News";
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <Header />

      <View className="flex-1 bg-gray-50">
        
        {/* Filter Header Bar */}
        <View className="px-4 py-4 flex-row justify-between items-center z-10">
          <Pressable 
            onPress={() => setFilterVisible(true)}
            className={`flex-row items-center px-4 py-2 rounded-full border shadow-sm ${filters.showFavoritesOnly ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-gray-100'}`}
          >
            <Ionicons 
              name={filters.showFavoritesOnly ? "star" : "options-outline"} 
              size={16} 
              color={filters.showFavoritesOnly ? "#ca8a04" : "black"} 
              style={{ marginRight: 6 }} 
            />
            <Text className={`font-bold text-sm uppercase tracking-wide ${filters.showFavoritesOnly ? 'text-yellow-700' : 'text-gray-900'}`}>
              {getFilterLabel()}
            </Text>
            <Ionicons name="chevron-down" size={16} color="gray" style={{ marginLeft: 6 }} />
          </Pressable>

          <Pressable className="bg-white p-2 rounded-full border border-gray-100 shadow-sm">
             <Ionicons name="search" size={20} color="black" />
          </Pressable>
        </View>

        {/* ScrollView s článkami */}
        <ScrollView 
          className="flex-1" 
          contentContainerStyle={{ paddingBottom: 100 }} 
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <View className="mt-10 items-center">
              <ActivityIndicator size="large" color="#000" />
            </View>
          ) : (
            articles.length > 0 ? (
              articles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))
            ) : (
              // Empty State (ak filter nič nenašiel)
              <View className="mt-20 items-center px-8">
                <View className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center mb-4">
                  <Ionicons name="newspaper-outline" size={32} color="#9ca3af" />
                </View>
                <Text className="text-gray-900 font-bold text-lg">No news found</Text>
                <Text className="text-gray-500 text-center mt-2">
                  Try changing your filters.
                </Text>
                <Pressable 
                  onPress={() => setFilters({ category: null, type: null, sortBy: 'newest', showFavoritesOnly: false })}
                  className="mt-6 px-6 py-3 bg-black rounded-full"
                >
                  <Text className="text-white font-bold">Clear Filters</Text>
                </Pressable>
              </View>
            )
          )}
        </ScrollView>
      </View>

      {/* Bottom Tabs - DÔLEŽITÉ: activeTab="News" */}
      <BottomTabs activeTab="News" />

      {/* Filter Modal */}
      <FilterModal 
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        filters={filters}
        onApply={(newFilters) => {
          setFilters(newFilters);
          setFilterVisible(false);
        }}
      />
    </SafeAreaView>
  );
}