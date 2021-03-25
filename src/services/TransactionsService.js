import Cookies from 'js-cookie';
import httpClient from './axios.config.js';

const cancelOrder = async (transaction_id) => {
  throw new Error('Not Implemented!', transaction_id);
};

const editOrder = async (transaction_id, quantity, transaction_amount) => {
  throw new Error('Not Implemented!', transaction_id, quantity, transaction_amount);
};

const getPayments = async (page, rowsPerPage) => {
  try {
    const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
    const { data } = await httpClient.get(
      `/payments/?page=${page}&size=${rowsPerPage}`,
      authHeader
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

const makePayment = async (userId, transactionIds, paymentAmount, processor, payAll) => {
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  const { data } = await httpClient.post(
    `/payments${payAll ? '/all' : ''}`,
    {
      user_id: userId,
      payment_amount: paymentAmount,
      transaction_ids: transactionIds,
      created_by: processor
    },
    authHeader
  );
  return data;
};

const claimPendingOrders = (approvedOrderIds, declinedOrderIds) => {
  // const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  // try {
  //   await httpClient.post('/payments', {
  //   user_id: userId,
  //   payment_amount: paymentAmount,
  //   transactions_ids: transactionIds,
  //   created_by: processor
  // }, authHeader); } catch (err) {
  // }
  throw new Error('Not Implemented!', approvedOrderIds, declinedOrderIds);
};

const getPendingOrders = async (userId) => {
  try {
    const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
    const { data } = await httpClient.get(`/users/${userId}/pendingOrders`, authHeader);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const makeOrder = async (
  userId,
  transactionTypeId,
  snackId,
  transactionAmount,
  quantity
) => {
  const { data } = await httpClient.post('/transactions', {
    user_id: userId,
    transaction_type_id: transactionTypeId,
    snack_id: snackId,
    transaction_amount: transactionAmount,
    quantity: quantity
  });
  return data;
};

export {
  cancelOrder,
  editOrder,
  getPayments,
  makePayment,
  claimPendingOrders,
  getPendingOrders,
  makeOrder
};
