import { View, Text } from 'react-native';
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
};

export const MatchCard = ({ league, matches }: MatchCardProps) => (
  <View className="bg-white rounded-3xl p-4 mb-4 shadow-sm mx-4">
    <View className="flex-row items-center justify-between mb-3">
      <View className="flex-row items-center gap-2">
        <View className="w-6 h-6 bg-gray-200 rounded-full" />
        <Text className="font-semibold text-gray-700">{league}</Text>
        <Ionicons name="star" size={14} color="#FFD700" />
      </View>
    </View>

    {matches.map((match, index) => (
      <View key={index} className="flex-row items-center py-2">
        <View className="w-12">
          <Text className="text-live font-bold text-[10px] leading-tight">{match.period}</Text>
          <Text className="text-live font-bold text-[12px]">{match.time}</Text>
        </View>
        
        <View className="flex-1 gap-1">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-2">
              <View className="w-4 h-4 bg-gray-200 rounded-full" />
              <Text className="text-accent font-medium">{match.team1}</Text>
            </View>
            <Text className="font-bold">{match.score1}</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-2">
              <View className="w-4 h-4 bg-gray-200 rounded-full" />
              <Text className="text-accent font-medium">{match.team2}</Text>
            </View>
            <Text className="font-bold">{match.score2}</Text>
          </View>
        </View>
      </View>
    ))}
  </View>
);