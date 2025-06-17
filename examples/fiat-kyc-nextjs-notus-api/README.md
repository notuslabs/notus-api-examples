# Fiat KYC Notus API Demo

A comprehensive demonstration of the Notus API for fiat onramp and offramp operations with KYC verification. This demo showcases how to integrate identity verification, smart wallet account abstraction, and seamless fiat-to-crypto conversions using Notus as a gateway.

## 🏗️ Architecture Overview

This application demonstrates three core Notus API integrations:

1. **KYC Verification API** - Identity verification with document upload
2. **Smart Wallet API** - Account abstraction for seamless UX
3. **Fiat Operations API** - Onramp/offramp with Brazilian Real (BRL) support

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
```

3. Run the development server:
```bash
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the demo in action.

## 🔐 Authentication

All API calls require the `x-api-key` header:

```typescript
headers: {
  "Content-Type": "application/json",
  "x-api-key": process.env.NOTUS_API_KEY,
}
```

## 🔄 Flows

### KYC Flow

The KYC (Know Your Customer) verification process involves several steps to verify user identity:

1. **Create a standard KYC session** with the Notus API:
   - Submit user personal information (name, birth date, etc.)
   - Specify document type and country
   - Receive upload URLs for document images

2. **Upload the user's documents** using the provided presigned URLs:
```typescript
export async function uploadFile({
	file,
	url,
	fields,
}: {
	file: File;
	url: string;
	fields: Record<string, string>;
}) {
	const formData = new FormData();
	for (const [key, value] of Object.entries(fields)) {
		formData.append(key, value);
	}

	formData.append("file", file);

	const response = await fetch(url, {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		throw new Error(`Failed to upload file: ${response.statusText}`);
	}

	return response;
}
```

3. **Process the KYC session** by calling the `process` endpoint:
   - No authentication required for this step
   - Can be safely called on the client side
   - Triggers the verification process

4. **Poll the KYC session status** until verification is complete:
   - Status can be: `VERIFYING`, `COMPLETED`, or `FAILED`
   - Continue polling while status is `VERIFYING`
   - Handle completion or failure accordingly

### Deposit Flow (Onramp)

The fiat-to-crypto deposit process follows these steps:

1. **Request a deposit quote**:
   - Specify payment method (PIX for Brazil)
   - Set amount to send in fiat currency
   - Choose cryptocurrency to receive (USDC or BRZ)

2. **Create a deposit session** with the quote:
   - Provide wallet address to receive crypto
   - Include tax ID for compliance
   - Specify blockchain network (chainId)

3. **Complete the deposit**:
   - Receive PIX payment details (QR code and PIX key)
   - User makes PIX payment to provided details
   - Crypto is automatically sent to wallet upon payment confirmation

### Withdrawal Flow (Offramp)

The crypto-to-fiat withdrawal process involves smart wallet operations:

1. **Request a withdrawal quote**:
   - Specify amount to send in cryptocurrency
   - Choose payment method to receive fiat (PIX, bank transfer, etc.)
   - Set blockchain network details

2. **Smart wallet setup**:
   - Register or retrieve smart wallet for the user's EOA
   - Uses account abstraction for better UX
   - Factory address: `0xe77f2c7d79b2743d39ad73dc47a8e9c6416ad3f3`

3. **Create withdrawal order**:
   - Provide PIX key or bank details for receiving funds
   - Include tax ID for compliance
   - Generate userOp hash for signing

```typescript
// Using Viem's signMessage to sign the userOp hash
// signMessage returns a signature string that can be used to execute the userOp
const signature = await signMessage({
  account: walletAddress, // EOA wallet address, can be a provider such as MetaMask
  message: {
    raw: userOperationHash,
  }, 
}); 
```

4. **Sign and execute the transaction**:
   - User signs the userOp hash with their wallet
   - Execute the signed transaction via Notus API
   - Fiat funds are sent to specified payment method

## 🌍 Supported Features

- **Currencies**: BRL (Brazilian Real), BRZ (more coming soon™)
- **Countries**: Brazil, United States  
- **Documents**: Identity Card, Passport, Driver's License
- **Blockchains**: Ethereum Mainnet, Sepolia Testnet
- **Payment Methods**: PIX (Brazil)

## 📖 Learn More

- [Notus API Documentation](https://docs.notus.com)
- [Account Abstraction Explained](https://ethereum.org/en/developers/docs/smart-contracts/account-abstraction/)
- [KYC Compliance Guide](https://docs.notus.com/kyc)

## 📝 License

MIT
