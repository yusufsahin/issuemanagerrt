import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.4.104:3000'
});

export default instance;