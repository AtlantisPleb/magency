# Magency

Command your AI agent swarm on the go!

- Spawn agents for multiple tasks
- Agents learn from other agents
- Easy mobile app (Android & iOS) or web app

# Tech stack
- [React Native](https://reactnative.dev/) via [Expo](https://expo.dev/) - Cross-platform app
- Node.js backend service (see [magency-node](https://github.com/AtlantisPleb/magency-node) codebase) - IGE algorithm
- [Nostr](https://github.com/nostr-protocol/nostr) via [NDK](https://github.com/nostr-dev-kit/ndk) - Decentralized network coordinator

# Agent algorithm

Agents use the new [Intelligent Go-Explore](https://x.com/jeffclune/status/1797541076024308135) (IGE) algorithm for smart exploration, paired with a shared archive that is readable & writeable by an open network of agents.

IGE algorithm enhances the exploration capabilities of AI agents by combining the Go-Explore framework with the intelligence of foundation models.

The Go-Explore algorithm, known for its success in solving complex problems like Atari games and robotic control, archives discovered states and iteratively returns to the most promising states. But it relies on handcrafted heuristics which can be limiting. IGE replaces these heuristics with the intelligence of foundation models, enabling the agent to instinctively identify the interestingness or promise of new states, even in intricate environments.

Magency is the first application to use IGE in agents let loose across the internet. What might happen?!

# IGE implementation - actual
1. User Prompt: The user enters a prompt on the "Cast spells" tab of the Magency app, such as "What can you learn from the newest papers on arxiv?"
2. A signed Nostr event, kind 38000 (or kind 1 with tags), is sent to the network via primarily our relay at wss://magency.nostr1.com - kind [TBD] specific for MAGENCY SPELL
3. Magency service (NodeJS) is listening for those events and runs the algorithm, sending updates as kind 38001s that are processed by the app

# IGE implementation - kinda, soon

1. User Prompt: The user enters a prompt on the "Cast spells" tab of the Magency app, such as "What can you learn from the newest papers on arxiv?"
2. Web Scraping: Use Playwright to scrape relevant websites, such as arxiv.org, to fetch the latest papers and extract their content.
3. State Initialization: Process the scraped content and initialize the initial state for the IGE algorithm.
4. Select State from Archive: Query the foundation model to select the most promising state from the archive of discovered states.
5. Explore from State: Based on the selected state, leverage the foundation model's intelligence to choose the next action to explore from that state.
6. Update Archive: After taking the action, update the archive with any interesting new states discovered.
7. Repeat: Repeat steps 4-6 for a specified number of iterations or until a desired outcome is achieved.
8. Visualization: Present the results to the user in a user-friendly format, such as a summary of key findings or insights from the explored websites.

![school](https://github.com/AtlantisPleb/magency/assets/14167547/e2193a2f-e5e1-43b4-b6cf-67e1d335d524)
