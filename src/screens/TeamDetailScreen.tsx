import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, StatusBar, Image as RNImage } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useOptionalNavigation } from '../hooks/useOptionalNavigation';

// Importy komponentov (Uisti sa, že ich máš vytvorené - kódy sú nižšie)
import { SimpleTable } from '../components/SimpleTable'; 
import { TeamSquadTab } from '../components/TeamSquadTab';
import { TeamScheduleTab } from '../components/TeamScheduleTab';
import { TeamStatsTab } from '../components/TeamStatsTab';
import { LeagueNewsTab } from '../components/LeagueNewsTab'; // News použijeme rovnaké

const TEAM_INFO = {
  name: "LIVERPOOL",
  country: "England",
  logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
  season: "2025/2026"
};

const TABS = [
  { id: 'table', label: 'Table' },
  { id: 'squad', label: 'Squad' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'statistics', label: 'Statistics' },
  { id: 'news', label: 'News' },
] as const;

export default function TeamDetailScreen() {
  const navigation = useOptionalNavigation();
  const [activeTab, setActiveTab] = useState<'table' | 'squad' | 'schedule' | 'statistics' | 'news'>('table');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Pressable 
            onPress={() => navigation?.goBack?.()}
            style={({ pressed }) => [styles.iconButton, pressed && { opacity: 0.5 }]}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </Pressable>

          <View style={styles.seasonBadge}>
            <Text style={styles.seasonText}>{TEAM_INFO.season}</Text>
            <Ionicons name="chevron-down" size={12} color="#6B7280" style={{ marginLeft: 4 }} />
          </View>

          <Pressable style={({ pressed }) => [styles.iconButton, pressed && { opacity: 0.5 }]}>
            <Ionicons name="star-outline" size={20} color="black" />
          </Pressable>
        </View>

        <View style={styles.teamInfo}>
          <Image source={{ uri: TEAM_INFO.logo }} style={styles.teamLogo} contentFit="contain" />
          <View>
            <Text style={styles.teamName}>{TEAM_INFO.name}</Text>
            <Text style={styles.teamCountry}>{TEAM_INFO.country}</Text>
          </View>
        </View>
      </View>

      {/* --- TABS (Horizontálny scroll pre 5 tabov) --- */}
      <View style={styles.tabContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ paddingHorizontal: 8 }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Pressable
                key={tab.id}
                onPress={() => setActiveTab(tab.id as any)}
                style={styles.tabButton}
              >
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                  {tab.label}
                </Text>
                {isActive && <View style={styles.activeIndicator} />}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* --- CONTENT --- */}
      <View style={styles.contentContainer}>
        
        {/* 1. TABLE TAB */}
        {activeTab === 'table' && (
          <ScrollView showsVerticalScrollIndicator={false}>
             <View style={{ paddingTop: 16 }}>
                {/* Dropdown ligy nad tabuľkou */}
                <View style={styles.leagueSelector}>
                    <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg" }} style={{width: 24, height: 24, marginRight: 12}} contentFit="contain"/>
                    <Text style={{fontWeight: '800', color: '#111827', flex: 1, fontSize: 13}}>PREMIER LEAGUE</Text>
                    <Ionicons name="chevron-down" size={16} color="#6B7280" />
                </View>
                <SimpleTable leagueId="premier-league" homeTeamName="Liverpool" awayTeamName="" />
             </View>
          </ScrollView>
        )}
        
        {/* 2. SQUAD TAB */}
        {activeTab === 'squad' && <TeamSquadTab />}
        
        {/* 3. SCHEDULE TAB */}
        {activeTab === 'schedule' && <TeamScheduleTab />}
        
        {/* 4. STATISTICS TAB */}
        {activeTab === 'statistics' && <TeamStatsTab />}
        
        {/* 5. NEWS TAB */}
        {activeTab === 'news' && <LeagueNewsTab />} 
      
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingBottom: 24, paddingTop: 8 },
  headerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  iconButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F9FAFB', alignItems: 'center', justifyContent: 'center' },
  seasonBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  seasonText: { fontSize: 12, fontWeight: '700', color: '#111827' },
  teamInfo: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 },
  teamLogo: { width: 56, height: 56, marginRight: 16 },
  teamName: { fontSize: 24, fontWeight: '900', color: '#111827', textTransform: 'uppercase', letterSpacing: -0.5 },
  teamCountry: { fontSize: 14, color: '#6B7280', marginTop: 2, fontWeight: '500' },
  
  // TABS
  tabContainer: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  tabButton: { alignItems: 'center', paddingVertical: 14, paddingHorizontal: 20, position: 'relative' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#9CA3AF' },
  tabTextActive: { color: '#111827', fontWeight: '800' },
  activeIndicator: { position: 'absolute', bottom: 0, width: '40%', height: 3, backgroundColor: '#111827', borderTopLeftRadius: 3, borderTopRightRadius: 3 },
  contentContainer: { flex: 1 },
  
  // Table Specific
  leagueSelector: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginHorizontal: 16, padding: 16, borderRadius: 16, marginBottom: 8 }
});