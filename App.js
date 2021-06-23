import React, {useState} from 'react';
import {Button, Platform, Text, View} from 'react-native';
import * as nearAPI from "near-api-js";
import { NearProvider, nearlib, nearWeb3Extensions } from 'near-web3-provider';
const nearNetworkId = 'test'; // default is 'default'
const accountId = 'vadymtest.testnet';
const keyStore = new nearlib.keyStores.BrowserLocalStorageKeyStore();
export default function App() {
    const [balance, setBalance] = useState()
    const web = new Web3();
    web.extend(nearWeb3Extensions(web)) // extend web3 to include customized near methods
    web.setProvider(new NearProvider("<url to NEAR RPC>", keyStore, accountId, nearNetworkId));
    web.eth.net.isListening();
    return (
        <View>


        </View>
    )
}

