import 'text-encoding-polyfill';
import { useEffect, useRef } from "react";
import { useNDK } from "./useNDK";
import { generatePrivateKey, getPublicKey } from 'nostr-tools_1_1_1';
import { NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';
import { useStore } from '@/lib/store';

global.crypto = require('expo-crypto');
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function useNostrUser() {
  const ndk = useNDK();
  const isConnectedRef = useRef(false);
  const userPubkey = useStore(state => state.userPubkey);
  const userSecret = useStore(state => state.userSecret);
  const setUserPubkey = useStore(state => state.setUserPubkey);
  const setUserSecret = useStore(state => state.setUserSecret);

  useEffect(() => {
    let sk, pk;

    const initializeUserKeys = async () => {
      if (userPubkey && userSecret) {
        // Use existing keys
        sk = userSecret;
        pk = userPubkey;
      } else {
        // Generate new keys
        sk = generatePrivateKey(); // `sk` is a hex string
        pk = getPublicKey(sk); // `pk` is a hex string
        setUserPubkey(pk);
        setUserSecret(sk);
      }
      console.log(`You are ${pk}`);

      if (ndk) {
        ndk.signer = new NDKPrivateKeySigner(sk);
        console.log("NDK signer initialized");
        await connectAndPublish(ndk);
      }
    };

    initializeUserKeys();

  }, [ndk, userPubkey, userSecret, setUserPubkey, setUserSecret]);

  const connectAndPublish = async (ndk: any) => {
    if (isConnectedRef.current) return;
    isConnectedRef.current = true;

    ndk.pool?.on("relay:connecting", (relay: any) => {
      console.log("🪄 MAIN POOL Connecting to relay", relay.url);
    });

    ndk.pool?.on("relay:connect", (relay: any) => {
      console.log("✅ MAIN POOL Connected to relay", relay.url);
    });

    await ndk.connect(5000);
  };
}
