import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { colors, spacing, typography } from '@/constants/theme';
import { useStatus } from '@/contexts/StatusContext';

const pickerOptions: ImagePicker.ImagePickerOptions = {
  mediaTypes: ['images'],
  quality: 0.8,
};

export default function AddStatusScreen() {
  const router = useRouter();
  const { addStatus } = useStatus();
  const [uri, setUri] = useState<string | null>(null);
  const [caption, setCaption] = useState('');

  function handleResult(result: ImagePicker.ImagePickerResult) {
    if (!result.canceled && result.assets[0]) setUri(result.assets[0].uri);
  }

  async function pickFromGallery() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permissão necessária', 'Permita o acesso à galeria para escolher uma foto.');
      return;
    }
    handleResult(await ImagePicker.launchImageLibraryAsync(pickerOptions));
  }

  async function takePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permissão necessária', 'Permita o acesso à câmera para tirar uma foto.');
      return;
    }
    handleResult(await ImagePicker.launchCameraAsync(pickerOptions));
  }

  function publish() {
    if (!uri) return;
    addStatus(uri, caption);
    router.back();
  }

  if (!uri) {
    return (
      <View style={styles.container}>
        <Text style={styles.hint}>Escolha uma foto para o seu status</Text>
        <Pressable style={styles.row} onPress={pickFromGallery}>
          <Ionicons name="image-outline" size={22} color={colors.primary} />
          <Text style={styles.rowLabel}>Escolher da galeria</Text>
        </Pressable>
        <Pressable style={styles.row} onPress={takePhoto}>
          <Ionicons name="camera-outline" size={22} color={colors.primary} />
          <Text style={styles.rowLabel}>Tirar foto</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.previewContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      <Image source={{ uri }} style={styles.preview} resizeMode="contain" />
      <View style={styles.captionBar}>
        <Pressable style={styles.changeButton} onPress={() => setUri(null)}>
          <Ionicons name="swap-horizontal" size={20} color={colors.textPrimary} />
        </Pressable>
        <TextInput
          style={styles.captionInput}
          placeholder="Adicionar legenda..."
          placeholderTextColor={colors.textSecondary}
          value={caption}
          onChangeText={setCaption}
          maxLength={200}
        />
        <Pressable style={styles.sendButton} onPress={publish}>
          <Ionicons name="send" size={18} color="#FFFFFF" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hint: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    padding: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  rowLabel: {
    fontSize: typography.size.md,
    color: colors.textPrimary,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  preview: {
    flex: 1,
  },
  captionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
    backgroundColor: colors.background,
  },
  changeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.chatBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captionInput: {
    flex: 1,
    backgroundColor: colors.chatBackground,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.size.sm,
    color: colors.textPrimary,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
