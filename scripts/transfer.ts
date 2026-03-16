import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';
import { config } from '../config';

async function transferSOL(to: string, amount: number) {
  console.log('💸 MAGS - SOL Transfer');
  console.log('=====================');
  
  const connection = new Connection(config.solanaRpcUrl, 'confirmed');
  
  if (!process.env.WALLET_PRIVATE_KEY) {
    console.log('❌ WALLET_PRIVATE_KEY not set in .env file');
    return;
  }
  
  try {
    const secretKey = bs58.decode(process.env.WALLET_PRIVATE_KEY);
    const fromKeypair = Keypair.fromSecretKey(secretKey);
    const toPublicKey = new PublicKey(to);
    
    console.log(`From: ${fromKeypair.publicKey.toBase58()}`);
    console.log(`To: ${toPublicKey.toBase58()}`);
    console.log(`Amount: ${amount} SOL`);
    
    const transaction = new (require('@solana/web3.js').Transaction)().add(
      require('@solana/web3.js').SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey: toPublicKey,
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );
    
    const signature = await connection.sendTransaction(transaction, [fromKeypair]);
    console.log(`Signature: ${signature}`);
    
    await connection.confirmTransaction(signature);
    console.log('✅ Transfer confirmed!');
    
    const balance = await connection.getBalance(fromKeypair.publicKey);
    console.log(`Remaining balance: ${(balance / LAMPORTS_PER_SOL).toFixed(4)} SOL`);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }
}

const toAddress = process.argv[2];
const amount = parseFloat(process.argv[3]) || 0;

if (!toAddress || !amount) {
  console.log('Usage: npm run transfer <TO_ADDRESS> <AMOUNT>');
  console.log('Example: npm run transfer ABC123...xyz 0.5');
} else {
  transferSOL(toAddress, amount);
}
