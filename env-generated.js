
// Environment variables injected at build time
window.ENV_CONFIG = {
  "FIREBASE_API_KEY": "",
  "FIREBASE_AUTH_DOMAIN": "",
  "FIREBASE_DATABASE_URL": "",
  "FIREBASE_PROJECT_ID": "",
  "FIREBASE_STORAGE_BUCKET": "",
  "FIREBASE_MESSAGING_SENDER_ID": "",
  "FIREBASE_APP_ID": "",
  "STAFF_USERNAME": "staff",
  "STAFF_PASSWORD": "password"
};

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
