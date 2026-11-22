import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { getContatos } from '@/services/api';
import { Contact } from '@/types';

type ContactsContextValue = {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  reload: () => void;
};

const ContactsContext = createContext<ContactsContextValue | null>(null);

export function ContactsProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    getContatos()
      .then(setContacts)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Erro inesperado.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const value = useMemo(
    () => ({ contacts, loading, error, reload }),
    [contacts, loading, error, reload],
  );

  return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>;
}

export function useContacts() {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error('useContacts must be used within ContactsProvider');
  }
  return context;
}
