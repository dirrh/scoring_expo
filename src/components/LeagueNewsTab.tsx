import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export function LeagueNewsTab() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {[1, 2, 3].map((item) => (
        <View key={item} style={styles.card}>
          <View style={styles.imagePlaceholder} />
          <View style={styles.content}>
            <Text style={styles.headline}>Tottenham's Maddison downplays hype after strong start to season</Text>
            <View style={styles.metaRow}>
               <Text style={styles.metaText}>SportSphere News • 13th November 7:38</Text>
            </View>
          </View>
        </View>
      ))}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, marginBottom: 16, overflow: 'hidden' },
  imagePlaceholder: { width: '100%', height: 140, backgroundColor: '#E5E7EB' },
  content: { padding: 16 },
  headline: { fontSize: 14, fontWeight: '700', color: '#111827', marginBottom: 8, lineHeight: 20 },
  metaRow: { flexDirection: 'row' },
  metaText: { fontSize: 11, color: '#9CA3AF' },
});