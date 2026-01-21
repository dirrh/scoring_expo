FROM node:20-alpine
RUN apk add --no-cache git

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# Install @expo/ngrok globally for tunnel mode support
RUN npm install -g @expo/ngrok@^4.1.0

# Copy entrypoint script and fix line endings
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

COPY . .

EXPOSE 19000 19001 19002 19006 8081

ENV NODE_ENV=development
ENV EXPO_NO_DOTENV=0

# Start Expo with tunnel mode and web support
# Tunnel mode (requires EXPO_TOKEN in CapRover env vars)
# Web server will be available on port 19006
# Get token from: https://expo.dev/accounts/[username]/settings/access-tokens
# 
# Environment variables should be set in CapRover:
# - EXPO_TOKEN (required for tunnel mode)
# - NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL (if using Supabase)
# - NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_ANON_KEY (if using Supabase)
# - EXPO_PUBLIC_MAPBOX_TOKEN or RNMAPBOX_MAPS_DOWNLOAD_TOKEN (if using maps)
#
# The entrypoint script will generate a .env file from these environment variables
# at container startup, which your app can then consume.
CMD ["sh", "/app/docker-entrypoint.sh"]
