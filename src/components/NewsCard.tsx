import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { NewsArticle } from '../types/news';

interface NewsCardProps {
  article: NewsArticle;
}

export const NewsCard = ({ article }: NewsCardProps) => {
  
  // Formátovanie dátumu
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Pressable className="bg-white rounded-[20px] mb-4 shadow-sm mx-4 overflow-hidden active:opacity-95 border border-gray-100">
      
      {/* 1. Sekcia Obrázok */}
      <View className="h-48 w-full bg-gray-100 relative">
        {article.image ? (
          <Image
            source={{ uri: article.image }}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
            transition={300}
          />
        ) : (
          // Placeholder ak obrázok chýba
          <View className="flex-1 items-center justify-center bg-gray-200">
            <Ionicons name="image-outline" size={40} color="#9ca3af" />
          </View>
        )}

        {/* Odznak Kategórie (napr. Football, Premier League) */}
        <View className="absolute top-3 left-3 px-3 py-1 rounded-md bg-black/80 backdrop-blur-md">
          <Text className="text-white text-[10px] font-bold uppercase tracking-wider">
            {article.category}
          </Text>
        </View>
      </View>

      {/* 2. Sekcia Obsah */}
      <View className="p-4">
        {/* Titulok */}
        <Text className="text-lg font-bold text-gray-900 leading-6 mb-3" numberOfLines={3}>
          {article.title}
        </Text>
        
        {/* Riadok Autor a Dátum */}
        <View className="flex-row items-center justify-between mt-auto">
          <View className="flex-row items-center flex-1">
             {/* Avatar autora (ak existuje) */}
             {article.author.avatar ? (
               <Image 
                 source={{ uri: article.author.avatar }} 
                 style={{ width: 24, height: 24, borderRadius: 12, marginRight: 8 }} 
                 contentFit="cover"
               />
             ) : (
               // Placeholder avatar
               <View className="w-6 h-6 rounded-full bg-gray-200 items-center justify-center mr-2">
                 <Ionicons name="person" size={12} color="gray" />
               </View>
             )}
            
            <View>
              <Text className="text-gray-900 text-xs font-bold" numberOfLines={1}>
                {article.author.name}
              </Text>
              <Text className="text-gray-500 text-[10px] font-medium">
                {formatDate(article.publishedAt)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};