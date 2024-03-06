import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

const firebaseConfigString = process.env.FIREBASE_CONFIG || '';
export const firebaseProjectConfig: FirebaseConfig =
  JSON.parse(firebaseConfigString);
