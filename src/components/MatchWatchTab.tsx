import React from "react";
import { View, Text, StyleSheet, ImageBackground, Pressable, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const STADIUM_IMAGE_URL = "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2940&auto=format&fit=crop";

export function MatchWatchTab() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: STADIUM_IMAGE_URL }}
        style={styles.background}
        imageStyle={{ borderRadius: 24 }}
      >
        <View style={styles.overlay} />

        <View style={styles.content}>
          <View style={styles.iconCircle}>
            <Ionicons name="lock-closed-outline" size={28} color="#FFFFFF" />
          </View>

          <Text style={styles.title}>PREMIUM LIVE STREAM</Text>

          <Text style={styles.description}>
            Watch this match in HD quality with commentary{"\n"}and advanced statistics
          </Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>€1.99</Text>
            <Text style={styles.perMatch}> / match</Text>
          </View>

          {/* --- OPRAVENÉ KOMPAKTNÉ TLAČIDLO --- */}
          <Pressable 
            style={({ pressed }) => [
              styles.touchableArea, 
              pressed && { transform: [{ scale: 0.96 }] } // Jemnejší efekt stlačenia
            ]}
          >
            <View style={styles.buttonVisual}> 
              <Ionicons name="card-outline" size={20} color="#000000" style={{ marginRight: 8 }} />
              <Text style={styles.buttonText}>Buy access</Text>
            </View>
          </Pressable>

        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 32,
    height: 340,
    borderRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
        backgroundColor: 'transparent',
      },
    }),
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
  },
  content: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  description: {
    color: '#E2E8F0',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 24,
  },
  price: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: 'bold',
  },
  perMatch: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    marginLeft: 6,
  },
  
  // --- UPRAVENÉ ŠTÝLY TLAČIDLA ---
  touchableArea: {
    // Odstránená šírka 70% -> teraz sa prispôsobí obsahu
    marginTop: 4, 
  },
  buttonVisual: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // Menší padding pre kompaktnejší vzhľad
    paddingVertical: 12,
    paddingHorizontal: 24, 
    borderRadius: 12,
    minWidth: 160, // Minimálna šírka, aby nebolo príliš úzke, ale nie roztiahnuté
    
    // Tiene
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  buttonText: {
    color: '#000000',
    fontWeight: '800',
    fontSize: 16,
    // Pridáme malý posun pre optické vycentrovanie s ikonou
    marginTop: Platform.OS === 'android' ? -2 : 0, 
  }
});