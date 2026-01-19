import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { fetchLeagueStandings } from '../services/league';
import { LeagueTableEntry } from '../types/league'; 


const MOCK_STANDINGS_FULL: LeagueTableEntry[] = [
  { position: 1, team: "Arsenal", logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg", played: 20, won: 16, drawn: 2, lost: 2, goalsFor: 45, goalsAgainst: 12, goalDifference: 33, points: 50 },
  { position: 2, team: "Manchester City", logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg", played: 20, won: 15, drawn: 3, lost: 2, goalsFor: 46, goalsAgainst: 12, goalDifference: 34, points: 48 },
  { position: 3, team: "Liverpool", logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg", played: 20, won: 14, drawn: 4, lost: 2, goalsFor: 40, goalsAgainst: 15, goalDifference: 25, points: 46 },
  { position: 4, team: "Aston Villa", logo: "https://upload.wikimedia.org/wikipedia/en/f/f9/Aston_Villa_FC_badge_%282016%29.svg", played: 20, won: 13, drawn: 4, lost: 3, goalsFor: 36, goalsAgainst: 21, goalDifference: 15, points: 43 },
  { position: 5, team: "Tottenham", logo: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg", played: 20, won: 12, drawn: 4, lost: 4, goalsFor: 35, goalsAgainst: 21, goalDifference: 14, points: 40 },
  { position: 6, team: "West Ham", logo: "https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg", played: 20, won: 9, drawn: 7, lost: 4, goalsFor: 28, goalsAgainst: 22, goalDifference: 6, points: 34 },
  { position: 7, team: "Brighton", logo: "https://upload.wikimedia.org/wikipedia/en/f/fd/Brighton_%26_Hove_Albion_logo.svg", played: 20, won: 8, drawn: 7, lost: 5, goalsFor: 30, goalsAgainst: 22, goalDifference: 8, points: 31 },
  { position: 8, team: "Man United", logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg", played: 20, won: 9, drawn: 4, lost: 7, goalsFor: 28, goalsAgainst: 33, goalDifference: -5, points: 31 },
  { position: 9, team: "Newcastle", logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg", played: 20, won: 8, drawn: 5, lost: 7, goalsFor: 33, goalsAgainst: 21, goalDifference: 12, points: 29 },
  { position: 10, team: "Chelsea", logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg", played: 20, won: 8, drawn: 4, lost: 8, goalsFor: 29, goalsAgainst: 24, goalDifference: 5, points: 28 },
  { position: 11, team: "Wolves", logo: "https://upload.wikimedia.org/wikipedia/en/f/fc/Wolverhampton_Wanderers.svg", played: 20, won: 7, drawn: 7, lost: 6, goalsFor: 26, goalsAgainst: 30, goalDifference: -4, points: 28 },
  { position: 12, team: "Bournemouth", logo: "https://upload.wikimedia.org/wikipedia/en/e/e5/AFC_Bournemouth_%282013%29.svg", played: 19, won: 7, drawn: 4, lost: 8, goalsFor: 25, goalsAgainst: 35, goalDifference: -10, points: 25 },
  { position: 13, team: "Fulham", logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Fulham_FC_%28shield%29.svg", played: 20, won: 6, drawn: 6, lost: 8, goalsFor: 24, goalsAgainst: 35, goalDifference: -11, points: 24 },
  { position: 14, team: "Crystal Palace", logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Crystal_Palace_FC_logo.svg", played: 20, won: 5, drawn: 6, lost: 9, goalsFor: 20, goalsAgainst: 29, goalDifference: -9, points: 21 },
  { position: 15, team: "Nottm Forest", logo: "https://upload.wikimedia.org/wikipedia/en/e/e5/Nottingham_Forest_F.C._logo.svg", played: 20, won: 5, drawn: 5, lost: 10, goalsFor: 18, goalsAgainst: 30, goalDifference: -12, points: 20 },
];

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
        // Dočasne použijeme MOCK dáta pre dizajn, ak API vráti prázdne
        // const data = await fetchLeagueStandings(leagueId);
        const data = MOCK_STANDINGS_FULL; // <--- Tu som prepol na mock dáta
        
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
    return (
      <View style={{ paddingVertical: 40, alignItems: "center" }}>
        <ActivityIndicator color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.headerCell, styles.colPos]}>#</Text>
        <Text style={[styles.headerCell, styles.colTeam]}>NAME</Text>
        <Text style={[styles.headerCell, styles.colStat]}>PL</Text>
        <Text style={[styles.headerCell, styles.colStat]}>GD</Text>
        <Text style={[styles.headerCell, styles.colStat]}>PTS</Text>
      </View>

      {/* Rows */}
      {standings.map((item, index) => {
        // Zvýraznenie pre hrajúce tímy (modrá)
        const isHighlight = item.team === homeTeamName || item.team === awayTeamName;
        // Zebra striping: párne riadky sivé, ak nie sú highlightnuté
        const isEven = index % 2 !== 0;
        
        let rowBackgroundColor = "#FFFFFF";
        if (isHighlight) rowBackgroundColor = "#EFF6FF"; // Svetlomodrá
        else if (isEven) rowBackgroundColor = "#F9FAFB"; // Sivá

        return (
          <View key={item.position} style={[styles.row, { backgroundColor: rowBackgroundColor }]}>
            <Text style={[styles.cell, styles.colPos, { fontWeight: '600', color: '#111827' }]}>{item.position}</Text>
            
            <View style={[styles.teamCell, styles.colTeam]}>
              {item.logo ? (
                <Image source={{ uri: item.logo }} style={{ width: 20, height: 20, marginRight: 8 }} contentFit="contain" />
              ) : null}
              <Text style={styles.teamName} numberOfLines={1}>{item.team}</Text>
            </View>
            
            <Text style={[styles.cell, styles.colStat]}>{item.played}</Text>
            <Text style={[styles.cell, styles.colStat]}>{item.goalDifference}</Text>
            <Text style={[styles.cell, styles.colStat, styles.points]}>{item.points}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    // Odstránil som marginy a border radius, aby to bolo "flat" a full-width
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12, // Zvýšil som padding pre lepšiu čitateľnosť
    paddingHorizontal: 16,
    // Odstránil som borderBottomWidth pre čistejší zebra-look
  },
  headerCell: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9CA3AF",
    textAlign: "center",
  },
  cell: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  teamCell: {
    flexDirection: "row",
    alignItems: "center",
  },
  teamName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },
  points: {
    fontWeight: "800",
    color: "#111827",
    fontSize: 13,
  },
  // Šírky stĺpcov
  colPos: { width: 30 },
  colTeam: { flex: 1, paddingRight: 8 }, // Flex 1 aby zabral zvyšok miesta
  colStat: { width: 32, textAlign: "center" },
});