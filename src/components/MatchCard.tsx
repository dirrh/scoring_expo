import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
  onLeaguePress?: () => void;
};

export const MatchCard = ({ league, matches, onMatchPress, onLeaguePress }: MatchCardProps) => {
  return (
    <View className="bg-white rounded-3xl p-4 mb-4 shadow-sm mx-4">
      
      {/* --- League Header --- */}
      <View className="flex-row items-center justify-between mb-3">
        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={onLeaguePress}
          className="flex-row items-center gap-2 flex-1"
        >
          <View className="w-6 h-6 bg-gray-200 rounded-full" />
          <Text className="font-semibold text-gray-700">{league}</Text>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Ionicons name="chevron-forward" size={12} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* --- Matches List --- */}
      {matches.map((match, index) => {
        // Zistíme, či sa zápas už začal (či máme skóre, alebo len pomlčky)
        const hasScore = match.score1 !== '-' && match.score2 !== '-';
        const isNotStarted = match.period === 'NS' || match.period === 'TBD' || match.period === '-';
        const showTime = isNotStarted || !hasScore;
        const displayTime = match.time && match.time !== '-' ? match.time : 'TBD';
        
        // Farba statusu (NS = Not Started = šedá, inak červená ako Live/Koniec)
        const statusColor = match.period === 'NS' || match.period === 'TBD' ? 'text-gray-400' : 'text-red-500';

        return (
          <TouchableOpacity 
            key={`${match.fixtureId}-${index}`} 
            className="flex-row items-center py-3 active:opacity-70 border-b border-gray-50 last:border-0"
            onPress={() => onMatchPress?.(match, index)}
          >
            {/* Status (Live/NS/FT) */}
            <View className="w-10 mr-2 justify-center">
              <Text className={`font-bold text-[10px] leading-tight uppercase ${statusColor}`}>
                {match.period}
              </Text>
            </View>
            
            {/* Teams Name Column */}
            <View className="flex-1 gap-2">
              {/* Home Team */}
              <View className="flex-row items-center gap-2">
                <View className="w-4 h-4 bg-gray-200 rounded-full" />
                <Text className="font-bold text-gray-900 text-sm">{match.team1}</Text>
              </View>

              {/* Away Team */}
              <View className="flex-row items-center gap-2">
                <View className="w-4 h-4 bg-gray-200 rounded-full" />
                <Text className="font-bold text-gray-900 text-sm">{match.team2}</Text>
              </View>
            </View>

            {/* Right Side: Score OR Time */}
            <View className="items-end justify-center min-w-[40px]">
              {!showTime ? (
                // Ak beží zápas, ukážeme skóre pod sebou
                <View className="gap-2">
                   <Text className="font-bold text-gray-900 text-sm">{match.score1}</Text>
                   <Text className="font-bold text-gray-900 text-sm">{match.score2}</Text>
                </View>
              ) : (
                // Ak sa nezačal, ukážeme ČAS
                <View className="bg-gray-50 px-2 py-1 rounded-md">
                   <Text className="font-bold text-gray-700 text-xs">{displayTime}</Text>
                </View>
              )}
            </View>

          </TouchableOpacity>
        );
      })}
    </View>
  );
};