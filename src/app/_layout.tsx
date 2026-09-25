import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Hide the header for your Onboarding (index) screen */}
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      
      {/* Hide the header for the main tabs navigation */}
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} 
      />
    </Stack>
  );
}