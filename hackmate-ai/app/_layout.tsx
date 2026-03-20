import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemeProviderCustom } from '@/context/theme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProviderCustom>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
      
          {/* ✅ ALWAYS FIRST SCREEN */}
          <Stack.Screen name="(auth)/auth" />

          {/* OTHER SCREENS */}
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="webview" />
          <Stack.Screen name="chat/[id]" />
          <Stack.Screen name="project/[id]" />

        </Stack>

        <StatusBar style="auto" />
      </ThemeProvider>
    </ThemeProviderCustom>
  );
}