import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { Config, Logout } from './Config'

export default function AuthenticationScreen() {

    const [user, setuser] = useState("");
    async function signInWithGoogle() {
        const user = Config().then(data => {
            console.log('user data=>', data);
            setuser(data);
        });
    }

    const logout = async () => {
        Logout().then((data) => {
            console.log('dang xuat ', data);
        })
        setuser("")
    }


    async function onFacebookButtonPress() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccessToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
    }
    async function _signInWithFaceBook() {
        let cred = await onFacebookButtonPress();
        setuser(cred.additionalUserInfo.profile.name)
        console.log('cred=>', cred);
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => signInWithGoogle()}>
                <Text
                    style={{
                        color: 'white',
                        backgroundColor: 'green',
                        padding: 8,
                        marginTop: 10,
                    }}>
                    SignIn With Google
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => _signInWithFaceBook()}>
                <Text
                    style={{
                        color: 'white',
                        backgroundColor: 'blue',
                        padding: 8,
                    }}>
                    SignIn With FaceBook
                </Text>
            </TouchableOpacity>

            {
                user ? <View>
                    <Text style={{
                        color: 'black',
                        fontSize: 20,

                    }}>{
                            user.user?.familyName ||
                            user
                        }</Text>
                    <Button onPress={() => logout()} title='Dang xuat'></Button>
                </View > : <Text>No</Text>
            }
        </View>
    );
}