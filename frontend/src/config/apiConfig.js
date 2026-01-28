const API_URLS = {
  development: {
    android: 'http://10.0.2.2:5000/api',
    ios: 'http://localhost:5000/api',
  },
  production: 'https://your-production-api.com/api',
};

const getApiUrl = () => {
  // For production, use the production URL
  if (process.env.NODE_ENV === 'production') {
    return API_URLS.production;
  }

  // For development, detect platform
  const Platform = require('react-native').Platform;
  return Platform.OS === 'android'
    ? API_URLS.development.android
    : API_URLS.development.ios;
};

export default getApiUrl();
