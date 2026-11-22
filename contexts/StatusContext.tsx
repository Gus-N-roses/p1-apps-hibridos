import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

import { MyStatus } from '@/types';

type StatusContextValue = {
  myStatuses: MyStatus[];
  addStatus: (uri: string, caption: string) => void;
};

const StatusContext = createContext<StatusContextValue | null>(null);

function nowLabel() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `hoje, ${hh}:${mm}`;
}

export function StatusProvider({ children }: { children: ReactNode }) {
  const [myStatuses, setMyStatuses] = useState<MyStatus[]>([]);

  const addStatus = useCallback((uri: string, caption: string) => {
    setMyStatuses((prev) => [
      ...prev,
      { id: `my-status-${Date.now()}`, uri, caption: caption.trim(), createdAt: nowLabel() },
    ]);
  }, []);

  const value = useMemo(() => ({ myStatuses, addStatus }), [myStatuses, addStatus]);

  return <StatusContext.Provider value={value}>{children}</StatusContext.Provider>;
}

export function useStatus() {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error('useStatus must be used within StatusProvider');
  }
  return context;
}
