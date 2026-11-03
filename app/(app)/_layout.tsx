import { Stack } from 'expo-router';

import { colors, typography } from '@/constants/theme';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: { fontSize: typography.size.md, fontWeight: typography.weight.medium },
        headerShadowVisible: false,
        headerBackTitle: '',
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
