import firebaseConfig from "../config/firebase.config";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

//export functions 
export const googleSignIn = async () => {
    await signInWithPopup(auth, googleProvider)
}
export const googleSignOut = async () => {
    await signOut(auth)
}
export const onAuthStateChanged = async () => {
    await onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in.
            console.log(user)
        } else {
            // No user is signed in.
            console.log("No user is signed in")
        }
    })
}
export const isUserLoggedIn = async () => {
    await onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in.
            console.log(user)
        } else {
            // No user is signed in.
            console.log("No user is signed in")
        }
    })
}



