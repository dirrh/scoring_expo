import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

export const GlobalNotificationButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  // Tlačidlo umiestnime nad BottomTabs (cca 80-90px od spodu)
  const bottomPosition = 90 + insets.bottom; 

  return (
    <>
      {/* --- PLÁVAJÚCE TLAČIDLO (FIALOVÉ) --- */}
      <TouchableOpacity 
        style={[styles.floatingBtn, { bottom: bottomPosition }]} 
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="notifications" size={24} color="white" />
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
          <Pressable style={styles.modalDismiss} onPress={() => setModalVisible(false)} />
          
          <View style={styles.modalContent}>
            <View style={styles.dragHandle} />

            <View style={styles.modalHeader}>
               <Text style={styles.clearAllText}>Clear All</Text>
            </View>

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
    </>
  );
};

const styles = StyleSheet.create({
  // Fialová farba podľa požiadavky
  floatingBtn: {
    position: 'absolute',
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#7C3AED', // FIALOVÁ (Purple)
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10, // Vysoká elevácia, aby bolo nad všetkým
    zIndex: 9999,
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
    borderColor: '#7C3AED'
  },
  badgeText: { fontSize: 9, color: 'white', fontWeight: 'bold' },

  // Modal styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end', zIndex: 10000 },
  modalDismiss: { flex: 1 },
  modalContent: { 
    backgroundColor: 'white', 
    borderTopLeftRadius: 24, 
    borderTopRightRadius: 24, 
    padding: 24, 
    paddingBottom: 40,
  },
  dragHandle: { width: 40, height: 4, backgroundColor: '#E5E7EB', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 16 },
  clearAllText: { fontSize: 12, color: '#6B7280', fontWeight: '600' },
  notifItem: { flexDirection: 'row', paddingVertical: 12 },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  notifAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E5E7EB', marginRight: 12 },
  notifText: { fontSize: 13, color: '#111827', marginBottom: 2 },
  notifContext: { fontSize: 12, color: '#6B7280', fontStyle: 'italic', marginBottom: 4 },
  notifTime: { fontSize: 10, color: '#9CA3AF' }
});