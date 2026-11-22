export interface Contact {
  id: string;
  name: string;
  about: string;
  phone: string;
  avatarColor: string;
  photoUrl?: string;
}

export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface Message {
  id: string;
  chatId: string;
  senderId: string | 'me';
  text: string;
  timestamp: string;
  // Só vale para mensagens enviadas por 'me'. Ausente = já lida (mensagens do mock).
  status?: MessageStatus;
}

export interface Chat {
  id: string;
  contactId: string;
  messages: Message[];
  unreadCount: number;
  pinned: boolean;
}

export interface Status {
  id: string;
  contactId: string;
  updatedAt: string;
  viewed: boolean;
}

export type CallType = 'audio' | 'video';
export type CallDirection = 'incoming' | 'outgoing' | 'missed';

export interface Call {
  id: string;
  contactId: string;
  type: CallType;
  direction: CallDirection;
  timestamp: string;
}

export interface MyStatus {
  id: string;
  uri: string;
  caption: string;
  createdAt: string;
}

export interface Community {
  id: string;
  name: string;
  color: string;
  groups: string[];
}
