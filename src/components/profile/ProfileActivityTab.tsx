import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal, TextInput, Image } from 'react-native';
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

export const ProfileActivityTab = () => {
  const [composerVisible, setComposerVisible] = useState(false);
  const [draftText, setDraftText] = useState('');
  // Positioning handled by ProfileScreen based on active tab.

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
      {
        id: 'p4',
        content: 'Saturday night fixtures are stacked. Any predictions?',
        time: '5d',
        likes: 19,
        comments: 7,
        shares: 1,
      },
      {
        id: 'p5',
        content: 'Training day. Focus on the basics and trust the process.',
        time: '1w',
        likes: 12,
        comments: 1,
        shares: 0,
      },
    ],
    []
  );

  const mediaItems = useMemo(
    () => [
      { id: 'm1', uri: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop' },
      { id: 'm2', uri: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=200&h=200&fit=crop' },
      { id: 'm3', uri: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=200&fit=crop' },
      { id: 'm4', uri: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=200&h=200&fit=crop' },
      { id: 'm5', uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop' },
      { id: 'm6', uri: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=200&h=200&fit=crop' },
    ],
    []
  );

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <Image
                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                style={styles.avatar}
              />
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
        <View style={{ height: 60 }} />
      </ScrollView>

      <Pressable style={styles.fab} onPress={() => setComposerVisible(true)}>
        <Ionicons name="add" size={28} color="white" />
      </Pressable>

      <Modal visible={composerVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeaderRow}>
            <Pressable style={styles.modalBackBtn} onPress={() => setComposerVisible(false)}>
              <Ionicons name="chevron-back" size={22} color="#111827" />
            </Pressable>
            <Pressable
              style={styles.modalShareBtn}
              onPress={() => {
                setComposerVisible(false);
                setDraftText('');
              }}
            >
              <Text style={styles.modalShareText}>Share</Text>
            </Pressable>
          </View>

          <TextInput
            style={styles.modalComposer}
            placeholder="Share your thoughts..."
            value={draftText}
            onChangeText={setDraftText}
            multiline
            textAlignVertical="top"
            autoFocus
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.mediaRow}
          >
            <Pressable style={styles.mediaTile}>
              <Ionicons name="camera-outline" size={22} color="#3b82f6" />
            </Pressable>
            {mediaItems.map((item) => (
              <Image
                key={item.id}
                source={{ uri: item.uri }}
                style={styles.mediaThumb}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { flex: 1, padding: 16 },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
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
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalBackBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalShareBtn: {
    backgroundColor: '#3b82f6',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 999,
  },
  modalShareText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  modalComposer: {
    flex: 1,
    fontSize: 20,
    color: '#111827',
    paddingVertical: 8,
  },
  mediaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 0,
    gap: 10,
  },
  mediaTile: {
    width: 64,
    height: 64,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  mediaThumb: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
  },
});
