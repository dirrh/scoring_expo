import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { fetchLeagueStandings } from '../services/league';
import { LeagueTableEntry } from '../types/league'; 

interface SimpleTableProps {
  leagueId: string;
  homeTeamName: string;
  awayTeamName: string;
}

export const SimpleTable = ({ leagueId, homeTeamName, awayTeamName }: SimpleTableProps) => {
  const [standings, setStandings] = useState<LeagueTableEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    const loadData = async () => {
      try {
        console.log("Načítavam SimpleTable pre:", leagueId);
        const data = await fetchLeagueStandings(leagueId);
        if (isActive) setStandings(data);
      } catch (e) {
        console.error("Chyba:", e);
      } finally {
        if (isActive) setLoading(false);
      }
    };
    loadData();
    return () => { isActive = false; };
  }, [leagueId]);

  if (loading) {
    return <View className="py-10"><ActivityIndicator color="#000" /></View>;
  }

  if (!standings.length) {
    return <View className="py-10 items-center"><Text className="text-gray-500">No data found</Text></View>;
  }

  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm mx-4 mt-4 border border-gray-100">
      {/* Header */}
      <View className="flex-row border-b border-gray-200 pb-2 mb-2">
        <Text className="w-8 text-xs font-bold text-gray-400 text-center">#</Text>
        <Text className="flex-1 text-xs font-bold text-gray-400 pl-2">TEAM</Text>
        <Text className="w-8 text-xs font-bold text-gray-400 text-center">PL</Text>
        <Text className="w-8 text-xs font-bold text-gray-400 text-center">GD</Text>
        <Text className="w-8 text-xs font-bold text-gray-400 text-center">PTS</Text>
      </View>

      {/* Rows */}
      {standings.map((item) => {
        const isHighlight = item.team === homeTeamName || item.team === awayTeamName;
        return (
          <View key={item.position} className={`flex-row items-center py-3 border-b border-gray-50 ${isHighlight ? 'bg-gray-100 rounded-lg' : ''}`}>
            <Text className="w-8 text-xs font-bold text-gray-900 text-center">{item.position}</Text>
            <View className="flex-1 flex-row items-center pl-2">
              {item.logo ? (
                <Image source={{ uri: item.logo }} style={{ width: 20, height: 20, marginRight: 8 }} contentFit="contain" />
              ) : null}
              <Text className="text-xs font-bold text-gray-900">{item.team}</Text>
            </View>
            <Text className="w-8 text-xs text-gray-500 text-center">{item.played}</Text>
            <Text className="w-8 text-xs text-gray-500 text-center">{item.goalDifference}</Text>
            <Text className="w-8 text-xs font-black text-black text-center">{item.points}</Text>
          </View>
        );
      })}
    </View>
  );
};