import { TRANSACTION_TYPES } from '../constants';
const { CANCEL, PURCHASE } = TRANSACTION_TYPES;

const isPaid = (paymentId) => {
  return paymentId !== null;
};

const isCancelled = (status) => {
  return status === CANCEL;
};

const isPaymentPending = (paymentId, status) => {
  return paymentId == null && status === PURCHASE;
};

const calculateOrdersSum = (arr) => {
  return arr
    .map((transaction) => transaction.transaction_amount)
    .reduce((a, b) => a + b, 0);
};

export { isPaid, isPaymentPending, isCancelled, calculateOrdersSum };
