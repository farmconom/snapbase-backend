import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const firebaseConfigString = process.env.FIREBASE_CONFIG || '';
export const firebaseProjectConfig = JSON.parse(firebaseConfigString);
