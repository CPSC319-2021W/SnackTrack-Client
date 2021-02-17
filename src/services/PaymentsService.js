// import httpClient from './axios.config.js';
import { mockDBCall } from '../mockServer';

const getPaymentHistory = (page, rowsPerPage) => {
  // TODO: Replace with API Call (Ticket: SNAK-126)
  return mockDBCall(page, rowsPerPage);
};

export { getPaymentHistory };
