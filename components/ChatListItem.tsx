import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Avatar from '@/components/Avatar';
import { colors, spacing, typography } from '@/constants/theme';

type ChatListItemProps = {
  name: string;
  avatarColor: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  pinned?: boolean;
  onPress: () => void;
};

export default function ChatListItem({
  name,
  avatarColor,
  lastMessage,
  timestamp,
  unreadCount,
  pinned = false,
  onPress,
}: ChatListItemProps) {
  const hasUnread = unreadCount > 0;

  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Avatar name={name} color={avatarColor} />
      <View style={styles.textColumn}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={[styles.preview, hasUnread && styles.previewUnread]} numberOfLines={1}>
          {lastMessage}
        </Text>
      </View>
      <View style={styles.meta}>
        <View style={styles.metaTop}>
          {pinned && <Ionicons name="pin" size={12} color={colors.textSecondary} />}
          <Text style={[styles.timestamp, hasUnread && styles.timestampUnread]}>{timestamp}</Text>
        </View>
        {hasUnread && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )}
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
  textColumn: {
    flex: 1,
  },
  name: {
    fontSize: typography.size.md,
    color: colors.textPrimary,
    fontWeight: typography.weight.medium,
  },
  preview: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  previewUnread: {
    color: colors.textPrimary,
  },
  meta: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  metaTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timestamp: {
    fontSize: typography.size.xs,
    color: colors.textSecondary,
  },
  timestampUnread: {
    color: colors.unread,
    fontWeight: typography.weight.medium,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.unread,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: typography.size.xs,
    fontWeight: typography.weight.bold,
  },
});
