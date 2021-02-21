import httpClient from './axios.config.js';

const getPaymentHistory = async (page, rowsPerPage) => {
  // TODO: Change to correct call for a user's payment history, maybe move to UsersService? (SNAK-196)
  try {
    const { data } = await httpClient.get(`/payments/?page=${page}&size=${rowsPerPage}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export { getPaymentHistory };
