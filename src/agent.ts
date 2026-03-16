import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import { Config } from '../config';
import { WalletManager } from './wallet';
import { TransactionManager } from './transactions';

export class MAGSAgent {
  private connection: Connection;
  private walletManager: WalletManager;
  private transactionManager: TransactionManager;
  private config: Config;
  private isRunning: boolean = false;

  constructor(config: Config) {
    this.config = config;
    this.connection = new Connection(config.solanaRpcUrl, 'confirmed');
    this.walletManager = new WalletManager(config);
    this.transactionManager = new TransactionManager(this.connection);
  }

  async initialize(): Promise<void> {
    console.log('📡 Connecting to Solana network...');
    
    const cluster = this.config.network === 'mainnet-beta' ? 'mainnet' : this.config.network;
    console.log(`🌐 Network: ${cluster}`);
    
    const slot = await this.connection.getSlot();
    console.log(`📊 Current slot: ${slot}`);
    
    await this.walletManager.initialize();
    console.log(`💼 Wallet: ${this.walletManager.getPublicKey()?.toBase58()}`);
    
    const balance = await this.connection.getBalance(this.walletManager.getPublicKey()!);
    console.log(`💰 Balance: ${balance / 1e9} SOL`);
    
    console.log('✅ Agent initialized successfully');
  }

  async start(): Promise<void> {
    if (this.isRunning) {
      console.log('⚠️ Agent is already running');
      return;
    }

    this.isRunning = true;
    console.log('');
    console.log('🎯 MAGS Agent started');
    console.log('   - Monitoring blockchain...');
    console.log('   - Ready for transactions');
    console.log('');
    
    this.startMonitoring();
  }

  async stop(): Promise<void> {
    this.isRunning = false;
    console.log('🛑 Agent stopped');
  }

  private async startMonitoring(): Promise<void> {
    const monitorInterval = setInterval(async () => {
      if (!this.isRunning) {
        clearInterval(monitorInterval);
        return;
      }

      try {
        const slot = await this.connection.getSlot();
        const balance = await this.connection.getBalance(this.walletManager.getPublicKey()!);
        
        console.log(`[${new Date().toISOString()}] Slot: ${slot} | Balance: ${(balance / 1e9).toFixed(4)} SOL`);
      } catch (error) {
        console.error('Monitoring error:', error);
      }
    }, 30000);
  }

  getConnection(): Connection {
    return this.connection;
  }

  getWalletManager(): WalletManager {
    return this.walletManager;
  }

  getTransactionManager(): TransactionManager {
    return this.transactionManager;
  }

  getStatus(): { running: boolean; network: string; slot?: number; balance?: number } {
    return {
      running: this.isRunning,
      network: this.config.network,
    };
  }
}
