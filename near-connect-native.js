const nearAPI = require("near-api-js");
const {WalletConnection} = require("near-api-js");


// creates keyStore from a private key string
// you can define your key here or use an environment variable

const {connect,keyStores} = nearAPI;

const config = {
    networkId: "testnet",
    keyStores,
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
};

const signIn =async () => {
    const near = await connect(config);

// create wallet connection
    const wallet = new WalletConnection(near,'dasdas');

    wallet.requestSignIn(
        "vadymtest.testnet", // contract requesting access
        "Example App", // optional
        "http://localhost:19006/", // optional
        "http://localhost:19006/" // optional
    );
};
const signOut =async () => {
    const near = await connect(config);
    const wallet = new WalletConnection(near,'dasdas');
    wallet.signOut();
};
const getInfoFunc = async () => {const near = await connect(config);
    const wallet = new WalletConnection(near,'dasdas');
    let balance, accountID;
    if (wallet.isSignedIn()) {
        const walletAccountId = await wallet.getAccountId();
        accountID = walletAccountId
        const account = await (await near).account(walletAccountId);
        await account.getAccountBalance().then((a) => {
            balance = a
        })
    }
    console.log(balance);
    console.log(accountID);
    return balance, accountID
}
module.exports ={
    signIn,signOut,getInfoFunc
}
