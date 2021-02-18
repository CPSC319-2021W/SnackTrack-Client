const isPaid = (paymentId) => {
  return paymentId !== null;
};

const isCancelled = (status) => {
  return status === 'CN';
};

const isPaymentPending = (paymentId, status) => {
  return paymentId == null && status === 'PR';
};

const calculateTransactionsSum = (arr) => {
  return arr
    .map((transaction) => transaction.transaction_amount)
    .reduce((a, b) => a + b, 0);
};
export { isPaid, isPaymentPending, isCancelled, calculateTransactionsSum };
