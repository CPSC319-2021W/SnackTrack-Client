import { React, useState } from 'react';

import PaymentsTable from '../components/PaymentsTable';
import { getPaymentHistory } from '../services/PaymentsService';

const rowsPerPage = 8;

const TransactionHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState(getPaymentHistory(0, rowsPerPage));

  const handleChangePage = (page) => {
    setPaymentHistory(getPaymentHistory(page, rowsPerPage));
  };

  return (
    <div>
      <p>
        <code>Past Transactions</code>
      </p>
      <PaymentsTable
        data={paymentHistory}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
      />
    </div>
  );
};
export default TransactionHistory;
