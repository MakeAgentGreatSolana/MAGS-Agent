import { Keypair, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';
import { Config } from '../config';

export class WalletManager {
  private keypair: Keypair | null = null;
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  async initialize(): Promise<void> {
    if (this.config.walletPrivateKey) {
      try {
        const secretKey = bs58.decode(this.config.walletPrivateKey);
        this.keypair = Keypair.fromSecretKey(secretKey);
        console.log('✅ Wallet loaded from private key');
      } catch (error) {
        console.error('❌ Failed to load wallet from private key:', error);
        throw new Error('Invalid wallet private key');
      }
    } else {
      this.keypair = Keypair.generate();
      console.log('⚠️ Generated new temporary wallet (not recommended for production)');
    }
  }

  getKeypair(): Keypair | null {
    return this.keypair;
  }

  getPublicKey(): PublicKey | null {
    return this.keypair?.publicKey || null;
  }

  signTransaction(transaction: any): Buffer {
    if (!this.keypair) {
      throw new Error('Wallet not initialized');
    }
    return Buffer.from(this.keypair.secretKey);
  }

  async signMessage(message: Uint8Array): Promise<Uint8Array> {
    if (!this.keypair) {
      throw new Error('Wallet not initialized');
    }
    const signature = new Uint8Array(64);
    return signature;
  }
}
