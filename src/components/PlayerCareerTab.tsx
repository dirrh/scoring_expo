import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Typy súťaží
const COMPETITION_TYPES = [
  "ALL COMPETITIONS",
  "DOMESTIC LEAGUE",
  "DOMESTIC CUP",
  "INTERNATIONAL"
];

// Mock Data s kategóriou
const CAREER_DATA = [
  { team: "Liverpool", years: "2025/2026", matches: 4, goals: 2, rating: 6.7, category: "ALL COMPETITIONS" },
  { team: "Liverpool", years: "2024/2025", matches: 29, goals: 18, rating: 7.6, highlight: true, category: "ALL COMPETITIONS" },
  { team: "Liverpool", years: "2023/2024", matches: 18, goals: 10, rating: 7.4, category: "ALL COMPETITIONS" },
  { team: "Liverpool", years: "2022/2023", matches: 19, goals: 12, rating: 7.6, highlight: true, category: "ALL COMPETITIONS" },
  
  // Mock dáta pre filtrovanie (len ako ukážka)
  { team: "Liverpool (PL)", years: "2024/2025", matches: 20, goals: 15, rating: 7.8, category: "DOMESTIC LEAGUE" },
  { team: "AS Roma", years: "2017/2018", matches: 15, goals: 11, rating: 7.5, category: "INTERNATIONAL" },
];

export function PlayerCareerTab() {
  const [selectedFilter, setSelectedFilter] = useState("ALL COMPETITIONS");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filtrovanie dát
  const displayedData = CAREER_DATA.filter(item => 
    selectedFilter === "ALL COMPETITIONS" 
      ? item.category === "ALL COMPETITIONS" 
      : item.category === selectedFilter
  );

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const selectFilter = (filter: string) => {
    setSelectedFilter(filter);
    setIsDropdownOpen(false);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* --- DROPDOWN FILTER --- */}
      <View style={{zIndex: 10}}>
        <Pressable onPress={toggleDropdown} style={styles.leagueSelector}>
           <Ionicons name="trophy-outline" size={16} color="black" style={{marginRight: 8}}/>
           <Text style={styles.leagueSelectorText}>{selectedFilter}</Text>
           <Ionicons name={isDropdownOpen ? "chevron-up" : "chevron-down"} size={16} color="#6B7280" />
        </Pressable>

        {isDropdownOpen && (
          <View style={styles.dropdownList}>
            {COMPETITION_TYPES.map((item, index) => (
              <Pressable 
                key={index} 
                onPress={() => selectFilter(item)}
                style={[styles.dropdownItem, item === selectedFilter && styles.dropdownItemActive]}
              >
                <Text style={[styles.dropdownText, item === selectedFilter && styles.dropdownTextActive]}>
                  {item}
                </Text>
                {item === selectedFilter && <Ionicons name="checkmark" size={16} color="#111827" />}
              </Pressable>
            ))}
          </View>
        )}
      </View>

      <View style={styles.card}>
        {/* Table Header */}
        <View style={[styles.tableRow, {borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingBottom: 8}]}>
           <Text style={[styles.headerText, {flex: 1}]}>TEAM</Text>
           <View style={{width: 30, alignItems: 'center'}}><Ionicons name="football" size={12} color="#9CA3AF"/></View>
           <View style={{width: 30, alignItems: 'center'}}><Ionicons name="walk" size={12} color="#9CA3AF"/></View>
           <View style={{width: 30, alignItems: 'center'}}><Ionicons name="star" size={12} color="#9CA3AF"/></View>
        </View>

        {displayedData.length > 0 ? (
          displayedData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
               <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{width: 24, height: 24, borderRadius: 12, backgroundColor: '#E5E7EB', marginRight: 8}} />
                  <View>
                     <Text style={{fontSize: 13, fontWeight: '700', color: '#111827'}}>{item.team}</Text>
                     <Text style={{fontSize: 10, color: '#9CA3AF'}}>{item.years}</Text>
                  </View>
               </View>
               <Text style={styles.statText}>{item.matches}</Text>
               <Text style={styles.statText}>{item.goals}</Text>
               <Text style={[styles.statText, item.highlight && {color: '#22C55E'}]}>{item.rating}</Text>
            </View>
          ))
        ) : (
          <View style={{padding: 20, alignItems: 'center'}}>
            <Text style={{color: '#9CA3AF'}}>No data for this filter</Text>
          </View>
        )}
      </View>
      <View style={{height: 40}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  
  // Dropdown
  leagueSelector: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF', 
    padding: 16, 
    borderRadius: 16, 
    marginBottom: 8,
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
    position: 'absolute',
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

  card: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16, marginBottom: 24, zIndex: -1 },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  headerText: { fontSize: 10, fontWeight: '700', color: '#9CA3AF' },
  statText: { width: 30, textAlign: 'center', fontSize: 12, fontWeight: '700', color: '#374151' }
});