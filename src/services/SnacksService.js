import Cookies from 'js-cookie';
import httpClient from './axios.config.js';

const getSnacks = async (activeOnly) => {
  try {
    const endpoint = `/snacks${activeOnly ? '/?active=true' : ''}`;
    const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
    const { data } = await httpClient.get(endpoint, authHeader);
    return data;
  } catch (err) {
    // TODO: Handle error
    console.log(err.toString());
  }
};

const getSnackBatches = async () => {
  try {
    const { data } = await httpClient.get('/batches');
    return data;
  } catch (err) {
    // TODO: Handle error
    console.log(err.toString());
  }
};

const makeSuggestion = async (userId, suggestion) => {
  const data = { suggested_by: userId, suggestion_text: suggestion };
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  await httpClient.post('/suggestions', data, authHeader);
};

export { getSnackBatches, getSnacks, makeSuggestion };
