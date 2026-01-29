import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TextInput, 
  ScrollView, 
  Pressable 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  interpolate, 
  Extrapolate, 
  runOnJS
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.85; 

const SPRING_CONFIG = {
  damping: 40,
  stiffness: 250,
  mass: 1
};

// --- MOCK DATA ---
const CHATS = [
  { id: '1', name: 'Emma Collins', msg: 'You: That second goal was...', time: '20:07', initial: 'EC', active: true },
  { id: '2', name: 'Tom Wilson', msg: 'Haaland is just on another...', time: '19:07', initial: 'TW', active: false },
  { id: '3', name: 'James Carter', msg: 'You: Stats look much bette...', time: '17:07', initial: 'JC', active: true },
  { id: '4', name: 'Laura Bennett', msg: 'Referee was terrible in the...', time: 'SAT', initial: 'LB', active: true },
  { id: '5', name: 'Peter Horváth', msg: 'Ten gól v 67. minúte rozho...', time: 'SAT', initial: 'PH', active: false },
  { id: '6', name: 'Daniel Smith', msg: 'You: Are you joining the Pr...', time: '6.12.', initial: 'DS', active: true },
];

export const SideChatsDrawer = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [isOpen, setIsOpen] = useState(false);

  const translateX = useSharedValue(DRAWER_WIDTH);
  const translateY = useSharedValue(height / 2 + 50);
  const contextY = useSharedValue(0);

  const verticalPanGesture = Gesture.Pan()
    .onStart(() => {
      contextY.value = translateY.value;
    })
    .onUpdate((e) => {
      const newY = contextY.value + e.translationY;
      if (newY > 100 && newY < height - 150) {
        translateY.value = newY;
      }
    });

  const tapGesture = Gesture.Tap().onEnd(() => {
    if (translateX.value < DRAWER_WIDTH / 2) {
      translateX.value = withSpring(DRAWER_WIDTH, SPRING_CONFIG);
      runOnJS(setIsOpen)(false);
    } else {
      translateX.value = withSpring(0, SPRING_CONFIG);
      runOnJS(setIsOpen)(true);
    }
  });

  const closeDrawer = () => {
    translateX.value = withSpring(DRAWER_WIDTH, SPRING_CONFIG);
    setIsOpen(false);
  };

  const handleChatPress = (chatName: string) => {
    closeDrawer();
    setTimeout(() => {
        navigation.navigate('ChatDetail', { name: chatName });
    }, 200);
  };

  const rDrawerStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX.value }] };
  });

  const rButtonStyle = useAnimatedStyle(() => {
    return { transform: [{ translateY: translateY.value }] };
  });

  const rOverlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [0, DRAWER_WIDTH], [0.5, 0], Extrapolate.CLAMP);
    return {
      opacity,
      pointerEvents: translateX.value < DRAWER_WIDTH / 2 ? 'auto' : 'none',
    };
  });

  const composedGesture = Gesture.Simultaneous(verticalPanGesture, tapGesture);

  return (
    <>
      <Animated.View style={[styles.overlay, rOverlayStyle]}>
        <Pressable style={{ flex: 1 }} onPress={closeDrawer} />
      </Animated.View>

      <Animated.View style={[styles.drawerContainer, rDrawerStyle, { paddingTop: insets.top }]}>
        <View style={styles.drawerContent}>
          <View style={styles.headerRow}>
             <Pressable onPress={() => navigation.goBack()} style={{marginRight: 10}}>
                <View style={styles.iconCircle}>
                    <Ionicons name="chevron-back" size={20} color="#111827" />
                </View>
             </Pressable>
             <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#9CA3AF" />
                <TextInput placeholder="Search person..." placeholderTextColor="#9CA3AF" style={styles.searchInput} />
             </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
            {CHATS.map((chat) => (
              <Pressable 
                key={chat.id} 
                style={styles.chatItem} 
                onPress={() => handleChatPress(chat.name)}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{chat.initial}</Text>
                </View>
                <View style={styles.chatInfo}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.chatName}>{chat.name}</Text>
                    {chat.active && <Ionicons name="checkmark-done-outline" size={16} color="#9CA3AF" />}
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 2}}>
                    <Text style={styles.lastMsg} numberOfLines={1}>{chat.msg}</Text>
                    <Text style={styles.timeText}>• {chat.time}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* --- DOTYKOVÁ ZÓNA TLAČIDLA --- */}
        <GestureDetector gesture={composedGesture}>
          <Animated.View style={[styles.touchableArea, rButtonStyle]}>
             {/* VIZUÁLNE TLAČIDLO (Menšie, vnútri dotykovej zóny) */}
             <View style={styles.visualButton}>
                <View style={styles.handleBar} />
             </View>
          </Animated.View>
        </GestureDetector>

      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'black', zIndex: 1000 },
  
  drawerContainer: {
    position: 'absolute', 
    top: 0, 
    bottom: 0, 
    right: 0, 
    width: DRAWER_WIDTH, 
    backgroundColor: 'white',
    borderTopLeftRadius: 30, 
    borderBottomLeftRadius: 30, 
    // Zvýšený Z-Index aby to bolo nad všetkým
    zIndex: 10001,
    // Dôležité pre Android: aby dieťa (tlačidlo) mohlo trčať von
    overflow: 'visible', 
    shadowColor: "#000", shadowOffset: { width: -5, height: 0 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 20,
  },
  
  drawerContent: { flex: 1, padding: 20 },
  
  // --- DOTYKOVÁ ZÓNA (Neviditeľná, ale veľká) ---
  touchableArea: {
    position: 'absolute', 
    left: -50, // Vysunuté viac doľava, aby sa dalo ľahko trafiť
    top: 0, 
    width: 50, // Širšia zóna pre prst (50px)
    height: 80, // Vyššia zóna
    justifyContent: 'center', 
    alignItems: 'flex-end', // Zarovná vizuálne tlačidlo k panelu
    zIndex: 10002,
    // backgroundColor: 'rgba(255,0,0,0.3)', // Odkomentuj pre ladenie (uvidíš červenú zónu)
  },

  // --- VIZUÁLNE TLAČIDLO (Modré, malé) ---
  visualButton: {
    width: 18, 
    height: 54, 
    backgroundColor: '#3B82F6', 
    borderTopLeftRadius: 30, 
    borderBottomLeftRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 4, elevation: 5,
  },
  
  handleBar: { 
    width: 3, 
    height: 24, 
    backgroundColor: 'white', 
    borderRadius: 2, 
    marginLeft: 4 
  },
  
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  iconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' },
  searchContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', borderRadius: 24, paddingHorizontal: 16, height: 48 },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 16, color: '#111827' },
  
  chatItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarText: { fontSize: 16, fontWeight: '700', color: '#374151' },
  chatInfo: { flex: 1 },
  chatName: { fontSize: 15, fontWeight: '700', color: '#111827' },
  lastMsg: { fontSize: 13, color: '#6B7280', flex: 1, marginRight: 8 },
  timeText: { fontSize: 12, color: '#9CA3AF' }
});