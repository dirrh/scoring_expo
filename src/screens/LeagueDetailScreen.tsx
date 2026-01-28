import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useOptionalNavigation } from '../hooks/useOptionalNavigation';
import { useOptionalRoute } from '../hooks/useOptionalRoute';

// Import pod-komponentov (vytvoríme ich nižšie)
import { SimpleTable } from '../components/SimpleTable'; // Použijeme tú istú tabuľku
import { LeagueScheduleTab } from '../components/LeagueScheduleTab';
import { LeagueNewsTab } from '../components/LeagueNewsTab';
// Mock dáta pre hlavičku
const LEAGUE_INFO = {
  name: "PREMIER LEAGUE",
  country: "England",
  logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
  season: "2025/2026"
};

const TABS = [
  { id: 'table', label: 'Table' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'news', label: 'News' },
] as const;

export default function LeagueDetailScreen() {
  const navigation = useOptionalNavigation();
  const route = useOptionalRoute();
  const [activeTab, setActiveTab] = useState<'table' | 'schedule' | 'news'>('table');
  
  // Tu by si reálne vytiahol ID ligy z route.params
  // const { leagueId } = route.params as any;

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

          {/* Season Selector (Mock) */}
          <View style={styles.seasonBadge}>
            <Text style={styles.seasonText}>{LEAGUE_INFO.season}</Text>
            <Ionicons name="chevron-down" size={12} color="#6B7280" style={{ marginLeft: 4 }} />
          </View>

          <Pressable style={({ pressed }) => [styles.iconButton, pressed && { opacity: 0.5 }]}>
            <Ionicons name="star" size={20} color="#FBBF24" />
          </Pressable>
        </View>

        <View style={styles.leagueInfo}>
          <Image source={{ uri: LEAGUE_INFO.logo }} style={styles.leagueLogo} contentFit="contain" />
          <View>
            <Text style={styles.leagueName}>{LEAGUE_INFO.name}</Text>
            <Text style={styles.leagueCountry}>{LEAGUE_INFO.country}</Text>
          </View>
        </View>
      </View>

      {/* --- TABS (Bezpečné štýly) --- */}
      <View style={styles.tabContainer}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Pressable
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              style={styles.tabButton}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.label}
              </Text>
              {isActive && <View style={styles.activeIndicator} />}
            </Pressable>
          );
        })}
      </View>

      {/* --- CONTENT --- */}
      <View style={styles.contentContainer}>
        {activeTab === 'table' && (
          <ScrollView showsVerticalScrollIndicator={false}>
             <View style={{ paddingTop: 16 }}>
                {/* Reusing tvoju existujúcu SimpleTable */}
                <SimpleTable 
                  leagueId="premier-league" 
                  homeTeamName="" 
                  awayTeamName="" 
                />
             </View>
          </ScrollView>
        )}
        
        {activeTab === 'schedule' && <LeagueScheduleTab />}
        
        {activeTab === 'news' && <LeagueNewsTab />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 8,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seasonBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  seasonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
  leagueInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  leagueLogo: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
  leagueName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111827',
    textTransform: 'uppercase',
  },
  leagueCountry: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  // TABS STYLES
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    position: 'relative',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#111827',
    fontWeight: '800',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    width: '60%',
    height: 3,
    backgroundColor: '#111827',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  contentContainer: {
    flex: 1,
  }
});