import { Transaction, SystemProgram, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";
import wallet from "./Turbin3-wallet.json";

// Recreate keypair from secret key
const from = Keypair.fromSecretKey(new Uint8Array(wallet));

// Replace this with your recipient's public key
const to = new PublicKey("FqaiW9B3EPtwXjqZbWjoESf3SfooJgRWtgodmn3Dg7Mv");

// Create a connection to the Solana devnet
const connection = new Connection("https://api.devnet.solana.com");

(async () => {
  try {
    // Create the transaction to transfer 0.1 SOL
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: LAMPORTS_PER_SOL / 10,
      })
    );
    
    // Get recent blockhash for the transaction
    transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
    transaction.feePayer = from.publicKey;

    // Sign and send the transaction
    const signature = await sendAndConfirmTransaction(connection, transaction, [from]);
    console.log(`Success! Check out your TX here:
    https://explorer.solana.com/tx/${signature}?cluster=devnet`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
//https://explorer.solana.com/tx/2j76dS7WTURqX4ajDiuW6iSy8BY2V9eQ2Sr9aSeWtSmhPa6yFtnPLqpJdgjLmyFYfVxo8q6iwim3fursx95biCXn?cluster=devnet