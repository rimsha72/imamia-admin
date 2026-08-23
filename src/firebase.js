// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfbI6kxhU7MMGBg5RkeEZA5_ffdr58yu0",
  authDomain: "imamia-kultur-zentrum.firebaseapp.com",
  projectId: "imamia-kultur-zentrum",
  storageBucket: "imamia-kultur-zentrum.firebasestorage.app",
  messagingSenderId: "405916328439",
  appId: "1:405916328439:web:58c41e379fcd90bc858ef2",
  measurementId: "G-7ENH4PYCPT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
export const auth = getAuth(app);