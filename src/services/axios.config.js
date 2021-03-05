import Cookies from 'js-cookie';
import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  crossDomain: true,
  timeout: 200000,
  headers: { Authorization: `Bearer ${Cookies.get('auth')}` }
});

export default httpClient;
