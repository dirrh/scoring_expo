import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, Pressable, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native"; // <--- Import

import { SimpleTable } from "../components/SimpleTable";
import { MatchTimelineTab } from "../components/MatchTimelineTab";
import { MatchLineupsTab } from "../components/MatchLineupsTab";
import { MatchStatsTab } from "../components/MatchStatsTab";
import { MatchWatchTab } from "../components/MatchWatchTab";

type MatchDetailData = {
  leagueId?: string;
  homeTeam: { name: string; logo?: string | null; score: number; scorers: string[] };
  awayTeam: { name: string; logo?: string | null; score: number; scorers: string[] };
  time: string;
  period: string;
  timeline: Array<{ id: number; minute: number; type: string; team: "home" | "away"; player: string; score?: string }>;
};

const MOCK_MATCH: MatchDetailData = {
  leagueId: "premier-league",
  homeTeam: {
    name: "Liverpool",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png",
    score: 2,
    scorers: ["Salah 30'", "Gakpo 8'"],
  },
  awayTeam: {
    name: "Manchester City",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png",
    score: 1,
    scorers: ["Haaland 54'"],
  },
  time: "67'",
  period: "2ND HALF",
  timeline: [
    { id: 1, minute: 54, type: "goal", team: "away", player: "E. Haaland", score: "2:1" },
    { id: 2, minute: 33, type: "yellow-card", team: "away", player: "C. Bradley" },
    { id: 3, minute: 30, type: "goal", team: "home", player: "M. Salah", score: "2:0" },
    { id: 4, minute: 24, type: "red-card", team: "home", player: "D. Szoboszlai" },
    { id: 5, minute: 18, type: "yellow-card", team: "away", player: "N. O'Reilly" },
    { id: 6, minute: 8, type: "goal", team: "home", player: "C. Gakpo", score: "1:0" },
  ],
};

const TABS = [
  { id: "timeline", icon: "timer-outline", lib: "MaterialCommunityIcons" },
  { id: "lineups", icon: "shirt-outline", lib: "Ionicons" },
  { id: "table", icon: "table-large", lib: "MaterialCommunityIcons" },
  { id: "stats", icon: "poll", lib: "MaterialCommunityIcons" },
  { id: "watch", icon: "television-play", lib: "MaterialCommunityIcons" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function MatchDetailScreen() {
  const [activeTab, setActiveTab] = useState<TabId>("timeline");
  const match = useMemo(() => MOCK_MATCH, []);
  const navigation = useNavigation(); // <--- Hook pre navigáciu (Späť)

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      <HeaderBar onBack={() => navigation.goBack()} /> 
      <MatchHeaderInfo data={match} />
      <TabBar activeTab={activeTab} onChange={setActiveTab} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === "timeline" && (
          <MatchTimelineTab loading={false} errorMessage={null} events={match.timeline} />
        )}
        {activeTab === "lineups" && <MatchLineupsTab />}
        {activeTab === "table" && (
          <SimpleTable
            leagueId={match.leagueId ?? "premier-league"}
            homeTeamName={match.homeTeam.name}
            awayTeamName={match.awayTeam.name}
          />
        )}
        {activeTab === "stats" && <MatchStatsTab />}
        {activeTab === "watch" && <MatchWatchTab />}
      </ScrollView>

      <FloatingButtons />
    </SafeAreaView>
  );
}

