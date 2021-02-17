// import httpClient from './axios.config.js';
import { mockTransactionDBCall } from '../mockServer';

const getTransactions = (page, rowsPerPage) => {
  // TODO: Replace with API Call (Ticket: SNAK-)
  return mockTransactionDBCall(page, rowsPerPage);
};

export { getTransactions };
