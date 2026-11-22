import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { lerSessao, limparSessao, salvarSessao } from '@/storage/sessao';

type AuthContextValue = {
  isSignedIn: boolean;
  signIn: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Ao abrir o app, recupera a sessão salva para não pedir login de novo.
  useEffect(() => {
    lerSessao().then((logado) => {
      setIsSignedIn(logado);
      setIsReady(true);
    });
  }, []);

  const signIn = useCallback(() => {
    setIsSignedIn(true);
    salvarSessao();
  }, []);

  const signOut = useCallback(() => {
    setIsSignedIn(false);
    limparSessao();
  }, []);

  const value = useMemo(() => ({ isSignedIn, signIn, signOut }), [isSignedIn, signIn, signOut]);

  // Enquanto lê o storage, não renderiza as rotas (evita piscar a tela de login).
  if (!isReady) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
