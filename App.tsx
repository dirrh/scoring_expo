import "./global.css";
import 'react-native-gesture-handler';
import React, { useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, type NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import NewsScreen from './src/screens/NewsScreen';
import MatchDetailScreen from './src/screens/MatchDetailScreen';
import LeagueDetailScreen from './src/screens/LeagueDetailScreen';
import TeamDetailScreen from './src/screens/TeamDetailScreen';
import PlayerDetailScreen from './src/screens/PlayerDetailScreen';

// --- PROFILE SECTION ---
import ProfileScreen from './src/screens/ProfileScreen';
import ChatDetailScreen from './src/screens/ChatDetailScreen';
import SocialReelsScreen from './src/screens/SocialReelsScreen';

// --- BETTING SECTION ---
import BettingScreen from './src/screens/BettingScreen'; 
import BettingDetailScreen from './src/screens/BettingDetailScreen';

// --- GLOBAL COMPONENTS ---
import { GlobalNotificationButton } from './src/components/GlobalNotificationButton';
import { SideGroupsDrawer } from './src/components/SideGroupsDrawer'; 
import { SideChatsDrawer } from './src/components/SideChatsDrawer';
// --- CONTEXT PROVIDER ---
import { NotificationProvider } from './src/context/NotificationContext';

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
  const navigationRef = useRef<NavigationContainerRef<any>>(null);
  const [activeRouteName, setActiveRouteName] = useState<string>('Home');

  const handleStateChange = () => {
    const routeName = navigationRef.current?.getCurrentRoute?.()?.name;
    if (routeName && routeName !== activeRouteName) {
      setActiveRouteName(routeName);
    }
  };

  const shouldHideGlobalButtons = activeRouteName === 'SocialReels';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {/* Celú navigáciu obalíme do NotificationProvider, aby fungoval Context */}
        <NotificationProvider>
          <NavigationContainer
            ref={navigationRef}
            onReady={handleStateChange}
            onStateChange={handleStateChange}
          >
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
              
              {/* --- BETTING SECTION --- */}
              <Stack.Screen name="Betting" component={BettingScreen} />
              <Stack.Screen name="BettingDetail" component={BettingDetailScreen} />

              {/* --- PROFILE SECTION --- */}
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
              <Stack.Screen name="SocialReels" component={SocialReelsScreen} />

              {/* --- DETAIL SCREENS --- */}
              <Stack.Screen name="MatchDetail" component={MatchDetailScreen} />
              <Stack.Screen name="LeagueDetail" component={LeagueDetailScreen} />
              <Stack.Screen name="TeamDetail" component={TeamDetailScreen} />
              <Stack.Screen name="PlayerDetail" component={PlayerDetailScreen} />
              
            </Stack.Navigator>

            {/* --- GLOBÁLNE KOMPONENTY (Plávajú nad všetkým) --- */}
            
            {/* 1. Notifikačné tlačidlo (Fialové) */}
            {!shouldHideGlobalButtons && <GlobalNotificationButton />}

            {/* 2. Bočný panel skupín (Vysúvacie menu) */}
            {!shouldHideGlobalButtons && <SideGroupsDrawer />}
            {!shouldHideGlobalButtons && <SideChatsDrawer />}
          </NavigationContainer>
        </NotificationProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}