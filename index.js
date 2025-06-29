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

const main = async () =>{
    getWalletBalance();
}

main();