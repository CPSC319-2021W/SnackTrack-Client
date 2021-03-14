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

const addSnack = async (username, snackObj) => {
  try {
    console.log(username, snackObj);
    const data = { snack_name: snackObj.snackname,  
      snack_type_id: snackObj.category, 
      description: snackObj.description,
      image_url: snackObj.image_url, 
      quantity: snackObj.quantity, 
      price: snackObj.price, 
      is_active: true, 
      order_threshold: snackObj.reorder,
      expiration_dtm: snackObj.expiration, 
      last_updated_by: username };
    const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
    await httpClient.post('/snacks', data, authHeader);
  } catch (err) {
    console.log(err);
  }
};

export { getSnackBatch, getSnacks, makeSuggestion, addBatch, editBatch, deleteBatch, addSnack };
