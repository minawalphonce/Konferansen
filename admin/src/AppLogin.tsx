import { Login, LoginProps, LoginForm, } from "react-admin";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '#/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
    ],
};

const SignInScreen = () => <StyledFirebaseAuth
    firebaseAuth={getAuth()}
    uiConfig={uiConfig}
/>;

export const AppLogin = (props: LoginProps) => {
    return (
        <Login {...props}>
            <LoginForm {...props} />
            <SignInScreen />
        </Login>)
}