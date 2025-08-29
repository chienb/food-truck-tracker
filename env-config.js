// Environment configuration that works with both local .env and Vercel env vars
const loadEnv = async () => {
  // Check if we're in production (Vercel) or development
  const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
  
  if (isProduction) {
    // In production, return environment variables injected by Vercel
    return {
      FIREBASE_API_KEY: window.ENV_FIREBASE_API_KEY || '',
      FIREBASE_AUTH_DOMAIN: window.ENV_FIREBASE_AUTH_DOMAIN || '',
      FIREBASE_DATABASE_URL: window.ENV_FIREBASE_DATABASE_URL || '',
      FIREBASE_PROJECT_ID: window.ENV_FIREBASE_PROJECT_ID || '',
      FIREBASE_STORAGE_BUCKET: window.ENV_FIREBASE_STORAGE_BUCKET || '',
      FIREBASE_MESSAGING_SENDER_ID: window.ENV_FIREBASE_MESSAGING_SENDER_ID || '',
      FIREBASE_APP_ID: window.ENV_FIREBASE_APP_ID || '',
      STAFF_USERNAME: window.ENV_STAFF_USERNAME || 'staff',
      STAFF_PASSWORD: window.ENV_STAFF_PASSWORD || 'password'
    };
  } else {
    // In development, try to load from .env file
    try {
      const response = await fetch('./.env?' + Date.now());
      const text = await response.text();
      
      const env = {};
      text.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value && !key.startsWith('#')) {
          env[key.trim()] = value.trim();
        }
      });
      
      return env;
    } catch (error) {
      console.error('Error loading .env file:', error);
      return {
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
    }
  }
};

// Export the loadEnv function
window.loadEnv = loadEnv;