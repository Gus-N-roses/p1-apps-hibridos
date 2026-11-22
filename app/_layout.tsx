import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import 'react-native-reanimated';

import { AuthProvider } from '@/contexts/AuthContext';
import { ChatProvider } from '@/contexts/ChatContext';
import { ProfileProvider } from '@/contexts/ProfileContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <AuthProvider>
        <ProfileProvider>
          <ChatProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(app)" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="+not-found" options={{ headerShown: true }} />
            </Stack>
          </ChatProvider>
        </ProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
