import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import { lerPerfil, salvarPerfil } from '@/storage/perfil';

type ProfileContextValue = {
  name: string;
  about: string;
  photoUri: string | null;
  setName: (name: string) => void;
  setAbout: (about: string) => void;
  setPhotoUri: (uri: string | null) => void;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState('Você');
  const [about, setAbout] = useState('Disponível');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    lerPerfil({ name: 'Você', about: 'Disponível', photoUri: null }).then((perfil) => {
      setName(perfil.name);
      setAbout(perfil.about);
      setPhotoUri(perfil.photoUri);
      setIsReady(true);
    });
  }, []);

  // Salva o perfil sempre que algum campo mudar (só depois de carregar o salvo).
  useEffect(() => {
    if (isReady) salvarPerfil({ name, about, photoUri });
  }, [isReady, name, about, photoUri]);

  const value = useMemo(
    () => ({ name, about, photoUri, setName, setAbout, setPhotoUri }),
    [name, about, photoUri],
  );

  if (!isReady) return null;

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
}
