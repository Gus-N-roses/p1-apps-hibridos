import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type AvatarProps = {
  name: string;
  color: string;
  size?: number;
  uri?: string | null;
};

function getInitials(name: string) {
  const parts = name.trim().split(' ');
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

export default function Avatar({ name, color, size = 44, uri }: AvatarProps) {
  // Se a imagem não carregar (ex.: arquivo salvo que não existe mais), mostra as iniciais.
  const [failedUri, setFailedUri] = useState<string | null>(null);

  if (uri && uri !== failedUri) {
    return (
      <Image
        source={{ uri }}
        onError={() => setFailedUri(uri)}
        style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color }}
      />
    );
  }

  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: color },
      ]}>
      <Text style={[styles.initials, { fontSize: size * 0.4 }]}>{getInitials(name)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
