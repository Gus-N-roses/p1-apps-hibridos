import { Ionicons } from '@expo/vector-icons';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/constants/theme';
import { communities } from '@/constants/mockData';

export default function CommunitiesScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={communities}
        keyExtractor={(community) => community.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.newCommunityRow}>
            <View style={styles.newCommunityIcon}>
              <Ionicons name="people" size={24} color="#FFFFFF" />
              <View style={styles.plusBadge}>
                <Ionicons name="add" size={12} color="#FFFFFF" />
              </View>
            </View>
            <Text style={styles.newCommunityLabel}>Nova comunidade</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[styles.communityIcon, { backgroundColor: item.color }]}>
                <Ionicons name="people" size={22} color="#FFFFFF" />
              </View>
              <View style={styles.cardText}>
                <Text style={styles.communityName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.communityMeta}>{item.groups.length} grupos</Text>
              </View>
            </View>
            {item.groups.map((group) => (
              <View key={group} style={styles.groupRow}>
                <Ionicons name="chatbubbles-outline" size={18} color={colors.textSecondary} />
                <Text style={styles.groupName}>{group}</Text>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  separator: {
    height: spacing.sm,
    backgroundColor: colors.chatBackground,
  },
  newCommunityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: spacing.sm,
    borderBottomColor: colors.chatBackground,
  },
  newCommunityIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusBadge: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newCommunityLabel: {
    fontSize: typography.size.md,
    color: colors.textPrimary,
    fontWeight: typography.weight.medium,
  },
  card: {
    paddingVertical: spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  communityIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    flex: 1,
  },
  communityName: {
    fontSize: typography.size.md,
    color: colors.textPrimary,
    fontWeight: typography.weight.medium,
  },
  communityMeta: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  groupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingLeft: spacing.md + 48 + spacing.md,
    paddingRight: spacing.md,
    paddingVertical: spacing.sm,
  },
  groupName: {
    fontSize: typography.size.sm,
    color: colors.textPrimary,
  },
});
