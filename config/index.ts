import dotenv from 'dotenv';
dotenv.config();

export interface Config {
  solanaRpcUrl: string;
  walletPrivateKey: string | undefined;
  network: string;
  agentName: string;
  jupiterApiUrl: string;
  heliusApiKey: string | undefined;
}

export const config: Config = {
  solanaRpcUrl: process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
  walletPrivateKey: process.env.WALLET_PRIVATE_KEY,
  network: process.env.NETWORK || 'mainnet-beta',
  agentName: process.env.AGENT_NAME || 'MAGS-Agent',
  jupiterApiUrl: process.env.JUPITER_API_URL || 'https://quote-api.jup.ag/v6',
  heliusApiKey: process.env.HELIUS_API_KEY,
};

export default config;
