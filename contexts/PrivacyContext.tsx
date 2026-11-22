import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import { lerPreferencias, salvarPreferencias } from '@/storage/preferencias';

type PrivacyContextValue = {
  readReceipts: boolean;
  setReadReceipts: (value: boolean) => void;
};

const PrivacyContext = createContext<PrivacyContextValue | null>(null);

export function PrivacyProvider({ children }: { children: ReactNode }) {
  const [readReceipts, setReadReceipts] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    lerPreferencias({ readReceipts: true }).then((preferencias) => {
      setReadReceipts(preferencias.readReceipts);
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    if (isReady) salvarPreferencias({ readReceipts });
  }, [isReady, readReceipts]);

  const value = useMemo(() => ({ readReceipts, setReadReceipts }), [readReceipts]);

  if (!isReady) return null;

  return <PrivacyContext.Provider value={value}>{children}</PrivacyContext.Provider>;
}

export function usePrivacy() {
  const context = useContext(PrivacyContext);
  if (!context) {
    throw new Error('usePrivacy must be used within PrivacyProvider');
  }
  return context;
}
