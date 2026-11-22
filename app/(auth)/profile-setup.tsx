import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import Avatar from '@/components/Avatar';
import { colors, spacing, typography } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';

export default function ProfileSetupScreen() {
  const { signIn } = useAuth();
  const { setName: saveName, setPhotoUri } = useProfile();
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  async function pickPhoto() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permissão necessária', 'Permita o acesso à galeria para escolher uma foto.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) setPhoto(result.assets[0].uri);
  }

  function handleFinish() {
    if (!name.trim()) return;
    saveName(name.trim());
    setPhotoUri(photo);
    signIn();
    router.replace('/');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dados do perfil</Text>
      <Text style={styles.subtitle}>Informe seu nome e, se quiser, uma foto de perfil.</Text>
      <Pressable style={styles.photoWrapper} onPress={pickPhoto}>
        <Avatar name={name || 'Você'} color={colors.primary} size={120} uri={photo} />
        <View style={styles.cameraBadge}>
          <Ionicons name="camera" size={18} color="#FFFFFF" />
        </View>
      </Pressable>
      <TextInput
        style={styles.input}
        placeholder="Seu nome"
        placeholderTextColor={colors.textSecondary}
        value={name}
        onChangeText={setName}
        maxLength={25}
      />
      <Pressable
        style={[styles.button, !name.trim() && styles.buttonDisabled]}
        onPress={handleFinish}
        disabled={!name.trim()}>
        <Text style={styles.buttonText}>Concluir</Text>
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
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingVertical: spacing.sm,
    fontSize: typography.size.md,
    color: colors.textPrimary,
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
