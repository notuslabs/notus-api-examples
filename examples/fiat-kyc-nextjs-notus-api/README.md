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

## 🔧 Technical Implementation

### API Configuration

All Notus API calls follow a consistent pattern with proper error handling:

```typescript
export async function createKYCSession(data: KYCSessionData) {
  const response = await fetch(
    "https://api.notus.team/api/v1/kyc/individual-verification-sessions/standard",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NOTUS_API_KEY,
      },
      body: JSON.stringify({
        ...data,
        livenessRequired: false,
      }),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}
```

## 🔄 Integration Guide

### Step 1: KYC Verification Implementation

#### 1.1 Create KYC Session

```typescript
const kycData = {
  firstName: "John",
  lastName: "Doe", 
  birthDate: "1990-01-01",
  documentId: "123456789",
  documentCategory: "IDENTITY_CARD",
  documentCountry: "US"
};

const session = await createKYCSession(kycData);

// Response includes:
// - session.id: Session identifier
// - frontDocumentUpload: Pre-signed URL for front document
// - backDocumentUpload: Pre-signed URL for back document (if needed)
```

#### 1.2 Document Upload Process

The API returns pre-signed S3 URLs for secure document uploads:

```typescript
interface DocumentUpload {
  url: string;
  fields: {
    bucket: string;
    "X-Amz-Algorithm": string;
    "X-Amz-Credential": string;
    "X-Amz-Date": string;
    key: string;
    Policy: string;
    "X-Amz-Signature": string;
  };
}

// Upload documents using the pre-signed URLs
async function uploadDocument(file: File, uploadData: DocumentUpload) {
  const formData = new FormData();
  
  // Add all required fields
  Object.entries(uploadData.fields).forEach(([key, value]) => {
    formData.append(key, value);
  });
  
  // Add the file last
  formData.append("file", file);
  
  return fetch(uploadData.url, {
    method: "POST",
    body: formData,
  });
}
```

#### 1.3 Check Verification Status

```typescript
async function checkKYCStatus(sessionId: string) {
  const response = await fetch(
    `https://api.notus.team/api/v1/kyc/individual-verification-sessions/${sessionId}/result`,
    {
      headers: {
        "x-api-key": process.env.NOTUS_API_KEY,
      },
    }
  );
  
  const result = await response.json();
  
  // Status can be: VERIFYING, COMPLETED, FAILED
  return result.session.status;
}
```

### Step 2: Smart Wallet Integration

#### 2.1 Get Smart Wallet Address

```typescript
async function getSmartWallet(externallyOwnedAccount: string, factory: string) {
  const response = await fetch(
    `https://api.notus.team/api/v1/wallets/address?externallyOwnedAccount=${externallyOwnedAccount}&factory=${factory}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NOTUS_API_KEY,
      },
    },
  );

  const data = await response.json();
  
  return {
    smartWalletAddress: data.wallet.accountAbstraction,
    externallyOwnedAccount: data.wallet.externallyOwnedAccount
  };
}
```

#### 2.2 Register Smart Wallet

```typescript
async function registerSmartWallet(walletData: {
  externallyOwnedAccount: string;
  factory: string;
  salt: string;
}) {
  const response = await fetch("https://api.notus.team/api/v1/wallets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NOTUS_API_KEY,
    },
    body: JSON.stringify(walletData),
  });

  return response.json();
}
```

### Step 3: Fiat Operations

#### 3.1 Fiat Onramp (Deposit)

**Get Quote:**
```typescript
async function getFiatDepositQuote(quoteData: {
  fiatCurrency: "BRL";
  amountInFiatCurrency: number;
  cryptoCurrency: "USDC" | "BRZ";
}) {
  const response = await fetch("https://api.notus.team/api/v1/fiat/deposit/quote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NOTUS_API_KEY,
    },
    body: JSON.stringify(quoteData),
  });

  const quote = await response.json();
  
  // Returns: quoteId, exchangeRate, networkFee, estimatedArrival
  return quote;
}
```

**Execute Deposit:**
```typescript
async function executeFiatDeposit(depositData: {
  quoteId: string;
  walletAddress: string;
  chainId: number;
  taxId: string;
}) {
  const response = await fetch("https://api.notus.team/api/v1/fiat/deposit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NOTUS_API_KEY,
    },
    body: JSON.stringify(depositData),
  });

  const result = await response.json();
  
  // Returns PIX QR code for payment
  return {
    qrCode: result.depositOrder.base64QrCode,
    expiresAt: result.depositOrder.expiresAt
  };
}
```

#### 3.2 Fiat Offramp (Withdrawal)

**Get Quote:**
```typescript
async function getFiatWithdrawQuote(quoteData: {
  chainId: number;
  fiatCurrencyOut: "BRL";
  amountInCryptoCurrency: string;
  cryptoCurrencyIn: "BRZ" | "USDC";
}) {
  const response = await fetch("https://api.notus.team/api/v1/fiat/withdraw/quote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NOTUS_API_KEY,
    },
    body: JSON.stringify(quoteData),
  });

  return response.json();
}
```

**Execute Withdrawal:**
```typescript
async function executeFiatWithdraw(withdrawData: {
  quoteId: string;
  taxId: string; // Brazilian CPF
  pixKey: string; // PIX key for receiving funds
  walletAddress: string;
  chainId: number;
}) {
  const response = await fetch("https://api.notus.team/api/v1/fiat/withdraw", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NOTUS_API_KEY,
    },
    body: JSON.stringify(withdrawData),
  });

  return response.json();
}
```

### Step 4: User Operation Execution

For smart wallet transactions, execute user operations:

```typescript
async function executeUserOperation(operationData: {
  quoteId: string;
  signature: string; // User's signature for the transaction
}) {
  const response = await fetch("https://api.notus.team/api/v1/user-operations/execute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NOTUS_API_KEY,
    },
    body: JSON.stringify(operationData),
  });

  return response.json();
}
```

## 📡 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/kyc/individual-verification-sessions/standard` | POST | Create KYC session |
| `/api/v1/kyc/individual-verification-sessions/{id}/result` | GET | Get KYC result |
| `/api/v1/wallets/address` | GET | Get smart wallet address |
| `/api/v1/wallets` | POST | Register smart wallet |
| `/api/v1/fiat/deposit/quote` | POST | Get deposit quote |
| `/api/v1/fiat/deposit` | POST | Execute deposit |
| `/api/v1/fiat/withdraw/quote` | POST | Get withdrawal quote |
| `/api/v1/fiat/withdraw` | POST | Execute withdrawal |
| `/api/v1/user-operations/execute` | POST | Execute user operation |

## 🔐 Authentication

All API calls require the `x-api-key` header:

```typescript
headers: {
  "Content-Type": "application/json",
  "x-api-key": process.env.NOTUS_API_KEY,
}
```

## 🌍 Supported Features

- **Currencies**: BRL (Brazilian Real), USDC, BRZ
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
