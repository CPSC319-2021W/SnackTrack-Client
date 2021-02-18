import httpClient from './axios.config.js';
import { mockDBCall } from '../mockServer';

const getUserTransactions = (page, rowsPerPage) => {
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
  try {
    const response = await httpClient.post('/payments', {
      user_id: userId,
      payment_amount: paymentAmount,
      transactions_ids: transactionIds,
      created_by: processor
    });
    console.log(response);
  } catch (err) {
    // TODO: Handle 404
    console.log(err.toString());
  }
  console.log(
    `Not Implemented: MockPayment for $${
      paymentAmount / 100
    }, transactionIds [${transactionIds}], userId ${userId}, processedBy ${processor}`
  );
};

export { getUserTransactions, makePayment };
