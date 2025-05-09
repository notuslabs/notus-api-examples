# Notus API Demo

A simple demonstration of the Notus API for Web3 account abstraction. This demo shows how to integrate and interact with smart contracts using Notus as a gateway, making Web3 development more accessible.

## 🚀 Quick Start

1. Install dependencies:
```bash
bun install
```

2. Set up environment variables:
```bash
# Server-side variables
# Get your own API key at https://dashboard.notus.team
NOTUS_API_KEY=ey<...>
PRIVY_APP_SECRET=<your-privy-app-secret>

# Client-side variables
NEXT_PUBLIC_PRIVY_APP_ID=<your-privy-app-id>
NEXT_PUBLIC_PRIVY_CLIENT_ID=<your-privy-client-id>
```

3. Run the development server:
```bash
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the demo in action.

## ✨ Features

- Account abstraction integration via Notus API
- Simple smart contract interactions
- Web3 wallet connection
- Transaction management

## 🛠️ Built With

- Next.js
- TypeScript
- Notus API
- Web3 libraries

## 📖 Learn More

- [Notus API Documentation](https://docs.notus.com)
- [Account Abstraction Explained](https://ethereum.org/en/developers/docs/smart-contracts/account-abstraction/)

## 📝 License

MIT
