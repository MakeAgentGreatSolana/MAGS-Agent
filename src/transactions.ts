import { 
  Connection, 
  Transaction, 
  VersionedTransaction, 
  PublicKey, 
  Keypair,
  SendOptions,
  ConfirmOptions
} from '@solana/web3.js';

export class TransactionManager {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async sendTransaction(
    transaction: Transaction,
    signer: Keypair,
    options?: SendOptions
  ): Promise<string> {
    const signature = await this.connection.sendTransaction(transaction, [signer], options);
    return signature;
  }

  async sendVersionedTransaction(
    transaction: VersionedTransaction,
    options?: SendOptions
  ): Promise<string> {
    const signature = await this.connection.sendTransaction(transaction, options);
    return signature;
  }

  async confirmTransaction(
    signature: string,
    commitment: 'processed' | 'confirmed' | 'finalized' = 'confirmed'
  ): Promise<void> {
    const confirmation = await this.connection.confirmTransaction({ signature, commitment });
    if (confirmation.value.err) {
      throw new Error(`Transaction failed: ${confirmation.value.err}`);
    }
  }

  async getTransaction(signature: string): Promise<any> {
    const tx = await this.connection.getTransaction(signature, {
      commitment: 'confirmed',
      maxSupportedTransactionVersion: 0
    });
    return tx;
  }

  async getRecentBlockhash(): Promise<string> {
    const { blockhash } = await this.connection.getLatestBlockhash();
    return blockhash;
  }
}
