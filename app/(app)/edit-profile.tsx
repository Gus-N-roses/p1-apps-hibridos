import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import Avatar from '@/components/Avatar';
import { colors, spacing, typography } from '@/constants/theme';
import { useProfile } from '@/contexts/ProfileContext';

export default function EditProfileScreen() {
  const router = useRouter();
  const { name, about, photoUri, setName, setAbout } = useProfile();
  const [nameDraft, setNameDraft] = useState(name);
  const [aboutDraft, setAboutDraft] = useState(about);

  function handleSave() {
    if (!nameDraft.trim()) return;
    setName(nameDraft.trim());
    setAbout(aboutDraft.trim() || 'Disponível');
    router.back();
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.photoWrapper} onPress={() => router.push('/profile-photo')}>
        <Avatar name={nameDraft || 'Você'} color={colors.primary} size={120} uri={photoUri} />
        <View style={styles.cameraBadge}>
          <Ionicons name="camera" size={18} color="#FFFFFF" />
        </View>
      </Pressable>

      <View style={styles.field}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nameDraft}
          onChangeText={setNameDraft}
          maxLength={25}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Recado</Text>
        <TextInput
          style={styles.input}
          value={aboutDraft}
          onChangeText={setAboutDraft}
          maxLength={139}
        />
      </View>

      <Pressable
        style={[styles.button, !nameDraft.trim() && styles.buttonDisabled]}
        onPress={handleSave}
        disabled={!nameDraft.trim()}>
        <Text style={styles.buttonText}>Salvar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.md,
    backgroundColor: colors.background,
  },
  photoWrapper: {
    alignSelf: 'center',
    marginVertical: spacing.md,
  },
  cameraBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  field: {
    gap: spacing.xs,
  },
  label: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: spacing.sm,
    fontSize: typography.size.md,
    color: colors.textPrimary,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing.sm + spacing.xs,
    alignItems: 'center',
    marginTop: spacing.md,
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
