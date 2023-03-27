import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_STORAGE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID
};

console.log(process.env.FIREBASE_APIKEY);

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
