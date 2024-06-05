import 'text-encoding-polyfill'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import * as SecureStore from 'expo-secure-store';
import NDK, { NDKEvent, NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';
import { generatePrivateKey, getPublicKey } from 'nostr-tools_1_1_1';

const expoSecureStorage = {
  setItem: SecureStore.setItemAsync,
  getItem: SecureStore.getItemAsync,
  removeItem: SecureStore.deleteItemAsync,
}

interface State {
  userPubkey: string | null,
  userSecret: string | null,
  ndkInstance: NDK | null,
  setUserPubkey: (pubkey: string) => void,
  setUserSecret: (secret: string) => void,
  initializeNDK: () => void
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      userPubkey: null,
      userSecret: null,
      ndkInstance: null,
      setUserPubkey: (userPubkey) => set({ userPubkey }),
      setUserSecret: (userSecret) => set({ userSecret }),
      initializeNDK: async () => {
        const { userSecret, setUserPubkey, setUserSecret } = get();

        let sk, pk;

        if (userSecret) {
          // Use existing keys
          sk = userSecret;
          pk = getPublicKey(sk);
          setUserPubkey(pk);
        } else {
          // Generate new keys
          sk = generatePrivateKey(); // `sk` is a hex string
          pk = getPublicKey(sk); // `pk` is a hex string
          setUserPubkey(pk);
          setUserSecret(sk);
        }

        const ndk = new NDK({
          explicitRelayUrls: [
            "wss://magency.nostr1.com",
          ],
          enableOutboxModel: true,
        });

        ndk.pool?.on("relay:connecting", (relay) => {
          console.log("🪄 MAIN POOL Connecting to relay", relay.url);
        });

        ndk.pool?.on("relay:connect", (relay) => {
          console.log("✅ MAIN POOL Connected to relay", relay.url);
        });

        ndk.signer = new NDKPrivateKeySigner(sk);

        set({ ndkInstance: ndk });

        await ndk.connect(5000);

        // Define the event kinds to subscribe to
        const eventKinds = [38000, 38001, 38002, 38003];

        // Subscribe to the specified event kinds
        const subscription = ndk.subscribe(
          { kinds: eventKinds },
          { closeOnEose: false }
        );

        // Listen for events and log them as they are received
        subscription.on("event", (event: NDKEvent) => {
          console.log("Received event:", event.id);
        });

      },
    }),
    {
      name: "nostr-keys",
      storage: createJSONStorage(() => expoSecureStorage),
    }
  )
);
