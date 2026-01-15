import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'; // 1. Importy pre navigáciu

export const BottomTabs = () => {
  const navigation = useNavigation<any>(); // 2. Hook na ovládanie navigácie
  const route = useRoute(); // 3. Hook na zistenie, kde práve si

  const tabs = [
    // routeName musí sedieť s tým, ako si nazval obrazovku v App.tsx (Stack.Screen name="...")
    { name: 'Shop', icon: 'cart-outline', library: 'Ionicons', routeName: 'Shop' },
    { name: 'News', icon: 'newspaper-outline', library: 'Ionicons', routeName: 'News' }, 
    { name: 'Home', icon: 'home-outline', library: 'Ionicons', routeName: 'Home' },
    { name: 'Betting', icon: 'ticket-outline', library: 'MaterialCommunityIcons', routeName: 'Betting' },
    { name: 'Profile', icon: 'person-outline', library: 'Ionicons', routeName: 'Profile' },
  ];

  return (
    <View className="flex-row justify-around items-center bg-white py-3 border-t border-gray-100 absolute bottom-0 w-full pb-8">
      {tabs.map((tab, i) => {
        // 4. Zistíme, či je tento tab aktívny porovnaním route.name
        const isActive = route.name === tab.routeName;

        return (
          <TouchableOpacity 
            key={i} 
            className="items-center gap-1"
            // 5. Pridaná akcia na kliknutie
            onPress={() => {
                // Ochrana: ak sme už na tej obrazovke, nepreklikávame znova (voliteľné)
                if (!isActive) {
                    navigation.navigate(tab.routeName);
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