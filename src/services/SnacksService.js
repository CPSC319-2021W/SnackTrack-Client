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

const makeSuggestion = async (username, suggestion) => {
  const data = { suggested_by: username, suggestion_text: suggestion };
  await httpClient.post('/suggestions', data);
};

export { getSnacks, makeSuggestion };
