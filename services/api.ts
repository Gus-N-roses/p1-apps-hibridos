import { contacts as baseContacts } from '@/constants/mockData';
import { Contact } from '@/types';

// API pública usada para gerar os contatos (nome, telefone e foto).
// O "seed" fixo garante que sempre voltem as mesmas pessoas, então os ids
// (c1, c2, ...) continuam batendo com as conversas de constants/mockData.ts.
const RANDOM_USER_URL = 'https://randomuser.me/api/';
const CONTACTS_COUNT = 6;
const REQUEST_TIMEOUT_MS = 10000;

type RandomUserResult = {
  name: { first: string; last: string };
  phone: string;
  picture: { large: string };
};

type RandomUserResponse = {
  results: RandomUserResult[];
};

async function request<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Falha ao carregar os dados (código ${response.status}).`);
    }
    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('A conexão demorou demais. Verifique sua internet.');
    }
    if (error instanceof TypeError) {
      throw new Error('Não foi possível conectar. Verifique sua internet.');
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

export async function getContatos(): Promise<Contact[]> {
  const data = await request<RandomUserResponse>(
    `${RANDOM_USER_URL}?results=${CONTACTS_COUNT}&seed=papo&nat=br&inc=name,phone,picture`,
  );

  return data.results.map((user, index) => {
    // Recado e cor do avatar não existem na API, então reaproveitamos os do mock.
    const base = baseContacts[index];
    return {
      id: `c${index + 1}`,
      name: `${user.name.first} ${user.name.last}`,
      about: base?.about ?? 'Disponível',
      phone: user.phone,
      avatarColor: base?.avatarColor ?? '#2E7D6B',
      photoUrl: user.picture.large,
    };
  });
}
