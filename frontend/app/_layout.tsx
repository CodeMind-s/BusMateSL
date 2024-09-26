import React from 'react';
import { Stack, Tabs } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(routes)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>

  );
};

export default RootLayout;
