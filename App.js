import React, {useState} from 'react';
import {Button, Linking, Platform, Text, View} from 'react-native';
import {
    signIn,signOut,getInfoFunc

} from "./near-connect-native";

export default function App() {



    return (
        <View>

            <Button
                onPress={()=>{
                    Linking.openURL( signIn().then(console.log))
                }}
                title="SignIn"/>

            <Button
                onPress={signOut}
                title="SignOut"/>
            <Button
                onPress={()=>{
                    getInfoFunc().then(console.log)
                }}
                title="getInfo"/>
        </View>
    )
}

