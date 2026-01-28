import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, StatusBar, Pressable, TouchableOpacity, LayoutAnimation, Platform, UIManager, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Header } from '../components/Header';
import { MatchCard } from '../components/MatchCard';
import { SportSidebar } from '../components/SportsSidebar';
import { BottomTabs } from '../components/BottomTabs';
import { fetchFixturesWithTeams } from '../services/fixtures';

// Povoliť animácie na Androide
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type HomeScreenProps = {
  navigation?: { navigate: (route: string, params?: any) => void };
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [leagueMatches, setLeagueMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Dnešný dátum
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });

  // Začiatok týždňa
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));

  // 7 dní pre aktuálny týždeň
  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  }, [weekStart]);

  // --- LOGIKA SWIPE (Bezpečný spôsob bez GestureHandler) ---
  const [touchStartX, setTouchStartX] = useState(0);

  const changeWeek = (direction: -1 | 1) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setWeekStart((prev) => {
      const next = addDays(prev, direction * 7);
      setSelectedDate(next);
      return next;
    });
  };

  const handleTouchStart = (e: any) => {
    setTouchStartX(e.nativeEvent.pageX);
  };

  const handleTouchEnd = (e: any) => {
    const touchEndX = e.nativeEvent.pageX;
    const difference = touchStartX - touchEndX;

    // Ak bol pohyb väčší ako 50px
    if (difference > 50) {
      // Swipe DOĽAVA -> Ďalší týždeň
      changeWeek(1);
    } else if (difference < -50) {
      // Swipe DOPRAVA -> Predchádzajúci týždeň
      changeWeek(-1);
    }
  };
  // ---------------------------------------------------------

  useEffect(() => {
    let isActive = true;

    const loadFixtures = async () => {
      try {
        setLoading(true);
        const fixtures = await fetchFixturesWithTeams(selectedDate);
        if (!isActive) return;

        const grouped = new Map<string, any[]>();

        for (const fixture of fixtures) {
          const leagueName = fixture.league?.name ?? "Unknown League";
          const dateValue = fixture.date ? new Date(fixture.date) : null;
          
          const time = dateValue && !Number.isNaN(dateValue.getTime())
            ? dateValue.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
            : "-";
            
          const period = fixture.status_short ?? "NS";
          const team1 = fixture.home_team?.name ?? "Home";
          const team2 = fixture.away_team?.name ?? "Away";
          
          const score1 = fixture.goals_home !== null ? String(fixture.goals_home) : "-";
          const score2 = fixture.goals_away !== null ? String(fixture.goals_away) : "-";

          const match = {
            fixtureId: fixture.id,
            period,
            time,
            team1,
            score1,
            team2,
            score2,
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
        setErrorMessage("Failed to load fixtures.");
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadFixtures();
    return () => { isActive = false; };
  }, [selectedDate]);

  const emptyState = !loading && !errorMessage && leagueMatches.length === 0;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <Header />
      
      <View className="flex-1 flex-row">
        <SportSidebar />
        
        <View className="flex-1 bg-gray-50">
           
           {/* --- WEEKLY SWIPE CALENDAR (BEZPEČNÝ) --- */}
           {/* Tento View zachytáva dotyky */}
           <View
             style={styles.calendarWrapper}
             onTouchStart={handleTouchStart}
             onTouchEnd={handleTouchEnd}
           >
                <View style={styles.calendarRow}>
                  {weekDates.map((date) => {
                    const isSelected = date.getTime() === selectedDate.getTime();
                    const dayLabel = date
                      .toLocaleDateString("en-US", { weekday: "short" })
                      .toUpperCase()
                      .replace(/DAY$/, "")
                      .slice(0, 1);
                    const dateLabel = date.getDate().toString();
                    const isToday = isSameDay(date, new Date());

                    return (
                      <TouchableOpacity
                        key={date.toISOString()}
                        onPress={() => setSelectedDate(date)}
                        style={styles.calendarItem}
                        activeOpacity={0.8}
                      >
                        <View
                          style={[
                            styles.calendarCircle,
                            isSelected && styles.calendarCircleSelected,
                            !isSelected && isToday && styles.calendarCircleToday,
                          ]}
                        >
                          <Text style={[styles.calendarDay, isSelected && styles.calendarDaySelected]}>
                            {dayLabel}
                          </Text>
                        </View>
                        <Text style={[styles.calendarDate, isSelected && styles.calendarDateSelected]}>
                          {dateLabel}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
           </View>

          <ScrollView className="flex-1 pt-4">
            {loading && (
              <Text className="px-4 py-2 text-gray-500 text-center mt-4">Loading matches...</Text>
            )}
            {!!errorMessage && (
              <Text className="px-4 py-2 text-red-500 text-center">{errorMessage}</Text>
            )}
            {emptyState && (
              <View className="items-center justify-center mt-10">
                 <Ionicons name="football-outline" size={48} color="#D1D5DB" />
                 <Text className="text-gray-400 mt-2">No matches today</Text>
              </View>
            )}
            
            {leagueMatches.map((item, i) => (
              <MatchCard
                key={`${item.league}-${i}`}
                league={item.league}
                matches={item.matches}
                onMatchPress={(match) => {
                  navigation?.navigate('MatchDetail', { fixtureId: match.fixtureId });
                }}
                onLeaguePress={() => {
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

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
  );
}

const styles = StyleSheet.create({
  calendarWrapper: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  calendarItem: {
    alignItems: 'center',
    flex: 1,
  },
  calendarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  calendarCircleSelected: {
    backgroundColor: '#3b82f6',
  },
  calendarCircleToday: {
    backgroundColor: '#EFF6FF',
  },
  calendarDay: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
  },
  calendarDaySelected: {
    color: '#FFFFFF',
  },
  calendarDate: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
  },
  calendarDateSelected: {
    color: '#111827',
  },
});