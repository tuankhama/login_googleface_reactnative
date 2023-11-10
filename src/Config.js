import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export const Config = async () => {
    try {
        GoogleSignin.configure({
            offlineAccess: false,
            webClientId: '45155292444-g9ugi3mbsk6qhd9e9s1falr6pku6j3ck.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
            prompt: 'select_account',

        });
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        const { idToken } = await GoogleSignin.signIn();
        const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
        auth().signInWithCredential(googleCredentials);
        console.log(userInfo);
        return userInfo;
    } catch (error) {
        console.log('=> Google Sign In', error);
        return null;
    }
};
export const Logout = async () => {
    try {
        await auth().signOut();
        await GoogleSignin.revokeAccess();
        console.log('Đăng xuất thành công');
    } catch (error) {
        console.error('Lỗi đăng xuất:', error);
    }
};

