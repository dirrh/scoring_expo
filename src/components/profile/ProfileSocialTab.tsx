import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, FlatList, NativeSyntheticEvent, NativeScrollEvent, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VideoView, useVideoPlayer } from 'expo-video';
import type { VideoPlayer } from 'expo-video';
import { useOptionalNavigation } from '../../hooks/useOptionalNavigation';
import { SOCIAL_POSTS, type SocialPost } from '../../data/socialPosts';

const { width } = Dimensions.get('window');

// MATEMATIKA ROZMEROV (Aby to sedelo na pixel presne)
// 1. Kontajner má padding 16 z každej strany (32 total)
// 2. Karta má padding 16 z každej strany (32 total)
// 3. Výsledná šírka obrázka musí byť: width - 32 - 32
const SCREEN_PADDING = 32;
const CARD_PADDING = 32;
const ACTUAL_IMAGE_WIDTH = width - SCREEN_PADDING - CARD_PADDING;

export function ProfileSocialTab() {
  const navigation = useOptionalNavigation();
  const [activePostId, setActivePostId] = useState<string | null>(SOCIAL_POSTS[0]?.id ?? null);
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 60 }).current;
  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: Array<{ item: SocialPost }> }) => {
    if (viewableItems.length > 0) {
      setActivePostId(viewableItems[0].item.id);
    }
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={SOCIAL_POSTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SocialPost
            data={item}
            isActive={item.id === activePostId}
            onOpenFullscreen={(id) => navigation?.navigate?.('SocialReels', { initialId: id })}
          />
        )}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        ListFooterComponent={<View style={{ height: 40 }} />}
      />
    </View>
  );
}

// --- KOMPONENT PRE JEDEN POST ---
function SocialPost({
  data,
  isActive,
  onOpenFullscreen,
}: {
  data: SocialPost;
  isActive: boolean;
  onOpenFullscreen: (id: string) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // Vypočítame index podľa reálnej šírky obrázka, nie šírky obrazovky
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    if (roundIndex !== activeIndex) {
      setActiveIndex(roundIndex);
    }
  };

  return (
    <View style={styles.postCard}>
      {/* HEADER */}
      <View style={styles.postHeader}>
        {/* Avatar Image namiesto View */}
        <Image 
          source={{ uri: data.avatar }} 
          style={styles.avatar} 
        />
        <View>
          <Text style={styles.name}>{data.user} <Text style={styles.time}>• {data.time}</Text></Text>
          <Text style={styles.handle}>{data.handle}</Text>
        </View>
        <Ionicons name="ellipsis-horizontal" size={20} color="#6B7280" style={{marginLeft: 'auto'}}/>
      </View>

      {/* VIDEO POST */}
      {data.video && (
        <View style={styles.carouselContainer}>
          <Pressable onPress={() => onOpenFullscreen(data.id)} style={styles.videoTapArea}>
            <InlineVideo uri={data.video} isActive={isActive} muted={isMuted} />
            <Pressable
              style={styles.muteButton}
              onPress={(event) => {
                event.stopPropagation?.();
                setIsMuted((prev) => !prev);
              }}
            >
              <Ionicons name={isMuted ? 'volume-mute' : 'volume-high'} size={18} color="#111827" />
            </Pressable>
          </Pressable>
        </View>
      )}

      {/* INSTAGRAM CAROUSEL */}
      {!data.video && data.images && data.images.length > 0 && (
        <View style={styles.carouselContainer}>
          <FlatList
            data={data.images}
            horizontal
            // DÔLEŽITÉ: pagingEnabled={false} aby sme mohli použiť snapToInterval
            pagingEnabled={false} 
            snapToInterval={ACTUAL_IMAGE_WIDTH} // Zastaví sa presne po šírke jedného obrázka
            decelerationRate="fast" // Rýchle zastavenie (snappy feel)
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <Image 
                source={{ uri: item }} 
                style={styles.postImage} 
                resizeMode="cover"
              />
            )}
          />
          
          {/* PAGINATION DOTS */}
          {data.images.length > 1 && (
            <View style={styles.paginationRow}>
              {data.images.map((_, i) => (
                <View 
                  key={i} 
                  style={[
                    styles.dot, 
                    i === activeIndex ? styles.activeDot : styles.inactiveDot
                  ]} 
                />
              ))}
            </View>
          )}
        </View>
      )}

      {/* CAPTION */}
      <Text style={styles.postText}>{data.content}</Text>

      {/* ACTIONS */}
      <View style={styles.actionsRow}>
         <View style={styles.actionItem}><Ionicons name="heart-outline" size={22} color="#111827" /><Text style={styles.actionText}>{data.likes}</Text></View>
         <View style={styles.actionItem}><Ionicons name="chatbubble-outline" size={21} color="#111827" /><Text style={styles.actionText}>{data.comments}</Text></View>
         <View style={styles.actionItem}><Ionicons name="paper-plane-outline" size={21} color="#111827" /><Text style={styles.actionText}>{data.shares}</Text></View>
         
         <View style={[styles.actionItem, { marginLeft: 'auto', marginRight: 0 }]}>
            <Ionicons name="bookmark-outline" size={21} color="#111827" />
         </View>
      </View>
    </View>
  );
}

function InlineVideo({ uri, isActive, muted }: { uri: string; isActive: boolean; muted: boolean }) {
  const player = useVideoPlayer(uri, (instance: VideoPlayer) => {
    instance.muted = muted;
    instance.loop = true;
  });

  React.useEffect(() => {
    player.muted = muted;
    if (isActive) {
      player.play();
    } else {
      player.pause();
    }
  }, [isActive, muted, player]);

  return (
    <VideoView
      style={styles.postImage}
      player={player}
      contentFit="cover"
      nativeControls={false}
      allowsFullscreen={false}
      allowsPictureInPicture={false}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  postCard: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 16, 
    padding: 16, 
    marginBottom: 16, 
    shadowColor: "#000", 
    shadowOpacity: 0.05, 
    shadowRadius: 10, 
    elevation: 2 
  },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  
  // Avatar štýly
  avatar: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#E5E7EB', // Fallback farba kým sa načíta
    marginRight: 10 
  },
  
  name: { fontSize: 14, fontWeight: '700', color: '#111827' },
  time: { color: '#9CA3AF', fontWeight: '400' },
  handle: { fontSize: 12, color: '#6B7280' },
  
  carouselContainer: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  videoTapArea: {
    position: 'relative',
  },
  muteButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  
  // Rozmery obrázka presne vypočítané
  postImage: {
    width: ACTUAL_IMAGE_WIDTH, 
    height: 350, 
    borderRadius: 12,
  },
  
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  dot: { width: 6, height: 6, borderRadius: 3, marginHorizontal: 3 },
  activeDot: { backgroundColor: '#3B82F6', width: 8, height: 8, borderRadius: 4 },
  inactiveDot: { backgroundColor: '#D1D5DB' },

  postText: { fontSize: 14, color: '#1F2937', lineHeight: 20, marginBottom: 12 },
  actionsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  actionItem: { flexDirection: 'row', alignItems: 'center', marginRight: 24 },
  actionText: { marginLeft: 6, fontSize: 13, fontWeight: '600', color: '#374151' }
});