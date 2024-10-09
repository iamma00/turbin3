import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import wallet from "./Turbin3-wallet.json";

// Recreate keypair from secret key
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Create a connection to the Solana devnet
const connection = new Connection("https://api.devnet.solana.com");

(async () => {
  try {
    // Request 2 SOL tokens from the devnet
    const txhash = await connection.requestAirdrop(
      keypair.publicKey,
      2 * LAMPORTS_PER_SOL
    );
    console.log(`Success! Check out your TX here:
    https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
//https://explorer.solana.com/tx/4sP5B5Qti6ERodpPD8PVwGCRi5JsigerYsbTviZXKg9GQKsNogjsk74PA5MW1XvZDntWNH5ua3g79BCMzJkofg61?cluster=devnet