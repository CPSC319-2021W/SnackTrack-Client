import Cookies from 'js-cookie';
import httpClient from './axios.config.js';

const getSnacks = async (activeOnly) => {
  const endpoint = `/snacks${activeOnly ? '/?active=true' : ''}`;
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  const { data } = await httpClient.get(endpoint, authHeader);
  return data;
};

const getSnackBatch = async (snackId) => {
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  const { data } = await httpClient.get(
    `/snack_batches/?snack_id=${snackId}`,
    authHeader
  );
  return data;
};

const addSnack = async (snackRequest) => {
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  const { data } = await httpClient.post('/snacks', snackRequest, authHeader);
  return data;
};

const editSnack = async (snackRequest) => {
  const { snack_id } = snackRequest;
  delete snackRequest.snack_id;
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  const { data } = await httpClient.put(`/snacks/${snack_id}`, snackRequest, authHeader);
  return data;
};

const deleteSnack = async (snackId) => {
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  await httpClient.delete(`/snacks/${snackId}`, authHeader);
};

const addBatch = async (batch) => {
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  const { data } = await httpClient.post('/snack_batches', batch, authHeader);
  return data;
};

const editBatch = async (batch) => {
  const { snack_batch_id } = batch;
  delete batch.snack_batch_id;
  delete batch.snack_id;
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

const makeSuggestion = async (userId, suggestion) => {
  const data = { suggested_by: userId, suggestion_text: suggestion };
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  await httpClient.post('/suggestions', data, authHeader);
};

const getSuggestions = async () => {
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  const { data } = await httpClient.get('/suggestions', authHeader);
  return data;
};

const deleteAllSuggestions = async () => {
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  await httpClient.delete('/suggestions', authHeader);
};

const getSnackBatches = async () => {
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  const { data } = await httpClient.get('/snack_batches', authHeader);
  return data;
};

const getPopularSnacks = async (start_date, end_date, transaction_type_id, limit) => {
  const endpoint = `/transactions?start_date=${start_date}&end_date=${end_date}&transaction_type_id=${transaction_type_id}&limit=${limit}`;
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  const { data } = await httpClient.get(endpoint, authHeader);
  return data;
};

export {
  getSnacks,
  getSnackBatch,
  addSnack,
  editSnack,
  deleteAllSuggestions,
  deleteSnack,
  addBatch,
  editBatch,
  deleteBatch,
  getSnackBatches,
  makeSuggestion,
  getSuggestions,
  getPopularSnacks
};
