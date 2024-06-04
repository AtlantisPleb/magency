import { useEffect, useState, useRef } from "react"
import NDK from "@nostr-dev-kit/ndk";

export const useNDK = () => {
  const ndkInstanceRef = useRef<NDK | null>(null);
  const [ndkInstance, setNdkInstance] = useState<NDK | null>(null);

  useEffect(() => {
    if (!ndkInstanceRef.current) {
      // Create a new NDK instance if it's not already created
      ndkInstanceRef.current = new NDK({
        explicitRelayUrls: [
          "wss://magency.nostr1.com",
          // "wss://pablof7z.nostr1.com",
          // "wss://offchain.pub",
          // "wss://relay.f7z.io",
          // "wss://relay.damus.io",
          // "wss://relay.snort.social",
          // "wss://offchain.pub/",
          // "wss://nostr.mom",
          // "wss://nostr-pub.wellorder.net",
          // "wss://purplepag.es",
          // "wss://brb.io/",
        ],
        enableOutboxModel: true,
      });
      setNdkInstance(ndkInstanceRef.current);
      console.log('NDK initialized');
    } else {
      // Set the existing instance from the ref to the state
      setNdkInstance(ndkInstanceRef.current);
    }
  }, []);

  return ndkInstance;
}
