import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabs } from '../components/BottomTabs';
import { useOptionalNavigation } from '../hooks/useOptionalNavigation';
import { useOptionalRoute } from '../hooks/useOptionalRoute';

export default function ChatDetailScreen() {
  const navigation = useOptionalNavigation();
  const route = useOptionalRoute<{ name?: string }>();
  const name = route?.params?.name ?? "Chat";

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation?.goBack?.()} style={{padding: 8}}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </Pressable>
        <Text style={styles.headerTitle}>{name}</Text>
        <Ionicons name="ellipsis-vertical" size={20} color="black" style={{padding: 8}}/>
      </View>

      {/* MESSAGES */}
      <ScrollView style={styles.chatArea} contentContainerStyle={{ paddingVertical: 16, paddingBottom: 140 }}>
        
        {/* Left Message */}
      <View style={styles.rowLeft}>
         <Image source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} style={styles.avatarSmall} />
           <View>
              <View style={styles.bubbleLeft}><Text style={styles.textLeft}>Emma respond to You</Text></View>
              <View style={[styles.bubbleLeft, {marginTop: 4}]}><Text style={styles.textLeft}>Are you watching the game?</Text></View>
           </View>
        </View>

        {/* Right Message */}
      <View style={styles.rowRight}>
           <View style={styles.bubbleRight}>
              <Text style={styles.textRight}>Yeah! That goal was insane 🚀</Text>
           </View>
         <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.avatarSmall} />
        </View>

        {/* Left Message */}
      <View style={styles.rowLeft}>
         <Image source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} style={styles.avatarSmall} />
           <View style={styles.bubbleLeft}><Text style={styles.textLeft}>Totally agree!</Text></View>
        </View>

      </ScrollView>

      {/* INPUT */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Type a message..." />
          <View style={styles.sendButton}>
            <Ionicons name="paper-plane" size={20} color="white" />
          </View>
        </View>
      </KeyboardAvoidingView>

      <BottomTabs
        activeTab="Profile"
        onNavigate={(routeName) => navigation?.navigate?.(routeName)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingBottom: 80 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 8, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  headerTitle: { fontSize: 16, fontWeight: '800', textTransform: 'uppercase' },
  chatArea: { flex: 1, paddingHorizontal: 16 },
  
  rowLeft: { flexDirection: 'row', marginBottom: 16 },
  rowRight: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 16 },
  
  avatarSmall: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#E5E7EB', marginHorizontal: 8 },
  
  bubbleLeft: { backgroundColor: '#F3F4F6', padding: 12, borderRadius: 16, borderTopLeftRadius: 4, maxWidth: '75%' },
  bubbleRight: { backgroundColor: '#BAE6FD', padding: 12, borderRadius: 16, borderTopRightRadius: 4, maxWidth: '75%' },
  
  textLeft: { color: '#1F2937', fontSize: 14 },
  textRight: { color: '#0C4A6E', fontSize: 14 },

  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 12, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  input: { flex: 1, backgroundColor: '#F9FAFB', height: 44, borderRadius: 22, paddingHorizontal: 16, marginRight: 12 },
  sendButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#111827', alignItems: 'center', justifyContent: 'center' }
});