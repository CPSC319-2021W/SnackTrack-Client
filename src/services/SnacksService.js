import httpClient from './axios.config.js';

const getSnacks = async () => {
  try {
    const { data } = await httpClient.get('/snacks');
    return data;
  } catch (err) {
    // TODO: Handle error
    console.log(err.toString());
  }
};

export { getSnacks };
