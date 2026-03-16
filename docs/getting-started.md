# Getting Started with MAGS Agent

## Prerequisites

- Node.js v18 or higher
- npm or yarn
- A Solana wallet (Phantom, Solflare, etc.)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/MakeAgentGreatSolana/MAGS-Agent.git
cd MAGS-Agent
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
WALLET_PRIVATE_KEY=your_private_key_here
NETWORK=mainnet-beta
```

### 4. Generate a new wallet (optional)

If you don't have a Solana wallet:

```bash
npm run generate-wallet
```

⚠️ **Save your private key securely!**

### 5. Fund your wallet

Send some SOL to your wallet address for transaction fees.

### 6. Check balance

```bash
npm run check-balance
```

## Usage

### Run the agent

```bash
npm run dev      # Development mode
npm run build    # Build for production
npm start        # Run production build
```

### Available commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Run agent in development mode |
| `npm start` | Run production build |
| `npm run build` | Compile TypeScript |
| `npm run check-balance` | Check wallet balance |
| `npm run transfer` | Transfer SOL to another address |
| `npm run generate-wallet` | Generate new wallet |

## Network Configuration

### Mainnet (Production)
```env
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NETWORK=mainnet-beta
```

### Devnet (Testing)
```env
SOLANA_RPC_URL=https://api.devnet.solana.com
NETWORK=devnet
```

## Next Steps

- [Architecture Overview](./architecture.md)
- [API Reference](./api.md)
- [Contributing Guide](./contributing.md)
