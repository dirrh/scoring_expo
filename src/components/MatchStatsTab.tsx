import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Mock dáta
const MATCH_STATS = [
  { label: "HOLDING THE BALL", home: 46, away: 54, isPercentage: true },
  { label: "SHOTS AT THE GATE", home: 4, away: 5 },
  { label: "BIG CHANCES", home: 3, away: 1 },
  { label: "CORNER KICKS", home: 4, away: 2 },
  { label: "PASSES", home: 283, away: 332 },
  { label: "YELLOW CARDS", home: 2, away: 5 },
  { label: "RED CARDS", home: 0, away: 1 },
];

export function MatchStatsTab() {
  return (
    <View style={styles.container}>
      {MATCH_STATS.map((stat, index) => (
        <StatRow key={index} stat={stat} isLast={index === MATCH_STATS.length - 1} />
      ))}
    </View>
  );
}

function StatRow({ stat, isLast }: { stat: typeof MATCH_STATS[0], isLast: boolean }) {
  const total = stat.home + stat.away;
  const homeFlex = total === 0 ? 1 : (stat.home === 0 ? 0.02 : stat.home);
  const awayFlex = total === 0 ? 1 : (stat.away === 0 ? 0.02 : stat.away);

  return (
    // Pridal som podmienku, aby posledný riadok nemal margin dole
    <View style={[styles.row, isLast && { marginBottom: 0 }]}>
      {/* Textová časť */}
      <View style={styles.textRow}>
        <Text style={styles.valueText}>
          {stat.home}{stat.isPercentage ? '%' : ''}
        </Text>
        <Text style={styles.labelText}>{stat.label}</Text>
        <Text style={styles.valueText}>
          {stat.away}{stat.isPercentage ? '%' : ''}
        </Text>
      </View>

      {/* Grafická časť (Progress Bars) */}
      <View style={styles.barContainer}>
        {/* Home Bar (Red) */}
        <View 
          style={[
            styles.bar, 
            { 
              flex: homeFlex, 
              backgroundColor: '#B91C1C', 
              borderTopLeftRadius: 4, 
              borderBottomLeftRadius: 4,
              borderTopRightRadius: 2,
              borderBottomRightRadius: 2,
              marginRight: 4 
            }
          ]} 
        />
        
        {/* Away Bar (Blue) */}
        <View 
          style={[
            styles.bar, 
            { 
              flex: awayFlex, 
              backgroundColor: '#60A5FA',
              borderTopRightRadius: 4, 
              borderBottomRightRadius: 4,
              borderTopLeftRadius: 2,
              borderBottomLeftRadius: 2,
              marginLeft: 0
            }
          ]} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20, // Zmenšené z 24
    backgroundColor: 'white',
    marginHorizontal: 16, 
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 40,
  },
  row: {
    marginBottom: 12, // <--- TU BOLA ZMENA (pôvodne 24). Teraz sú riadky bližšie.
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4, // <--- TU BOLA ZMENA (pôvodne 8). Text je bližšie k čiare.
  },
  valueText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#111827',
    width: 40,
  },
  labelText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    textAlign: 'center',
    flex: 1,
  },
  barContainer: {
    flexDirection: 'row',
    height: 8,
    width: '100%',
    alignItems: 'center',
  },
  bar: {
    height: '100%',
  },
});