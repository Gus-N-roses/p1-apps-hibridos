import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

import { chats as initialChats } from '@/constants/mockData';
import { Chat, Message, MessageStatus } from '@/types';

type ChatContextValue = {
  chats: Chat[];
  sendMessage: (chatId: string, text: string) => void;
  openChat: (chatId: string) => void;
  closeChat: (chatId: string) => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

const DELIVERED_AFTER_MS = 1000;
const READ_AFTER_MS = 2500;
const REPLY_AFTER_MS = 2000;

const autoReplies = [
  'Beleza!',
  'Entendi 👍',
  'Pode ser!',
  'Haha, verdade',
  'Já te respondo, só um minuto',
  'Combinado então',
  'Boa ideia!',
  'Show 😄',
];

function nowTimestamp() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const openChatId = useRef<string | null>(null);
  const counter = useRef(0);

  const nextId = () => `local-${Date.now()}-${counter.current++}`;

  const updateChat = useCallback((chatId: string, fn: (chat: Chat) => Chat) => {
    setChats((prev) => prev.map((c) => (c.id === chatId ? fn(c) : c)));
  }, []);

  const setStatus = useCallback(
    (chatId: string, messageId: string, status: MessageStatus) => {
      updateChat(chatId, (chat) => ({
        ...chat,
        messages: chat.messages.map((m) => (m.id === messageId ? { ...m, status } : m)),
      }));
    },
    [updateChat],
  );

  const sendMessage = useCallback(
    (chatId: string, rawText: string) => {
      const text = rawText.trim();
      if (!text) return;

      const message: Message = {
        id: nextId(),
        chatId,
        senderId: 'me',
        text,
        timestamp: nowTimestamp(),
        status: 'sent',
      };
      updateChat(chatId, (chat) => ({ ...chat, messages: [...chat.messages, message] }));

      setTimeout(() => setStatus(chatId, message.id, 'delivered'), DELIVERED_AFTER_MS);
      setTimeout(() => setStatus(chatId, message.id, 'read'), READ_AFTER_MS);

      setTimeout(() => {
        const reply: Message = {
          id: nextId(),
          chatId,
          senderId: 'contact',
          text: autoReplies[Math.floor(Math.random() * autoReplies.length)],
          timestamp: nowTimestamp(),
        };
        const isOpen = openChatId.current === chatId;
        updateChat(chatId, (chat) => ({
          ...chat,
          messages: [
            // Quando o contato responde, tudo que enviamos antes já foi visto.
            ...chat.messages.map((m) =>
              m.senderId === 'me' && m.status ? { ...m, status: 'read' as const } : m,
            ),
            { ...reply, senderId: chat.contactId },
          ],
          unreadCount: isOpen ? chat.unreadCount : chat.unreadCount + 1,
        }));
      }, READ_AFTER_MS + REPLY_AFTER_MS);
    },
    [updateChat, setStatus],
  );

  const openChat = useCallback(
    (chatId: string) => {
      openChatId.current = chatId;
      updateChat(chatId, (chat) => (chat.unreadCount ? { ...chat, unreadCount: 0 } : chat));
    },
    [updateChat],
  );

  const closeChat = useCallback((chatId: string) => {
    if (openChatId.current === chatId) openChatId.current = null;
  }, []);

  const value = useMemo(
    () => ({ chats, sendMessage, openChat, closeChat }),
    [chats, sendMessage, openChat, closeChat],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChats() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChats must be used within ChatProvider');
  }
  return context;
}
