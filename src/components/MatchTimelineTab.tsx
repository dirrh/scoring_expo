import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type TimelineEvent = {
  id: number | string;
  minute: number;
  type: string;
  team: "home" | "away";
  player: string;
  score?: string;
};

type MatchTimelineTabProps = {
  loading: boolean;
  errorMessage: string | null;
  events: TimelineEvent[];
};

export function MatchTimelineTab({
  loading,
  errorMessage,
  events,
}: MatchTimelineTabProps) {
  if (loading) {
    return (
      <View style={{ alignItems: "center", paddingVertical: 32 }}>
        <Text style={{ color: "#9CA3AF" }}>Loading timeline...</Text>
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View style={{ alignItems: "center", paddingVertical: 32 }}>
        <Text style={{ color: "#EF4444" }}>{errorMessage}</Text>
      </View>
    );
  }

  if (!events.length) {
    return (
      <View style={{ alignItems: "center", paddingVertical: 32 }}>
        <Text style={{ color: "#9CA3AF" }}>No events for this match yet.</Text>
      </View>
    );
  }

  return (
    <View style={{ paddingVertical: 16, minHeight: 400 }}>
      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          width: 2,
          marginLeft: -1,
          backgroundColor: "#E5E7EB",
        }}
      />
      {events.map((event) => (
        <TimelineEventRow key={event.id} event={event} />
      ))}
    </View>
  );
}

function TimelineEventRow({ event }: { event: TimelineEvent }) {
  const navigation = useNavigation<any>();
  const isHome = event.team === "home";

  const getIcon = () => {
    switch (event.type) {
      case "goal":
        return <Ionicons name="football" size={16} color="black" />;
      case "yellow-card":
        return <View className="w-3 h-4 bg-yellow-400 rounded-sm" />;
      case "red-card":
        return <View className="w-3 h-4 bg-red-600 rounded-sm" />;
      default:
        return <View className="w-3 h-3 bg-gray-400 rounded-full" />;
    }
  };

  const goToPlayer = () => {
    navigation.navigate("PlayerDetail");
  };

  return (
    <View className="flex-row items-center w-full mb-6">
      <View className="flex-1 flex-row justify-end items-center pr-4">
        {isHome && (
          <>
            <Ionicons name="arrow-redo" size={14} color="black" style={{ marginRight: 8 }} />
            {/* CLICKABLE PLAYER NAME */}
            <Pressable onPress={goToPlayer}>
              <Text className="font-bold text-gray-900 mr-2">{event.player}</Text>
            </Pressable>
            {event.score && <Text className="font-bold text-green-500 mr-2">{event.score}</Text>}
            {getIcon()}
          </>
        )}
      </View>

      <View className="w-12 h-8 bg-black rounded-full items-center justify-center z-10 border-4 border-gray-50">
        <Text className="text-white font-bold text-xs">{event.minute}'</Text>
      </View>

      <View className="flex-1 flex-row justify-start items-center pl-4">
        {!isHome && (
          <>
            {getIcon()}
            {event.score && <Text className="font-bold text-green-500 ml-2">{event.score}</Text>}
            {/* CLICKABLE PLAYER NAME */}
            <Pressable onPress={goToPlayer}>
              <Text className="font-bold text-gray-900 ml-2">{event.player}</Text>
            </Pressable>
            <Ionicons name="arrow-undo" size={14} color="black" style={{ marginLeft: 8 }} />
          </>
        )}
      </View>
    </View>
  );
}