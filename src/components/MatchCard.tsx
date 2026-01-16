import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Match = {
  period: string;
  time: string;
  team1: string;
  score1: string;
  team2: string;
  score2: string;
};

type MatchCardProps = {
  league: string;
  matches: Match[];
  onMatchPress?: (match: Match, index: number) => void;
};

export const MatchCard = ({ league, matches, onMatchPress }: MatchCardProps) => {
  return (
    <View className="bg-white rounded-3xl p-4 mb-4 shadow-sm mx-4">
      {/* Hlavicka Ligy */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-2">
          <View className="w-6 h-6 bg-gray-200 rounded-full" />
          <Text className="font-semibold text-gray-700">{league}</Text>
          <Ionicons name="star" size={14} color="#FFD700" />
        </View>
      </View>

      {/* Zoznam zápasov */}
      {matches.map((match, index) => (
        <TouchableOpacity 
          key={index} 
          className="flex-row items-center py-2 active:opacity-70"
          onPress={() => {
            onMatchPress?.(match, index);
          }}
        >
          {/* Čas / Minúta */}
          <View className="w-12">
            <Text className="text-live font-bold text-[10px] leading-tight text-red-500">
              {match.period}
            </Text>
            <Text className="text-live font-bold text-[12px] text-gray-800">
              {match.time}
            </Text>
          </View>
          
          {/* Tímy a Skóre */}
          <View className="flex-1 gap-1">
            {/* Domáci */}
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center gap-2">
                <View className="w-4 h-4 bg-gray-200 rounded-full" />
                <Text className="text-accent font-medium text-gray-900">{match.team1}</Text>
              </View>
              <Text className="font-bold text-gray-900">{match.score1}</Text>
            </View>

            {/* Hostia */}
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center gap-2">
                <View className="w-4 h-4 bg-gray-200 rounded-full" />
                <Text className="text-accent font-medium text-gray-900">{match.team2}</Text>
              </View>
              <Text className="font-bold text-gray-900">{match.score2}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};