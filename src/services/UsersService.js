import httpClient from './axios.config.js';
import { mockDBCall } from '../mockServer';

const authenticate = async () => {
  // TODO: Will be uncommented in SNAK-191 when endpoint is completed
  // try {
  //   const response = await httpClient.post('/authenticate', { token });
  //   return response;
  // } catch (err) {
  //   // handle error
  //   console.log(err);
  // }
  const response = await getUserById(1);
  return response;
};

const getUsers = () => {
  return mockDBCall('users', 0, 1000);
};

const getUserById = async (userId) => {
  try {
    const { data } = await httpClient.get(`/users/${userId}`);
    return data;
  } catch (err) {
    // TODO: Handle 404
    console.log(err.toString());
  }
};

const getUserPayments = async (userId, page, rowsPerPage) => {
  try {
    const { data } = await httpClient.get(
      `/users/${userId}/payments/?page=${page}&size=${rowsPerPage}`
    );
    return data;
  } catch (err) {
    // TODO: Handle 404
    console.log(err.toString());
    return new Error(err.message);
  }
};

const makeSuggestion = (userId, suggestionText) => {
  console.log(userId, suggestionText);
};

export { authenticate, getUsers, getUserById, getUserPayments, makeSuggestion };
