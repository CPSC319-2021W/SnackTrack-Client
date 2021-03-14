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

const getSnackBatch = async (snackId) => {
  try {
    const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
    const { data } = await httpClient.get(
      `/snack_batches/?snack_id=${snackId}`,
      authHeader
    );
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

const addBatch = async (batch) => {
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  const { data } = await httpClient.post('/snack_batches', batch, authHeader);
  return data;
};

const editBatch = async (batch) => {
  const { snack_batch_id } = batch;
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  const { data } = await httpClient.put(
    `/snack_batches/${snack_batch_id}`,
    batch,
    authHeader
  );
  return data;
};

const deleteBatch = async (batchId) => {
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  await httpClient.delete(`/snack_batches/${batchId}`, authHeader);
};

const addSnack = async (username, snackObj, category, date) => {
  try {
    console.log(snackObj);
    const data = { snack_name: snackObj.snackname,  
      snack_type_id: category, 
      description: snackObj.description,
      image_url: 'https://cottagelife.com/wp-content/uploads/2014/12/coffee_crisp_chocolate_bar-e1419970585437.jpg', 
      quantity: parseInt(snackObj.quantity), 
      price: parseInt(snackObj.price) * 100, 
      is_active: true, 
      order_threshold: parseInt(snackObj.reorder),
      expiration_dtm: date, 
      last_updated_by: username };
    console.log(data);
    const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
    await httpClient.post('/snacks', data, authHeader);
  } catch (err) {
    console.log(err);
  }
};

export { getSnackBatch, getSnacks, makeSuggestion, addBatch, editBatch, deleteBatch, addSnack };
