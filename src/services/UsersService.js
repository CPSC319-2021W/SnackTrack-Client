import Cookies from 'js-cookie';
import httpClient from './axios.config.js';
import { mockDBCall } from '../mockServer';

const authenticate = async (token) => {
  try {
    const authHeader = { headers: { Authorization: `Bearer ${token}` } };
    const { data } = await httpClient.post('/authenticate', null, authHeader);
    return data;
  } catch (err) {
    // handle error
    console.log(err);
  }
};

const getUsersCommon = () => {
  return mockDBCall('users', 0, 1000);
};
const getUsersAdmin = async () => {
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  const { data } = await httpClient.get('/users/', authHeader);
  return data;
};

const getUserById = async (userId) => {
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  const { data } = await httpClient.get(`/users/${userId}`, authHeader);
  return data;
};

const getUserOrders = async (userId, page, rowsPerPage) => {
  try {
    const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
    const { data } = await httpClient.get(
      `/users/${userId}/transactions/?page=${page}&size=${rowsPerPage}`,
      authHeader
    );
    return data;
  } catch (err) {
    // TODO: Handle 404
    console.log(err.toString());
  }
};

const getUserPayments = async (userId, page, rowsPerPage) => {
  try {
    const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
    const { data } = await httpClient.get(
      `/users/${userId}/payments/?page=${page}&size=${rowsPerPage}`,
      authHeader
    );
    return data;
  } catch (err) {
    // TODO: Handle 404
    console.log(err.toString());
    return new Error(err.message);
  }
};

export {
  authenticate,
  getUsersCommon,
  getUsersAdmin,
  getUserById,
  getUserOrders,
  getUserPayments
};
