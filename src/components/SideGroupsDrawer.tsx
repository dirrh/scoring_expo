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

const { width, height } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.85; 

// Konfigurácia pre "snappy" pohyb bez zbytočného odrážania
const SPRING_CONFIG = {
  damping: 40,
  stiffness: 250,
  mass: 1
};

// --- MOCK DATA ---
const GROUPS = [
  { id: '1', name: 'My Friends Group', msg: 'You: That second goal was...', time: '20:07', initial: 'MFG', active: true },
  { id: '2', name: 'Premier League Room', msg: 'Ten gól v 67. minúte rozho...', time: '20:06', initial: 'PLR', active: false },
  { id: '3', name: 'Defense Football Debate', msg: 'Haaland is just on another...', time: '19:07', initial: 'DFD', active: false },
  { id: '4', name: 'Team Management Space', msg: 'You: Stats look much bette...', time: '17:07', initial: 'TMS', active: true },
  { id: '5', name: 'Transfer Rumors', msg: 'Referee was terrible in the...', time: 'SAT', initial: 'TR', active: true },
  { id: '6', name: 'Xtra Club Supporters', msg: 'You: Are you joining the Pr...', time: '6.12.', initial: 'XCS', active: true },
];

export const SideGroupsDrawer = () => {
  const insets = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState(false);

  // Začíname na -DRAWER_WIDTH (schované vľavo)
  const translateX = useSharedValue(-DRAWER_WIDTH);
  const translateY = useSharedValue(height / 2 - 50); // Centrovanie menšieho tlačidla
  const contextY = useSharedValue(0);

  // 1. Vertikálny posun tlačidla
  const verticalPanGesture = Gesture.Pan()
    .onStart(() => {
      contextY.value = translateY.value;
    })
    .onUpdate((e) => {
      const newY = contextY.value + e.translationY;
      // Obmedzenie, aby tlačidlo neodišlo z obrazovky
      if (newY > 100 && newY < height - 150) {
        translateY.value = newY;
      }
    });

  // 2. Kliknutie (Tap)
  const tapGesture = Gesture.Tap().onEnd(() => {
    if (translateX.value > -DRAWER_WIDTH / 2) {
      translateX.value = withSpring(-DRAWER_WIDTH, SPRING_CONFIG);
      runOnJS(setIsOpen)(false);
    } else {
      translateX.value = withSpring(0, SPRING_CONFIG);
      runOnJS(setIsOpen)(true);
    }
  });

  // 3. Zatvorenie
  const closeDrawer = () => {
    translateX.value = withSpring(-DRAWER_WIDTH, SPRING_CONFIG);
    setIsOpen(false);
  };

  const rDrawerStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX.value }] };
  });

  const rButtonStyle = useAnimatedStyle(() => {
    return { transform: [{ translateY: translateY.value }] };
  });

  const rOverlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [-DRAWER_WIDTH, 0], [0, 0.5], Extrapolate.CLAMP);
    return {
      opacity,
      pointerEvents: translateX.value > -DRAWER_WIDTH / 2 ? 'auto' : 'none',
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
             <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#9CA3AF" />
                <TextInput placeholder="Search group..." placeholderTextColor="#9CA3AF" style={styles.searchInput} />
             </View>
             <Ionicons name="share-social-outline" size={24} color="#1F2937" style={{marginLeft: 12}} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
            {GROUPS.map((group) => (
              <View key={group.id} style={styles.groupItem}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{group.initial}</Text>
                </View>
                <View style={styles.groupInfo}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.groupName}>{group.name}</Text>
                    {group.active && <Ionicons name="checkmark-done" size={16} color="#9CA3AF" />}
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 2}}>
                    <Text style={styles.lastMsg} numberOfLines={1}>{group.msg}</Text>
                    <Text style={styles.timeText}>• {group.time}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Tlačidlo na pravej strane */}
        <GestureDetector gesture={composedGesture}>
          <Animated.View style={[styles.handleButton, rButtonStyle]}>
             <View style={styles.handleBar} />
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
    left: 0, 
    width: DRAWER_WIDTH, 
    backgroundColor: 'white',
    borderTopRightRadius: 30, 
    borderBottomRightRadius: 30, 
    zIndex: 1001,
    shadowColor: "#000", shadowOffset: { width: 5, height: 0 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 20,
  },
  
  drawerContent: { flex: 1, padding: 20 },
  
  // --- UPRAVENÉ TLAČIDLO PODĽA FIGMY ---
  handleButton: {
    position: 'absolute', 
    right: -18, // Musí byť presne -šírka (aby trčalo celé)
    top: 0, 
    
    // Rozmery podľa Figmy: 18x54
    width: 18, 
    height: 54, 
    
    backgroundColor: '#7C3AED', // Fialová
    
    // Veľké zaoblenie pre "pol-pilulkový" tvar
    borderTopRightRadius: 30, 
    borderBottomRightRadius: 30, 
    
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 4, elevation: 5, zIndex: 1002,
  },
  
  handleBar: { 
    width: 3, // Tenšia čiarka
    height: 24, // Kratšia čiarka
    backgroundColor: 'white', 
    borderRadius: 2, 
    marginRight: 4 // Jemné odsadenie do stredu vizuálne
  },
  
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  searchContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', borderRadius: 24, paddingHorizontal: 16, height: 48 },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 16, color: '#111827' },
  groupItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarText: { fontSize: 16, fontWeight: '700', color: '#374151' },
  groupInfo: { flex: 1 },
  groupName: { fontSize: 15, fontWeight: '700', color: '#111827' },
  lastMsg: { fontSize: 13, color: '#6B7280', flex: 1, marginRight: 8 },
  timeText: { fontSize: 12, color: '#9CA3AF' }
});