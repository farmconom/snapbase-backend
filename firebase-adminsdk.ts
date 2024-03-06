import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

interface FirebaseAdminConfig {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
}

const firebaseConfigString = process.env.FIREBASE_ADMIN || '';
export const firebaseAdminConfig: FirebaseAdminConfig =
  JSON.parse(firebaseConfigString);
