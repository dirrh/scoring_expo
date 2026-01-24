import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export function ProfileFavoritesTab() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* TEAMS */}
      <View style={{marginBottom: 24}}>
        <Text style={styles.sectionTitle}>TEAMS</Text>
        <View style={styles.card}>
           <FavItem name="LIVERPOOL" sub="England" color="#EF4444" />
           <FavItem name="CHELSEA" sub="England" color="#1D4ED8" />
           <FavItem name="INTER" sub="Italy" color="#111827" last />
        </View>
      </View>

      {/* COMPETITIONS */}
      <View style={{marginBottom: 24}}>
        <Text style={styles.sectionTitle}>COMPETITIONS</Text>
        <View style={styles.card}>
           <FavItem name="CHAMPIONS LEAGUE WOMEN'S" sub="International" color="#1E3A8A" />
           <FavItem name="PREMIER LEAGUE" sub="England" color="#4B0082" />
           <FavItem name="LA LIGA" sub="Spain" color="#DC2626" last />
        </View>
      </View>

      <View style={{height: 40}} />
    </ScrollView>
  );
}

// Helper komponent pre riadok
function FavItem({ name, sub, color, last }: any) {
  return (
    <View style={[styles.itemRow, last && { borderBottomWidth: 0 }]}>
       <View style={[styles.logoPlaceholder, { backgroundColor: color }]} />
       <View>
          <Text style={styles.itemName}>{name}</Text>
          <Text style={styles.itemSub}>{sub}</Text>
       </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  sectionTitle: { fontSize: 12, fontWeight: '800', color: '#111827', textTransform: 'uppercase', marginBottom: 12 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, paddingHorizontal: 16 },
  itemRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  logoPlaceholder: { width: 32, height: 32, borderRadius: 6, marginRight: 12 },
  itemName: { fontSize: 13, fontWeight: '800', color: '#111827' },
  itemSub: { fontSize: 11, color: '#6B7280' }
});