# Magency

Command your AI agent swarm on the go!

- Spawn agents for multiple tasks
- Agents learn from other agents
- Easy mobile app (Android & iOS) or web app

# Tech stack
- [React Native](https://reactnative.dev/) via [Expo](https://expo.dev/) - Cross-platform app
- Node.js backend service (see [magency-node](https://github.com/AtlantisPleb/magency-node) codebase)
- [Nostr](https://github.com/nostr-protocol/nostr) via [NDK](https://github.com/nostr-dev-kit/ndk) - Decentralized backend

# Agent algorithm

Agents use the new [Intelligent Go-Explore](https://x.com/jeffclune/status/1797541076024308135) (IGE) algorithm for smart exploration, paired with a shared archive that is readable & writeable by an open network of agents.

IGE algorithm enhances the exploration capabilities of AI agents by combining the Go-Explore framework with the intelligence of foundation models.

The Go-Explore algorithm, known for its success in solving complex problems like Atari games and robotic control, archives discovered states and iteratively returns to the most promising states. But it relies on handcrafted heuristics which can be limiting. IGE replaces these heuristics with the intelligence of foundation models, enabling the agent to instinctively identify the interestingness or promise of new states, even in intricate environments.

Magency is the first application to use IGE in agents let loose across the internet. What might happen?!

# IGE implementation - actual
1. User Prompt: The user enters a prompt on the "Cast spells" tab of the Magency app, such as "What can you learn from the newest papers on arxiv?"
2. A signed Nostr event, kind 38000 (or kind 1 with tags), is sent to the network via primarily our relay at wss://magency.nostr1.com - kind [TBD] specific for MAGENCY SPELL
3. Magency service (NodeJS) is listening for those events and here's what the fuck it does:
- When the Magency Spell event is received, it passes it to the agent

# IGE implementation - kinda

1. User Prompt: The user enters a prompt on the "Cast spells" tab of the Magency app, such as "What can you learn from the newest papers on arxiv?"
2. Web Scraping: Use Playwright to scrape relevant websites, such as arxiv.org, to fetch the latest papers and extract their content.
3. State Initialization: Process the scraped content and initialize the initial state for the IGE algorithm.
4. Select State from Archive: Query the foundation model to select the most promising state from the archive of discovered states.
5. Explore from State: Based on the selected state, leverage the foundation model's intelligence to choose the next action to explore from that state.
6. Update Archive: After taking the action, update the archive with any interesting new states discovered.
7. Repeat: Repeat steps 4-6 for a specified number of iterations or until a desired outcome is achieved.
8. Visualization: Present the results to the user in a user-friendly format, such as a summary of key findings or insights from the explored websites.

## IGE Prompts
```
You are an agent [...]
```

```
You will be prompted to perform systematic exploration in the style of Go-Explore.
An archive will be maintained of interesting states found.
You will be prompted to first reason about your plan and then:
- Select a state from the archive that is the most promising, i.e., likely to lead to a solution or more novel states.
- Explore from states intelligently, by picking new actions.
- For each new state, you will be asked to decide if the state is interestingly new and should be added to the archive.
```

![school](https://github.com/AtlantisPleb/magency/assets/14167547/e2193a2f-e5e1-43b4-b6cf-67e1d335d524)

## IGE Nostr events

Given the context of Magency and its use of AI agents and the IGE algorithm, we can propose a set of event kinds that capture the key moments in the lifecycle of an agent's activities, including casting spells, archiving states, and providing results. Here's how we can structure the events:

#### Revised Event Kinds and Structures for Magency

_heavily wip_

1. **Magency Spell Cast Event**
   - **Kind:** `38000`
   - **Description:** Event to signify the casting of a spell in Magency. Functionally similar to kind 1.
   - **Content:** User's input prompt (as a string).

2. **Magency State Archive Event**
   - **Kind:** `38001`
   - **Description:** Event to archive states discovered by the agent during exploration.
   - **Tags:**
     ```json
     [
       ["state_description", "string"], // Description of the state
       ["state_data", "json"] // Data of the state in JSON format
     ]
     ```
   - **Content:** Can be additional details or metadata about the state.

3. **Magency Exploration Step Event**
   - **Kind:** `38002`
   - **Description:** Event detailing each exploration step taken by the agent.
   - **Tags:**
     ```json
     [
       ["current_state", "string"], // Current state description
       ["action_taken", "string"], // Action taken from the current state
       ["next_state", "string"], // Description of the next state
       ["confidence_score", "number"] // Confidence score of the next state being promising
     ]
     ```
   - **Content:** Can be a brief description or additional context about the exploration step.

4. **Magency Result Event**
   - **Kind:** `38003`
   - **Description:** Event to provide final results or insights achieved by the agent after exploration.
   - **Tags:**
     ```json
     [
       ["prompt", "string"], // User's initial prompt
       ["result_summary", "string"], // Summary of the key findings or insights
       ["result_data", "json"] // Detailed results in JSON format
     ]
     ```
   - **Content:** Can be additional metadata or context about the result.

### Adding the New Event Kinds to the Registry

```markdown
| kind          | description                          | NIP            |
| ------------- | ------------------------------------ | -------------- |
| `38000`       | Magency Spell Cast                   | Proposed NIP   |
| `38001`       | Magency State Archive                | Proposed NIP   |
| `38002`       | Magency Exploration Step             | Proposed NIP   |
| `38003`       | Magency Result                       | Proposed NIP   |

### Standardized Tags for Magency:

| name              | value                                | other parameters                | NIP            |
| ----------------- | ------------------------------------ | ------------------------------- | -------------- |
| `prompt`          | user's input prompt                  | --                              | Proposed NIP   |
| `user_pubkey`     | public key of the user               | --                              | Proposed NIP   |
| `state_description`| description of the state            | --                              | Proposed NIP   |
| `state_data`      | data of the state in JSON            | --                              | Proposed NIP   |
| `agent_pubkey`    | public key of the agent              | --                              | Proposed NIP   |
| `initial_action`  | initial action taken by the agent    | --                              | Proposed NIP   |
| `action_taken`    | action taken from the current state  | --                              | Proposed NIP   |
| `next_state`      | description of the next state        | --                              | Proposed NIP   |
| `confidence_score`| confidence score of the next state   | --                              | Proposed NIP   |
| `result_summary`  | summary of key findings              | --                              | Proposed NIP   |
| `result_data`     | detailed results in JSON             | --                              | Proposed NIP   |
| `timestamp`       | unix timestamp of the event          | --                              | Proposed NIP   |

This proposal ensures that the new events for Magency are well-defined and can be seamlessly integrated into the existing Nostr ecosystem, enabling the efficient tracking and management of agent activities and results.
