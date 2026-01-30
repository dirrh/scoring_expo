import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Image } from 'react-native';
import { useOptionalNavigation } from '../../hooks/useOptionalNavigation';
import { Ionicons } from '@expo/vector-icons';

const CHATS = [
  { id: '1', name: "Emma Collins", message: "You: That second goal was...", time: "20:07", read: true, avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: '2', name: "Tom Wilson", message: "Haaland is just on another...", time: "19:07", read: false, avatar: "https://randomuser.me/api/portraits/men/41.jpg" },
  { id: '3', name: "James Carter", message: "You: Stats look much better...", time: "17:07", read: true, avatar: "https://randomuser.me/api/portraits/men/52.jpg" },
  { id: '4', name: "Laura Bennett", message: "Referee was terrible in the...", time: "SAT", read: true, avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
];

export function ProfileChatsTab() {
  const navigation = useOptionalNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#9CA3AF" style={{marginRight: 8}}/>
        <TextInput placeholder="Search friends..." placeholderTextColor="#9CA3AF" style={styles.input}/>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {CHATS.map((chat) => (
          <Pressable 
            key={chat.id} 
            onPress={() => navigation?.navigate?.('ChatDetail', { name: chat.name })}
            style={styles.chatRow}
          >
            <Image source={{ uri: chat.avatar }} style={styles.avatar} />
            <View style={{flex: 1, marginRight: 8}}>
               <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                 <Text style={styles.name}>{chat.name}</Text>
                 <View style={{flexDirection:'row', alignItems:'center'}}>
                   <Text style={styles.time}>{chat.time}</Text>
                 </View>
               </View>
               <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 2}}>
                 <Text style={styles.message} numberOfLines={1}>{chat.message}</Text>
                 {chat.read && <Ionicons name="checkmark-done-outline" size={16} color="#3B82F6" />}
               </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', margin: 16, paddingHorizontal: 12, height: 44, borderRadius: 22 },
  input: { flex: 1, fontSize: 14, color: '#111827' },
  chatRow: { flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6', alignItems: 'center' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  name: { fontSize: 15, fontWeight: '700', color: '#111827' },
  message: { fontSize: 13, color: '#6B7280', flex: 1, marginRight: 10 },
  time: { fontSize: 11, color: '#9CA3AF' }
});