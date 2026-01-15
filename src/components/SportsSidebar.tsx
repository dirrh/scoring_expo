import { View, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export const SportSidebar = () => {
  return (
    // "w-16" definuje šírku sidebaru, "h-full" celú výšku
    <View className="w-16 h-full bg-white items-center py-6 border-r border-gray-100">
      <TouchableOpacity className="p-3 mb-4 bg-blue-500 rounded-2xl">
        <Ionicons name="star" size={22} color="white" />
      </TouchableOpacity>
      
      <TouchableOpacity className="p-3 mb-4">
        <MaterialCommunityIcons name="soccer" size={24} color="#9ca3af" />
      </TouchableOpacity>

      <TouchableOpacity className="p-3 mb-4">
        <FontAwesome5 name="hockey-puck" size={20} color="#9ca3af" />
      </TouchableOpacity>
    </View>
  );
};