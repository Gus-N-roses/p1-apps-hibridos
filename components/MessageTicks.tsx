import { Ionicons } from '@expo/vector-icons';

import { usePrivacy } from '@/contexts/PrivacyContext';
import { MessageStatus } from '@/types';

const READ_BLUE = '#34B7F1';
const GRAY = '#8696A0';

type MessageTicksProps = {
  status?: MessageStatus;
  size?: number;
};

// ✓ cinza = enviada · ✓✓ cinza = entregue · ✓✓ azul = lida
// Com as confirmações de leitura desativadas, "lida" aparece como "entregue" (cinza).
export default function MessageTicks({ status = 'read', size = 16 }: MessageTicksProps) {
  const { readReceipts } = usePrivacy();
  const shown = status === 'read' && !readReceipts ? 'delivered' : status;

  return (
    <Ionicons
      name={shown === 'sent' ? 'checkmark' : 'checkmark-done'}
      size={size}
      color={shown === 'read' ? READ_BLUE : GRAY}
    />
  );
}
