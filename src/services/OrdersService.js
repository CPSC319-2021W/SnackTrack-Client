import httpClient from './axios.config.js';
import { mockDBCall } from '../mockServer';

const getUserOrders = (page, rowsPerPage) => {
  // TODO: Replace with API Call (Ticket: SNAK-144)
  // try {
  //   const response = await httpClient.get(`/users/${userId}/transactions`, {
  //     params: { page: page, size: rowsPerPage }
  //   });
  // } catch (err) {
  //   // TODO: Handle 404
  //   console.log(err.toString());
  // }
  return mockDBCall('transactions', page, rowsPerPage);
};

const makePayment = async (userId, transactionIds, paymentAmount, processor) => {
  const { data } = await httpClient.post('/payments', {
    user_id: userId,
    payment_amount: paymentAmount,
    transaction_ids: transactionIds,
    created_by: processor
  });
  return data;
};

const claimPendingOrders = (approvedOrderIds, declinedOrderIds) => {
  // try {
  //   await httpClient.post('/payments', {
  //   user_id: userId,
  //   payment_amount: paymentAmount,
  //   transactions_ids: transactionIds,
  //   created_by: processor
  // }); } catch (err) {
  // }
  throw new Error('Not Implemented!', approvedOrderIds, declinedOrderIds);
};

const makeOrder = (userId, transactionTypeId, snackId, transactionAmount, quantity) => {
  //TODO: API call for add neq transactions 
  console.log(userId, transactionTypeId, snackId, transactionAmount, quantity);
};

export { getUserOrders, makePayment, claimPendingOrders, makeOrder};
