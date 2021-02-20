import httpClient from './axios.config.js';
import { mockDBCall } from '../mockServer';

const getUserById = async (userId) => {
  try {
    const response = await httpClient.get(`/users/${userId}`);
    return response.data;
  } catch (err) {
    // TODO: Handle 404
    console.log(err.toString());
  }
};

const getUsers = () => {
  return mockDBCall('users', 0, 14);
};

const authenticate = async () => {
  // endpoint currently not implemented
  // try {
  //   const response = await httpClient.post('/authenticate', { token });
  //   return response;
  // } catch (err) {
  //   // handle error
  //   console.log(err);
  // }
  const response = getUserById(1);
  return response;
};

export { getUserById, getUsers, authenticate };
