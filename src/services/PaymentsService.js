// import httpClient from './axios.config.js';
import { mockDBCall } from '../mockServer';

const getPaymentHistory = (page, rowsPerPage) => {
  // TODO: Replace with DB Call
  return mockDBCall(page, rowsPerPage);
};

export { getPaymentHistory };
