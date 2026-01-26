import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabs } from '../components/BottomTabs';

// 1. IMPORT DATA
import ALL_MATCHES from '../data/matches.json'; 

// --- CONSTANTS ---
const SPORTS = ["Football", "Basketball", "Hockey", "Tennis", "Baseball", "MMA"];

const LEAGUES = [
  { id: 1, name: "Premier League" },
  { id: 2, name: "Champions League" },
  { id: 3, name: "Serie A" },
  { id: 4, name: "La Liga" },
  { id: 5, name: "Bundesliga" },
];

export default function BettingScreen({ navigation }: any) {
  const [selectedSport, setSelectedSport] = useState("Football");
  // 2. STATE FOR SELECTED LEAGUE (Default 1 = Premier League)
  const [selectedLeague, setSelectedLeague] = useState(1);

  // 3. FILTER MATCHES
  const filteredMatches = ALL_MATCHES.filter(match => match.leagueId === selectedLeague);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        {/* Sport Selector */}
        <Pressable style={styles.sportSelector}>
          <Ionicons name="football" size={18} color="black" style={{marginRight: 8}} />
          <Text style={styles.sportText}>{selectedSport}</Text>
          <Ionicons name="chevron-down" size={16} color="black" style={{marginLeft: 8}} />
        </Pressable>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* Wallet */}
          <View style={styles.walletBadge}>
            <Ionicons name="radio-button-on" size={14} color="black" style={{marginRight: 4}}/> 
            <Text style={{fontWeight: '700', fontSize: 13}}>50</Text>
          </View>
          {/* Search */}
          <Pressable style={styles.iconButton}>
             <Ionicons name="search" size={20} color="black" />
          </Pressable>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
        
        {/* --- LEAGUES HORIZONTAL SCROLL --- */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.leaguesContainer}>
           {LEAGUES.map((league) => {
             const isActive = selectedLeague === league.id;
             return (
               <Pressable 
                 key={league.id} 
                 style={styles.leagueItem}
                 onPress={() => setSelectedLeague(league.id)} // <--- CLICK CHANGES LEAGUE
               >
                  <View style={[
                    styles.leagueCircle, 
                    isActive && styles.leagueCircleActive // Highlight active league
                  ]}>
                     <Ionicons 
                        name="trophy" 
                        size={20} 
                        color={isActive ? "#FFFFFF" : "#6B7280"} // White icon if active
                     />
                  </View>
                  <Text style={[
                    styles.leagueName, 
                    isActive && { color: '#111827', fontWeight: '900' }
                  ]}>
                    {league.name.replace(' ', '\n')}
                  </Text>
               </Pressable>
             );
           })}
           <View style={{width: 16}} />
        </ScrollView>

        {/* --- MATCH CARDS --- */}
        <View style={styles.matchesList}>
          {/* Render only filtered matches */}
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match) => (
              <Pressable 
                key={match.id} 
                style={styles.matchCard}
                onPress={() => navigation.navigate('BettingDetail', { match: match })} // <--- NAVIGATE TO DETAIL
              >
                
                {/* Card Header: Vol & Fav */}
                <View style={styles.cardHeader}>
                   <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Ionicons name="stats-chart" size={14} color="#9CA3AF" style={{marginRight:4}}/>
                      <Text style={styles.volText}>{match.vol} Vol.</Text>
                   </View>
                   <Ionicons name={match.favorite ? "star" : "star-outline"} size={18} color={match.favorite ? "#FACC15" : "#9CA3AF"} />
                </View>

                {/* Teams & Score Row */}
                <View style={styles.teamsRow}>
                   {/* Home */}
                   <View style={styles.teamSide}>
                      <View style={styles.teamLogo}><Ionicons name="shield" size={24} color="#3B82F6"/></View> 
                      <Text style={styles.teamName}>{match.home.name}</Text>
                   </View>

                   {/* Center Info */}
                   <View style={styles.scoreInfo}>
                      <Text style={[styles.scoreText, match.isLive ? {color: '#EF4444'} : {color: '#111827'}]}>
                         {match.score}
                      </Text>
                      <Text style={[styles.timeText, match.isLive ? {color: '#EF4444'} : {color: '#6B7280'}]}>
                         {match.time}
                      </Text>
                   </View>

                   {/* Away */}
                   <View style={styles.teamSide}>
                      <Text style={styles.teamName}>{match.away.name}</Text>
                      <View style={styles.teamLogo}><Ionicons name="shield" size={24} color="#EF4444"/></View>
                   </View>
                </View>

                {/* Odds Buttons */}
                <View style={styles.oddsRow}>
                   <View style={styles.oddBtn}>
                      <Text style={styles.oddLabel}>1W</Text>
                      <Text style={styles.oddValue}>{match.odds.w1}</Text>
                   </View>
                   <View style={styles.oddBtn}>
                      <Text style={styles.oddLabel}>X</Text>
                      <Text style={styles.oddValue}>{match.odds.x}</Text>
                   </View>
                   <View style={styles.oddBtn}>
                      <Text style={styles.oddLabel}>2W</Text>
                      <Text style={styles.oddValue}>{match.odds.w2}</Text>
                   </View>
                </View>

              </Pressable>
            ))
          ) : (
            <View style={{alignItems: 'center', marginTop: 20}}>
              <Text style={{color: '#9CA3AF'}}>No matches found for this league.</Text>
            </View>
          )}
        </View>

      </ScrollView>

      <BottomTabs
        activeTab="Betting"
        onNavigate={(routeName) => navigation?.navigate?.(routeName)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6', paddingBottom: 80 },
  
  // Header
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingVertical: 12,
    backgroundColor: '#F3F4F6' 
  },
  sportSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5, elevation: 2
  },
  sportText: { fontWeight: '800', fontSize: 14, textTransform: 'uppercase' },
  walletBadge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 24,
    marginRight: 8,
    shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5, elevation: 2
  },
  iconButton: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5, elevation: 2
  },

  // Leagues
  leaguesContainer: { paddingLeft: 16, marginTop: 16, marginBottom: 24 },
  leagueItem: { alignItems: 'center', marginRight: 20, width: 60 },
  leagueCircle: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
    shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5, elevation: 2
  },
  leagueCircleActive: {
    backgroundColor: '#4B0082', // Active league color
  },
  leagueName: { fontSize: 9, fontWeight: '700', textAlign: 'center', color: '#6B7280' },

  // Matches
  matchesList: { paddingHorizontal: 16 },
  matchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10, elevation: 3
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  volText: { fontSize: 12, color: '#9CA3AF', fontWeight: '500' },
  
  teamsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  teamSide: { flexDirection: 'row', alignItems: 'center' },
  teamLogo: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F3F4F6', alignItems:'center', justifyContent:'center' }, 
  teamName: { fontSize: 14, fontWeight: '900', color: '#111827', textTransform: 'uppercase', marginHorizontal: 8 },
  
  scoreInfo: { alignItems: 'center' },
  scoreText: { fontSize: 24, fontWeight: '900', marginBottom: 4 },
  timeText: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },

  oddsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  oddBtn: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#FFFFFF', 
    borderWidth: 1, 
    borderColor: '#E5E7EB',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginHorizontal: 4
  },
  oddLabel: { fontSize: 12, color: '#9CA3AF', fontWeight: '600' },
  oddValue: { fontSize: 12, color: '#111827', fontWeight: '800' }
});