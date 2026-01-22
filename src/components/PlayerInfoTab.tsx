import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const INFO_DATA = [
  { label: "Age:", value: "33 years (Jun 15, 1992)" },
  { label: "Country:", value: "Egypt", flag: "🇪🇬" },
  { label: "Height:", value: "175 cm" },
  { label: "Shirt:", value: "11" },
  { label: "Preferred foot:", value: "Left" },
  { label: "Contract end:", value: "Jun 30, 2027" },
  { label: "Market value:", value: "€40.1 M" },
];

export function PlayerInfoTab() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* DATA CARD */}
      <View style={styles.card}>
        {INFO_DATA.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.label}>{item.label}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
               {item.flag && <Text style={{marginRight: 6}}>{item.flag}</Text>}
               <Text style={styles.value}>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* POSITION CARD */}
      <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>POSITION</Text></View>
      <View style={styles.positionCard}>
         
         {/* Ľavá časť: Grafika Ihriska */}
         <View style={styles.pitchGraphic}>
            {/* Čiary ihriska */}
            <View style={styles.pitchLineCenter} />
            <View style={styles.pitchCircle} />
            <View style={styles.pitchPenaltyBox} />
            <View style={styles.pitchGoalBox} />

            {/* Odznaky pozícií */}
            {/* AM - Secondary */}
            <View style={[styles.posBadge, styles.posBadgeSecondary, { top: '35%', left: '35%' }]}>
              <Text style={styles.posTextSecondary}>AM</Text>
            </View>
            
            {/* RW - Primary */}
            <View style={[styles.posBadge, styles.posBadgePrimary, { top: '35%', right: '15%' }]}>
              <Text style={styles.posTextPrimary}>RW</Text>
            </View>
         </View>

         {/* Pravá časť: Popis */}
         <View style={styles.positionInfo}>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Primary:</Text>
              <Text style={styles.infoValue}>Right Winger</Text>
            </View>
            
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Others:</Text>
              <Text style={styles.infoValue}>Attacking Midfielder</Text>
            </View>
         </View>

      </View>
      <View style={{height: 40}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, marginBottom: 24 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  label: { fontSize: 13, fontWeight: '700', color: '#111827' },
  value: { fontSize: 13, color: '#6B7280', fontWeight: '500' },
  
  sectionHeader: { marginBottom: 12 },
  sectionTitle: { fontSize: 11, fontWeight: '800', color: '#111827', textTransform: 'uppercase' },
  
  // Position Card Layout
  positionCard: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 20, 
    padding: 16, 
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    height: 180,
  },

  // --- IHRISKO (PITCH) ---
  pitchGraphic: { 
    width: 110, 
    height: 140, 
    backgroundColor: '#F3F4F6', // Svetlosivá tráva
    borderRadius: 8, 
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 24,
  },
  // Čiary (Biele)
  pitchLineCenter: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    height: 2,
    backgroundColor: 'white',
  },
  pitchCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 40,
    height: 40,
    marginLeft: -20,
    marginTop: -20,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
  },
  pitchPenaltyBox: {
    position: 'absolute',
    top: -2,
    left: '20%',
    width: '60%',
    height: '25%',
    borderWidth: 2,
    borderColor: 'white',
    borderTopWidth: 0,
  },
  pitchGoalBox: {
    position: 'absolute',
    top: -2,
    left: '35%',
    width: '30%',
    height: '10%',
    borderWidth: 2,
    borderColor: 'white',
    borderTopWidth: 0,
  },

  // --- BADGES ---
  posBadge: {
    position: 'absolute',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  posBadgePrimary: {
    backgroundColor: '#111827', // Čierna
    zIndex: 2,
  },
  posBadgeSecondary: {
    backgroundColor: '#D1D5DB', // Tmavšia sivá
    zIndex: 1,
  },
  posTextPrimary: {
    color: 'white',
    fontSize: 10,
    fontWeight: '800',
  },
  posTextSecondary: {
    color: '#1F2937',
    fontSize: 10,
    fontWeight: '800',
  },

  // --- INFO TEXT ---
  positionInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  infoBlock: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  }
});