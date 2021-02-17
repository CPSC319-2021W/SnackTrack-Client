import { React, useState } from 'react';

import PaymentsTable from '../components/PaymentsTable';
import TransactionsTable from '../components/TransactionsTable';
import { getPaymentHistory } from '../services/PaymentsService';
import { getTransactions } from '../services/TransactionsService';

const rowsPerPage = 8;

const Transactions = () => {
  const [paymentHistory, setPaymentHistory] = useState(getPaymentHistory(0, rowsPerPage));
  const [transactions, setTransactions] = useState(getTransactions(0, rowsPerPage));

  const handlePaymentChangePage = (page) => {
    setPaymentHistory(getPaymentHistory(page, rowsPerPage));
  };

  const handleTransactionChangePage = (page) => {
    setTransactions(getTransactions(page, rowsPerPage));
  };

  return (
    <div>
      <p>
        <code>Orders</code>
      </p>

      <TransactionsTable
        data={transactions}
        rowsPerPage={rowsPerPage}
        onChangePage={handleTransactionChangePage}
      />
      <PaymentsTable
        data={paymentHistory}
        rowsPerPage={rowsPerPage}
        onChangePage={handlePaymentChangePage}
      />
    </div>
  );
};
export default Transactions;
