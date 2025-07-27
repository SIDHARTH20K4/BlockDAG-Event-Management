# TicketMaster - Web3 Event Ticketing dApp

TicketMaster is a decentralized event ticketing application built on the BlockDAG blockchain. It allows organizers to create events and users to purchase tickets securely with on-chain transparency.

## 🌐 BlockDAG Deployment

- **Blockchain**: BlockDAG
- **EventContract**: `0x7087374beB22f3021096542F0dF409062522db0b`  
- **EventManager**: `0xE37e93Dadb4e72b89885A1fDC85ec1ae527e73eE`  
- **Deployed via**: [BlockDAG Testnet Explorer](https://testnet.blockdag.io/explorer)

## ⚙️ Project Workflow

1. **Connect Wallet**  
   Users connect their Web3 wallet using RainbowKit.

2. **Create Event (Organizer)**  
   Organizers fill a form including event name, location, date, price, and image.  
   - Image gets uploaded to IPFS (Pinata)  
   - Event metadata is stored on-chain by calling `createEvent` in the smart contract.

3. **List Events**  
   All events are fetched from the smart contract and displayed on the homepage.

4. **Buy Ticket**  
   Users can click an event and purchase a ticket (NFT or receipt-like data) using their connected wallet.

5. **Check Ownership**  
   Users can see their purchased events in a "My Tickets" section.


## 📄 License

This project is licensed under the **MIT License**.

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction.