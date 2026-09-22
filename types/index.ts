export interface Contact {
  id: string;
  name: string;
  about: string;
  phone: string;
  avatarColor: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string | 'me';
  text: string;
  timestamp: string;
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
