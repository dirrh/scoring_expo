import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// 1. Zadefinujeme typ, kde sú score aj time voliteľné
type ScheduleMatch = {
  id: number;
  home: string;
  away: string;
  score?: string; // ? znamená, že to tam nemusí byť
  time?: string;  // ? znamená, že to tam nemusí byť
};

type ScheduleGroup = {
  title: string;
  matches: ScheduleMatch[];
};

// 2. Použijeme typ pre dáta
const SCHEDULE_DATA: ScheduleGroup[] = [
  {
    title: "YESTERDAY",
    matches: [
      { id: 1, home: "Wolves", away: "Man United", score: "1 - 4" }
    ]
  },
  {
    title: "SATURDAY, 10 DECEMBER",
    matches: [
      { id: 2, home: "Chelsea", away: "Everton", time: "16:00" },
      { id: 3, home: "Liverpool", away: "Brighton", time: "16:00" },
      { id: 4, home: "Burnley", away: "Fulham", time: "18:30" },
      { id: 5, home: "Arsenal", away: "Wolves", time: "21:00" },
    ]
  },
  {
    title: "SUNDAY, 11 DECEMBER",
    matches: [
      { id: 6, home: "Crystal Palace", away: "Man City", time: "15:00" },
      { id: 7, home: "Nottm Forest", away: "Tottenham", time: "15:00" },
    ]
  }
];

export function LeagueScheduleTab() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {SCHEDULE_DATA.map((group, index) => (
        <View key={index} style={styles.groupContainer}>
          <Text style={styles.groupTitle}>{group.title}</Text>
          <View style={styles.card}>
            {group.matches.map((match, mIndex) => (
              <View key={match.id} style={[styles.matchRow, mIndex !== group.matches.length - 1 && styles.borderBottom]}>
                <Text style={[styles.teamName, { textAlign: 'right' }]}>{match.home}</Text>
                
                <View style={styles.scoreContainer}>
                   {/* TypeScript teraz vie, že score môže byť undefined, takže táto podmienka je bezpečná */}
                   {match.score ? (
                     <Text style={styles.scoreText}>{match.score}</Text>
                   ) : (
                     <View style={styles.timeBadge}>
                       {/* Použijeme fallback '??' alebo '00:00' pre prípad, že by time chýbal, aby bol TS spokojný */}
                       <Text style={styles.timeText}>{match.time ?? "-"}</Text>
                     </View>
                   )}
                </View>

                <Text style={[styles.teamName, { textAlign: 'left' }]}>{match.away}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
      {/* Priestor na spodku pre scrollovanie */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  groupContainer: { marginBottom: 24 },
  groupTitle: { fontSize: 11, fontWeight: '800', color: '#111827', marginBottom: 12, textTransform: 'uppercase' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, paddingVertical: 4 },
  matchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14 },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  teamName: { flex: 1, fontSize: 13, fontWeight: '600', color: '#374151', paddingHorizontal: 12 },
  scoreContainer: { width: 60, alignItems: 'center' },
  scoreText: { fontSize: 14, fontWeight: '800', color: '#111827' },
  timeBadge: { backgroundColor: '#F3F4F6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  timeText: { fontSize: 11, fontWeight: '600', color: '#6B7280' },
});