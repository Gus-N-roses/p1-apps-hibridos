import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import Avatar from '@/components/Avatar';
import ContactsGate from '@/components/ContactsGate';
import MessageBubble from '@/components/MessageBubble';
import { colors, spacing, typography } from '@/constants/theme';
import { useChats } from '@/contexts/ChatContext';
import { useContacts } from '@/contexts/ContactsContext';

function ChatScreenContent() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [draft, setDraft] = useState('');
  const listRef = useRef<FlatList>(null);
  const { chats, sendMessage, openChat, closeChat } = useChats();
  const { contacts } = useContacts();

  const chat = chats.find((c) => c.id === id);
  const unreadCount = chat?.unreadCount ?? 0;

  useEffect(() => {
    if (!id) return;
    openChat(id);
    return () => closeChat(id);
  }, [id, openChat, closeChat]);

  // Mensagens que chegam com a conversa aberta já contam como lidas.
  useEffect(() => {
    if (id && unreadCount > 0) openChat(id);
  }, [id, unreadCount, openChat]);

  function handleSend() {
    if (!id || !draft.trim()) return;
    sendMessage(id, draft);
    setDraft('');
  }

  const contact = contacts.find((c) => c.id === chat?.contactId);

  if (!contact || !chat) {
    return (
      <View style={styles.emptyState}>
        <Text>Conversa não encontrada.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <Pressable style={styles.headerTitle} onPress={() => router.push(`/contact/${contact.id}`)}>
              <Avatar name={contact.name} color={contact.avatarColor} size={32} uri={contact.photoUrl} />
              <Text style={styles.headerName}>{contact.name}</Text>
            </Pressable>
          ),
        }}
      />
      <FlatList
        ref={listRef}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContent}
        data={chat.messages}
        keyExtractor={(message) => message.id}
        renderItem={({ item }) => (
          <MessageBubble
            text={item.text}
            timestamp={item.timestamp}
            outgoing={item.senderId === 'me'}
            status={item.status}
          />
        )}
      />
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Mensagem"
          placeholderTextColor={colors.textSecondary}
          value={draft}
          onChangeText={setDraft}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <Pressable style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={18} color="#FFFFFF" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

export default function ChatScreen() {
  return (
    <ContactsGate>
      <ChatScreenContent />
    </ContactsGate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.chatBackground,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerName: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.medium,
    color: colors.textPrimary,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    paddingVertical: spacing.sm,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.chatBackground,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.size.sm,
    color: colors.textPrimary,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
