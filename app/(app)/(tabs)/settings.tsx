import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Avatar from '@/components/Avatar';
import { colors, spacing, typography } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';

const settingsRows: { icon: keyof typeof Ionicons.glyphMap; label: string; href?: '/privacy' }[] = [
  { icon: 'key-outline', label: 'Conta' },
  { icon: 'lock-closed-outline', label: 'Privacidade', href: '/privacy' },
  { icon: 'chatbox-ellipses-outline', label: 'Conversas' },
  { icon: 'notifications-outline', label: 'Notificações' },
  { icon: 'help-circle-outline', label: 'Ajuda' },
];

export default function SettingsScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const { name, about, photoUri } = useProfile();

  return (
    <View style={styles.container}>
      <Pressable style={styles.profileRow} onPress={() => router.push('/edit-profile')}>
        <Avatar name={name} color={colors.primary} size={56} uri={photoUri} />
        <View>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileAbout}>{about}</Text>
        </View>
      </Pressable>
      <Pressable style={styles.row} onPress={() => router.push('/profile-photo')}>
        <Ionicons name="camera-outline" size={22} color={colors.primary} />
        <Text style={styles.rowLabel}>Alterar foto de perfil</Text>
      </Pressable>
      <View style={styles.divider} />
      {settingsRows.map((row) => (
        <Pressable
          key={row.label}
          style={styles.row}
          onPress={() => row.href && router.push(row.href)}>
          <Ionicons name={row.icon} size={22} color={colors.primary} />
          <Text style={styles.rowLabel}>{row.label}</Text>
        </Pressable>
      ))}
      <Pressable style={styles.row} onPress={signOut}>
        <Ionicons name="log-out-outline" size={22} color={colors.missedCall} />
        <Text style={[styles.rowLabel, { color: colors.missedCall }]}>Sair</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  profileName: {
    fontSize: typography.size.lg,
    color: colors.textPrimary,
    fontWeight: typography.weight.medium,
  },
  profileAbout: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  rowLabel: {
    fontSize: typography.size.md,
    color: colors.textPrimary,
  },
});
