import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const STATS = [
  { title: "TOP SCORER", data: [{ name: "Mohamed Salah", value: 4, highlight: true }, { name: "Cody Gakpo", value: 3 }, { name: "Hugo Ekitike", value: 3 }] },
  { title: "ASSISTS", data: [{ name: "Cody Gakpo", value: 2, highlight: true }, { name: "Mohamed Salah", value: 2 }, { name: "Alexis Mac Allister", value: 2 }] },
  { title: "CHANCES CREATED", data: [{ name: "Cody Gakpo", value: 21, highlight: true }, { name: "Mohamed Salah", value: 21 }, { name: "Florian Wirtz", value: 16 }] }
];

export function TeamStatsTab() {
  return (
    <ScrollView style={{flex: 1, padding: 16}} showsVerticalScrollIndicator={false}>
      {STATS.map((section, index) => (
        <View key={index} style={{backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16, marginBottom: 16}}>
          <Text style={{fontSize: 11, fontWeight: '800', color: '#111827', marginBottom: 16, textTransform: 'uppercase'}}>{section.title}</Text>
          {section.data.map((item, i) => (
            <View key={i} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 16}}>
              <View style={{width: 32, height: 32, borderRadius: 16, backgroundColor: '#E5E7EB', marginRight: 12}} />
              <Text style={{flex: 1, fontSize: 13, fontWeight: '700', color: '#111827'}}>{item.name}</Text>
              <Text style={{fontSize: 14, fontWeight: '700', color: item.highlight ? '#DC2626' : '#111827'}}>{item.value}</Text>
            </View>
          ))}
        </View>
      ))}
      <View style={{height: 40}}/>
    </ScrollView>
  );
}