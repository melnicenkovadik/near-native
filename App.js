import React, {useState} from 'react';
import {Button, Platform, Text, View} from 'react-native';
import * as nearAPI from "near-api-js";

export default function App() {
    const [balance, setBalance] = useState()
    const [accountId, setAccountId] = useState()
    const {connect, keyStores, WalletConnection} = nearAPI;
    let keyStore, config

    if (Platform === 'Android') {
        config = {
            networkId: "testnet",
            nodeUrl: "https://rpc.testnet.near.org",
            walletUrl: "https://wallet.testnet.near.org",
            helperUrl: "https://helper.testnet.near.org",
            explorerUrl: "https://explorer.testnet.near.org",
        };
        console.log('android');

    } else if (Platform === 'IOS') {
        console.log('ios');
    } else if (window !== undefined) {
        console.log('web');

        keyStore = new keyStores.BrowserLocalStorageKeyStore();
        config = {
            networkId: "testnet",
            keyStore, // optional if not signing transactions
            nodeUrl: "https://rpc.testnet.near.org",
            walletUrl: "https://wallet.testnet.near.org",
            helperUrl: "https://helper.testnet.near.org",
            explorerUrl: "https://explorer.testnet.near.org",
        };
    }


    const signIn = async () => {
        const near = connect(config);
        const wallet = new WalletConnection(await near, 'testnet');
        await wallet.requestSignIn(
            "vadymtest.testnet", // contract requesting access
            "http://localhost:19006", // optional
            "http://localhost:19006/" // optional
        )
    };
    const signOut = async () => {
        const near = connect(config);
        const wallet = new WalletConnection(await near, 'testnet');
        setBalance(null)
        setAccountId(null)
        wallet.signOut();
    };
    const getInfo = async () => {
        const near = connect(config);
        const wallet = new WalletConnection(await near, 'testnet');
        if (wallet.isSignedIn()) {
            const walletAccountId = await wallet.getAccountId();
            setAccountId(walletAccountId)
            const account = await (await near).account(walletAccountId);
            await account.getAccountBalance().then((a) => {
                setBalance(a)
            })
            console.log('walletAccountId', walletAccountId);
        }
    };


    return (
        <View>

            <Button
                onPress={signIn}
                title="SignIn"/>

            <Button
                onPress={signOut}
                title="SignOut"/>
            <Button
                onPress={getInfo}
                title="getInfo"/>
            {
                balance
                    ? <Text>balance : {balance.total} yahoo</Text>
                    : null
            }
            {
                accountId
                    ? <Text>AccountId : {accountId} </Text>
                    : null
            }
        </View>
    )
}

