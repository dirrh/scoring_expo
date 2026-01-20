import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Match = {
  fixtureId: number;
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
  // NEW PROP: Callback for when the league header is clicked
  onLeaguePress?: () => void;
};

export const MatchCard = ({ league, matches, onMatchPress, onLeaguePress }: MatchCardProps) => {
  return (
    <View className="bg-white rounded-3xl p-4 mb-4 shadow-sm mx-4">
      
      {/* --- League Header (Clickable) --- */}
      <View className="flex-row items-center justify-between mb-3">
        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={onLeaguePress} // Trigger navigation
          className="flex-row items-center gap-2 flex-1"
        >
          <View className="w-6 h-6 bg-gray-200 rounded-full" />
          <Text className="font-semibold text-gray-700">{league}</Text>
          <Ionicons name="star" size={14} color="#FFD700" />
          {/* Chevron to indicate clickability */}
          <Ionicons name="chevron-forward" size={12} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* --- Matches List --- */}
      {matches.map((match, index) => (
        <TouchableOpacity 
          key={`${match.fixtureId}-${index}`} 
          className="flex-row items-center py-2 active:opacity-70"
          onPress={() => {
            onMatchPress?.(match, index);
          }}
        >
          {/* Time / Status */}
          <View className="w-12">
            <Text className="text-live font-bold text-[10px] leading-tight text-red-500">
              {match.period}
            </Text>
            <Text className="text-live font-bold text-[12px] text-gray-800">
              {match.time}
            </Text>
          </View>
          
          {/* Teams and Scores */}
          <View className="flex-1 gap-1">
            {/* Home Team */}
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center gap-2">
                <View className="w-4 h-4 bg-gray-200 rounded-full" />
                <Text className="text-accent font-medium text-gray-900">{match.team1}</Text>
              </View>
              <Text className="font-bold text-gray-900">{match.score1}</Text>
            </View>

            {/* Away Team */}
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