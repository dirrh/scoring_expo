import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, type DimensionValue } from "react-native";
import { useNavigation } from "@react-navigation/native";

// --- TYPY ---
type PlayerPos = {
  id: string;
  name: string;
  number: number;
  top: string;
  left: string;
};

type SubPlayer = {
  id: string;
  name: string;
  position: string;
};

// --- MOCK DÁTA ---
const HOME_FORMATION = "4-2-3-1";
const AWAY_FORMATION = "4-1-4-1";

const HOME_PLAYERS: PlayerPos[] = [
  { id: "h1", name: "25 Mamardashvili", number: 25, top: "11%", left: "50%" },
  { id: "h2", name: "12 Bradley", number: 12, top: "21%", left: "15%" },
  { id: "h3", name: "5 Konaté", number: 5, top: "21%", left: "38%" },
  { id: "h4", name: "4 van Dijk", number: 4, top: "21%", left: "62%" },
  { id: "h5", name: "3 Kerkez", number: 3, top: "21%", left: "85%" },
  { id: "h6", name: "38 Gravenberch", number: 38, top: "31%", left: "35%" },
  { id: "h7", name: "10 Mac Allister", number: 10, top: "31%", left: "65%" },
  { id: "h8", name: "8 Szoboszlai", number: 8, top: "40%", left: "50%" },
  { id: "h9", name: "11 Salah", number: 11, top: "40%", left: "15%" },
  { id: "h10", name: "18 Gakpo", number: 18, top: "40%", left: "85%" },
  { id: "h11", name: "9 Isak", number: 9, top: "48%", left: "50%" },
];

const AWAY_PLAYERS: PlayerPos[] = [
  { id: "a1", name: "25 Donnarumma", number: 25, top: "88%", left: "50%" },
  { id: "a2", name: "27 Nunez", number: 27, top: "78%", left: "15%" },
  { id: "a3", name: "3 Dias", number: 3, top: "78%", left: "38%" },
  { id: "a4", name: "6 Aké", number: 6, top: "78%", left: "62%" },
  { id: "a5", name: "33 O'Reilly", number: 33, top: "78%", left: "85%" },
  { id: "a6", name: "14 González", number: 14, top: "70%", left: "50%" },
  { id: "a7", name: "11 Doku", number: 11, top: "60%", left: "15%" },
  { id: "a8", name: "47 Foden", number: 47, top: "60%", left: "35%" },
  { id: "a9", name: "4 Reijnders", number: 4, top: "60%", left: "65%" },
  { id: "a10", name: "26 Savinho", number: 26, top: "60%", left: "85%" },
  { id: "a11", name: "9 Haaland", number: 9, top: "53%", left: "50%" },
];

const SUBS_HOME: SubPlayer[] = [
  { id: "s1", name: "Caoimhin Kelleher", position: "GK" },
  { id: "s2", name: "Joe Gomez", position: "DEF" },
  { id: "s3", name: "Wataru Endo", position: "CDM" },
  { id: "s4", name: "Cody Gakpo", position: "FWD" },
  { id: "s5", name: "Kostas Tsimikas", position: "LB" },
  { id: "s6", name: "Harvey Elliott", position: "MID" },
];

const SUBS_AWAY: SubPlayer[] = [
  { id: "as1", name: "Stefan Ortega", position: "GK" },
  { id: "as2", name: "John Stones", position: "CB" },
  { id: "as3", name: "Jérémy Doku", position: "LW" },
  { id: "as4", name: "Julián Álvarez", position: "ST" },
  { id: "as5", name: "Bernardo Silva", position: "CM" },
  { id: "as6", name: "Matheus Nunes", position: "CM" },
];

export function MatchLineupsTab() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      
      {/* --- IHRISKO (PITCH) --- */}
      <View style={styles.pitchContainer}>
        <View style={styles.pitchBackground}>
          <View style={styles.centerLine} />
          <View style={styles.centerCircle} />
          <View style={[styles.penaltyBox, styles.penaltyBoxTop]} />
          <View style={[styles.penaltyBox, styles.penaltyBoxBottom]} />
          <View style={[styles.goalBox, styles.goalBoxTop]} />
          <View style={[styles.goalBox, styles.goalBoxBottom]} />
          <View style={[styles.cornerArc, styles.cornerTL]} />
          <View style={[styles.cornerArc, styles.cornerTR]} />
          <View style={[styles.cornerArc, styles.cornerBL]} />
          <View style={[styles.cornerArc, styles.cornerBR]} />
        </View>

        <View style={styles.pitchHeaderTop}>
          <View style={styles.teamBadgePlaceholder} />
          <Text style={styles.pitchTeamName}>LIVERPOOL   <Text style={styles.formationText}>{HOME_FORMATION}</Text></Text>
        </View>
        
        <View style={styles.pitchHeaderBottom}>
          <Text style={styles.pitchTeamName}><Text style={styles.formationText}>{AWAY_FORMATION}</Text>   MANCHESTER CITY</Text>
          <View style={styles.teamBadgePlaceholder} />
        </View>

        {HOME_PLAYERS.map((p) => (
          <PlayerMarker key={p.id} player={p} />
        ))}
        
        {AWAY_PLAYERS.map((p) => (
          <PlayerMarker key={p.id} player={p} />
        ))}
      </View>

      {/* --- TRÉNERI --- */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>COACH</Text>
      </View>
      <View style={styles.coachRow}>
        <View style={styles.coachItemLeft}>
          <View style={styles.avatarCircle} />
          <Text style={styles.coachName}>Jürgen Klopp</Text>
        </View>
        <View style={styles.coachItemRight}>
          <Text style={styles.coachName}>Pep Guardiola</Text>
          <View style={styles.avatarCircle} />
        </View>
      </View>

      {/* --- NÁHRADNÍCI (SUBSTITUTES) --- */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>SUBSTITUTES</Text>
      </View>
      
      <View style={styles.subsContainer}>
        <View style={styles.subsColumn}>
          {SUBS_HOME.map((sub, index) => (
            <SubItem key={sub.id} sub={sub} align="left" />
          ))}
        </View>

        <View style={styles.subsColumn}>
          {SUBS_AWAY.map((sub, index) => (
            <SubItem key={sub.id} sub={sub} align="right" />
          ))}
        </View>
      </View>

    </ScrollView>
  );
}

