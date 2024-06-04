import { create } from 'zustand'

interface State {
  userPubkey: string | null
  userSecret: string | null
}

export const useStore = create<State>()((set) => ({
  userPubkey: null,
  userSecret: null,
}))
