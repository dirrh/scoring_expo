import React, { useMemo, useRef, useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Pressable, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VideoView, useVideoPlayer } from 'expo-video';
import type { VideoPlayer } from 'expo-video';
import { useOptionalNavigation } from '../hooks/useOptionalNavigation';
import { useOptionalRoute } from '../hooks/useOptionalRoute';
import { VIDEO_POSTS } from '../data/socialPosts';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

type ReelsRouteParams = {
  initialId?: string;
};

export default function SocialReelsScreen() {
  const navigation = useOptionalNavigation();
  const route = useOptionalRoute<ReelsRouteParams>();
  const [activeIndex, setActiveIndex] = useState(0);
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 80 }).current;

  const initialIndex = useMemo(() => {
    const targetId = route?.params?.initialId;
    if (!targetId) {
      return 0;
    }
    const index = VIDEO_POSTS.findIndex((post) => post.id === targetId);
    return index >= 0 ? index : 0;
  }, [route?.params?.initialId]);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: Array<{ index?: number }> }) => {
    if (viewableItems.length > 0 && typeof viewableItems[0].index === 'number') {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={VIDEO_POSTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ReelItem
            post={item}
            isActive={index === activeIndex}
          />
        )}
        pagingEnabled
        snapToInterval={SCREEN_HEIGHT}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        initialScrollIndex={initialIndex}
        getItemLayout={(_, index) => ({
          length: SCREEN_HEIGHT,
          offset: SCREEN_HEIGHT * index,
          index,
        })}
      />

      <Pressable style={styles.backButton} onPress={() => navigation?.goBack?.()}>
        <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

function ReelItem({ post, isActive }: { post: (typeof VIDEO_POSTS)[0]; isActive: boolean }) {
  const [isMuted, setIsMuted] = useState(true);
  const player = useVideoPlayer(post.video ?? '', (instance: VideoPlayer) => {
    instance.muted = isMuted;
    instance.loop = true;
  });

  React.useEffect(() => {
    player.muted = isMuted;
    if (isActive) {
      player.play();
    } else {
      player.pause();
    }
  }, [isActive, isMuted, player]);

  return (
    <Pressable
      style={styles.reelItem}
      onPress={() => setIsMuted((prev) => !prev)}
    >
      <VideoView
        style={styles.reelVideo}
        player={player}
        contentFit="cover"
        nativeControls={false}
        allowsFullscreen={false}
        allowsPictureInPicture={false}
      />

      <View style={styles.rightActions}>
        <Pressable
          style={styles.actionButton}
          onPress={(event) => event.stopPropagation?.()}
        >
          <Ionicons name="heart-outline" size={28} color="#FFFFFF" />
          <Text style={styles.actionCount}>{post.likes}</Text>
        </Pressable>
        <Pressable
          style={styles.actionButton}
          onPress={(event) => event.stopPropagation?.()}
        >
          <Ionicons name="chatbubble-outline" size={26} color="#FFFFFF" />
          <Text style={styles.actionCount}>{post.comments}</Text>
        </Pressable>
        <Pressable
          style={styles.actionButton}
          onPress={(event) => event.stopPropagation?.()}
        >
          <Ionicons name="paper-plane-outline" size={26} color="#FFFFFF" />
          <Text style={styles.actionCount}>{post.shares}</Text>
        </Pressable>
        <Pressable
          style={styles.actionButton}
          onPress={(event) => event.stopPropagation?.()}
        >
          <Ionicons name="ellipsis-horizontal" size={22} color="#FFFFFF" />
        </Pressable>
      </View>

      <View style={styles.captionBox}>
        <View style={styles.profileRow}>
          <Image source={{ uri: post.avatar }} style={styles.avatar} />
          <View style={styles.profileMeta}>
            <Text style={styles.profileName} numberOfLines={1}>
              {post.user}
            </Text>
            <Text style={styles.profileTime} numberOfLines={1}>
              {post.handle} · {post.time}
            </Text>
          </View>
        </View>
        <Text style={styles.captionText} numberOfLines={2}>
          {post.content}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  reelItem: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#000000',
  },
  reelVideo: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(17, 24, 39, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightActions: {
    position: 'absolute',
    right: 12,
    bottom: 80,
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 18,
  },
  actionCount: {
    marginTop: 6,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  captionBox: {
    position: 'absolute',
    left: 12,
    bottom: 24,
    right: 88,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginRight: 10,
    backgroundColor: '#111827',
  },
  profileMeta: {
    flex: 1,
  },
  profileName: {
    color: '#F9FAFB',
    fontSize: 14,
    fontWeight: '700',
  },
  profileTime: {
    color: '#E5E7EB',
    fontSize: 12,
  },
  captionText: {
    color: '#F9FAFB',
    fontSize: 14,
    lineHeight: 20,
  },
});
