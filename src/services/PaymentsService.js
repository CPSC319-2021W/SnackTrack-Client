// import httpClient from './axios.config.js';
import { mockPaymentDBCall } from '../mockServer';

const getPaymentHistory = (page, rowsPerPage) => {
  // TODO: Replace with API Call (Ticket: SNAK-126)
  return mockPaymentDBCall(page, rowsPerPage);
};

export { getPaymentHistory };
