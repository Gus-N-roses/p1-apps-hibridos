import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

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

  const value = useMemo(
    () => ({ name, about, photoUri, setName, setAbout, setPhotoUri }),
    [name, about, photoUri],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
}
