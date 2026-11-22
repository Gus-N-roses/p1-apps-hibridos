import { router, Stack } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import Avatar from '@/components/Avatar';
import ContactsGate from '@/components/ContactsGate';
import { colors, spacing, typography } from '@/constants/theme';
import { useChats } from '@/contexts/ChatContext';
import { useContacts } from '@/contexts/ContactsContext';

function NewChatScreenContent() {
  const { chats } = useChats();
  const { contacts } = useContacts();
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Nova conversa' }} />
      <FlatList
        data={contacts}
        keyExtractor={(contact) => contact.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => {
          const chat = chats.find((c) => c.contactId === item.id);
          return (
            <Pressable
              style={styles.row}
              onPress={() => {
                if (chat) router.push(`/chat/${chat.id}`);
              }}>
              <Avatar name={item.name} color={item.avatarColor} uri={item.photoUrl} />
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.about}>{item.about}</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

export default function NewChatScreen() {
  return (
    <ContactsGate>
      <NewChatScreenContent />
    </ContactsGate>
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  name: {
    fontSize: typography.size.md,
    color: colors.textPrimary,
    fontWeight: typography.weight.medium,
  },
  about: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: 76,
  },
});
