import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const firebaseConfigString = process.env.FIREBASE_ADMIN || '';
export const firebaseAdminConfig = JSON.parse(firebaseConfigString);
