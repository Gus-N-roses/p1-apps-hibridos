import { lerJson, salvarJson } from '@/storage/storage';

const CHAVE_PERFIL = '@papo:perfil';

export type PerfilSalvo = {
  name: string;
  about: string;
  photoUri: string | null;
};

export function salvarPerfil(perfil: PerfilSalvo): Promise<void> {
  return salvarJson(CHAVE_PERFIL, perfil);
}

export function lerPerfil(padrao: PerfilSalvo): Promise<PerfilSalvo> {
  return lerJson(CHAVE_PERFIL, padrao);
}
