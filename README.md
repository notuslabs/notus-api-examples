# Notus API Examples Monorepo

This monorepo contains examples and resources for integrating with the Notus API - a gateway for Web3 account abstraction that makes blockchain development more accessible.

## 📦 Repository Structure

- **packages/**: Shared libraries and components
  - **ui/**: Reusable UI components built with React, Tailwind CSS, and Radix UI
  - **typescript-config/**: Shared TypeScript configurations

- **examples/**: Example projects showcasing Notus API integration
  - **privy-nextjs-notus-api/**: A Next.js application demonstrating Notus API with Privy authentication

## 🚀 Getting Started

1. Install dependencies:
```bash
bun install
```

2. Run development server:
```bash
bun dev
```

## 👩‍💻 Development

This project uses [Turborepo](https://turbo.build/) for monorepo management and [Bun](https://bun.sh/) as the package manager.

```bash
# Build all packages and examples
bun run build

# Run type checking
bun run check-types

# Run linting
bun run lint
```

## 🔍 Example Projects

### Privy Next.js Notus API

A demonstration of integrating Notus API for Web3 account abstraction with Privy authentication in a Next.js application. The example shows:

- Account abstraction via Notus API
- Smart contract interactions
- Web3 wallet connection
- Transaction management

To run this example individually:
```bash
cd examples/privy-nextjs-notus-api
bun dev
```

## 🛠️ Technology Stack

- Next.js
- React 19
- TypeScript
- Tailwind CSS
- Privy (for authentication)
- Turborepo (for monorepo management)
- Bun (for package management)

## 📚 Resources

- [Notus API Documentation](https://docs.notus.com)
- [Account Abstraction Explained](https://ethereum.org/en/developers/docs/smart-contracts/account-abstraction/)

## 📝 License

MIT
