import { Contact } from '@/types';

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
