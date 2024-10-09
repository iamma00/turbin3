import { Connection, Keypair, PublicKey } from "@solana/web3.js"
import { Program, Wallet, AnchorProvider, Idl } from "@coral-xyz/anchor"
import { IDL } from "./programs/Turbin3_prereq";
import { wallet }  from "./Turbin3-wallet.json"
import bs58 from "bs58";

const keypair = Keypair.fromSecretKey(new Uint8Array(bs58.decode(wallet)));

const connection = new Connection("https://api.devnet.solana.com");

const github = Buffer.from("SAMAD101", "utf-8");

const provider = new AnchorProvider(connection, new Wallet(keypair), {commitment: "confirmed"});

const program : Program = new Program(IDL as Idl, provider);

const enrollment_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(enrollment_seeds, program.programId);

(async () => {
    try {
        const txhash = await program.methods.complete(github).accounts({
            signer: keypair.publicKey,
        }).signers([
            keypair
        ]).rpc();
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
//https://explorer.solana.com/tx/4p5QFhtVa7cknfiKs9ZKyDa2V2L4YSPPyCKvz4y21eHXREiTXFLGyJG6uhMi39ZSv2fccrqbcBEVP8RgrNwr2cnw?cluster=devnet