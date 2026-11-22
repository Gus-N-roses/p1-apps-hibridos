import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import 'react-native-reanimated';

import { AuthProvider } from '@/contexts/AuthContext';
import { ContactsProvider } from '@/contexts/ContactsContext';
import { ChatProvider } from '@/contexts/ChatContext';
import { PrivacyProvider } from '@/contexts/PrivacyContext';
import { StatusProvider } from '@/contexts/StatusContext';
import { ProfileProvider } from '@/contexts/ProfileContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <AuthProvider>
        <ContactsProvider>
          <ProfileProvider>
            <PrivacyProvider>
              <ChatProvider>
                <StatusProvider>
                  <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(app)" />
                    <Stack.Screen name="(auth)" />
                    <Stack.Screen name="+not-found" options={{ headerShown: true }} />
                  </Stack>
                </StatusProvider>
              </ChatProvider>
            </PrivacyProvider>
          </ProfileProvider>
        </ContactsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
