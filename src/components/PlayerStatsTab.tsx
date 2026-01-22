import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Polygon, Line, Text as SvgText, G } from 'react-native-svg';

// --- MOCK DATA PRE DROPDOWN ---
const SEASONS = [
  "PREMIER LEAGUE 2025/2026",
  "CHAMPIONS LEAGUE 2025/2026",
  "PREMIER LEAGUE 2024/2025",
  "FA CUP 2024/2025"
];

const STATS_DATA = [
  { label: "Goals", value: "4", highlight: false },
  { label: "Assists", value: "2", highlight: false },
  { label: "Matches", value: "11", highlight: false },
  { label: "Minutes played", value: "984", highlight: false },
  { label: "Rating", value: "7.04", highlight: true, color: '#22C55E' }, // Zelená
  { label: "Yellow cards", value: "1", highlight: true, color: '#EAB308' }, // Žltá
  { label: "Red cards", value: "0", highlight: true, color: '#EF4444' }, // Červená
];

// --- TRAITS CHART COMPONENT ---
const TraitsRadarChart = () => {
  const size = 300;
  const center = size / 2;
  const radius = 80; // Polomer grafu
  
  // Dáta z obrázku (hodnoty 0 až 1)
  // Poradie: Goals, Shot attempts, Touches, Chances, Aerial, Defensive
  // Uhol začína dole (Goals) a ide v smere hodinových ručičiek
  const data = [
    { label: "Goals", value: 0.99, labelVal: "99%" }, 
    { label: "Shot attempts", value: 0.86, labelVal: "86%" },
    { label: "Touches", value: 0.17, labelVal: "17%" },
    { label: "Chances created", value: 0.75, labelVal: "75%" },
    { label: "Aerial\nduels won", value: 0.24, labelVal: "24%" },
    { label: "Defensive\ncontributions", value: 0.01, labelVal: "1%" },
  ];

  // Pomocná funkcia na výpočet súradníc
  const getCoordinates = (value: number, index: number, maxRadius: number) => {
    const angle = (Math.PI * 2 * index) / 6 + Math.PI / 2; // + PI/2 aby sme začali dole
    const x = center + Math.cos(angle) * maxRadius * value;
    const y = center + Math.sin(angle) * maxRadius * value;
    return { x, y };
  };

  // Vytvorenie bodov pre červený polygón
  const polygonPoints = data.map((d, i) => {
    const { x, y } = getCoordinates(d.value, i, radius);
    return `${x},${y}`;
  }).join(" ");

  // Mriežka (Hexagony)
  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <View style={{ alignItems: 'center', height: 320, justifyContent: 'center' }}>
      <Svg height={size} width={size}>
        {/* Mriežka a osi */}
        {gridLevels.map((level, i) => (
          <Polygon
            key={i}
            points={data.map((_, index) => {
              const { x, y } = getCoordinates(1, index, radius * level);
              return `${x},${y}`;
            }).join(" ")}
            stroke="#E5E7EB"
            strokeWidth="1"
            fill="none"
            strokeDasharray={level < 1 ? "4, 2" : "0"} // Prerušované čiary pre vnútro
          />
        ))}
        
        {/* Osi (Lúče) */}
        {data.map((_, i) => {
          const { x, y } = getCoordinates(1, i, radius);
          return <Line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#E5E7EB" strokeWidth="1" />;
        })}

        {/* Hlavný Graf (Červená výplň) */}
        <Polygon
          points={polygonPoints}
          fill="rgba(185, 28, 28, 0.8)" // Tmavšia červená s priehľadnosťou
          stroke="#991B1B"
          strokeWidth="2"
        />

        {/* Popisky (Labels) */}
        {data.map((d, i) => {
          // Posunieme text trochu ďalej od grafu
          const { x, y } = getCoordinates(1.45, i, radius); 
          
          return (
            <G key={i}>
              <SvgText
                x={x}
                y={y}
                fill="#111827"
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {d.label}
              </SvgText>
              {/* Percentá (Bold) */}
              <SvgText
                x={x}
                y={y + 12} // Pod textom
                fill="#111827"
                fontSize="11"
                fontWeight="900"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {d.labelVal}
              </SvgText>
            </G>
          );
        })}
      </Svg>
    </View>
  );
};

export function PlayerStatsTab() {
  const [selectedSeason, setSelectedSeason] = useState(SEASONS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const selectSeason = (season: string) => {
    setSelectedSeason(season);
    setIsDropdownOpen(false);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* --- DROPDOWN HEADER --- */}
      <View style={{zIndex: 10}}>
        <Pressable onPress={toggleDropdown} style={styles.leagueSelector}>
           <Text style={styles.leagueSelectorText}>{selectedSeason}</Text>
           <Ionicons name={isDropdownOpen ? "chevron-up" : "chevron-down"} size={16} color="#6B7280" />
        </Pressable>
        
        {/* Dropdown Options */}
        {isDropdownOpen && (
          <View style={styles.dropdownList}>
            {SEASONS.map((item, index) => (
              <Pressable 
                key={index} 
                onPress={() => selectSeason(item)}
                style={[styles.dropdownItem, item === selectedSeason && styles.dropdownItemActive]}
              >
                <Text style={[styles.dropdownText, item === selectedSeason && styles.dropdownTextActive]}>
                  {item}
                </Text>
                {item === selectedSeason && <Ionicons name="checkmark" size={16} color="#111827" />}
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {/* --- STATS CARD --- */}
      <View style={styles.card}>
        {STATS_DATA.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={[styles.value, item.highlight && { color: item.color || '#111827' }]}>{item.value}</Text>
          </View>
        ))}
      </View>
      
      {/* --- PLAYER TRAITS (RADAR CHART) --- */}
      <View style={{marginBottom: 0}}>
        <Text style={styles.sectionTitle}>PLAYER TRAITS</Text>
      </View>
      <View style={styles.chartCard}>
         <TraitsRadarChart />
      </View>
      
      <View style={{height: 40}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  
  // Dropdown Styles
  leagueSelector: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF', 
    padding: 16, 
    borderRadius: 16, 
    marginBottom: 8, // Menší margin kvôli otvorenému dropdownu
    borderWidth: 1,
    borderColor: '#F3F4F6'
  },
  leagueSelectorText: { fontWeight: '800', color: '#111827', flex: 1, fontSize: 12, textTransform: 'uppercase' },
  dropdownList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 8,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    position: 'absolute', // Aby to plávalo nad obsahom
    top: 60,
    left: 0,
    right: 0,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
  },
  dropdownItemActive: {
    backgroundColor: '#F3F4F6',
  },
  dropdownText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  dropdownTextActive: {
    color: '#111827',
    fontWeight: '800',
  },

  // Stats Card
  card: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, marginBottom: 24, zIndex: -1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151' },
  value: { fontSize: 14, fontWeight: '800', color: '#111827' },
  
  // Chart Section
  sectionTitle: { fontSize: 20, fontWeight: '900', color: '#111827', textTransform: 'uppercase', marginBottom: 16 },
  chartCard: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 24, 
    paddingVertical: 24,
    alignItems: 'center',
    marginBottom: 24,
    zIndex: -1 
  },
});