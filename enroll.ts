import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor";
import { IDL, Turbin3Prereq } from "./programs/Turbin3_prereq"; // Replace with actual path to IDL
import wallet from "./Turbin3-wallet.json"; // Your wallet file containing the private key

// Import your keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Create a connection to the Solana devnet
const connection = new Connection("https://api.devnet.solana.com");

// Your GitHub account name as a utf8 buffer
const github = Buffer.from("iamma00", "utf8");

// Create an Anchor provider
const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment: "confirmed",
});

// Create an Anchor program object using the IDL and provider
const program = new Program<Turbin3Prereq>(IDL, provider);

// Create a PDA for the enrollment account
const enrollmentSeeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];
const [enrollmentKey, _bump] = PublicKey.findProgramAddressSync(
  enrollmentSeeds,
  program.programId
);

// Execute our enrollment transaction
(async () => {
  try {
    const txhash = await program.methods
      .complete(github)
      .accounts({
        signer: keypair.publicKey,
        prereq: enrollmentKey,          // Include the PDA account here
        systemProgram: PublicKey.default, // Ensure the system program is included
      })
      .signers([keypair])
      .rpc();
    console.log(`Success! Check out your TX here:
    https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
