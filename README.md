# Papo

Aplicativo de mensagens inspirado no WhatsApp, feito com **Expo (React Native)** e **TypeScript** como trabalho da faculdade (Apps Híbridos).

## Requisitos do trabalho

| Requisito | Como foi atendido |
|---|---|
| Expo (React Native) | Expo SDK 58, React Native 0.88 |
| Layout com `StyleSheet.create` + Flexbox | Todas as telas e componentes usam `StyleSheet.create`. Nenhuma biblioteca de UI pronta (NativeBase, Paper etc.) |
| Navegação com Expo Router | Rotas baseadas em arquivos na pasta `app/`, com grupos `(auth)`, `(app)` e `(tabs)` |
| Consumo de API | `fetch` em `services/api.ts` (randomuser.me) |
| Armazenamento local | AsyncStorage, em `storage/` |
| Mínimo de 12 telas | 16 telas (lista abaixo) |

## Como rodar

```bash
npm install
npx expo start
```

Depois:

- **Celular:** instale o **Expo Go** e escaneie o QR code (celular e computador na mesma rede).
- **Navegador:** pressione `w` no terminal.
- **Simulador:** pressione `i` (iOS) ou `a` (Android).

Se algo estranho acontecer depois de mudar o código, rode `npx expo start -c` para limpar o cache.

### Roteiro de teste

1. No login, digite um telefone com 10 ou mais dígitos.
2. Na verificação, digite o código `123456` (o envio de SMS é simulado).
3. No cadastro, informe um nome. A foto é opcional.
4. Explore as abas, envie mensagens e adicione um status.
5. Feche e reabra o app: a sessão, as mensagens, o perfil e as preferências continuam salvos.
6. Em **Ajustes → Sair**, a sessão é encerrada e volta o login.

A internet é necessária para carregar os contatos da API. Sem ela, o app mostra a mensagem de erro com o botão "Tentar novamente".

## Telas (16)

| # | Tela | Arquivo |
|---|---|---|
| 1 | Login (telefone) | `app/(auth)/login.tsx` |
| 2 | Verificação de código (OTP simulado) | `app/(auth)/otp.tsx` |
| 3 | Cadastro de perfil (nome e foto) | `app/(auth)/profile-setup.tsx` |
| 4 | Conversas (aba) | `app/(app)/(tabs)/index.tsx` |
| 5 | Atualizações / Status (aba) | `app/(app)/(tabs)/updates.tsx` |
| 6 | Comunidades (aba) | `app/(app)/(tabs)/communities.tsx` |
| 7 | Chamadas (aba) | `app/(app)/(tabs)/calls.tsx` |
| 8 | Ajustes (aba) | `app/(app)/(tabs)/settings.tsx` |
| 9 | Chat individual (rota dinâmica) | `app/(app)/chat/[id].tsx` |
| 10 | Perfil do contato (rota dinâmica) | `app/(app)/contact/[id].tsx` |
| 11 | Nova conversa / lista de contatos | `app/(app)/new-chat.tsx` |
| 12 | Visualizar meu status | `app/(app)/status-viewer.tsx` |
| 13 | Adicionar status | `app/(app)/add-status.tsx` |
| 14 | Editar meu perfil | `app/(app)/edit-profile.tsx` |
| 15 | Foto de perfil | `app/(app)/profile-photo.tsx` |
| 16 | Privacidade (confirmações de leitura) | `app/(app)/privacy.tsx` |

Além dessas, existe `app/+not-found.tsx`, a tela de rota inexistente.

### Funcionalidades principais

- **Envio de mensagens** com ticks de visualização: ✓ enviada, ✓✓ cinza entregue, ✓✓ azul lida. O contato responde automaticamente com uma frase aleatória.
- **Confirmações de leitura** podem ser desativadas em Ajustes → Privacidade. Com elas desligadas, os ticks nunca ficam azuis.
- **Status** com foto e legenda, barras de progresso, avanço automático, toque para avançar ou voltar e segurar para pausar.
- **Troca de foto de perfil** pela galeria ou câmera.

## Consumo de API

- **API:** [randomuser.me](https://randomuser.me), chamada com `seed=papo&nat=br`. O seed fixo devolve sempre as mesmas 6 pessoas, então os ids (`c1` a `c6`) continuam batendo com as conversas de `constants/mockData.ts`.
- **Camada de serviço:** `services/api.ts`, com a função tipada `getContatos(): Promise<Contact[]>`. Usa `fetch` com tempo limite de 10 segundos e mensagens de erro em português.
- **Estado global:** `contexts/ContactsContext.tsx` carrega os contatos uma vez ao abrir o app e expõe `contacts`, `loading`, `error` e `reload`.
- **Estados de tela:** `components/ContactsGate.tsx` trata os três casos nas telas que dependem dos contatos: carregando (`ActivityIndicator`), erro (mensagem e botão "Tentar novamente") e lista vazia.
- **O que vem da API:** nome, telefone e foto de cada contato. O recado e a cor do avatar não existem na API e vêm de `constants/mockData.ts`. As mensagens iniciais das conversas também são dados locais.

## Armazenamento local

Tudo usa `@react-native-async-storage/async-storage`. As funções genéricas de ler, salvar e remover JSON ficam em `storage/storage.ts`, e cada tipo de dado tem seu módulo:

| Dado | Módulo | Chave |
|---|---|---|
| Sessão de login | `storage/sessao.ts` | `@papo:sessao` |
| Mensagens por conversa | `storage/mensagens.ts` | `@papo:mensagens:<id da conversa>` |
| Perfil (nome, recado, foto) | `storage/perfil.ts` | `@papo:perfil` |
| Preferências (confirmação de leitura) | `storage/preferencias.ts` | `@papo:preferencias` |

Os contextos (`contexts/`) leem o storage ao abrir o app e gravam a cada mudança. Cada provider só renderiza as rotas depois de terminar a leitura, para não piscar a tela de login para quem já está logado.

Limitações conhecidas:

- As mensagens enviadas voltam como lidas depois de reiniciar o app, porque os timers de entregue e lido se perdem.
- No navegador, a foto de perfil escolhida não sobrevive a um recarregamento, porque o endereço dela é temporário. Nesse caso aparecem as iniciais.
- Os status que você publica e os contatos da API não são salvos.

## Estrutura do projeto

```
app/                 Rotas (Expo Router)
  (auth)/            Fluxo de entrada: login, OTP, cadastro
  (app)/             Telas do app, protegidas por login
    (tabs)/          Abas: Conversas, Status, Comunidades, Chamadas, Ajustes
components/          Componentes reutilizáveis (Avatar, ChatListItem, MessageBubble, BarraDeInput...)
constants/           theme.ts (paleta e medidas) e mockData.ts
contexts/            Estado global: Auth, Contacts, Profile, Privacy, Chat, Status
services/            api.ts (consumo da API)
storage/             Módulos de AsyncStorage
types/               Tipos TypeScript
```

## Estilo

A paleta do WhatsApp está centralizada em `constants/theme.ts`: `#128C7E` (primária), `#075E54` (cabeçalhos), `#25D366` (destaques), fundo `#ECE5DD` no chat e balões `#DCF8C6` para mensagens enviadas.
