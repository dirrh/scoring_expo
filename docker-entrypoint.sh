#!/bin/sh
set -e

echo "🚀 Starting Expo development server..."

# Create .env file from environment variables if they exist
# This allows the app to access environment variables at runtime
if [ -n "$EXPO_TOKEN" ]; then
  echo "EXPO_TOKEN=$EXPO_TOKEN" >> .env
fi

# Supabase configuration
if [ -n "$NEXT_PUBLIC_SUPABASE_URL" ]; then
  echo "NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL" >> .env
  echo "EXPO_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL" >> .env
elif [ -n "$SUPABASE_URL" ]; then
  echo "SUPABASE_URL=$SUPABASE_URL" >> .env
  echo "EXPO_PUBLIC_SUPABASE_URL=$SUPABASE_URL" >> .env
fi

if [ -n "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
  echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY" >> .env
  echo "EXPO_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY" >> .env
elif [ -n "$SUPABASE_ANON_KEY" ]; then
  echo "SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY" >> .env
  echo "EXPO_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY" >> .env
fi

# Mapbox token (for react-native-maps if needed)
if [ -n "$EXPO_PUBLIC_MAPBOX_TOKEN" ]; then
  echo "EXPO_PUBLIC_MAPBOX_TOKEN=$EXPO_PUBLIC_MAPBOX_TOKEN" >> .env
elif [ -n "$RNMAPBOX_MAPS_DOWNLOAD_TOKEN" ]; then
  echo "RNMAPBOX_MAPS_DOWNLOAD_TOKEN=$RNMAPBOX_MAPS_DOWNLOAD_TOKEN" >> .env
  echo "EXPO_PUBLIC_MAPBOX_TOKEN=$RNMAPBOX_MAPS_DOWNLOAD_TOKEN" >> .env
fi

# Check if EXPO_TOKEN is set for tunnel mode
if [ -z "$EXPO_TOKEN" ]; then
  echo "⚠️  WARNING: EXPO_TOKEN is not set. Tunnel mode will not work."
  echo "   Set EXPO_TOKEN in CapRover environment variables for mobile access."
  echo "   Get token from: https://expo.dev/accounts/[username]/settings/access-tokens"
  echo ""
  echo "   Starting Expo in LAN mode (mobile devices must be on same network)..."
  exec npx expo start --web --port 19006 --host tunnel
else
  echo "✅ EXPO_TOKEN found. Starting Expo in tunnel mode..."
  echo "   Mobile devices can connect via QR code or URL"
  exec npx expo start --web --port 19006 --host tunnel --tunnel
fi
