import 'text-encoding-polyfill';
import { NDKEvent } from "@nostr-dev-kit/ndk";
import { useEffect } from "react";
import { useNDK } from "./useNDK";

export function useNostrUser() {
  const ndk = useNDK()

  const allthis = async () => {
    if (!ndk) return
    const pablo = ndk.getUser({ npub: "npub1l2vyh47mk2p0qlsku7hg0vn29faehy9hy34ygaclpn66ukqp3afqutajft" });
    // const user = pablo;
    // const fiatjaf = ndk.getUser({npub: "npub180cvv07tjdrrgpa0j7j7tmnyl2yr6yr7l8j4s3evf6u64th6gkwsyjh6w6"});

    ndk.pool?.on("relay:connecting", (relay) => {
      console.log("🪄 MAIN POOL Connecting to relay", relay.url);
    });

    ndk.pool?.on("relay:connect", (relay) => {
      console.log("✅ MAIN POOL Connected to relay", relay.url);
    });

    // ndk.outboxPool?.on("relay:connect", (relay) => {
    //     console.log("Connected to outbox relay", relay.url);
    // });
    ndk.activeUser = pablo;
    const user = pablo;
    // const user = await signer.user();
    // ndk.signer = signer;
    // ndk.activeUser = user;
    await ndk.connect(2000);

    // Setup kind 0, 3 and 10002
    // await (new NDKEvent(ndk, { kind: 0, content: JSON.stringify({ name: "Outbox", picture: "https://sovereignengineering.io/assets/images/school-of-athens.jpg" }) } as NostrEvent)).publish();
    // await (new NDKEvent(ndk, { kind: NDKKind.RelayList, tags: [ ["r", "wss://pablof7z.nostr1.com"] ] } as NostrEvent)).publish();
    // await user.follow(fiatjaf);

    // user.fetchProfile().then((profile) => {
    //     console.log("Profile", profile);
    // }).catch((e) => {
    //     console.error("Error", e);
    // });

    let follows: Set<any> = new Set();

    setTimeout(async () => {
      follows = await user.follows(undefined, true);

      console.log("Follows", follows.size);

      setTimeout(async () => {
        const feed = await ndk.fetchEvents({ kinds: [1], authors: Array.from(follows).slice(0, 20000).map(u => u.pubkey) }, { subId: "feed" });
        console.log("Feed", feed.size);
      }, 4000);
    }, 2000)
  }

  useEffect(() => {
    if (!ndk) return

    allthis()

    // const ndkEvent = new NDKEvent(ndk);
    // ndkEvent.kind = 1;
    // ndkEvent.content = "Hello, world!";
    // ndkEvent.publish(); // This will trigger the extension to ask the user to confirm signing.

    // const eventsPerRelay = new Map<string, number>();
    // const eventIds = new Set();

    console.log("Lets play with NDK")
  }, [ndk])
}
