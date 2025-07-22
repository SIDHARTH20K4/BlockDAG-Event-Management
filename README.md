# 🎟️ EventChain - NFT Ticketing & Event Management Contracts

This project contains two smart contracts designed for a decentralized ticketing and event platform:

1. **EventChainContract.sol** – ERC721-based NFT ticket contract. address: 0xb0f4bed87ae43e94c5b01caad3dfdcfc82c91838 - eventManager
2. **EventManagerContract.sol** – Manages events, event owners, and mints tickets via the EventChain contract.      0x50192c5118F4AEE70F4b81FC427E589197644890 - eventContract

---

## 🔗 Contract Architecture

### 🧾 EventChainContract

This is an ERC721 NFT contract used to mint, burn, and manage tickets as NFTs.

#### Features:
- ✅ ERC721 token standard
- ✅ `mintTicket` function (only callable by EventManagerContract)
- ✅ `burnTicket` function (can be called by owner or approved)
- ✅ `pause` and `unpause` functionality via OpenZeppelin's `Pausable`
- ✅ Ownership control via OpenZeppelin's `Ownable`

#### Key Functions:
- `mintTicket(address to, uint256 tokenId)` – Mint a new ticket
- `burn(uint256 tokenId)` – Burn an existing ticket
- `pause()` / `unpause()` – Toggle contract active state

---

### 🧠 EventManagerContract

Handles event creation and ticket distribution logic, acting as the main controller of the system.

#### Features:
- ✅ Register new events with metadata
- ✅ Register event creators/organizers
- ✅ Mint NFT tickets for events
- ✅ Role-restricted actions (`onlyOwner`)

#### Key Functions:
- `registerEventOwner(address owner)` – Grant rights to manage events
- `createEvent(...)` – Add a new event to the system
- `mintTicket(uint256 eventId, address recipient)` – Mint ticket for a user
- `getEvent(uint256 eventId)` – Retrieve full event data

---

## 🔒 Access Control

| Action             | Who Can Perform         |
|--------------------|-------------------------|
| Mint Ticket        | EventManagerContract    |
| Burn Ticket        | Ticket Owner / Approved |
| Register Event     | EventManager Owner      |
| Pause / Unpause    | EventChain Owner        |

---

## 🚀 How to Deploy

1. **Deploy EventChainContract**
   - Constructor takes the EventManager's address (or leave empty initially).
   - Example:
     ```solidity
     new EventChainContract()
     ```

2. **Deploy EventManagerContract**
   - Pass EventChain contract address as a constructor parameter.
   - Example:
     ```solidity
     new EventManagerContract(address eventChain)
     ```

3. **Link Contracts**
   - Set EventManager as the authorized minter on EventChain (optional depending on your design).

---

## 🔧 Development

### Requirements

- Node.js
- Hardhat or Foundry
- Solidity ^0.8.20
- OpenZeppelin Contracts

### Install Dependencies

```bash
npm install @openzeppelin/contracts
