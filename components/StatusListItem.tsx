import { Pressable, StyleSheet, Text, View } from 'react-native';

import Avatar from '@/components/Avatar';
import { colors, spacing, typography } from '@/constants/theme';

type StatusListItemProps = {
  name: string;
  avatarColor: string;
  updatedAt: string;
  viewed: boolean;
  onPress: () => void;
};

export default function StatusListItem({
  name,
  avatarColor,
  updatedAt,
  viewed,
  onPress,
}: StatusListItemProps) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={[styles.ring, { borderColor: viewed ? colors.border : colors.primary }]}>
        <Avatar name={name} color={avatarColor} size={40} />
      </View>
      <View style={styles.textColumn}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.updatedAt}>{updatedAt}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  ring: {
    borderWidth: 2,
    borderRadius: 24,
    padding: 2,
  },
  textColumn: {
    flex: 1,
  },
  name: {
    fontSize: typography.size.md,
    color: colors.textPrimary,
    fontWeight: typography.weight.medium,
  },
  updatedAt: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
