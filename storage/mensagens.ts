import { lerJson, salvarJson } from '@/storage/storage';
import { Message } from '@/types';

// Uma chave por conversa: '@papo:mensagens:<id da conversa>'.
// Só as mensagens criadas no app (enviadas e respostas) são salvas;
// as do mock continuam vindo de constants/mockData.ts.
const chaveMensagens = (chatId: string) => `@papo:mensagens:${chatId}`;

export function salvarMensagens(chatId: string, mensagens: Message[]): Promise<void> {
  return salvarJson(chaveMensagens(chatId), mensagens);
}

export function lerMensagens(chatId: string): Promise<Message[]> {
  return lerJson<Message[]>(chaveMensagens(chatId), []);
}
