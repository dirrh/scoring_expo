import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Definícia props, ktoré komponent prijíma
interface BottomTabsProps {
  activeTab: 'Home' | 'News' | 'Shop' | 'Betting' | 'Profile';
  onNavigate?: (routeName: string) => void;
}

export const BottomTabs = ({ activeTab, onNavigate }: BottomTabsProps) => {
  const tabs = [
    { name: 'Shop', icon: 'cart-outline', library: 'Ionicons', routeName: 'Shop' },
    { name: 'News', icon: 'newspaper-outline', library: 'Ionicons', routeName: 'News' }, 
    { name: 'Home', icon: 'home-outline', library: 'Ionicons', routeName: 'Home' },
    { name: 'Betting', icon: 'ticket-outline', library: 'MaterialCommunityIcons', routeName: 'Betting' },
    { name: 'Profile', icon: 'person-outline', library: 'Ionicons', routeName: 'Profile' },
  ];

  return (
    <View className="flex-row justify-around items-center bg-white py-3 border-t border-gray-100 absolute bottom-0 w-full pb-8">
      {tabs.map((tab, i) => {
        // Porovnávame activeTab (prop) s routeName tabu
        const isActive = activeTab === tab.routeName;

        return (
          <TouchableOpacity 
            key={i} 
            className="items-center gap-1"
            onPress={() => {
                // Preklikneme sa len ak nie sme na aktívnom tabe
                if (!isActive) {
                    onNavigate?.(tab.routeName);
                }
            }}
          >
            {tab.library === 'Ionicons' ? (
              <Ionicons 
                name={tab.icon as any} 
                size={24} 
                color={isActive ? '#3b82f6' : '#9ca3af'} 
              />
            ) : (
              <MaterialCommunityIcons 
                name={tab.icon as any} 
                size={24} 
                color={isActive ? '#3b82f6' : '#9ca3af'} 
              />
            )}
            <Text className={`text-[10px] uppercase font-bold ${isActive ? 'text-blue-500' : 'text-gray-400'}`}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};