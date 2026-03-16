import { Connection, Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

function generateWallet() {
  console.log('🔑 MAGS - Wallet Generator');
  console.log('========================');
  console.log('');
  
  const keypair = Keypair.generate();
  
  console.log('⚠️ SAVE THIS INFORMATION SECURELY ⚠️');
  console.log('');
  console.log(`Public Key: ${keypair.publicKey.toBase58()}`);
  console.log(`Private Key: ${bs58.encode(keypair.secretKey)}`);
  console.log('');
  console.log('📝 Add the Private Key to your .env file as WALLET_PRIVATE_KEY');
  console.log('');
  console.log('❗ NEVER share your private key with anyone!');
}

generateWallet();
