import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Importy tabov (vytvoríme ich nižšie)
import { ProfileSocialTab } from '../components/profile/ProfileSocialTab';
import { ProfileChatsTab } from '../components/profile/ProfileChats.Tab';
import { ProfileGroupsTab } from '../components/profile/ProfileGroupsTab';
import { ProfileFavoritesTab } from '../components/profile/ProfileFavoritesTab';

const TABS = [
  { id: 'activity', label: 'Activity' }, // Skipneme
  { id: 'social', label: 'Social' },
  { id: 'chats', label: 'Chats' },
  { id: 'groups', label: 'Groups' },
  { id: 'favorites', label: 'Favorites' },
];

export default function ProfileScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('social'); // Default tab

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.avatarContainer}>
             {/* Placeholder pre Avatar */}
             <View style={styles.avatar} /> 
          </View>
          
          <View style={styles.statsContainer}>
            <Text style={styles.userName}>MARTIN NOVÁK</Text>
            <View style={styles.followRow}>
              <View style={{marginRight: 16}}>
                <Text style={styles.statNum}>253</Text>
                <Text style={styles.statLabel}>followers</Text>
              </View>
              <View>
                <Text style={styles.statNum}>563</Text>
                <Text style={styles.statLabel}>following</Text>
              </View>
            </View>
          </View>

          <Pressable style={styles.settingsBtn}>
            <Ionicons name="settings-outline" size={20} color="black" />
          </Pressable>
        </View>

        <Text style={styles.bio}>About me... <Text style={{color: '#9CA3AF'}}>(0-160)</Text></Text>
      </View>

      {/* --- TABS NAVIGATOR --- */}
      <View style={styles.tabsWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Pressable 
                key={tab.id} 
                onPress={() => setActiveTab(tab.id)}
                style={[styles.tabItem, isActive && styles.tabItemActive]}
              >
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                  {tab.label}
                </Text>
              </Pressable>
            )
          })}
        </ScrollView>
      </View>

      {/* --- CONTENT --- */}
      <View style={styles.contentArea}>
        {activeTab === 'social' && <ProfileSocialTab />}
        {activeTab === 'chats' && <ProfileChatsTab />}
        {activeTab === 'groups' && <ProfileGroupsTab />}
        {activeTab === 'favorites' && <ProfileFavoritesTab />}
        {activeTab === 'activity' && <View style={{padding: 20}}><Text>Activity Coming Soon</Text></View>}
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatarContainer: { marginRight: 16 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#D1D5DB' },
  statsContainer: { flex: 1 },
  userName: { fontSize: 18, fontWeight: '900', color: '#111827', marginBottom: 4, textTransform: 'uppercase' },
  followRow: { flexDirection: 'row' },
  statNum: { fontSize: 14, fontWeight: '700', color: '#111827' },
  statLabel: { fontSize: 12, color: '#4B5563' },
  settingsBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F9FAFB', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E5E7EB' },
  bio: { fontSize: 13, color: '#6B7280', fontStyle: 'italic' },
  
  tabsWrapper: { borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  tabsContainer: { paddingHorizontal: 12 },
  tabItem: { paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabItemActive: { borderBottomColor: '#111827' },
  tabText: { fontSize: 14, fontWeight: '500', color: '#6B7280' },
  tabTextActive: { color: '#111827', fontWeight: '700' },
  contentArea: { flex: 1, backgroundColor: '#F9FAFB' }
});