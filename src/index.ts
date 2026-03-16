import { MAGSAgent } from './agent';
import { config } from '../config';

async function main() {
  console.log('🚀 Make Agent Great Solana (MAGS)');
  console.log('==================================');
  console.log('');

  try {
    const agent = new MAGSAgent(config);
    
    await agent.initialize();
    await agent.start();
    
    console.log('✅ MAGS Agent is running...');
  } catch (error) {
    console.error('❌ Agent failed to start:', error);
    process.exit(1);
  }
}

main();
