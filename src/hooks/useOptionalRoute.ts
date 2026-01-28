import { useContext } from 'react';
import { NavigationRouteContext } from '@react-navigation/native';

export function useOptionalRoute<T = Record<string, unknown>>() {
  return useContext(NavigationRouteContext) as
    | { key: string; name: string; params?: T }
    | undefined;
}
