import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";


import {
  getFirestore
} from "firebase/firestore";



const firebaseConfig = {

  apiKey: "AIzaSyCMv7tYk9Vt3wTQCZ6-ZR1oG3UnF3mUw2g",

  authDomain: "drivesafe-e5a00.firebaseapp.com",

  projectId: "drivesafe-e5a00",

  storageBucket: "drivesafe-e5a00.firebasestorage.app",

  messagingSenderId: "18800517152",

  appId: "1:18800517152:web:f2cacf24eed64b77be9c45"

};



const app = initializeApp(firebaseConfig);



export const auth = getAuth(app);


export const db = getFirestore(app);



export const googleProvider =
new GoogleAuthProvider();