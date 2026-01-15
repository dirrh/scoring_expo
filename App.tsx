import "./global.css";
import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importuj svoje obrazovky
import HomeScreen from './src/screens/HomeScreen';
import NewsScreen from './src/screens/NewsScreen'; // Uisti sa, že máš tento súbor vytvorený

// Vytvorenie Stacku
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{ 
            headerShown: false, // Skryje horný header (lebo máš vlastný)
            animation: 'none'   // Vypne animáciu prechodu (aby to vyzeralo ako tabs)
          }}
        >
          {/* Názvy "Home" a "News" musia presne sedieť s routeName v BottomTabs.tsx */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="News" component={NewsScreen} />
          
          {/* Zatiaľ tam daj Home aj pre ostatné, kým nemáš hotové obrazovky, aby apka nespadla */}
          <Stack.Screen name="Shop" component={HomeScreen} />
          <Stack.Screen name="Betting" component={HomeScreen} />
          <Stack.Screen name="Profile" component={HomeScreen} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}