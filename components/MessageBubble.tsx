import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/constants/theme';

type MessageBubbleProps = {
  text: string;
  timestamp: string;
  outgoing: boolean;
};

export default function MessageBubble({ text, timestamp, outgoing }: MessageBubbleProps) {
  return (
    <View style={[styles.row, outgoing ? styles.rowOutgoing : styles.rowIncoming]}>
      <View style={[styles.bubble, outgoing ? styles.bubbleOutgoing : styles.bubbleIncoming]}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginVertical: spacing.xs,
  },
  rowOutgoing: {
    justifyContent: 'flex-end',
  },
  rowIncoming: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '78%',
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  bubbleOutgoing: {
    backgroundColor: colors.bubbleOutgoing,
  },
  bubbleIncoming: {
    backgroundColor: colors.bubbleIncoming,
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: {
    fontSize: typography.size.sm,
    color: colors.textPrimary,
  },
  timestamp: {
    fontSize: typography.size.xs,
    color: colors.textSecondary,
    alignSelf: 'flex-end',
    marginTop: spacing.xs,
  },
});
