import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const SQUAD_DATA = [
  { title: "COACH", players: [{ number: "", name: "Arne Slot" }] },
  { title: "GOALKEEPERS", players: [{ number: "1", name: "Alisson Becker" }, { number: "25", name: "Giorgi Mamardashvili" }, { number: "28", name: "Freddie Woodman" }, { number: "41", name: "Ármin Pécsi" }] },
  { title: "DEFENDERS", players: [{ number: "2", name: "Joseph Gomez" }, { number: "4", name: "Virgil van Dijk" }, { number: "5", name: "Ibrahima Konaté" }, { number: "6", name: "Milos Kerkez" }] }
];

export function TeamSquadTab() {
  return (
    <ScrollView style={{flex: 1, padding: 16}} showsVerticalScrollIndicator={false}>
      {SQUAD_DATA.map((section, index) => (
        <View key={index} style={{marginBottom: 24}}>
          <Text style={{fontSize: 11, fontWeight: '800', color: '#111827', marginBottom: 12, textTransform: 'uppercase'}}>{section.title}</Text>
          <View style={{backgroundColor: '#FFFFFF', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 16}}>
            {section.players.map((player, pIndex) => (
              <View key={pIndex} style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 12}}>
                <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center', marginRight: 12}}>
                   {player.number ? <Text style={{fontSize: 12, fontWeight: '700', color: '#374151'}}>{player.number}</Text> : null}
                </View>
                <Text style={{fontSize: 14, fontWeight: '700', color: '#111827'}}>{player.name}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
      <View style={{height: 40}}/>
    </ScrollView>
  );
}