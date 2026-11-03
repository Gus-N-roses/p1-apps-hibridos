import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import Avatar from '@/components/Avatar';
import { colors, spacing, typography } from '@/constants/theme';
import { contacts } from '@/constants/mockData';

export default function ContactInfoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const contact = contacts.find((c) => c.id === id);

  if (!contact) {
    return (
      <View style={styles.emptyState}>
        <Text>Contato não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Dados do contato' }} />
      <View style={styles.profile}>
        <Avatar name={contact.name} color={contact.avatarColor} size={96} />
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.phone}>{contact.phone}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.infoRow}>
        <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
        <View>
          <Text style={styles.infoLabel}>Recado</Text>
          <Text style={styles.infoValue}>{contact.about}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.infoRow}>
        <Ionicons name="images-outline" size={20} color={colors.primary} />
        <Text style={styles.infoValue}>Nenhuma mídia compartilhada</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    gap: spacing.xs,
  },
  name: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.medium,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  phone: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  infoLabel: {
    fontSize: typography.size.xs,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: typography.size.md,
    color: colors.textPrimary,
    marginTop: 2,
  },
});
