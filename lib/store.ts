import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import * as SecureStore from 'expo-secure-store';

const expoSecureStorage = {
  setItem: SecureStore.setItemAsync,
  getItem: SecureStore.getItemAsync,
  removeItem: SecureStore.deleteItemAsync,
}

interface State {
  userPubkey: string | null,
  userSecret: string | null,
  setUserPubkey: (pubkey: string) => void,
  setUserSecret: (secret: string) => void
}

export const useStore = create<any>(
  persist(
    (set) => ({
      userPubkey: null,
      userSecret: null,
      setUserPubkey: (userPubkey) => set({ userPubkey }),
      setUserSecret: (userSecret) => set({ userSecret })
    }),
    {
      name: "nostr-keys",
      storage: createJSONStorage(() => expoSecureStorage),
    }
  )
);
