import { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/constants/theme';
import { useContacts } from '@/contexts/ContactsContext';

// Trata os 3 estados da chamada de API (carregando, erro, vazio) para as telas
// que dependem dos contatos. Só renderiza a tela quando há dados.
export default function ContactsGate({ children }: { children: ReactNode }) {
  const { contacts, loading, error, reload } = useContacts();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.message}>Carregando contatos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>{error}</Text>
        <Pressable style={styles.button} onPress={reload}>
          <Text style={styles.buttonText}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  if (contacts.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>Nenhum contato encontrado.</Text>
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  message: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  buttonText: {
    color: colors.background,
    fontSize: typography.size.md,
    fontWeight: typography.weight.medium,
  },
});
