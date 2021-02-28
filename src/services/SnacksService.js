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

const makeSuggestion = async (userId, suggestion) => {
  const data = { suggested_by: userId, suggestion_text: suggestion };
  await httpClient.post('/suggestions', data);
};

export { getSnacks, makeSuggestion };
