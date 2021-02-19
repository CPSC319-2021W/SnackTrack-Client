import { React, useState } from 'react';

import PaymentsTable from '../components/PaymentsTable';
import TransactionsTable from '../components/TransactionsTable/TransactionsTable';
import { getPaymentHistory } from '../services/PaymentsService';
import { getUserTransactions } from '../services/TransactionsService';

const Transactions = () => {
  const [rowsPerPage] = useState(8);
  const [paymentsResponse, setPaymentsResponse] = useState(
    getPaymentHistory(0, rowsPerPage)
  );
  const [transactionsResponse, setTransactionsResponse] = useState(
    getUserTransactions(0, rowsPerPage)
  );

  const handlePaymentChangePage = (page) => {
    setPaymentsResponse(getPaymentHistory(page, rowsPerPage));
  };

  const handleTransactionChangePage = (page) => {
    setTransactionsResponse(getUserTransactions(page, rowsPerPage));
  };

  return (
    <div>
      <p>
        <code>Orders</code>
      </p>

      <TransactionsTable
        data={transactionsResponse}
        rowsPerPage={rowsPerPage}
        onChangePage={handleTransactionChangePage}
      />
      <PaymentsTable
        data={paymentsResponse}
        rowsPerPage={rowsPerPage}
        onChangePage={handlePaymentChangePage}
      />
    </div>
  );
};

export default Transactions;
