import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const MATCHES = [
  { date: "Today", time: "21:00", home: "Inter", away: "Liverpool", league: "Champions League" },
  { date: "Sat, 13 Dec", time: "16:00", home: "Liverpool", away: "Brighton" },
  { date: "Sat, 20 Dec", time: "18:30", home: "Tottenham", away: "Liverpool" },
  { date: "Sat, 27 Dec", time: "16:00", home: "Liverpool", away: "Wolves" },
  { date: "Th, 01 Jan", time: "18:30", home: "Liverpool", away: "Leeds" },
];

export function TeamScheduleTab() {
  return (
    <ScrollView style={{flex: 1, padding: 16}} showsVerticalScrollIndicator={false}>
      <Text style={{fontSize: 11, fontWeight: '800', color: '#111827', marginBottom: 12, textTransform: 'uppercase'}}>UPCOMING MATCHES</Text>
      <View style={{backgroundColor: '#FFFFFF', borderRadius: 20, paddingVertical: 4}}>
        {MATCHES.map((match, index) => (
          <View key={index} style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 16, borderBottomWidth: index !== MATCHES.length - 1 ? 1 : 0, borderBottomColor: '#F3F4F6'}}>
            <View style={{width: 70}}><Text style={{fontSize: 10, color: '#6B7280', fontWeight: '600'}}>{match.date}</Text></View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
               <Text style={{fontSize: 12, fontWeight: '600', color: '#374151', paddingHorizontal: 8, flex: 1, textAlign: 'right'}}>{match.home}</Text>
               <View style={{backgroundColor: '#F3F4F6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, width: 50, alignItems: 'center'}}><Text style={{fontSize: 11, fontWeight: '700', color: '#6B7280'}}>{match.time}</Text></View>
               <Text style={{fontSize: 12, fontWeight: '600', color: '#374151', paddingHorizontal: 8, flex: 1}}>{match.away}</Text>
            </View>
            {match.league && <View style={{position: 'absolute', top: 6, right: 12, backgroundColor: '#F3F4F6', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4}}><Text style={{fontSize: 8, fontWeight: '700', color: '#4B5563'}}>{match.league}</Text></View>}
          </View>
        ))}
      </View>
      <View style={{height: 40}}/>
    </ScrollView>
  );
}