import React from 'react';
import { View, Text, Modal, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NewsFilterState } from '../types/news';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: NewsFilterState;
  onApply: (newFilters: NewsFilterState) => void;
}

export const FilterModal = ({ visible, onClose, filters, onApply }: FilterModalProps) => {
  const [tempFilters, setTempFilters] = React.useState<NewsFilterState>(filters);

  React.useEffect(() => {
    if (visible) setTempFilters(filters);
  }, [visible]);

  // Kategórie presne podľa tvojho JSONu
  const categories = ['All Categories', 'Football', 'Basketball', 'Tennis', 'Formula 1', 'Olympics', 'Opinion'];
  
  // Typy presne podľa tvojho JSONu
  const types = ['All Types', 'Breaking', 'Analysis', 'Feature', 'Match-Report', 'Opinion'];

  const FilterSection = ({ title, options, selected, onSelect }: any) => (
    <View className="mb-6">
      <Text className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">{title}</Text>
      <View className="flex-row flex-wrap gap-2">
        {options.map((opt: string) => {
          const isSelected = selected === opt || (opt.startsWith('All') && selected === null);
          return (
            <Pressable
              key={opt}
              onPress={() => onSelect(opt.startsWith('All') ? null : opt)}
              className={`px-3 py-2 rounded-lg border ${
                isSelected ? 'bg-black border-black' : 'bg-white border-gray-200'
              }`}
            >
              <Text className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                {opt}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl h-[85%] w-full overflow-hidden">
          
          <View className="flex-row justify-between items-center p-4 border-b border-gray-100">
            <Text className="text-lg font-bold">Filters</Text>
            <Pressable onPress={onClose} className="p-2 bg-gray-100 rounded-full">
              <Ionicons name="close" size={20} color="black" />
            </Pressable>
          </View>

          <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
            {/* View Toggle (All vs Favorites) */}
            <View className="mb-6">
               <Text className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">View</Text>
               <View className="flex-row bg-gray-100 p-1 rounded-xl">
                 <Pressable 
                    onPress={() => setTempFilters({...tempFilters, showFavoritesOnly: false})}
                    className={`flex-1 py-2 items-center rounded-lg ${!tempFilters.showFavoritesOnly ? 'bg-white shadow-sm' : ''}`}
                 >
                   <Text className={`font-semibold ${!tempFilters.showFavoritesOnly ? 'text-black' : 'text-gray-500'}`}>All News</Text>
                 </Pressable>
                 <Pressable 
                    onPress={() => setTempFilters({...tempFilters, showFavoritesOnly: true})}
                    className={`flex-1 py-2 items-center rounded-lg ${tempFilters.showFavoritesOnly ? 'bg-white shadow-sm' : ''}`}
                 >
                   <Text className={`font-semibold ${tempFilters.showFavoritesOnly ? 'text-black' : 'text-gray-500'}`}>Favorites</Text>
                 </Pressable>
               </View>
            </View>

            <FilterSection 
              title="Category" 
              options={categories} 
              selected={tempFilters.category} 
              onSelect={(val: string | null) => setTempFilters({...tempFilters, category: val})} 
            />

            <FilterSection 
              title="Type" 
              options={types} 
              selected={tempFilters.type} 
              onSelect={(val: string | null) => setTempFilters({...tempFilters, type: val})} 
            />

            <View className="mb-8">
              <Text className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">Sort By</Text>
              <View className="flex-row gap-3">
                 <Pressable 
                   onPress={() => setTempFilters({...tempFilters, sortBy: 'newest'})}
                   className={`flex-row items-center px-4 py-2 rounded-lg border ${tempFilters.sortBy === 'newest' ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-200'}`}
                 >
                   <Ionicons name="arrow-up" size={16} color={tempFilters.sortBy === 'newest' ? '#3b82f6' : 'gray'} />
                   <Text className={`ml-2 text-sm ${tempFilters.sortBy === 'newest' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}>Newest</Text>
                 </Pressable>

                 <Pressable 
                   onPress={() => setTempFilters({...tempFilters, sortBy: 'oldest'})}
                   className={`flex-row items-center px-4 py-2 rounded-lg border ${tempFilters.sortBy === 'oldest' ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-200'}`}
                 >
                   <Ionicons name="arrow-down" size={16} color={tempFilters.sortBy === 'oldest' ? '#3b82f6' : 'gray'} />
                   <Text className={`ml-2 text-sm ${tempFilters.sortBy === 'oldest' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}>Oldest</Text>
                 </Pressable>
              </View>
            </View>
          </ScrollView>

          <View className="p-4 border-t border-gray-100 bg-white shadow-lg pb-8">
            <TouchableOpacity 
              onPress={() => onApply(tempFilters)}
              className="bg-black w-full py-4 rounded-xl items-center"
            >
              <Text className="text-white font-bold text-base">Show Results</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};