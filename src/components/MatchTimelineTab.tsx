import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
      <View className="items-center py-8">
        <Text className="text-gray-400">Loading timeline...</Text>
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View className="items-center py-8">
        <Text className="text-red-500">{errorMessage}</Text>
      </View>
    );
  }

  if (!events.length) {
    return (
      <View className="items-center py-8">
        <Text className="text-gray-400">No events for this match yet.</Text>
      </View>
    );
  }

  return (
    <View className="py-4 relative min-h-[400px]">
      <View className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-gray-200 -ml-[1px]" />
      {events.map((event) => (
        <TimelineEventRow key={event.id} event={event} />
      ))}
    </View>
  );
}

function TimelineEventRow({ event }: { event: TimelineEvent }) {
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

  return (
    <View className="flex-row items-center w-full mb-6">
      <View className="flex-1 flex-row justify-end items-center pr-4">
        {isHome && (
          <>
            <Ionicons name="arrow-redo" size={14} color="black" style={{ marginRight: 8 }} />
            <Text className="font-bold text-gray-900 mr-2">{event.player}</Text>
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
            <Text className="font-bold text-gray-900 ml-2">{event.player}</Text>
            <Ionicons name="arrow-undo" size={14} color="black" style={{ marginLeft: 8 }} />
          </>
        )}
      </View>
    </View>
  );
}
