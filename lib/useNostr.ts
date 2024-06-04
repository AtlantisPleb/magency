import 'text-encoding-polyfill'
import { useEffect } from "react"
import NDK from "@nostr-dev-kit/ndk";

export const useNostr = () => {
  useEffect(() => {
    console.log('Nostr is the best!')
  }, [])

  // Create a new NDK instance with explicit relays
  const ndk = new NDK({
    // explicitRelayUrls: ["wss://a.relay", "wss://another.relay"],
  });
  console.log("NDK:", ndk);
}
