import httpClient from './axios.config.js';

const getUserById = async (userId) => {
  try {
    const response = await httpClient.get(`/users/${userId}`);
    return response.data;
  } catch (err) {
    console.log(err.toString());
  }
};

export { getUserById };
