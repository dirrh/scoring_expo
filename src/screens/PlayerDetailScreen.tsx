import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useOptionalNavigation } from '../hooks/useOptionalNavigation';

// Importy komponentov (vytvoríme ich nižšie)
import { PlayerInfoTab } from '../components/PlayerInfoTab';
import { PlayerStatsTab } from '../components/PlayerStatsTab';
import { PlayerCareerTab } from '../components/PlayerCareerTab';

const PLAYER_INFO = {
  name: "MOHAMED SALAH",
  team: "Liverpool",
  image: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Mohamed_Salah_2018.jpg", // Mock fotka
  season: "2025/2026"
};

const TABS = [
  { id: 'info', label: 'Info' },
  { id: 'statistics', label: 'Statistics' },
  { id: 'career', label: 'Career' },
] as const;

export default function PlayerDetailScreen() {
  const navigation = useOptionalNavigation();
  const [activeTab, setActiveTab] = useState<'info' | 'statistics' | 'career'>('info');

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
            <Text style={styles.seasonText}>{PLAYER_INFO.season}</Text>
            <Ionicons name="chevron-down" size={12} color="#6B7280" style={{ marginLeft: 4 }} />
          </View>

          <Pressable style={({ pressed }) => [styles.iconButton, pressed && { opacity: 0.5 }]}>
            <Ionicons name="star-outline" size={20} color="black" />
          </Pressable>
        </View>

        <View style={styles.playerHeaderContent}>
          <Image source={{ uri: PLAYER_INFO.image }} style={styles.playerImage} contentFit="cover" />
          <View>
            <Text style={styles.playerName}>{PLAYER_INFO.name}</Text>
            <Text style={styles.playerTeam}>{PLAYER_INFO.team}</Text>
          </View>
        </View>
      </View>

      {/* --- TABS --- */}
      <View style={styles.tabContainer}>
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
      </View>

      {/* --- CONTENT --- */}
      <View style={styles.contentContainer}>
        {activeTab === 'info' && <PlayerInfoTab />}
        {activeTab === 'statistics' && <PlayerStatsTab />}
        {activeTab === 'career' && <PlayerCareerTab />}
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
  
  playerHeaderContent: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 },
  playerImage: { width: 56, height: 56, borderRadius: 28, marginRight: 16, backgroundColor: '#E5E7EB' },
  playerName: { fontSize: 20, fontWeight: '900', color: '#111827', textTransform: 'uppercase', letterSpacing: -0.5 },
  playerTeam: { fontSize: 14, color: '#6B7280', marginTop: 2, fontWeight: '500' },
  
  // TABS
  tabContainer: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  tabButton: { flex: 1, alignItems: 'center', paddingVertical: 14, position: 'relative' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#9CA3AF' },
  tabTextActive: { color: '#111827', fontWeight: '800' },
  activeIndicator: { position: 'absolute', bottom: 0, width: '40%', height: 3, backgroundColor: '#111827', borderTopLeftRadius: 3, borderTopRightRadius: 3 },
  contentContainer: { flex: 1 },
});