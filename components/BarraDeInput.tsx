import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { colors, spacing, typography } from '@/constants/theme';

type BarraDeInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  placeholder?: string;
};

// Barra inferior do chat: campo de texto arredondado + botão de enviar.
export default function BarraDeInput({
  value,
  onChangeText,
  onSend,
  placeholder = 'Mensagem',
}: BarraDeInputProps) {
  return (
    <View style={styles.bar}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSend}
        returnKeyType="send"
      />
      <Pressable style={styles.sendButton} onPress={onSend}>
        <Ionicons name="send" size={18} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    backgroundColor: colors.chatBackground,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 24,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.size.md,
    color: colors.textPrimary,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
