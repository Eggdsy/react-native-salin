import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="login" 
        options={{ title: 'Login', presentation: 'modal' }} 
      />
      <Stack.Screen 
        name="signup" 
        options={{ title: 'Sign Up', presentation: 'modal' }} 
      />
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} 
      />
    </Stack>
  );
}