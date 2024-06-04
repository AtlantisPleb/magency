import 'text-encoding-polyfill'
import { useEffect, useRef } from "react"
import NDK from "@nostr-dev-kit/ndk";

export const useNostr = () => {
  const ndkInstance = useRef<NDK | null>(null);

  useEffect(() => {
    if (!ndkInstance.current) {
      // Create a new NDK instance if it's not already created
      ndkInstance.current = new NDK({
        explicitRelayUrls: ["wss://relay.snort.social"],
      });
      console.log('NDK initialized');
    }
  }, []);

  return ndkInstance.current;
}
