import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { colors } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerStyle: { backgroundColor: colors.primaryDark },
        headerTintColor: '#FFFFFF',
        headerShadowVisible: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Conversas',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'chatbubbles' : 'chatbubbles-outline'} size={24} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="updates"
        options={{
          title: 'Status',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'ellipse' : 'ellipse-outline'} size={22} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          title: 'Comunidades',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'people' : 'people-outline'} size={22} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="calls"
        options={{
          title: 'Chamadas',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'call' : 'call-outline'} size={22} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'settings' : 'settings-outline'} size={22} color={color as string} />
          ),
        }}
      />
    </Tabs>
  );
}
