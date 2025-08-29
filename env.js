// Simple environment variable loader
const loadEnv = async () => {
  try {
    // Add cache busting to prevent browser caching
    const response = await fetch('./.env?' + Date.now());
    const text = await response.text();
    
    // Parse the .env file
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
    // Return default values if .env file can't be loaded
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
};

// Export the loadEnv function
window.loadEnv = loadEnv;
