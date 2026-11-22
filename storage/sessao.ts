import { lerJson, remover, salvarJson } from '@/storage/storage';

const CHAVE_SESSAO = '@papo:sessao';

export async function salvarSessao(): Promise<void> {
  await salvarJson(CHAVE_SESSAO, { logado: true });
}

export async function lerSessao(): Promise<boolean> {
  const sessao = await lerJson<{ logado: boolean } | null>(CHAVE_SESSAO, null);
  return sessao?.logado === true;
}

export async function limparSessao(): Promise<void> {
  await remover(CHAVE_SESSAO);
}
