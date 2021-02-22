import httpClient from './axios.config.js';

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
  console.log('Snack purchased!');
  console.log(userId, transactionTypeId, snackId, transactionAmount, quantity);
};

export { makePayment, claimPendingOrders, makeOrder };
