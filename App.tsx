import "./global.css";
import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// 1. Dôležitý import pre SafeArea
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import NewsScreen from './src/screens/NewsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* 2. Obalenie aplikácie Providerom */}
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="News" // Pre testovanie začíname na News
            screenOptions={{ 
              headerShown: false,
              animation: 'none'
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="News" component={NewsScreen} />
            
            {/* Fallbacky */}
            <Stack.Screen name="Shop" component={HomeScreen} />
            <Stack.Screen name="Betting" component={HomeScreen} />
            <Stack.Screen name="Profile" component={HomeScreen} />
            
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}