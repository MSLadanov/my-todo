import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

declare var process : {
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
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };