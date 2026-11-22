import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import Avatar from '@/components/Avatar';
import { colors, spacing, typography } from '@/constants/theme';
import { useProfile } from '@/contexts/ProfileContext';

const pickerOptions: ImagePicker.ImagePickerOptions = {
  mediaTypes: ['images'],
  allowsEditing: true,
  aspect: [1, 1],
  quality: 0.8,
};

export default function ProfilePhotoScreen() {
  const router = useRouter();
  const { photoUri, setPhotoUri } = useProfile();

  async function handleResult(result: ImagePicker.ImagePickerResult) {
    if (!result.canceled && result.assets[0]) {
      setPhotoUri(result.assets[0].uri);
      router.back();
    }
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

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        <Avatar name="Você" color={colors.primary} size={160} uri={photoUri} />
      </View>

      <Pressable style={styles.row} onPress={pickFromGallery}>
        <Ionicons name="image-outline" size={22} color={colors.primary} />
        <Text style={styles.rowLabel}>Escolher da galeria</Text>
      </Pressable>
      <Pressable style={styles.row} onPress={takePhoto}>
        <Ionicons name="camera-outline" size={22} color={colors.primary} />
        <Text style={styles.rowLabel}>Tirar foto</Text>
      </Pressable>
      {photoUri && (
        <Pressable
          style={styles.row}
          onPress={() => {
            setPhotoUri(null);
            router.back();
          }}>
          <Ionicons name="trash-outline" size={22} color={colors.missedCall} />
          <Text style={[styles.rowLabel, { color: colors.missedCall }]}>Remover foto</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  preview: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
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
});
