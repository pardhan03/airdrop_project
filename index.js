const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require('@solana/web3.js')

// wallet object
const wallet = new Keypair();

const publicKey = new  PublicKey(wallet._keypair.publicKey);
const secretKey = wallet._keypair.secretKey;

// console.log(publicKey, secretKey, 'Keypair');

const getWalletBalance = async () =>{
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const walletBalance = await connection.getBalance(publicKey);
        console.log(`Wallet Balance is ${walletBalance}`);
    } catch (error) {
        console.log(error);
    }
}

const airDropSol = async () => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const fromAirDropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL);
        const latestBlockHash = await connection.getLatestBlockhash();
        await connection.confirmTransaction({
            signature: fromAirDropSignature,
            ...latestBlockHash,
        });
        console.log("✅ Airdrop confirmed!");
    } catch (error) {
        console.log(error);
    }
}

const main = async () =>{
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

main();