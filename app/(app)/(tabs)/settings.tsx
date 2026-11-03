import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Avatar from '@/components/Avatar';
import { colors, spacing, typography } from '@/constants/theme';

const settingsRows: { icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { icon: 'key-outline', label: 'Conta' },
  { icon: 'lock-closed-outline', label: 'Privacidade' },
  { icon: 'chatbox-ellipses-outline', label: 'Conversas' },
  { icon: 'notifications-outline', label: 'Notificações' },
  { icon: 'help-circle-outline', label: 'Ajuda' },
];

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.profileRow}>
        <Avatar name="Você" color={colors.primary} size={56} />
        <View>
          <Text style={styles.profileName}>Você</Text>
          <Text style={styles.profileAbout}>Disponível</Text>
        </View>
      </Pressable>
      <View style={styles.divider} />
      {settingsRows.map((row) => (
        <Pressable key={row.label} style={styles.row}>
          <Ionicons name={row.icon} size={22} color={colors.primary} />
          <Text style={styles.rowLabel}>{row.label}</Text>
        </Pressable>
      ))}
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
