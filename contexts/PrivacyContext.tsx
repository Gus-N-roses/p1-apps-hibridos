import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type PrivacyContextValue = {
  readReceipts: boolean;
  setReadReceipts: (value: boolean) => void;
};

const PrivacyContext = createContext<PrivacyContextValue | null>(null);

export function PrivacyProvider({ children }: { children: ReactNode }) {
  const [readReceipts, setReadReceipts] = useState(true);

  const value = useMemo(() => ({ readReceipts, setReadReceipts }), [readReceipts]);

  return <PrivacyContext.Provider value={value}>{children}</PrivacyContext.Provider>;
}

export function usePrivacy() {
  const context = useContext(PrivacyContext);
  if (!context) {
    throw new Error('usePrivacy must be used within PrivacyProvider');
  }
  return context;
}
