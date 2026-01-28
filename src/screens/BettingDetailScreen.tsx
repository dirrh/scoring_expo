import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions, Image, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useOptionalNavigation } from '../hooks/useOptionalNavigation';
import { useOptionalRoute } from '../hooks/useOptionalRoute';
import Svg, { Path, Line, Text as SvgText, Circle } from 'react-native-svg';

const TIME_FILTERS = ["1H", "6H", "1D", "1W", "1M", "ALL"];
const { width, height } = Dimensions.get('window');

export default function BettingDetailScreen() {
  const navigation = useOptionalNavigation();
  const route = useOptionalRoute<{ match?: any }>();
  const match = route?.params?.match;

  const [activeFilter, setActiveFilter] = useState("1D");

  // --- MODAL STATE ---
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBet, setSelectedBet] = useState<string | null>(null); // '1W', 'X', '2W'
  const [betAmount, setBetAmount] = useState(20);

  // Otvorenie modalu
  const handleOpenModal = (type: string) => {
    setSelectedBet(type);
    setBetAmount(20); // Reset na default
    setModalVisible(true);
  };

  // Helper pre názov tímu v modale
  const getSelectedTeamName = () => {
    if (selectedBet === '1W') return match.home.name;
    if (selectedBet === '2W') return match.away.name;
    return "DRAW";
  };

  // Mock výpočet výhry (len vizuál)
  const potentialWin = Math.floor(betAmount * 2.3); 

  if (!match) return null;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation?.goBack?.()} style={styles.iconBtn}>
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </Pressable>
        
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
           <Ionicons name="stats-chart" size={16} color="#111827" style={{marginRight: 6}}/>
           <Text style={styles.headerTitle}>{match.vol} Vol.</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Pressable style={[styles.iconBtn, {marginRight: 8}]}>
            <Ionicons name="star" size={20} color="#FACC15" />
          </Pressable>
          <Pressable style={styles.iconBtn}>
            <Ionicons name="share-social-outline" size={20} color="#111827" />
          </Pressable>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* --- MATCH SCORE CARD --- */}
        <View style={styles.scoreCard}>
           <View style={styles.teamsContainer}>
              <View style={styles.teamColumn}>
                 <View style={styles.teamLogoBig}>
                    {match.home.logo ? (
                      <Image source={{ uri: match.home.logo }} style={styles.logoImage} resizeMode="contain" />
                    ) : (
                      <Ionicons name="shield" size={32} color="#3B82F6"/>
                    )}
                 </View>
                 <Text style={styles.teamNameBig} numberOfLines={2}>{match.home.name}</Text>
              </View>

              <View style={styles.scoreColumn}>
                 <Text style={[styles.scoreTextBig, match.isLive && {color: '#EF4444'}]}>{match.score}</Text>
                 <Text style={[styles.timeTextBig, match.isLive && {color: '#EF4444'}]}>{match.time}</Text>
              </View>

              <View style={styles.teamColumn}>
                 <View style={styles.teamLogoBig}>
                    {match.away.logo ? (
                      <Image source={{ uri: match.away.logo }} style={styles.logoImage} resizeMode="contain" />
                    ) : (
                      <Ionicons name="shield" size={32} color="#EF4444"/>
                    )}
                 </View>
                 <Text style={styles.teamNameBig} numberOfLines={2}>{match.away.name}</Text>
              </View>
           </View>

           <View style={styles.basicOddsRow}>
              <View style={styles.basicOddItem}><Text style={styles.boLabel}>1W</Text><Text style={styles.boValue}>{match.odds.w1}</Text></View>
              <View style={styles.basicOddItem}><Text style={styles.boLabel}>X</Text><Text style={styles.boValue}>{match.odds.x}</Text></View>
              <View style={styles.basicOddItem}><Text style={styles.boLabel}>2W</Text><Text style={styles.boValue}>{match.odds.w2}</Text></View>
           </View>
        </View>

        {/* --- MONEYLINE SECTION --- */}
        <View style={styles.moneylineSection}>
           <Text style={styles.sectionTitle}>MONEYLINE</Text>
           <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
              <Ionicons name="stats-chart" size={14} color="#9CA3AF" style={{marginRight: 4}}/>
              <Text style={{color: '#9CA3AF', fontSize: 12}}>{match.vol} Vol.</Text>
           </View>

           {/* Ticket Buttons (Click opens Modal) */}
           <View style={styles.ticketRow}>
              <Pressable 
                style={[styles.ticketBtn, styles.btnBlue]} 
                onPress={() => handleOpenModal('1W')}
              >
                 <Text style={styles.btnTextWhite}>1W</Text>
                 <Text style={[styles.btnTextWhite, {marginLeft: 4}]}>51 T</Text>
              </Pressable>
              
              <Pressable 
                style={[styles.ticketBtn, styles.btnWhite]}
                onPress={() => handleOpenModal('X')}
              >
                 <Text style={styles.btnTextGray}>X</Text>
                 <Text style={[styles.btnTextDark, {marginLeft: 4}]}>25 T</Text>
              </Pressable>
              
              <Pressable 
                style={[styles.ticketBtn, styles.btnRed]}
                onPress={() => handleOpenModal('2W')}
              >
                 <Text style={styles.btnTextWhite}>2W</Text>
                 <Text style={[styles.btnTextWhite, {marginLeft: 4}]}>49 T</Text>
              </Pressable>
           </View>

           {/* Graph Chart */}
           <View style={styles.chartContainer}>
              <MockStepChart />
           </View>

           {/* Time Filters */}
           <View style={styles.filterRow}>
              {TIME_FILTERS.map((filter) => (
                 <Pressable 
                    key={filter} 
                    onPress={() => setActiveFilter(filter)}
                    style={[styles.filterBtn, activeFilter === filter && styles.filterBtnActive]}
                 >
                    <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
                 </Pressable>
              ))}
              <View style={{flex: 1}} /> 
              <Ionicons name="settings-outline" size={16} color="#9CA3AF" />
           </View>

        </View>

        <View style={{height: 40}} />
      </ScrollView>

      {/* --- BETTING MODAL --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          {/* Klik mimo zatvorí modal */}
          <Pressable style={styles.modalDismiss} onPress={() => setModalVisible(false)} />
          
          <View style={styles.modalContent}>
             {/* Handle bar */}
             <View style={styles.modalHandle} />

             {/* Header Row */}
             <View style={styles.modalHeader}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                   <Text style={styles.modalLabel}>BUY</Text>
                   <Ionicons name="chevron-down" size={16} color="black" style={{marginLeft: 4}}/>
                </View>

                <View style={styles.teamPill}>
                   <Text style={styles.teamPillText}>{getSelectedTeamName()}</Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                   <Ionicons name="radio-button-on" size={14} color="black" style={{marginRight: 4}}/>
                   <Text style={{fontWeight: '700', fontSize: 14}}>50</Text>
                </View>
             </View>

             {/* Amount Selector */}
             <View style={styles.amountSelector}>
                <TouchableOpacity 
                   style={styles.circleBtn} 
                   onPress={() => setBetAmount(prev => Math.max(1, prev - 1))}
                >
                   <Ionicons name="remove" size={24} color="black" />
                </TouchableOpacity>

                <Text style={styles.amountText}>{betAmount}</Text>

                <TouchableOpacity 
                   style={styles.circleBtn}
                   onPress={() => setBetAmount(prev => prev + 1)}
                >
                   <Ionicons name="add" size={24} color="black" />
                </TouchableOpacity>
             </View>

             {/* To Win Info */}
             <View style={styles.winInfo}>
                <Text style={styles.winLabel}>To win</Text>
                <Ionicons name="radio-button-on" size={14} color="#22C55E" style={{marginHorizontal: 6}}/>
                <Text style={styles.winValue}>{potentialWin}</Text>
             </View>

             {/* Quick Add Buttons */}
             <View style={styles.quickAddRow}>
                {[1, 20, 100, 'All'].map((val, idx) => (
                   <TouchableOpacity 
                      key={idx} 
                      style={styles.quickBtn}
                      onPress={() => {
                         if (val === 'All') setBetAmount(50); // Max wallet
                         else setBetAmount(prev => prev + (val as number));
                      }}
                   >
                      <Text style={styles.quickBtnText}>{val === 'All' ? 'All' : `+ ${val}`}</Text>
                   </TouchableOpacity>
                ))}
             </View>

             {/* Main Action Button */}
             <TouchableOpacity style={styles.mainBuyBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.mainBuyText}>Buy</Text>
             </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

