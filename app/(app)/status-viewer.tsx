import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Avatar from '@/components/Avatar';
import { colors, spacing, typography } from '@/constants/theme';
import { useProfile } from '@/contexts/ProfileContext';
import { useStatus } from '@/contexts/StatusContext';

const STATUS_DURATION_MS = 5000;

export default function StatusViewerScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { myStatuses } = useStatus();
  const { photoUri } = useProfile();

  const [index, setIndex] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  const pausedAt = useRef<number | null>(null);
  const nextRef = useRef<() => void>(() => {});

  // Animação de entrada: a tela cresce a partir do centro, como no WhatsApp.
  const enter = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(enter, { toValue: 1, friction: 8, tension: 60, useNativeDriver: true }).start();
  }, [enter]);

  const count = myStatuses.length;
  const status = myStatuses[index];

  const close = useCallback(() => {
    Animated.timing(enter, { toValue: 0, duration: 160, useNativeDriver: true }).start(() =>
      router.back(),
    );
  }, [enter, router]);

  const run = useCallback(
    (from: number) => {
      progress.setValue(from);
      Animated.timing(progress, {
        toValue: 1,
        duration: STATUS_DURATION_MS * (1 - from),
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) nextRef.current();
      });
    },
    [progress],
  );

  function goNext() {
    if (index >= count - 1) close();
    else setIndex(index + 1);
  }

  function goPrevious() {
    if (index > 0) setIndex(index - 1);
    else run(0);
  }

  nextRef.current = goNext;

  useEffect(() => {
    if (count === 0) {
      router.back();
      return;
    }
    run(0);
    return () => progress.stopAnimation();
  }, [index, count, run, progress, router]);

  if (!status) return null;

  return (
    <View style={styles.backdrop}>
      <Animated.View
        style={[
          styles.container,
          {
            opacity: enter,
            transform: [{ scale: enter.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] }) }],
          },
        ]}>
        <Image source={{ uri: status.uri }} style={StyleSheet.absoluteFill} resizeMode="contain" />

        {/* Toque à esquerda volta, à direita avança; segurar pausa. */}
        <View style={StyleSheet.absoluteFill}>
          <View style={styles.touchRow}>
            <Pressable style={styles.touchPrev} onPress={goPrevious} onLongPress={pause} onPressOut={resume} />
            <Pressable style={styles.touchNext} onPress={goNext} onLongPress={pause} onPressOut={resume} />
          </View>
        </View>

        <View style={[styles.top, { paddingTop: insets.top + spacing.sm }]} pointerEvents="box-none">
          <View style={styles.bars}>
            {myStatuses.map((s, i) => (
              <View key={s.id} style={styles.barTrack}>
                <Animated.View
                  style={[
                    styles.barFill,
                    {
                      width:
                        i < index
                          ? '100%'
                          : i === index
                            ? progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] })
                            : '0%',
                    },
                  ]}
                />
              </View>
            ))}
          </View>
          <View style={styles.header}>
            <Pressable onPress={close} hitSlop={12}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </Pressable>
            <Avatar name="Eu" color={colors.primary} size={36} uri={photoUri} />
            <View style={styles.headerText}>
              <Text style={styles.headerName}>Meu status</Text>
              <Text style={styles.headerTime}>{status.createdAt}</Text>
            </View>
          </View>
        </View>

        {status.caption !== '' && (
          <View style={[styles.captionWrapper, { paddingBottom: insets.bottom + spacing.md }]} pointerEvents="none">
            <Text style={styles.caption}>{status.caption}</Text>
          </View>
        )}
      </Animated.View>
    </View>
  );

  function pause() {
    progress.stopAnimation((value) => {
      pausedAt.current = value;
    });
  }

  function resume() {
    if (pausedAt.current === null) return;
    const from = pausedAt.current;
    pausedAt.current = null;
    run(from);
  }
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  touchRow: {
    flex: 1,
    flexDirection: 'row',
  },
  touchPrev: {
    flex: 3,
  },
  touchNext: {
    flex: 7,
  },
  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.sm,
    gap: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.25)',
    paddingBottom: spacing.sm,
  },
  bars: {
    flexDirection: 'row',
    gap: 4,
  },
  barTrack: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.35)',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerText: {
    flex: 1,
  },
  headerName: {
    color: '#FFFFFF',
    fontSize: typography.size.md,
    fontWeight: typography.weight.medium,
  },
  headerTime: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: typography.size.xs,
  },
  captionWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  caption: {
    color: '#FFFFFF',
    fontSize: typography.size.md,
    textAlign: 'center',
  },
});
