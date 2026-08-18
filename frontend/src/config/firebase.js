// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgyZMc_Tc011_so_YbEYgn8Cfg00WHtC0",
  authDomain: "multiagentai-e8c08.firebaseapp.com",
  projectId: "multiagentai-e8c08",
  storageBucket: "multiagentai-e8c08.firebasestorage.app",
  messagingSenderId: "19364238049",
  appId: "1:19364238049:web:19bfc6ad9380851a6c5da0",
  measurementId: "G-7RF0QT4K13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
