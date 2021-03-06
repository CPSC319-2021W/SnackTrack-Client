import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  crossDomain: true,
  timeout: 200000
});

export default httpClient;
