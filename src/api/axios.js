import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: 'http://192.168.4.104:5000/api'
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('@jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['Content-Type']= 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
