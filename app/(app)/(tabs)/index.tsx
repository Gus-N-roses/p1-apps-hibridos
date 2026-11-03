import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import ChatListItem from '@/components/ChatListItem';
import { colors, spacing } from '@/constants/theme';
import { chats, contacts } from '@/constants/mockData';

export default function ChatsScreen() {
  const orderedChats = [...chats].sort((a, b) => Number(b.pinned) - Number(a.pinned));

  return (
    <View style={styles.container}>
      <FlatList
        data={orderedChats}
        keyExtractor={(chat) => chat.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => {
          const contact = contacts.find((c) => c.id === item.contactId);
          if (!contact) return null;
          const lastMessage = item.messages[item.messages.length - 1];
          return (
            <ChatListItem
              name={contact.name}
              avatarColor={contact.avatarColor}
              lastMessage={lastMessage?.text ?? ''}
              timestamp={lastMessage?.timestamp ?? ''}
              unreadCount={item.unreadCount}
              pinned={item.pinned}
              onPress={() => router.push(`/chat/${contact.id}`)}
            />
          );
        }}
      />
      <Pressable style={styles.fab} onPress={() => router.push('/new-chat')}>
        <Ionicons name="chatbubble-ellipses" size={24} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: 76,
  },
  listContent: {
    paddingBottom: 88,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
});
