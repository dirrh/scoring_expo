import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, StatusBar, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 

import { Header } from '../components/Header';
import { MatchCard } from '../components/MatchCard';
import { SportSidebar } from '../components/SportsSidebar';
import { BottomTabs } from '../components/BottomTabs';
import { fetchFixturesWithTeams } from '../services/fixtures';

type HomeScreenProps = {
  // Updated type definition to include params
  navigation?: { navigate: (route: string, params?: any) => void };
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [leagueMatches, setLeagueMatches] = useState<
    {
      league: string;
      matches: Array<{
        fixtureId: number;
        period: string;
        time: string;
        team1: string;
        score1: string;
        team2: string;
        score2: string;
      }>;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });

  const weekStart = useMemo(() => startOfWeek(selectedDate), [selectedDate]);
  const calendarDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + index);
      return date;
    });
  }, [weekStart]);

  useEffect(() => {
    let isActive = true;

    const loadFixtures = async () => {
      try {
        setLoading(true);
        const fixtures = await fetchFixturesWithTeams(selectedDate);
        if (!isActive) return;

        const grouped = new Map<
          string,
          Array<{
            fixtureId: number;
            period: string;
            time: string;
            team1: string;
            score1: string;
            team2: string;
            score2: string;
          }>
        >();

        for (const fixture of fixtures) {
          const leagueName = fixture.league?.name ?? "Unknown League";
          const dateValue = fixture.date ? new Date(fixture.date) : null;
          const time = dateValue && !Number.isNaN(dateValue.getTime())
            ? dateValue.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "-";
          const period = fixture.status_short ?? "";
          const team1 = fixture.home_team?.name ?? "Home";
          const team2 = fixture.away_team?.name ?? "Away";
          const score1 = fixture.goals_home ?? "-";
          const score2 = fixture.goals_away ?? "-";

          const match = {
            fixtureId: fixture.id,
            period,
            time,
            team1,
            score1: String(score1),
            team2,
            score2: String(score2),
          };

          if (!grouped.has(leagueName)) {
            grouped.set(leagueName, []);
          }
          grouped.get(leagueName)?.push(match);
        }

        setLeagueMatches(
          Array.from(grouped.entries()).map(([league, matches]) => ({
            league,
            matches,
          }))
        );
        setErrorMessage(null);
      } catch (error) {
        if (!isActive) return;
        setErrorMessage(formatError(error));
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadFixtures();

    return () => {
      isActive = false;
    };
  }, [selectedDate]);

  const emptyState = useMemo(() => !loading && !errorMessage && leagueMatches.length === 0, [loading, errorMessage, leagueMatches.length]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <Header />
      
      {/* Main Content: Sidebar + Matches List */}
      <View className="flex-1 flex-row">
        <SportSidebar />
        
        <View className="flex-1 bg-gray-50">
           {/* Horizontal Date Picker */}
           <View className="bg-white border-b border-gray-100">
             <View className="flex-row items-center justify-between px-4 py-2">
               <Pressable
                 onPress={() => setSelectedDate(addDays(selectedDate, -7))}
                 className="px-3 py-1 rounded-lg bg-gray-100"
               >
                 <Text className="text-gray-700">{'<'}</Text>
               </Pressable>
               <Pressable
                 onPress={() => setSelectedDate(addDays(selectedDate, 7))}
                 className="px-3 py-1 rounded-lg bg-gray-100"
               >
                 <Text className="text-gray-700">{'>'}</Text>
               </Pressable>
             </View>
             <View className="flex-row px-4 pb-3">
               {calendarDates.map((date) => {
                 const isSelected = date.getTime() === selectedDate.getTime();
                 const dayLabel = date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
                 const dateLabel = date.getDate().toString();
                 return (
                   <Pressable
                     key={date.toISOString()}
                     onPress={() => setSelectedDate(date)}
                     className={`items-center px-3 py-2 mr-2 rounded-xl ${isSelected ? 'bg-blue-500' : ''}`}
                   >
                     <Text className={`text-[10px] ${isSelected ? 'text-white' : 'text-gray-400'}`}>{dayLabel}</Text>
                     <Text className={`font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>{dateLabel}</Text>
                   </Pressable>
                 );
               })}
             </View>
           </View>

          <ScrollView className="flex-1 pt-2">
            {loading && (
              <Text className="px-4 py-2 text-gray-500">Loading fixtures...</Text>
            )}
            {!!errorMessage && (
              <Text className="px-4 py-2 text-red-500">{errorMessage}</Text>
            )}
            {emptyState && (
              <Text className="px-4 py-2 text-gray-500">No fixtures available.</Text>
            )}
            
            {leagueMatches.map((item, i) => (
              <MatchCard
                key={`${item.league}-${i}`}
                league={item.league}
                matches={item.matches}
                // --- NAVIGATION HANDLERS ---
                
                // 1. Click on match -> Go to Match Detail
                onMatchPress={(match) => {
                  navigation?.navigate('MatchDetail', { fixtureId: match.fixtureId });
                }}
                
                // 2. Click on League Header -> Go to League Profile
                onLeaguePress={() => {
                   // Passing league name so the detail screen can fetch/display correct data
                   navigation?.navigate('LeagueDetail', { leagueId: item.league });
                }}
              />
            ))}
            
            <View className="h-24" />
          </ScrollView>
        </View>
      </View>

      <BottomTabs
        activeTab="Home"
        onNavigate={(routeName) => navigation?.navigate(routeName)}
      />
    </SafeAreaView>
  );
}

function startOfWeek(date: Date) {
  const value = new Date(date);
  const day = value.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  value.setDate(value.getDate() + diff);
  value.setHours(0, 0, 0, 0);
  return value;
}

function addDays(date: Date, days: number) {
  const value = new Date(date);
  value.setDate(value.getDate() + days);
  value.setHours(0, 0, 0, 0);
  return value;
}

function formatError(error: unknown) {
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: string }).message ?? "Failed to load fixtures.";
    const details = "details" in error ? (error as { details?: string }).details : undefined;
    const hint = "hint" in error ? (error as { hint?: string }).hint : undefined;
    return [message, details, hint].filter(Boolean).join(" ");
  }
  return "Failed to load fixtures.";
}