// Komponent pre hráča na ihrisku
function PlayerMarker({ player }: { player: PlayerPos }) {
  const navigation = useNavigation<any>();
  return (
    <Pressable 
      onPress={() => navigation.navigate("PlayerDetail")}
      style={[styles.playerMarker, { top: player.top as DimensionValue, left: player.left as DimensionValue }]}
    >
      <View style={styles.playerCircle} />
      <View style={styles.playerNameTag}>
        <Text style={styles.playerNameText}>{player.name}</Text>
      </View>
    </Pressable>
  );
}

// Komponent pre náhradníka
function SubItem({ sub, align }: { sub: SubPlayer, align: 'left' | 'right' }) {
  const navigation = useNavigation<any>();
  const isLeft = align === 'left';
  return (
    <Pressable 
      onPress={() => navigation.navigate("PlayerDetail")}
      style={[styles.subRow, isLeft ? styles.subRowLeft : styles.subRowRight]}
    >
      {isLeft && <View style={styles.avatarCircleSmall} />}
      <View style={isLeft ? { marginLeft: 12 } : { marginRight: 12, alignItems: 'flex-end' }}>
        <Text style={styles.subName}>{sub.name}</Text>
        <Text style={styles.subPos}>{sub.position}</Text>
      </View>
      {!isLeft && <View style={styles.avatarCircleSmall} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  pitchContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    height: 740,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0F9D58',
  },
  pitchBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00B16A',
  },
  centerLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  centerCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 100,
    height: 100,
    marginLeft: -50,
    marginTop: -50,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 50,
  },
  penaltyBox: {
    position: 'absolute',
    left: '50%',
    marginLeft: '-35%',
    width: '70%',
    height: '16%',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  penaltyBoxTop: { top: -2, borderTopWidth: 0 },
  penaltyBoxBottom: { bottom: -2, borderBottomWidth: 0 },
  
  goalBox: {
    position: 'absolute',
    left: '50%',
    marginLeft: '-15%',
    width: '30%',
    height: '6%',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  goalBoxTop: { top: -2, borderTopWidth: 0 },
  goalBoxBottom: { bottom: -2, borderBottomWidth: 0 },

  cornerArc: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: 'rgba(255,255,255,0.3)',
    borderWidth: 2,
    borderRadius: 15,
  },
  cornerTL: { top: -15, left: -15 },
  cornerTR: { top: -15, right: -15 },
  cornerBL: { bottom: -15, left: -15 },
  cornerBR: { bottom: -15, right: -15 },

  pitchHeaderTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  pitchHeaderBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  pitchTeamName: {
    color: 'white',
    fontWeight: '800',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  formationText: {
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
  },
  teamBadgePlaceholder: {
    width: 24, 
    height: 24, 
    borderRadius: 12, 
    backgroundColor: '#E5E7EB',
    marginRight: 8,
    marginLeft: 8,
  },

  playerMarker: {
    position: 'absolute',
    alignItems: 'center',
    width: 80,
    marginLeft: -40,
    marginTop: -15,
  },
  playerCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E5E7EB',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    marginBottom: 4,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  playerNameTag: {
    backgroundColor: 'white',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  playerNameText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },

  sectionHeader: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  coachRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    marginBottom: 8,
  },
  coachItemLeft: { flexDirection: 'row', alignItems: 'center' },
  coachItemRight: { flexDirection: 'row', alignItems: 'center' },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },
  coachName: {
    fontSize: 12,
    fontWeight: '700',
    marginHorizontal: 12,
    color: '#1F2937',
  },

  subsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  subsColumn: {
    flex: 1,
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    height: 40,
  },
  subRowLeft: {
    justifyContent: 'flex-start',
  },
  subRowRight: {
    justifyContent: 'flex-end',
  },
  avatarCircleSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
  },
  subName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
  },
  subPos: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 1,
  },
});