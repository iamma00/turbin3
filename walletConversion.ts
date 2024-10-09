import bs58 from 'bs58';
import * as prompt from 'prompt-sync';

const input = prompt();

// Convert base58 to Solana wallet format (byte array)
function base58ToWallet() {
  const base58Key = input('Enter your base58 encoded private key: ');
  const wallet = bs58.decode(base58Key);
  console.log('Your wallet in Solana byte array format:', wallet);
}

// Convert Solana wallet format (byte array) to base58
function walletToBase58() {
  const walletArrayStr = input('Enter your wallet as a byte array (comma-separated numbers): ');
  const walletArray = walletArrayStr.split(',').map(Number);
  const base58Key = bs58.encode(new Uint8Array(walletArray));
  console.log('Your wallet in base58 encoded format:', base58Key);
}

// Prompt user for operation
const choice = input('Choose operation: [1] base58 to wallet, [2] wallet to base58: ');

if (choice === '1') {
  base58ToWallet();
} else if (choice === '2') {
  walletToBase58();
} else {
  console.log('Invalid choice!');
}
