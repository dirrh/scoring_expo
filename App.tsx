import "./global.css";
import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import NewsScreen from './src/screens/NewsScreen';
import MatchDetailScreen from './src/screens/MatchDetailScreen';
// --- IMPORTS ---
import LeagueDetailScreen from './src/screens/LeagueDetailScreen';
import TeamDetailScreen from './src/screens/TeamDetailScreen'; // <--- NEW

const Stack = createNativeStackNavigator();

const globalAny = global as any;

if (globalAny.ErrorUtils && !globalAny.__globalErrorHandlerSet) {
  const prevHandler = globalAny.ErrorUtils.getGlobalHandler?.();
  globalAny.ErrorUtils.setGlobalHandler((error: any, isFatal?: boolean) => {
    try {
      console.error("GlobalError:", error?.stack ?? error);
    } catch {}
    if (prevHandler) {
      prevHandler(error, isFatal);
    }
  });
  globalAny.__globalErrorHandlerSet = true;
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{ 
              headerShown: false,
              animation: 'none'
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="News" component={NewsScreen} />
            
            {/* Fallbacks */}
            <Stack.Screen name="Shop" component={HomeScreen} />
            <Stack.Screen name="Betting" component={HomeScreen} />
            <Stack.Screen name="Profile" component={HomeScreen} />

            <Stack.Screen name="MatchDetail" component={MatchDetailScreen} />
            
            {/* --- NEW SCREENS --- */}
            <Stack.Screen name="LeagueDetail" component={LeagueDetailScreen} />
            <Stack.Screen name="TeamDetail" component={TeamDetailScreen} />
            
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}