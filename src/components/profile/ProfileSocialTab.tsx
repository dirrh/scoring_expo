import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// --- DÁTA PRE NOTIFIKÁCIE ---
const NOTIFICATIONS = [
  { 
    id: 1, 
    name: "Lucia Nováková", 
    action: "mentioned you", 
    context: "My Friends Group · Man City vs Liverpool", 
    time: "5 min ago" 
  },
  { 
    id: 2, 
    name: "Peter Horváth", 
    action: "sent a message in", 
    context: "Premier League Room", 
    time: "12 min ago" 
  },
  { 
    id: 3, 
    name: "Emma Collins", 
    action: "sent you a private message", 
    context: "\"Are you watching the match?\"", 
    time: "15 min ago" 
  }
];

export function ProfileSocialTab() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* POST 1 - Textový */}
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

        {/* POST 2 - Obrázkový (Mock) */}
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
          {/* Mock Image Placeholder */}
          <View style={{height: 200, backgroundColor: '#E5E7EB', borderRadius: 12, marginTop: 8, marginBottom: 8}} />
          
          <View style={styles.actionsRow}>
             <View style={styles.actionItem}><Ionicons name="heart-outline" size={20} color="#111827" /><Text style={styles.actionText}>78</Text></View>
             <View style={styles.actionItem}><Ionicons name="chatbubble-outline" size={19} color="#111827" /><Text style={styles.actionText}>13</Text></View>
             <View style={styles.actionItem}><Ionicons name="share-social-outline" size={19} color="#111827" /><Text style={styles.actionText}>0</Text></View>
          </View>
        </View>
        
        {/* Extra miesto dole, aby button neprekrýval obsah */}
        <View style={{height: 80}} />
      </ScrollView>

      {/* --- PLÁVAJÚCE TLAČIDLO (ZVONČEK) --- */}
      <TouchableOpacity 
        style={styles.floatingBtn} 
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="notifications" size={24} color="white" />
        {/* Červená bodka s číslom */}
        <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
      </TouchableOpacity>

      {/* --- NOTIFICATION MODAL --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          {/* Kliknutie do prázdna zavrie modal */}
          <Pressable style={styles.modalDismiss} onPress={() => setModalVisible(false)} />
          
          <View style={styles.modalContent}>
            {/* Šedá čiara na uchopenie */}
            <View style={styles.dragHandle} />

            {/* Hlavička modalu */}
            <View style={styles.modalHeader}>
               <Text style={styles.clearAllText}>Clear All</Text>
            </View>

            {/* Zoznam notifikácií */}
            {NOTIFICATIONS.map((notif, index) => (
              <View key={notif.id} style={[
                styles.notifItem, 
                index !== NOTIFICATIONS.length - 1 && styles.borderBottom
              ]}>
                 <View style={styles.notifAvatar} />
                 <View style={{flex: 1}}>
                    <Text style={styles.notifText}>
                       <Text style={{fontWeight: 'bold'}}>{notif.name}</Text> {notif.action}
                    </Text>
                    <Text style={styles.notifContext} numberOfLines={1}>{notif.context}</Text>
                    <Text style={styles.notifTime}>{notif.time}</Text>
                 </View>
              </View>
            ))}
          </View>
        </View>
      </Modal>

    </View>
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
  actionText: { marginLeft: 6, fontSize: 13, fontWeight: '600', color: '#374151' },

  // --- FLOATING BUTTON ---
  floatingBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0EA5E9', // Modrá farba (alebo #A855F7 pre fialovú)
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#0EA5E9'
  },
  badgeText: { fontSize: 9, color: 'white', fontWeight: 'bold' },

  // --- MODAL STYLES ---
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalDismiss: { flex: 1 },
  modalContent: { 
    backgroundColor: 'white', 
    borderTopLeftRadius: 24, 
    borderTopRightRadius: 24, 
    padding: 24, 
    paddingBottom: 40,
    maxHeight: '70%'
  },
  dragHandle: { 
    width: 40, 
    height: 4, 
    backgroundColor: '#E5E7EB', 
    borderRadius: 2, 
    alignSelf: 'center', 
    marginBottom: 20 
  },
  modalHeader: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    marginBottom: 16 
  },
  clearAllText: { fontSize: 12, color: '#6B7280', fontWeight: '600' },

  // Notifikácie v zozname
  notifItem: { flexDirection: 'row', paddingVertical: 12 },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  notifAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E5E7EB', marginRight: 12 },
  notifText: { fontSize: 13, color: '#111827', marginBottom: 2 },
  notifContext: { fontSize: 12, color: '#6B7280', fontStyle: 'italic', marginBottom: 4 },
  notifTime: { fontSize: 10, color: '#9CA3AF' }
});