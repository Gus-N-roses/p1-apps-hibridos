import { Call, Chat, Contact, Status } from '@/types';

const avatarPalette = ['#2E7D6B', '#6B4EA0', '#C77A2E', '#3F6FB5', '#B5495B', '#4E9A7F'];

export const contacts: Contact[] = [
  {
    id: 'c1',
    name: 'Beatriz Nunes',
    about: 'Disponível',
    phone: '+55 11 91234-0001',
    avatarColor: avatarPalette[0],
  },
  {
    id: 'c2',
    name: 'Thiago Aragão',
    about: 'Ocupado no trabalho',
    phone: '+55 11 91234-0002',
    avatarColor: avatarPalette[1],
  },
  {
    id: 'c3',
    name: 'Larissa Prado',
    about: 'Viajando ✈️',
    phone: '+55 21 91234-0003',
    avatarColor: avatarPalette[2],
  },
  {
    id: 'c4',
    name: 'Rafael Quintão',
    about: 'Estudando pra prova',
    phone: '+55 31 91234-0004',
    avatarColor: avatarPalette[3],
  },
  {
    id: 'c5',
    name: 'Marina Coutinho',
    about: 'Só mensagem',
    phone: '+55 41 91234-0005',
    avatarColor: avatarPalette[4],
  },
  {
    id: 'c6',
    name: 'Diego Vasconcelos',
    about: 'Bateria fraca 🔋',
    phone: '+55 51 91234-0006',
    avatarColor: avatarPalette[5],
  },
];

export const chats: Chat[] = [
  {
    id: 'chat-c1',
    contactId: 'c1',
    unreadCount: 2,
    pinned: true,
    messages: [
      { id: 'm1', chatId: 'chat-c1', senderId: 'c1', text: 'Oi! Vamos almoçar amanhã?', timestamp: '09:12' },
      { id: 'm2', chatId: 'chat-c1', senderId: 'me', text: 'Bora! Que horas fica bom pra você?', timestamp: '09:14' },
      { id: 'm3', chatId: 'chat-c1', senderId: 'c1', text: 'Meio-dia e meia?', timestamp: '09:15' },
      { id: 'm4', chatId: 'chat-c1', senderId: 'c1', text: 'Aquele lugar perto da faculdade', timestamp: '09:15' },
    ],
  },
  {
    id: 'chat-c2',
    contactId: 'c2',
    unreadCount: 0,
    pinned: false,
    messages: [
      { id: 'm5', chatId: 'chat-c2', senderId: 'me', text: 'Terminou aquele relatório?', timestamp: '08:02' },
      { id: 'm6', chatId: 'chat-c2', senderId: 'c2', text: 'Quase, mando até o fim do dia', timestamp: '08:10' },
    ],
  },
  {
    id: 'chat-c3',
    contactId: 'c3',
    unreadCount: 0,
    pinned: false,
    messages: [
      { id: 'm7', chatId: 'chat-c3', senderId: 'c3', text: 'Cheguei em Lisboa!', timestamp: 'ontem' },
      { id: 'm8', chatId: 'chat-c3', senderId: 'me', text: 'Manda foto do aeroporto', timestamp: 'ontem' },
      { id: 'm9', chatId: 'chat-c3', senderId: 'c3', text: 'Depois te mando, tá lotado aqui', timestamp: 'ontem' },
    ],
  },
  {
    id: 'chat-c4',
    contactId: 'c4',
    unreadCount: 5,
    pinned: false,
    messages: [
      { id: 'm10', chatId: 'chat-c4', senderId: 'c4', text: 'Vc tem o resumo do capítulo 4?', timestamp: '07:40' },
      { id: 'm11', chatId: 'chat-c4', senderId: 'c4', text: 'Preciso pra prova de sexta', timestamp: '07:41' },
    ],
  },
  {
    id: 'chat-c5',
    contactId: 'c5',
    unreadCount: 0,
    pinned: false,
    messages: [
      { id: 'm12', chatId: 'chat-c5', senderId: 'me', text: 'Feliz aniversário! 🎉', timestamp: 'segunda' },
      { id: 'm13', chatId: 'chat-c5', senderId: 'c5', text: 'Obrigada, Gustavo!', timestamp: 'segunda' },
    ],
  },
  {
    id: 'chat-c6',
    contactId: 'c6',
    unreadCount: 0,
    pinned: false,
    messages: [
      { id: 'm14', chatId: 'chat-c6', senderId: 'c6', text: 'Te ligo daqui a pouco', timestamp: 'terça' },
    ],
  },
];

export const statuses: Status[] = [
  { id: 's1', contactId: 'c1', updatedAt: 'hoje, 08:30', viewed: false },
  { id: 's2', contactId: 'c3', updatedAt: 'hoje, 07:15', viewed: false },
  { id: 's3', contactId: 'c2', updatedAt: 'ontem, 22:40', viewed: true },
  { id: 's4', contactId: 'c5', updatedAt: 'ontem, 19:05', viewed: true },
];

export const calls: Call[] = [
  { id: 'call1', contactId: 'c2', type: 'audio', direction: 'outgoing', timestamp: 'hoje, 10:02' },
  { id: 'call2', contactId: 'c1', type: 'video', direction: 'incoming', timestamp: 'hoje, 08:47' },
  { id: 'call3', contactId: 'c4', type: 'audio', direction: 'missed', timestamp: 'ontem, 21:15' },
  { id: 'call4', contactId: 'c6', type: 'audio', direction: 'incoming', timestamp: 'ontem, 18:30' },
  { id: 'call5', contactId: 'c3', type: 'video', direction: 'outgoing', timestamp: 'terça, 20:00' },
  { id: 'call6', contactId: 'c5', type: 'audio', direction: 'missed', timestamp: 'segunda, 09:10' },
];
