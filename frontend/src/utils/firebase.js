import firebaseConfig from "../config/firebase.config";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

//export functions 
export const googleSignIn = async () => {
    return await signInWithPopup(auth, googleProvider)
}
export const googleSignOut = async () => {
    return await signOut(auth)
}
export const subscribeToAuthState = (callback) => {
    return onAuthStateChanged(auth, callback);
}



