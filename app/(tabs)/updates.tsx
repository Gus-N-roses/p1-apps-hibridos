import { Ionicons } from '@expo/vector-icons';
import { SectionList, StyleSheet, Text, View } from 'react-native';

import Avatar from '@/components/Avatar';
import StatusListItem from '@/components/StatusListItem';
import { colors, spacing, typography } from '@/constants/theme';
import { contacts, statuses } from '@/constants/mockData';

export default function UpdatesScreen() {
  const recent = statuses.filter((status) => !status.viewed);
  const viewed = statuses.filter((status) => status.viewed);

  const sections = [
    { title: 'Recentes', data: recent },
    { title: 'Visualizados', data: viewed },
  ].filter((section) => section.data.length > 0);

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(status) => status.id}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={
          <View style={styles.myStatusRow}>
            <View style={styles.myStatusAvatarWrapper}>
              <Avatar name="Eu" color={colors.primary} size={44} />
              <View style={styles.plusBadge}>
                <Ionicons name="add" size={12} color="#FFFFFF" />
              </View>
            </View>
            <View>
              <Text style={styles.myStatusName}>Meu status</Text>
              <Text style={styles.myStatusHint}>Toque para adicionar</Text>
            </View>
          </View>
        }
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionTitle}>{section.title}</Text>
        )}
        renderItem={({ item }) => {
          const contact = contacts.find((c) => c.id === item.contactId);
          if (!contact) return null;
          return (
            <StatusListItem
              name={contact.name}
              avatarColor={contact.avatarColor}
              updatedAt={item.updatedAt}
              viewed={item.viewed}
              onPress={() => {}}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  myStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  myStatusAvatarWrapper: {
    position: 'relative',
  },
  plusBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myStatusName: {
    fontSize: typography.size.md,
    color: colors.textPrimary,
    fontWeight: typography.weight.medium,
  },
  myStatusHint: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  listContent: {
    paddingBottom: spacing.md,
  },
});