// --- MOCK CHART COMPONENT ---
function MockStepChart() {
   const chartWidth = width - 72;
   const height = 140;
   const blueColor = "#3B82F6";
   const darkBlueColor = "#1E3A8A";

   return (
      <View style={{marginTop: 20, marginBottom: 10}}>
         <Svg height={height} width="100%">
            <Line x1="0" y1="0" x2={chartWidth} y2="0" stroke="#F3F4F6" strokeWidth="1" strokeDasharray="4,4" />
            <Line x1="0" y1="50" x2={chartWidth} y2="50" stroke="#F3F4F6" strokeWidth="1" strokeDasharray="4,4" />
            <Line x1="0" y1="100" x2={chartWidth} y2="100" stroke="#F3F4F6" strokeWidth="1" strokeDasharray="4,4" />
            
            <Path 
               d={`M0,40 L40,40 L40,20 L80,20 L80,50 L140,50 L140,35 L${chartWidth - 40},35`}
               fill="none" stroke={blueColor} strokeWidth="2.5"
            />
            <Circle cx={chartWidth - 40} cy="35" r="3" fill={blueColor} />

            <Path 
               d={`M0,80 L30,80 L30,90 L70,90 L70,70 L120,70 L120,60 L${chartWidth - 40},60`}
               fill="none" stroke={darkBlueColor} strokeWidth="2.5"
            />
            <Circle cx={chartWidth - 40} cy="60" r="3" fill={darkBlueColor} />

            <SvgText x={chartWidth} y="40" fill={blueColor} fontSize="14" fontWeight="bold" textAnchor="end">51%</SvgText>
            <SvgText x={chartWidth} y="25" fill={blueColor} fontSize="10" textAnchor="end">Rams</SvgText>

            <SvgText x={chartWidth} y="65" fill={darkBlueColor} fontSize="14" fontWeight="bold" textAnchor="end">50%</SvgText>
            <SvgText x={chartWidth} y="80" fill={darkBlueColor} fontSize="10" textAnchor="end">SeaH</SvgText>
         </Svg>
         
         <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 4, paddingRight: 40}}>
            <Text style={styles.axisText}>4:00pm</Text>
            <Text style={styles.axisText}>8:00pm</Text>
            <Text style={styles.axisText}>12:00am</Text>
            <Text style={styles.axisText}>4:00am</Text>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  
  // Score Card
  scoreCard: { backgroundColor: 'white', margin: 16, borderRadius: 24, padding: 20, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  teamsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  teamColumn: { alignItems: 'center', flex: 1 },
  scoreColumn: { alignItems: 'center', width: 80, paddingTop: 10 },
  teamLogoBig: { width: 64, height: 64, backgroundColor: '#F9FAFB', borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  logoImage: { width: 40, height: 40 },
  teamNameBig: { fontSize: 13, fontWeight: '800', color: '#111827', textAlign: 'center', textTransform: 'uppercase' },
  scoreTextBig: { fontSize: 32, fontWeight: '900', color: '#111827', lineHeight: 36 },
  timeTextBig: { fontSize: 11, fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', marginTop: 4 },
  
  basicOddsRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 16 },
  basicOddItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 12, flex: 1, justifyContent: 'center', marginHorizontal: 4 },
  boLabel: { fontSize: 12, color: '#9CA3AF', fontWeight: '600', marginRight: 6 },
  boValue: { fontSize: 14, fontWeight: '800', color: '#111827' },

  // Moneyline
  moneylineSection: { backgroundColor: 'white', marginHorizontal: 16, borderRadius: 24, padding: 20, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  sectionTitle: { fontSize: 14, fontWeight: '900', color: '#111827', textTransform: 'uppercase', marginBottom: 4 },
  ticketRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  ticketBtn: { flex: 1, height: 48, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 4, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 },
  btnBlue: { backgroundColor: '#3B82F6' },
  btnWhite: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB' },
  btnRed: { backgroundColor: '#EF4444' },
  btnTextWhite: { color: 'white', fontWeight: '800', fontSize: 14 },
  btnTextDark: { color: '#111827', fontWeight: '800', fontSize: 14 },
  btnTextGray: { color: '#9CA3AF', fontWeight: '800', fontSize: 14, marginRight: 4 },

  chartContainer: { marginBottom: 10 },
  axisText: { fontSize: 10, color: '#9CA3AF', fontWeight: '500' },

  filterRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', padding: 4, borderRadius: 12, marginTop: 10 },
  filterBtn: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10 },
  filterBtnActive: { backgroundColor: '#E5E7EB', shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 1 },
  filterText: { fontSize: 12, fontWeight: '600', color: '#9CA3AF' },
  filterTextActive: { color: '#111827', fontWeight: '800' },

  // --- MODAL STYLES ---
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalDismiss: { flex: 1 },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, paddingBottom: 40, alignItems: 'center' },
  modalHandle: { width: 40, height: 4, backgroundColor: '#E5E7EB', borderRadius: 2, marginBottom: 24 },
  
  modalHeader: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  modalLabel: { fontSize: 18, fontWeight: '800', color: '#111827' },
  teamPill: { backgroundColor: '#60A5FA', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 16 },
  teamPillText: { color: 'white', fontWeight: '700', fontSize: 12, textTransform: 'uppercase' },
  
  amountSelector: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  circleBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F9FAFB', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#F3F4F6' },
  amountText: { fontSize: 48, fontWeight: '900', color: '#111827', marginHorizontal: 32, fontVariant: ['tabular-nums'] },
  
  winInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  winLabel: { fontSize: 14, fontWeight: '600', color: '#111827' },
  winValue: { fontSize: 16, fontWeight: '800', color: '#22C55E' },
  
  quickAddRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 32 },
  quickBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, marginHorizontal: 4 },
  quickBtnText: { fontSize: 14, fontWeight: '700', color: '#111827' },
  
  mainBuyBtn: { width: '100%', backgroundColor: '#0EA5E9', paddingVertical: 18, borderRadius: 20, alignItems: 'center', shadowColor: "#0EA5E9", shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  mainBuyText: { color: 'white', fontSize: 18, fontWeight: '800' }
});