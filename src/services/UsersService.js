import httpClient from './axios.config.js';
import { mockDBCall } from '../mockServer';

const getUsers = () => {
  return mockDBCall('users', 0, 14);
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

const getUserPayments = async (userId) => {
  try {
    const { data } = await httpClient.get(`/users/${userId}/payments`);
    return data;
  } catch (err) {
    // TODO: Handle 404
    console.log(err.toString());
  }
};

export { getUsers, getUserById, getUserPayments };
