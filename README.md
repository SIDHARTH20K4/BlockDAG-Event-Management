# EventChain - Decentralized Event Management DApp

## Overview

**EventChain** is a decentralized event management system leveraging Ethereum-compatible blockchain smart contracts. It enables event organizers to create events, mint NFT-based tickets with ownership histories, and transfer event ownership securely and transparently.

The system consists of:

- `EventManager.sol`: Core contract managing event lifecycle and linking to the NFT ticket contract.
- `EventContract.sol`: NFT ticket contract implementing ERC721 with rich ticket metadata, usage validation, resale restrictions, and ownership history tracking.
- Interface contracts (`IEventManager.sol`, `IEventContract.sol`) to enforce clear modular boundaries.

Additional backend and frontend components enable decentralized metadata storage via IPFS and user-friendly interaction through React-based UI.

## Table of Contents

- [Features](#features)  
- [Smart Contracts](#smart-contracts)  
- [Backend: IPFS Metadata Generation](#backend-ipfs-metadata-generation)  
- [Frontend: React Application](#frontend-react-application)  
- [Getting Started](#getting-started)  
- [Deployment](#deployment)  
- [Usage](#usage)  
- [Contributing](#contributing)  
- [License](#license)  

## Features

- Event creation with metadata: name, location, date, ticket price  
- NFT ticket minting with unique metadata URIs  
- Ticket usage validation with expiry support  
- Complete historical tracking of ticket ownership transfers  
- Ownership transfer of entire events  
- On-chain resale price restriction enforcement  
- Backend IPFS integration for decentralized storage of ticket/event metadata  
- React frontend for seamless event and ticket management  
- Secure access control using OpenZeppelin's Ownable pattern  

## Smart Contracts

### EventManager.sol

- Manages event creation and registry  
- Links with the NFT `EventContract` to mint tickets  
- Enforces organizer-only operations  
- Allows ownership transfer of events  

### EventContract.sol

- ERC721-based NFT tickets  
- Stores ticket metadata: event info, price, expiry, usage status  
- Tracks previous ticket owners for provenance  
- Disable token approvals to control transfers via contract  
- Ability to update metadata, set resale price caps, burn expired tickets  
- Events emitted for minting, transfers, validations, expirations  

### Interfaces

- `IEventManager.sol`: Function signatures and events for event management  
- `IEventContract.sol`: Interface for ticket minting, validation, metadata management  

For detailed contract documentation, refer to the NatSpec comments in the source code.

## Backend IPFS Metadata Generation

To support permanent, decentralized storage of event and ticket metadata, the backend service (e.g., Node.js with `ipfs-http-client`) performs the following:

- Accepts event/ticket info (name, location, date, images, description)  
- Generates JSON metadata complying with ERC721 metadata standards  
- Uploads JSON metadata to IPFS and retrieves content URIs (CID)  
- Provides these URIs for minting transactions to embed immutable ticket data on-chain  

### Typical Backend Flow:

npm install ipfs-http-client axios express


Example metadata JSON structure:

{
"name": "Concert VIP Ticket",
"description": "VIP admission ticket to the 2025 Summer Fest",
"image": "ipfs://<image_cid>",
"attributes": [
      {"trait_type": "Event Date", "value": "2025-08-15"},
      {"trait_type": "Location", "value": "NYC Arena"},
      {"trait_type": "Ticket Price", "value": "0.05 ETH"}
   ]
}


Upload the above JSON to IPFS and use the resulting URI in the `mintTicket` call.

## Frontend React Application

A modern, responsive React frontend provides the user interface for:

- Organizer event creation and management  
- Listing events and ticket details  
- Minting, transferring, and validating tickets  
- Connecting Ethereum wallets (MetaMask, RainbowKit, Wagmi suggested)  
- Displaying ticket ownership history and resale price info  
- Integration with IPFS gateway to retrieve ticket metadata images/details  

### Recommended libraries/tech stack:

- React.js + Next.js or Create React App  
- RainbowKit/Wagmi for wallet/connect integration  
- ethers.js or viem for blockchain interaction  
- IPFS HTTP client or Pinata APIs for metadata uploads  
- TailwindCSS / Chakra UI for UI components and styling  

### Example component ideas:

- Event List & Creation Form  
- Ticket Minting Modal with IPFS Upload integration  
- Ticket Validation Dashboard (only for owners)  
- Transfer Ownership UI  
- History & Resale Price panels  


## Usage

- Organizers create events through the frontend UI.  
- Metadata uploaded and pinned to IPFS by backend service.  
- Tickets minted as NFTs linking on-chain ownership to IPFS metadata URI.  
- Ticket owners validate usage within expiry date.  
- Ownership of events and tickets can be securely transferred.  
- All activity recorded immutably on-chain with emitted events for transparency.

## Contributing

Contributions, bug reports, and feature requests are welcome. Please:

- Fork the repository  
- Create your feature branch  
- Run tests and ensure code formatting  
- Submit a pull request with a clear description  

## License

This project is licensed under the MIT License.

## Contact & Resources

- Contract Address (EventManager): `0xE37e93Dadb4e72b89885A1fDC85ec1ae527e73eE`   
- Contract Address (EventContract): `0x7087374beB22f3021096542F0dF409062522db0b`   
- IPFS Gateway: https://ipfs.io/ipfs/  

---

**Happy building with EventChain — empowering decentralized events!**
