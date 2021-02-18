/* eslint-disable */
import httpClient from './axios.config.js';
import { mockTransactionDBCall } from '../mockServer';

const getTransactions = (page, rowsPerPage) => {
  // TODO: Replace with API Call (Ticket: SNAK-)
  return mockTransactionDBCall(page, rowsPerPage);
};

const makePayment = async (userId, transactionIds, paymentAmount, processor) => {
  // try {
  //   await httpClient.post('/payments', {
  //     user_id: userId,
  //     payment_amount: paymentAmount,
  //     transactions_ids: transactionIds,
  //     created_by: processor
  //   });
  // } catch (err) {
  //   // TODO: Handle 404
  //   console.log(err.toString());
  // }
  console.log(
    `Not Implemented: MockPayment for $${
      paymentAmount / 100
    }, transactionIds [${transactionIds}]`
  );
};

export { getTransactions, makePayment };
