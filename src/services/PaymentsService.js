import httpClient from './axios.config.js';

const getPaymentHistory = async (page, rowsPerPage) => {
  // TODO: Change to correct call for a user's payment history, maybe move to UsersService? (SNAK-196)
  try {
    const response = await httpClient.get(`/payments/?page=${page}&size=${rowsPerPage}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export { getPaymentHistory };
