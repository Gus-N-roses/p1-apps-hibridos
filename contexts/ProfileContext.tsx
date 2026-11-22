import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type ProfileContextValue = {
  photoUri: string | null;
  setPhotoUri: (uri: string | null) => void;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const value = useMemo(() => ({ photoUri, setPhotoUri }), [photoUri]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
}
