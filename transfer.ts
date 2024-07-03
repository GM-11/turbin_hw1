import { Connection, Keypair, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';

export async function transferSOL(sender: Keypair,  recipientAddress: string, amount: number): Promise<void> {
    const connection = new Connection('https://api.mainnet-beta.solana.com');

    // Create a new public key for the recipient address
    const recipientPublicKey = new PublicKey(recipientAddress);

    // Create a new transaction
    const transaction = new Transaction().add(
        // Add the transfer instruction
        SystemProgram.transfer({
            fromPubkey: sender.publicKey,
            toPubkey: recipientPublicKey,
            lamports: amount * 10 ** 9, // Convert SOL to lamports
        })
    );

    // Sign the transaction with the sender's private key
    transaction.feePayer = sender.publicKey;

    // Send and confirm the transaction
    await sendAndConfirmTransaction(connection, transaction, [sender]);
}

