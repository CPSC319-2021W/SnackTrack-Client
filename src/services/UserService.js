import httpClient from './axios.config.js';

const getUserById = async (userId) => {
  try {
    const response = await httpClient.get(`/users/${userId}`);
    return response.data;
  } catch (err) {
    // TODO: Handle 404
    console.log(err.toString());
  }
};

export { getUserById };
