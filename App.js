import React, {useEffect, useState} from 'react';
import {Button, Platform, Text, View} from 'react-native';
import * as nearAPI from "near-api-js";

export default function App() {
    const [balance, setBalance] = useState()
    const {connect, keyStores, WalletConnection} = nearAPI;
    let keyStore, config

    useEffect(()=>{
        if (Platform === 'Android'){

        }else if (Platform === 'IOS'){

        }else {
            (async function () {
                window.near = await nearAPI.connect(config);
                console.log('window.near',window.near);
            })(window);
        }
    },[])
    if (Platform === 'Android'){

    }else if (Platform === 'IOS'){

    }else {
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
        let near
        if (Platform ==='Android') {
            console.log('hello Android')
        }else if (Platform === 'IOS'){
            console.log('hello IOS')

        }else {
            near = connect(config);
            const wallet = new WalletConnection(await near, 'testnet');
            await wallet.requestSignIn(
                "vadymtest.testnet", // contract requesting access
                "http://localhost:19006", // optional
                "http://localhost:19006/" // optional
            )
        }

    };
    const signOut = async () => {
        const near = connect(config);
        const wallet = new WalletConnection(await near, 'testnet');
        setBalance(null)
        wallet.signOut();
    };
    const getInfo = async () => {
        const near = connect(config);
        const wallet = new WalletConnection(await near, 'testnet');
        if (wallet.isSignedIn()) {
            const walletAccountId = await wallet.getAccountId();
            const walletAccountObj = await wallet.account();
            const account = await (await near).account(walletAccountId);
            await account.getAccountBalance().then((a) => {
                setBalance(a)
            })
            console.log('walletAccountId', walletAccountId);
            console.log('walletAccountObj', walletAccountObj);
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
        </View>
    )
}

