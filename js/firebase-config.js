// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfOFDesMeKVT2fg0YUKvR7lgZ8eqw-07w",
    authDomain: "casa-vincular.firebaseapp.com",
    projectId: "casa-vincular",
    storageBucket: "casa-vincular.firebasestorage.app",
    messagingSenderId: "416020227800",
    appId: "1:416020227800:web:c0fe8176399c9f364699ad",
    measurementId: "G-RSHBLBCL28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);