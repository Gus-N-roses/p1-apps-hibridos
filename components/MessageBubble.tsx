import { StyleSheet, Text, View } from 'react-native';

import MessageTicks from '@/components/MessageTicks';
import { colors, spacing, typography } from '@/constants/theme';
import { MessageStatus } from '@/types';

type MessageBubbleProps = {
  text: string;
  timestamp: string;
  outgoing: boolean;
  status?: MessageStatus;
};

export default function MessageBubble({ text, timestamp, outgoing, status }: MessageBubbleProps) {
  return (
    <View style={[styles.row, outgoing ? styles.rowOutgoing : styles.rowIncoming]}>
      <View style={[styles.bubble, outgoing ? styles.bubbleOutgoing : styles.bubbleIncoming]}>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.footer}>
          <Text style={styles.timestamp}>{timestamp}</Text>
          {outgoing && <MessageTicks status={status} />}
        </View>
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 4,
    marginTop: spacing.xs,
  },
  timestamp: {
    fontSize: typography.size.xs,
    color: colors.textSecondary,
  },
});
