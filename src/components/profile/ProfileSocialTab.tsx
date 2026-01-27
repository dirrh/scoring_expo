import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function ProfileSocialTab() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* POST 1 */}
      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.name}>Izabela Majáková <Text style={styles.time}>• 3h</Text></Text>
            <Text style={styles.handle}>@iza123</Text>
          </View>
          <Ionicons name="ellipsis-horizontal" size={20} color="#6B7280" style={{marginLeft: 'auto'}}/>
        </View>
        <Text style={styles.postText}>
          Liverpool looked in top form last night — the pressing, tempo, and movement were on a completely different level 🔥.
        </Text>
        <View style={styles.actionsRow}>
           <View style={styles.actionItem}><Ionicons name="heart" size={20} color="#EF4444" /><Text style={styles.actionText}>15</Text></View>
           <View style={styles.actionItem}><Ionicons name="chatbubble-outline" size={19} color="#111827" /><Text style={styles.actionText}>6</Text></View>
           <View style={styles.actionItem}><Ionicons name="share-social-outline" size={19} color="#111827" /><Text style={styles.actionText}>0</Text></View>
        </View>
      </View>

      {/* POST 2 */}
      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={styles.avatar} />
          <View>
             <Text style={styles.name}>Eva Novotná <Text style={styles.time}>• 4h</Text></Text>
             <Text style={styles.handle}>@eva123</Text>
          </View>
          <Ionicons name="ellipsis-horizontal" size={20} color="#6B7280" style={{marginLeft: 'auto'}}/>
        </View>
        <Text style={styles.postText}>
          Kane fits Bayern like he's been there for years. Easy goals every week 🏆⚽
        </Text>
        <View style={{height: 200, backgroundColor: '#E5E7EB', borderRadius: 12, marginTop: 8, marginBottom: 8}} />
        <View style={styles.actionsRow}>
           <View style={styles.actionItem}><Ionicons name="heart-outline" size={20} color="#111827" /><Text style={styles.actionText}>78</Text></View>
           <View style={styles.actionItem}><Ionicons name="chatbubble-outline" size={19} color="#111827" /><Text style={styles.actionText}>13</Text></View>
           <View style={styles.actionItem}><Ionicons name="share-social-outline" size={19} color="#111827" /><Text style={styles.actionText}>0</Text></View>
        </View>
      </View>
      
      <View style={{height: 40}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  postCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#D1D5DB', marginRight: 10 },
  name: { fontSize: 14, fontWeight: '700', color: '#111827' },
  time: { color: '#9CA3AF', fontWeight: '400' },
  handle: { fontSize: 12, color: '#6B7280' },
  postText: { fontSize: 14, color: '#1F2937', lineHeight: 20, marginBottom: 12 },
  actionsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  actionItem: { flexDirection: 'row', alignItems: 'center', marginRight: 24 },
  actionText: { marginLeft: 6, fontSize: 13, fontWeight: '600', color: '#374151' }
});