function HeaderBar({ onBack }: { onBack: () => void }) {
  return (
    <View style={styles.headerBar}>
      <Pressable onPress={onBack} style={styles.circleButton}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </Pressable>
      <View style={styles.headerActions}>
        <Pressable style={styles.circleButton}>
          <Ionicons name="star-outline" size={20} color="black" />
        </Pressable>
        <Pressable style={styles.circleButton}>
          <Ionicons name="share-social-outline" size={20} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

function TabBar({ activeTab, onChange }: { activeTab: TabId; onChange: (id: TabId) => void }) {
  return (
    <View style={styles.tabBar}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onChange(tab.id)}
            style={[styles.tabButton, isActive && styles.tabButtonActive]}
          >
            {tab.lib === "Ionicons" ? (
              <Ionicons name={tab.icon as any} size={24} color={isActive ? "#000" : "#9ca3af"} />
            ) : (
              <MaterialCommunityIcons name={tab.icon as any} size={24} color={isActive ? "#000" : "#9ca3af"} />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

function FloatingButtons() {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.fabContainer}>
      <Pressable
        style={[styles.fab, styles.fabBlue]}
        onPress={() => navigation.navigate("Profile", { initialTab: "chats" })}
      >
        <Ionicons name="chatbubble-ellipses" size={24} color="white" />
        <View style={styles.fabBadge}>
          <Text style={styles.fabBadgeText}>1</Text>
        </View>
      </Pressable>
    </View>
  );
}

// --- UPRAVENÝ HEADER S KLIKANÍM ---
function MatchHeaderInfo({ data }: { data: MatchDetailData }) {
  const navigation = useNavigation<any>();

  const openTeamDetail = () => {
    navigation.navigate("TeamDetail");
  };

  return (
    <View style={styles.scoreCard}>
      <View style={styles.scoreRow}>
        
        {/* DOMÁCI - KLIKATEĽNÝ */}
        <Pressable onPress={openTeamDetail} style={styles.teamColumn}>
          <View style={styles.teamLogoWrap}>
            <Ionicons name="star-outline" size={20} color="black" style={styles.teamStarLeft} />
            {data.homeTeam.logo ? (
              <Image source={{ uri: data.homeTeam.logo }} style={styles.teamLogo} contentFit="contain" />
            ) : null}
          </View>
          <Text style={styles.teamName}>{data.homeTeam.name}</Text>
          {data.homeTeam.scorers.map((s, i) => (
            <Text key={i} style={styles.scorerText}>{s}</Text>
          ))}
        </Pressable>

        <View style={styles.scoreCenter}>
          <Text style={styles.scoreText}>
            {data.homeTeam.score} - {data.awayTeam.score}
          </Text>
          <Text style={styles.periodText}>{data.period} • {data.time}</Text>
          <Ionicons name="football-outline" size={24} color="#9ca3af" style={{ marginTop: 12 }} />
        </View>

        {/* HOSTIA - KLIKATEĽNÝ */}
        <Pressable onPress={openTeamDetail} style={styles.teamColumn}>
          <View style={styles.teamLogoWrap}>
            {data.awayTeam.logo ? (
              <Image source={{ uri: data.awayTeam.logo }} style={styles.teamLogo} contentFit="contain" />
            ) : null}
            <Ionicons name="star" size={16} color="#fbbf24" style={styles.teamStarRight} />
          </View>
          <Text style={styles.teamName}>{data.awayTeam.name}</Text>
          {data.awayTeam.scorers.map((s, i) => (
            <Text key={i} style={styles.scorerText}>{s}</Text>
          ))}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  headerActions: { flexDirection: "row", gap: 12 },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreCard: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  scoreRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  teamColumn: { width: "33%", alignItems: "center" },
  teamLogoWrap: { position: "relative" },
  teamLogo: { width: 60, height: 60 },
  teamStarLeft: { position: "absolute", top: 0, left: -24 },
  teamStarRight: { position: "absolute", top: 0, right: -20 },
  teamName: { fontWeight: "700", fontSize: 16, marginTop: 8, textAlign: "center" },
  scorerText: { fontSize: 12, color: "#6B7280", textAlign: "center" },
  scoreCenter: { alignItems: "center", marginTop: 8 },
  scoreText: { fontSize: 36, fontWeight: "700", color: "#DC2626" },
  periodText: { fontSize: 12, fontWeight: "700", color: "#EF4444", marginTop: 4 },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#F3F4F6",
  },
  tabButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  tabButtonActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  content: { flex: 1 },
  fabContainer: { position: "absolute", right: 24, bottom: 32, gap: 16 },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  fabPurple: { backgroundColor: "#9333ea" },
  fabBlue: { backgroundColor: "#3b82f6" },
  fabBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  fabBadgeText: { fontSize: 10, color: "#FFFFFF", fontWeight: "700" },
});