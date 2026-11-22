import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Animated, Pressable, SectionList, StyleSheet, Text, View } from 'react-native';

import Avatar from '@/components/Avatar';
import StatusListItem from '@/components/StatusListItem';
import { colors, spacing, typography } from '@/constants/theme';
import { contacts, statuses } from '@/constants/mockData';
import { useProfile } from '@/contexts/ProfileContext';
import { useStatus } from '@/contexts/StatusContext';

export default function UpdatesScreen() {
  const router = useRouter();
  const { photoUri } = useProfile();
  const { myStatuses } = useStatus();
  const hasStatus = myStatuses.length > 0;
  const lastStatus = myStatuses[myStatuses.length - 1];
  const scale = useRef(new Animated.Value(1)).current;

  // Ao tocar no meu status o avatar "afunda" e volta com mola, e então o status abre.
  function openMyStatus() {
    if (!hasStatus) {
      router.push('/add-status');
      return;
    }
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.85, duration: 90, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 4, tension: 120, useNativeDriver: true }),
    ]).start();
    router.push('/status-viewer');
  }

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
          <Pressable style={styles.myStatusRow} onPress={openMyStatus}>
            <Animated.View
              style={[
                styles.myStatusAvatarWrapper,
                hasStatus && styles.myStatusRing,
                { transform: [{ scale }] },
              ]}>
              <Avatar name="Eu" color={colors.primary} size={44} uri={photoUri} />
              {!hasStatus && (
                <View style={styles.plusBadge}>
                  <Ionicons name="add" size={12} color="#FFFFFF" />
                </View>
              )}
            </Animated.View>
            <View style={styles.myStatusText}>
              <Text style={styles.myStatusName}>Meu status</Text>
              <Text style={styles.myStatusHint}>
                {hasStatus ? lastStatus.createdAt : 'Toque para adicionar'}
              </Text>
            </View>
            {hasStatus && (
              <Pressable
                style={styles.addMoreButton}
                hitSlop={8}
                onPress={() => router.push('/add-status')}>
                <Ionicons name="camera" size={20} color={colors.primary} />
              </Pressable>
            )}
          </Pressable>
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
  myStatusRing: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 28,
    padding: 2,
  },
  myStatusText: {
    flex: 1,
  },
  addMoreButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.chatBackground,
    alignItems: 'center',
    justifyContent: 'center',
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
