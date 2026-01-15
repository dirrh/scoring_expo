import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const Header = () => (
  <View className="flex-row items-center justify-between px-4 py-3 bg-white">
    <View className="flex-row items-center gap-2">
      <View className="bg-black p-2 rounded-xl">
        <Text className="text-white font-bold text-xs italic">SS</Text>
      </View>
      <Text className="text-xl font-black tracking-tighter text-accent uppercase">
        SportSphere
      </Text>
    </View>
    
    <View className="flex-row gap-2">
      <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
        <Ionicons name="search-outline" size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
        <Ionicons name="calendar-outline" size={20} color="black" />
      </TouchableOpacity>
    </View>
  </View>
);