import 'text-encoding-polyfill';
import { useEffect } from "react";
import { useNDK } from "./useNDK";
import { generatePrivateKey, getPublicKey } from 'nostr-tools_1_1_1'
import { NDKEvent, NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';

global.crypto = require('expo-crypto')
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function useNostrUser() {
  const ndk = useNDK()
  const makeauser = () => {
    let sk = generatePrivateKey() // `sk` is a hex string
    let pk = getPublicKey(sk) // `pk` is a hex string
    console.log(`You are ${pk}`)
    return { sk, pk }
  }

  const connectAndPublish = async (ndk: any) => {
    ndk.pool?.on("relay:connecting", (relay: any) => {
      console.log("🪄 MAIN POOL Connecting to relay", relay.url);
    });

    ndk.pool?.on("relay:connect", (relay: any) => {
      console.log("✅ MAIN POOL Connected to relay", relay.url);
    });
    await ndk.connect(5000);
    await sleep(3000)
    const ndkEvent = new NDKEvent(ndk);
    ndkEvent.kind = 1;
    ndkEvent.content = "Is this thing on?!?!?!";
    console.log("Publishing...")
    const publishedRelays = await ndkEvent.publish();
    console.log("Published to relays", publishedRelays.entries())
  }

  useEffect(() => {
    if (!ndk) return
    const { sk } = makeauser()
    ndk.signer = new NDKPrivateKeySigner(sk)
    console.log("NDK signer initialized")
    connectAndPublish(ndk)
  }, [ndk])
}
