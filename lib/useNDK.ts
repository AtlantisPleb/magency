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
