import axios from 'axios';

const api_0001 = axios.create({
  baseURL: 'http://192.168.1.173:8888/apis/unsplash/'
});

export default api_0001;