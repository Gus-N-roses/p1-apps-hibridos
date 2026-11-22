import { Ionicons } from '@expo/vector-icons';

import { MessageStatus } from '@/types';

const READ_BLUE = '#34B7F1';
const GRAY = '#8696A0';

type MessageTicksProps = {
  status?: MessageStatus;
  size?: number;
};

// ✓ cinza = enviada · ✓✓ cinza = entregue · ✓✓ azul = lida
export default function MessageTicks({ status = 'read', size = 16 }: MessageTicksProps) {
  return (
    <Ionicons
      name={status === 'sent' ? 'checkmark' : 'checkmark-done'}
      size={size}
      color={status === 'read' ? READ_BLUE : GRAY}
    />
  );
}
