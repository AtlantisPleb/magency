# Magency

Command your AI agent swarm on the go!

- Spawn agents for multiple tasks
- Agents learn from other agents
- Easy mobile app (Android & iOS) or web app

# Tech stack
- [React Native](https://reactnative.dev/) via [Expo](https://expo.dev/) - Cross-platform app
- [Nostr](https://github.com/nostr-protocol/nostr) - Decentralized backend

# Algorithm

Agents use the new [Intelligent Go-Explore](https://x.com/jeffclune/status/1797541076024308135) algorithm for smart exploration of the web

The Intelligent Go-Explore (IGE) algorithm enhances the exploration capabilities of AI agents by combining the Go-Explore framework with the intelligence of foundation models.

The Go-Explore algorithm, known for its success in solving complex problems like Atari games and robotic control, archives discovered states and iteratively returns to the most promising states. But it relies on handcrafted heuristics which can be limiting. IGE replaces these heuristics with the intelligence of foundation models, enabling the agent to instinctively identify the interestingness or promise of new states, even in intricate environments.

![school](https://github.com/AtlantisPleb/magency/assets/14167547/e2193a2f-e5e1-43b4-b6cf-67e1d335d524)
