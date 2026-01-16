import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { fetchLeagueStandings } from '../services/league';
import { LeagueTableEntry } from '../types/league';

interface MatchTableTabProps {
  leagueId: string;
  homeTeamName: string;
  awayTeamName: string;
}

export const MatchTableTab = ({ leagueId, homeTeamName, awayTeamName }: MatchTableTabProps) => {
  const [standings, setStandings] = useState<LeagueTableEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true; // Prevencia memory leaku
    const loadData = async () => {
      try {
        console.log("Načítavam tabuľku pre ligu:", leagueId);
        const data = await fetchLeagueStandings(leagueId);
        if (isActive) {
          setStandings(data);
        }
      } catch (e) {
        console.error("Chyba pri načítaní tabuľky:", e);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };
    loadData();
    return () => { isActive = false; };
  }, [leagueId]);

  if (loading) {
    return (
      <View className="py-10 items-center justify-center">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  }

  if (!standings || standings.length === 0) {
    return (
      <View className="py-10 items-center justify-center">
        <Text className="text-gray-500">Table not available for {leagueId}</Text>
      </View>
    );
  }

  // --- Interný komponent pre riadok ---
  const TableRow = ({ item, isHeader = false }: { item?: LeagueTableEntry, isHeader?: boolean }) => {
    // Zvýraznenie pre hrajúce tímy
    const isHighlighted = !isHeader && item && (
      item.team === homeTeamName || item.team === awayTeamName
    );

    const rowStyle = isHeader 
      ? 'border-b border-gray-200 pb-2 mb-2' 
      : `py-3 border-b border-gray-100 ${isHighlighted ? 'bg-gray-100 rounded-lg' : ''}`;

    return (
      <View className={`flex-row items-center ${rowStyle}`}>
        {/* # Pozícia */}
        <View className="w-8 items-center justify-center">
          <Text className={`text-xs ${isHeader ? 'text-gray-400 font-bold' : 'text-gray-900 font-medium'}`}>
            {isHeader ? '#' : item?.position}
          </Text>
        </View>

        {/* Tím */}
        <View className="flex-1 flex-row items-center pl-2">
          {!isHeader && item?.logo && (
            <Image 
              source={{ uri: item.logo }} 
              style={{ width: 20, height: 20, marginRight: 8 }} 
              contentFit="contain"
            />
          )}
          <Text 
            className={`text-xs ${isHeader ? 'text-gray-400 font-bold uppercase' : 'text-gray-900 font-bold'}`}
            numberOfLines={1}
          >
            {isHeader ? 'Team' : item?.team}
          </Text>
        </View>

        {/* Zápasy */}
        <View className="w-8 items-center justify-center">
          <Text className={`text-xs ${isHeader ? 'text-gray-400 font-bold' : 'text-gray-500'}`}>
            {isHeader ? 'PL' : item?.played}
          </Text>
        </View>

        {/* Gólový rozdiel */}
        <View className="w-8 items-center justify-center">
          <Text className={`text-xs ${isHeader ? 'text-gray-400 font-bold' : 'text-gray-500'}`}>
            {isHeader ? 'GD' : item?.goalDifference}
          </Text>
        </View>

        {/* Body */}
        <View className="w-8 items-center justify-center mr-2">
          <Text className={`text-xs ${isHeader ? 'text-gray-400 font-bold' : 'text-black font-bold'}`}>
            {isHeader ? 'PTS' : item?.points}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm mx-4 mt-4">
      <TableRow isHeader />
      {standings.map((entry) => (
        <TableRow key={entry.position} item={entry} />
      ))}
    </View>
  );
};