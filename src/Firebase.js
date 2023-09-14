import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCkFFht2YBiJubPBwZ7OHffZLcNVx70-f0",
    authDomain: "excellent-electricals.firebaseapp.com",
    projectId: "excellent-electricals",
    storageBucket: "excellent-electricals.appspot.com",
    messagingSenderId: "417403397923",
    appId: "1:417403397923:web:edeed35ec2f62f0f640e96"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };