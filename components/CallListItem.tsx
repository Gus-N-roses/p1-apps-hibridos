import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Avatar from '@/components/Avatar';
import { colors, spacing, typography } from '@/constants/theme';
import { CallDirection, CallType } from '@/types';

type CallListItemProps = {
  name: string;
  avatarColor: string;
  type: CallType;
  direction: CallDirection;
  timestamp: string;
  onPress: () => void;
};

const directionIcon: Record<CallDirection, keyof typeof Ionicons.glyphMap> = {
  incoming: 'arrow-down',
  outgoing: 'arrow-up',
  missed: 'arrow-down',
};

export default function CallListItem({
  name,
  avatarColor,
  type,
  direction,
  timestamp,
  onPress,
}: CallListItemProps) {
  const isMissed = direction === 'missed';

  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Avatar name={name} color={avatarColor} />
      <View style={styles.textColumn}>
        <Text style={[styles.name, isMissed && styles.nameMissed]} numberOfLines={1}>
          {name}
        </Text>
        <View style={styles.subRow}>
          <Ionicons
            name={directionIcon[direction]}
            size={14}
            color={isMissed ? colors.missedCall : colors.textSecondary}
          />
          <Text style={[styles.timestamp, isMissed && styles.timestampMissed]}>{timestamp}</Text>
        </View>
      </View>
      <Ionicons name={type === 'video' ? 'videocam-outline' : 'call-outline'} size={20} color={colors.primary} />
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
  textColumn: {
    flex: 1,
  },
  name: {
    fontSize: typography.size.md,
    color: colors.textPrimary,
    fontWeight: typography.weight.medium,
  },
  nameMissed: {
    color: colors.missedCall,
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: 2,
  },
  timestamp: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },
  timestampMissed: {
    color: colors.missedCall,
  },
});
