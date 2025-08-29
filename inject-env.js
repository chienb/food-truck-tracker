// This script will be processed by Vercel to inject environment variables
const fs = require('fs');

const envVars = {
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || '',
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN || '',
  FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL || '',
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || '',
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET || '',
  FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
  FIREBASE_APP_ID: process.env.FIREBASE_APP_ID || '',
  STAFF_USERNAME: process.env.STAFF_USERNAME || 'staff',
  STAFF_PASSWORD: process.env.STAFF_PASSWORD || 'password'
};

// Create a JavaScript file with the environment variables
const envScript = `
// Environment variables injected at build time
window.ENV_CONFIG = ${JSON.stringify(envVars, null, 2)};

// Compatibility function
const loadEnv = async () => {
  return window.ENV_CONFIG || {
    FIREBASE_API_KEY: '',
    FIREBASE_AUTH_DOMAIN: '',
    FIREBASE_DATABASE_URL: '',
    FIREBASE_PROJECT_ID: '',
    FIREBASE_STORAGE_BUCKET: '',
    FIREBASE_MESSAGING_SENDER_ID: '',
    FIREBASE_APP_ID: '',
    STAFF_USERNAME: 'staff',
    STAFF_PASSWORD: 'password'
  };
};

window.loadEnv = loadEnv;
`;

fs.writeFileSync('./env-generated.js', envScript);
console.log('Environment variables injected successfully');