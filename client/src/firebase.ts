import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

declare const process : {
    env: {
        REACT_APP_API_KEY: string; 
        REACT_APP_AUTH_DOMAIN: string; 
        REACT_APP_DATABASE_URL: string; 
        REACT_APP_PROJECT_ID: string; 
        REACT_APP_STORAGE_BUCKET: string; 
        REACT_APP_MESSAGING_SENDER_ID: string; 
        REACT_APP_APP_ID: string; 
    }
  }

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };