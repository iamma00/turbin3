import { Transaction, SystemProgram, Connection, Keypair, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";
import wallet from "./Turbin3-wallet.json";

// Recreate the keypair from the secret key
const from = Keypair.fromSecretKey(new Uint8Array(wallet));

// Replace with the destination public key (e.g., Turbin3 wallet)
const to = new PublicKey("FqaiW9B3EPtwXjqZbWjoESf3SfooJgRWtgodmn3Dg7Mv");

// Create a connection to the Solana devnet
const connection = new Connection("https://api.devnet.solana.com");

(async () => {
  try {
    // Get the current balance of the dev wallet
    const balance = await connection.getBalance(from.publicKey);
    console.log(`Current balance: ${balance} lamports`);

    // Create a mock transaction to calculate fees
    let transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: balance,
      })
    );

    // Get the recent blockhash for the transaction
    transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
    transaction.feePayer = from.publicKey;

    // Calculate the transaction fee
    const fee = (await connection.getFeeForMessage(transaction.compileMessage(), 'confirmed')).value || 0;

    // Remove the transfer instruction and replace it with a new one that subtracts the fee
    transaction.instructions.pop();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: balance - fee,  // Transfer all lamports minus the fee
      })
    );

    // Sign and send the transaction
    const signature = await sendAndConfirmTransaction(connection, transaction, [from]);
    console.log(`Success! Check out your TX here:
    https://explorer.solana.com/tx/${signature}?cluster=devnet`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
//https://explorer.solana.com/tx/2ipGw3SHsv2jYRTdu3het3oecUNgTW8vwJL6vgEJpDcmkknGGiozoyqr5yXjBGzfJdiBEWpgTC42VSfRJSZCGqoL?cluster=devnet
//Current balance: 1899995000 lamports