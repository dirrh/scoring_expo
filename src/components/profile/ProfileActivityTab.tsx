import React, { useMemo, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable, 
  Modal, 
  TextInput, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ActivityPost = {
  id: string;
  content: string;
  time: string;
  likes: number;
  comments: number;
  shares: number;
};

const AUTHOR_NAME = 'Martin Novák';
const AUTHOR_HANDLE = '@mato123';

export function ProfileActivityTab() {
  const [composerVisible, setComposerVisible] = useState(false);
  const [draftText, setDraftText] = useState('');

  const posts = useMemo<ActivityPost[]>(
    () => [
      {
        id: 'p1',
        content: 'Incredible performance from Manchester tonight! Rashford is in great form 🔥',
        time: '3h',
        likes: 28,
        comments: 3,
        shares: 0,
      },
      {
        id: 'p2',
        content: 'Kane fits Bayern like he’s been there for years. Easy goals every week 🏆⚽',
        time: '8h',
        likes: 78,
        comments: 13,
        shares: 0,
      },
      {
        id: 'p3',
        content: 'Sevilla defending like it’s their last day on Earth 😤 what a fight!',
        time: '3d',
        likes: 41,
        comments: 6,
        shares: 2,
      },
    ],
    []
  );

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.avatar} />
              <View>
                <Text style={styles.name}>
                  {AUTHOR_NAME} <Text style={styles.time}>• {post.time}</Text>
                </Text>
                <Text style={styles.handle}>{AUTHOR_HANDLE}</Text>
              </View>
              <Ionicons name="ellipsis-horizontal" size={20} color="#6B7280" style={{ marginLeft: 'auto' }} />
            </View>
            <Text style={styles.postText}>{post.content}</Text>
            <View style={styles.actionsRow}>
              <View style={styles.actionItem}>
                <Ionicons name="heart-outline" size={20} color="#111827" />
                <Text style={styles.actionText}>{post.likes}</Text>
              </View>
              <View style={styles.actionItem}>
                <Ionicons name="chatbubble-outline" size={19} color="#111827" />
                <Text style={styles.actionText}>{post.comments}</Text>
              </View>
              <View style={styles.actionItem}>
                <Ionicons name="share-social-outline" size={19} color="#111827" />
                <Text style={styles.actionText}>{post.shares}</Text>
              </View>
            </View>
          </View>
        ))}
        {/* Priestor dole */}
        <View style={{ height: 160 }} />
      </ScrollView>

      {/* --- BLUE FAB BUTTON (Dole) --- */}
      <Pressable style={styles.fab} onPress={() => setComposerVisible(true)}>
        <Ionicons name="add" size={28} color="white" />
      </Pressable>

      {/* --- CREATE POST MODAL --- */}
      <Modal visible={composerVisible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalSafe}>
          <View style={styles.modalContainer}>
            
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setComposerVisible(false)} style={styles.backBtn}>
                 <Ionicons name="chevron-back" size={24} color="#111827" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareBtn}>
                 <Text style={styles.shareBtnText}>Share</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.mainInput}
              placeholder="Share your thoughts..."
              placeholderTextColor="#9CA3AF"
              value={draftText}
              onChangeText={setDraftText}
              multiline
              autoFocus
              textAlignVertical="top"
            />

            <KeyboardAvoidingView 
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
              keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
            >
               <View style={styles.toolbar}>
                  <TouchableOpacity style={styles.cameraBox}>
                     <Ionicons name="camera-outline" size={24} color="#0EA5E9" />
                  </TouchableOpacity>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingLeft: 12}}>
                     {[1,2,3,4].map((i) => (
                        <View key={i} style={styles.imagePreview}>
                           <Image 
                             source={{ uri: `https://picsum.photos/100/100?random=${i}` }} 
                             style={{width: '100%', height: '100%'}} 
                           />
                        </View>
                     ))}
                  </ScrollView>
               </View>
            </KeyboardAvoidingView>

          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { flex: 1, padding: 16 },
  postCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2,
  },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#D1D5DB', marginRight: 10 },
  name: { fontSize: 14, fontWeight: '700', color: '#111827' },
  time: { color: '#9CA3AF', fontWeight: '400' },
  handle: { fontSize: 12, color: '#6B7280' },
  postText: { fontSize: 14, color: '#1F2937', lineHeight: 20, marginBottom: 12 },
  actionsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  actionItem: { flexDirection: 'row', alignItems: 'center', marginRight: 24 },
  actionText: { marginLeft: 6, fontSize: 13, fontWeight: '600', color: '#374151' },
  
  // --- FAB BUTTON (UPRAVENÁ POZÍCIA) ---
  fab: {
    position: 'absolute',
    left: 310,
    bottom: 90, // <--- Toto ho dá dole, tesne nad spodné menu
    width: 56, height: 56, borderRadius: 28, backgroundColor: '#0EA5E9',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: "#0EA5E9", shadowOpacity: 0.4, shadowRadius: 8, elevation: 6, zIndex: 50
  },

  // Modal styles...
  modalSafe: { flex: 1, backgroundColor: 'white' },
  modalContainer: { flex: 1, backgroundColor: 'white' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'flex-start', justifyContent: 'center' },
  shareBtn: { backgroundColor: '#0EA5E9', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  shareBtnText: { color: 'white', fontWeight: '700', fontSize: 14 },
  mainInput: { flex: 1, padding: 20, fontSize: 18, color: '#111827' },
  toolbar: { flexDirection: 'row', padding: 12, borderTopWidth: 1, borderTopColor: '#F3F4F6', alignItems: 'center' },
  cameraBox: { width: 52, height: 52, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9FAFB' },
  imagePreview: { width: 52, height: 52, borderRadius: 12, overflow: 'hidden', marginLeft: 10, backgroundColor: '#F3F4F6' }
});