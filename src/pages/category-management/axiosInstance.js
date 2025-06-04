// utils/axiosInstance.js
import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development';

let axiosInstance;

if (isDev) {
  const https = require('https');
  axiosInstance = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false, // ⛔ Only in development
    }),
  });
} else {
  axiosInstance = axios.create(); // Normal HTTPS in production
}

export default axiosInstance;
