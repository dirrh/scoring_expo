import { useContext } from 'react';
import { NavigationContext } from '@react-navigation/native';

export function useOptionalNavigation() {
  return useContext(NavigationContext);
}
