import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function ProfileGroupsTab() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#9CA3AF" style={{marginRight: 8}}/>
        <TextInput placeholder="Search groups..." placeholderTextColor="#9CA3AF" style={styles.input}/>
      </View>

      <View style={styles.sectionHeader}>
         <Text style={styles.sectionTitle}>MY GROUPS</Text>
         <Pressable style={styles.addBtn}><Ionicons name="add" size={16} color="white"/></Pressable>
      </View>

      {/* My Groups Cards */}
      <View style={styles.groupCard}>
         <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
            <Ionicons name="people" size={20} color="black" style={{marginRight: 8}}/>
            <Text style={styles.groupName}>My Friends Group</Text>
         </View>
         <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={[styles.avatarStack, {zIndex: 3}]} />
            <View style={[styles.avatarStack, {zIndex: 2, marginLeft: -10, backgroundColor: '#9CA3AF'}]} />
            <View style={[styles.avatarStack, {zIndex: 1, marginLeft: -10, backgroundColor: '#6B7280'}]} />
            <Text style={{fontSize: 12, color: '#6B7280', marginLeft: 8}}>You, John, and 3 others</Text>
         </View>
      </View>

      <View style={styles.groupCard}>
         <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
            <Ionicons name="people" size={20} color="black" style={{marginRight: 8}}/>
            <Text style={styles.groupName}>Anfield Forever</Text>
         </View>
         <Text style={{fontSize: 12, color: '#6B7280'}}>You are a member</Text>
      </View>

      <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>RECOMMENDED GROUPS</Text></View>
      
      {/* Recommended Item */}
      <View style={styles.recCard}>
         <View style={styles.iconCircle}><Ionicons name="earth" size={24} color="black"/></View>
         <View style={{flex: 1, marginHorizontal: 12}}>
            <Text style={styles.groupName}>Premier League Fans</Text>
            <Text style={{fontSize: 11, color: '#9CA3AF'}}>Created by @juraj478</Text>
         </View>
         <Pressable style={styles.joinBtn}><Text style={styles.joinText}>Join</Text></Pressable>
      </View>

      <View style={styles.recCard}>
         <View style={styles.iconCircle}><Ionicons name="football" size={24} color="black"/></View>
         <View style={{flex: 1, marginHorizontal: 12}}>
            <Text style={styles.groupName}>Fantasy Football Talk</Text>
         </View>
         <Pressable style={styles.joinBtn}><Text style={styles.joinText}>Join</Text></Pressable>
      </View>
      
      <View style={{height: 40}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingHorizontal: 12, height: 44, borderRadius: 22, marginBottom: 24 },
  input: { flex: 1, fontSize: 14 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 12, fontWeight: '800', color: '#111827', textTransform: 'uppercase' },
  addBtn: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#111827', alignItems: 'center', justifyContent: 'center' },
  
  groupCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 12 },
  groupName: { fontSize: 14, fontWeight: '700', color: '#111827' },
  avatarStack: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#D1D5DB', borderWidth: 2, borderColor: 'white' },

  recCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 12, marginBottom: 12, flexDirection: 'row', alignItems: 'center' },
  iconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' },
  joinBtn: { backgroundColor: '#EF4444', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
  joinText: { color: 'white', fontSize: 12, fontWeight: '700' }
});