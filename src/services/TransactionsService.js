import Cookies from 'js-cookie';
import httpClient from './axios.config.js';

const cancelOrder = async (transaction_id) => {
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  const { data } = await httpClient.put(
    `/transactions/${transaction_id}`,
    {
      transaction_type_id: 2
    },
    authHeader
  );
  return data;
};

const getPayments = async (page, rowsPerPage) => {
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  const { data } = await httpClient.get(
    `/payments/?page=${page}&size=${rowsPerPage}`,
    authHeader
  );
  return data;
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
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  approvedOrderIds.forEach(async (id) => {
    try {
      await httpClient.put(`/transactions/${id}`, {
        transaction_type_id: 1
      }, authHeader);
    } catch (err) {
      // TODO: handle error for specific call
    }
  });
  declinedOrderIds.forEach(async (id) => {
    try {
      await httpClient.put(`/transactions/${id}`, {
        transaction_type_id: 4
      }, authHeader);
    } catch (err) {
      // TODO: handle error for specific call
    }
  });
};

const getPendingOrders = async (userId) => {
  const authHeader = { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } };
  const { data } = await httpClient.get(`/users/${userId}/pendingOrders`, authHeader);
  return data;
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
  getPayments,
  makePayment,
  claimPendingOrders,
  getPendingOrders,
  makeOrder
};
