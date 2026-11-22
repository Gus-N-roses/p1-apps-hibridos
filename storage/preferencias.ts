import { lerJson, salvarJson } from '@/storage/storage';

const CHAVE_PREFERENCIAS = '@papo:preferencias';

export type PreferenciasSalvas = {
  readReceipts: boolean;
};

export function salvarPreferencias(preferencias: PreferenciasSalvas): Promise<void> {
  return salvarJson(CHAVE_PREFERENCIAS, preferencias);
}

export function lerPreferencias(padrao: PreferenciasSalvas): Promise<PreferenciasSalvas> {
  return lerJson(CHAVE_PREFERENCIAS, padrao);
}
