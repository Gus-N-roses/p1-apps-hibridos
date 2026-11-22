import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, spacing, typography } from '@/constants/theme';

// Verificação simulada: não existe SMS de verdade, o código válido é fixo.
const SIMULATED_CODE = '123456';

export default function OtpScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  function handleVerify() {
    if (code === SIMULATED_CODE) {
      router.push('/profile-setup');
    } else {
      setError(true);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verifique seu número</Text>
      <Text style={styles.subtitle}>Enviamos um código de 6 dígitos para {phone}.</Text>
      <TextInput
        style={styles.input}
        placeholder="------"
        placeholderTextColor={colors.textSecondary}
        keyboardType="number-pad"
        maxLength={6}
        value={code}
        onChangeText={(text) => {
          setCode(text.replace(/\D/g, ''));
          setError(false);
        }}
      />
      {error && <Text style={styles.error}>Código incorreto. Tente novamente.</Text>}
      <Text style={styles.hint}>Simulação: use o código {SIMULATED_CODE}.</Text>
      <Pressable
        style={[styles.button, code.length < 6 && styles.buttonDisabled]}
        onPress={handleVerify}
        disabled={code.length < 6}>
        <Text style={styles.buttonText}>Verificar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.md,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingVertical: spacing.sm,
    fontSize: typography.size.xl,
    letterSpacing: 12,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  error: {
    color: colors.missedCall,
    fontSize: typography.size.sm,
    textAlign: 'center',
  },
  hint: {
    fontSize: typography.size.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing.sm + spacing.xs,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.background,
    fontSize: typography.size.md,
    fontWeight: typography.weight.medium,
  },
});
