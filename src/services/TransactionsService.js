import httpClient from './axios.config.js';

const getPayments = async (page, rowsPerPage) => {
  try {
    const { data } = await httpClient.get(`/payments/?page=${page}&size=${rowsPerPage}`);
    return data;
  } catch (err) {
    console.log(err);
  }
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

const makeOrder = async (
  userId,
  transactionTypeId,
  snackName,
  transactionAmount,
  quantity
) => {
  const { data } = await httpClient.post('/transactions', {
    user_id: userId,
    transaction_type_id: transactionTypeId,
    snack_name: snackName,
    transaction_amount: transactionAmount,
    quantity: quantity
  });
  return data;
};

export { getPayments, makePayment, claimPendingOrders, makeOrder };
