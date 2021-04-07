import Cookies from 'js-cookie';
import httpClient from './axios.config.js';

const authenticate = async (token) => {
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await httpClient.post('/authenticate', null, authHeader);
  return data;
};

const getUsersCommon = async () => {
  const { data } = await httpClient.get('/users/common');
  return data;
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
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  const { data } = await httpClient.get(
    `/users/${userId}/transactions/?page=${page}&size=${rowsPerPage}`,
    authHeader
  );
  return data;
};

const getUserPayments = async (userId, page, rowsPerPage) => {
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  const { data } = await httpClient.get(
    `/users/${userId}/payments/?page=${page}&size=${rowsPerPage}`,
    authHeader
  );
  return data;
};

const deleteUser = async (userId) => {
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  await httpClient.delete(`/users/${userId}`, authHeader);
};

const putUser = async (userId, body) => {
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  await httpClient.put(`/users/${userId}`, body, authHeader);
};

const setUserAsAdmin = async (userId, isAdmin) => {
  const body = {is_admin: isAdmin};
  await putUser(userId, body);
};

export {
  authenticate,
  deleteUser,
  getUsersCommon,
  getUsersAdmin,
  getUserById,
  getUserOrders,
  getUserPayments,
  setUserAsAdmin
};
