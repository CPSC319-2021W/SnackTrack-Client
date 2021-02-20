import httpClient from './axios.config.js';

const getPaymentHistory = async (page, rowsPerPage) => {
  try {
    const response = await httpClient.get(`/payments/?page=${page}&size=${rowsPerPage}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export { getPaymentHistory };
