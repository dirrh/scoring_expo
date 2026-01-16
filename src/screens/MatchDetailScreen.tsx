import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { NavigationContainer, NavigationContainerRefContext } from '@react-navigation/native';

// Import NOVÉHO komponentu tabuľky (SimpleTable)
import { SimpleTable } from '../components/SimpleTable';

// --- MOCK DÁTA ---
const MOCK_MATCH = {
  // Pridané ID ligy pre tabuľku (musí sedieť s ID v leagues.json)
  leagueId: 'premier-league', 
  homeTeam: { name: 'Liverpool', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png', score: 2, scorers: ["Salah 30'", "Gakpo 8'"] },
  awayTeam: { name: 'Manchester City', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png', score: 1, scorers: ["Haaland 54'"] },
  time: "67'",
  period: "2ND HALF",
  timeline: [
    { id: 1, minute: 54, type: 'goal', team: 'away', player: 'E. Haaland', score: '2:1' },
    { id: 2, minute: 33, type: 'yellow-card', team: 'away', player: 'C. Bradley' },
    { id: 3, minute: 30, type: 'goal', team: 'home', player: 'M. Salah', score: '2:0' },
    { id: 4, minute: 24, type: 'red-card', team: 'home', player: 'D. Szoboszlai' },
    { id: 5, minute: 18, type: 'yellow-card', team: 'away', player: 'N. O\'Reilly' },
    { id: 6, minute: 8, type: 'goal', team: 'home', player: 'C. Gakpo', score: '1:0' },
  ]
};

// --- KOMPONENT: MATCH HEADER (SKÓRE) ---
const MatchHeaderInfo = ({ data }: { data: typeof MOCK_MATCH }) => (
  <View className="px-6 py-6 bg-white rounded-b-[30px] shadow-sm z-10">
    <View className="flex-row justify-between items-start">
      
      {/* Home Team */}
      <View className="items-center w-1/3">
        <View className="relative">
          <Ionicons name="star-outline" size={20} color="black" style={{ position: 'absolute', top: 0, left: -24 }} />
          <Image source={{ uri: data.homeTeam.logo }} style={{ width: 60, height: 60 }} contentFit="contain" />
        </View>
        <Text className="font-bold text-lg mt-2 text-center uppercase">{data.homeTeam.name}</Text>
        <View className="mt-2">
          {data.homeTeam.scorers.map((s, i) => (
            <Text key={i} className="text-gray-500 text-xs text-center">{s}</Text>
          ))}
        </View>
      </View>

      {/* Score Center */}
      <View className="items-center mt-2">
        <Text className="text-5xl font-bold text-red-600 tracking-widest">
          {data.homeTeam.score} - {data.awayTeam.score}
        </Text>
        <Text className="text-red-500 font-bold text-xs mt-1 uppercase tracking-wide">
          {data.period} • {data.time}
        </Text>
        <View className="mt-4">
           <Ionicons name="football-outline" size={24} color="#9ca3af" />
        </View>
      </View>

      {/* Away Team */}
      <View className="items-center w-1/3">
        <View className="relative">
          <Image source={{ uri: data.awayTeam.logo }} style={{ width: 60, height: 60 }} contentFit="contain" />
          <Ionicons name="star" size={16} color="#fbbf24" style={{ position: 'absolute', top: 0, right: -20 }} />
        </View>
        <Text className="font-bold text-lg mt-2 text-center uppercase text-gray-900">
          Manchester{'\n'}City
        </Text>
        <View className="mt-2">
          {data.awayTeam.scorers.map((s, i) => (
            <Text key={i} className="text-gray-500 text-xs text-center">{s}</Text>
          ))}
        </View>
      </View>
    </View>
  </View>
);

// --- KOMPONENT: TIMELINE ROW ---
const TimelineEventRow = ({ event }: { event: any }) => {
  const isHome = event.team === 'home';
  
  const getIcon = () => {
    switch (event.type) {
      case 'goal': return <Ionicons name="football" size={16} color="black" />;
      case 'yellow-card': return <View className="w-3 h-4 bg-yellow-400 rounded-sm" />;
      case 'red-card': return <View className="w-3 h-4 bg-red-600 rounded-sm" />;
      default: return <View className="w-3 h-3 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <View className="flex-row items-center w-full mb-6">
      {/* Home Side (Left) */}
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

      {/* Center Time Bubble */}
      <View className="w-12 h-8 bg-black rounded-full items-center justify-center z-10 border-4 border-gray-50">
        <Text className="text-white font-bold text-xs">{event.minute}'</Text>
      </View>

      {/* Away Side (Right) */}
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
};

// --- HLAVNÝ SCREEN ---
type MatchDetailScreenProps = {
  navigation?: { goBack?: () => void };
};

export default function MatchDetailScreen({ navigation }: MatchDetailScreenProps) {
  const navigationContext = React.useContext(NavigationContainerRefContext);
  const [activeTab, setActiveTab] = useState('timeline'); 

  // Tabs config
  const tabs = [
    { id: 'timeline', icon: 'timer-outline', lib: 'MaterialCommunityIcons' },
    { id: 'lineups', icon: 'shirt-outline', lib: 'Ionicons' }, 
    { id: 'table', icon: 'table-large', lib: 'MaterialCommunityIcons' }, // TOTO JE ONO
    { id: 'stats', icon: 'poll', lib: 'MaterialCommunityIcons' },
    { id: 'watch', icon: 'television-play', lib: 'MaterialCommunityIcons' },
  ];

  const content = (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <StatusBar barStyle="dark-content" />
      
      {/* 1. Top Navigation Bar */}
      <View className="flex-row justify-between items-center px-4 py-2 bg-white">
        <TouchableOpacity 
          onPress={() => navigation?.goBack?.()}
          className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center"
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        
        <View className="flex-row gap-3">
          <TouchableOpacity className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center">
            <Ionicons name="star-outline" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center">
            <Ionicons name="share-social-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Match Score Header */}
      <MatchHeaderInfo data={MOCK_MATCH} />

      {/* 3. Secondary Tabs Navigation */}
      <View className="flex-row justify-between px-6 py-4 bg-gray-50">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity 
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              className={`w-12 h-12 rounded-xl items-center justify-center ${isActive ? 'bg-white shadow-sm' : 'bg-transparent'}`}
            >
              {tab.lib === 'Ionicons' ? (
                <Ionicons name={tab.icon as any} size={24} color={isActive ? 'black' : '#9ca3af'} />
              ) : (
                <MaterialCommunityIcons name={tab.icon as any} size={24} color={isActive ? 'black' : '#9ca3af'} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 4. Content Area */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        
        {/* TIMELINE TAB */}
        {activeTab === 'timeline' && (
          <View className="py-4 relative min-h-[400px]">
            {/* Vertical Center Line */}
            <View className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-gray-200 -ml-[1px]" />
            
            {/* Events */}
            {MOCK_MATCH.timeline.map((event) => (
              <TimelineEventRow key={event.id} event={event} />
            ))}
          </View>
        )}

        {/* TABLE TAB (NOVÉ) */}
        {activeTab === 'table' && (
          <SimpleTable 
            leagueId={MOCK_MATCH.leagueId} 
            homeTeamName={MOCK_MATCH.homeTeam.name} 
            awayTeamName={MOCK_MATCH.awayTeam.name} 
          />
        )}
        
        {/* Placeholder pre ostatné taby */}
        {activeTab !== 'timeline' && activeTab !== 'table' && (
          <View className="items-center justify-center py-20">
            <Text className="text-gray-400">Content for {activeTab} coming soon...</Text>
          </View>
        )}
      </ScrollView>

      {/* 5. Floating Action Buttons (FABs) */}
      <View className="absolute bottom-8 right-6 gap-4">
        <TouchableOpacity className="w-14 h-14 bg-purple-600 rounded-full items-center justify-center shadow-lg shadow-purple-300">
          <Ionicons name="notifications" size={24} color="white" />
          <View className="absolute top-0 right-0 bg-red-500 w-5 h-5 rounded-full items-center justify-center border-2 border-white">
            <Text className="text-[10px] text-white font-bold">3</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity className="w-14 h-14 bg-blue-500 rounded-full items-center justify-center shadow-lg shadow-blue-300">
          <Ionicons name="chatbubble-ellipses" size={24} color="white" />
          <View className="absolute top-0 right-0 bg-red-500 w-5 h-5 rounded-full items-center justify-center border-2 border-white">
            <Text className="text-[10px] text-white font-bold">1</Text>
          </View>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );

  if (navigationContext) {
    return content;
  }

  return (
    <NavigationContainer>
      {content}
    </NavigationContainer>
  );
}