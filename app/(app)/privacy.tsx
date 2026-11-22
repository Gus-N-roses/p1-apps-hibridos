import { StyleSheet, Switch, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/constants/theme';
import { usePrivacy } from '@/contexts/PrivacyContext';

export default function PrivacyScreen() {
  const { readReceipts, setReadReceipts } = usePrivacy();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.textColumn}>
          <Text style={styles.label}>Confirmações de leitura</Text>
          <Text style={styles.description}>
            Se você desativar as confirmações de leitura, não poderá ver as confirmações de leitura
            de outras pessoas, e elas também não verão as suas.
          </Text>
        </View>
        <Switch
          value={readReceipts}
          onValueChange={setReadReceipts}
          trackColor={{ true: colors.primary, false: colors.border }}
          thumbColor="#FFFFFF"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  textColumn: {
    flex: 1,
  },
  label: {
    fontSize: typography.size.md,
    color: colors.textPrimary,
  },
  description: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
