import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { config } from '../config';

async function checkBalance() {
  console.log('💰 MAGS - Balance Checker');
  console.log('========================');
  
  const connection = new Connection(config.solanaRpcUrl, 'confirmed');
  
  if (!process.env.WALLET_PRIVATE_KEY) {
    console.log('❌ WALLET_PRIVATE_KEY not set in .env file');
    return;
  }
  
  try {
    const bs58 = require('bs58');
    const { Keypair } = require('@solana/web3.js');
    
    const secretKey = bs58.decode(process.env.WALLET_PRIVATE_KEY);
    const keypair = Keypair.fromSecretKey(secretKey);
    
    const balance = await connection.getBalance(keypair.publicKey);
    
    console.log(`Network: ${config.network}`);
    console.log(`Address: ${keypair.publicKey.toBase58()}`);
    console.log(`Balance: ${(balance / LAMPORTS_PER_SOL).toFixed(4)} SOL`);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }
}

checkBalance();
