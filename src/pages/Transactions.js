import { React, useState } from 'react';

import OrdersTable from '../components/OrdersTable/OrdersTable';
import PaymentsTable from '../components/PaymentsTable';
import { getPaymentHistory } from '../services/PaymentsService';
import { getUserOrders } from '../services/OrdersService';

const Transactions = () => {
  const [rowsPerPage] = useState(8);
  const [paymentsResponse, setPaymentsResponse] = useState(
    getPaymentHistory(0, rowsPerPage)
  );
  const [ordersResponse, setOrdersResponse] = useState(getUserOrders(0, rowsPerPage));

  const handlePaymentChangePage = (page) => {
    setPaymentsResponse(getPaymentHistory(page, rowsPerPage));
  };

  const handleOrderChangePage = (page) => {
    setOrdersResponse(getUserOrders(page, rowsPerPage));
  };

  return (
    <div>
      <p>
        <code>Orders</code>
      </p>

      <OrdersTable
        data={ordersResponse}
        rowsPerPage={rowsPerPage}
        onChangePage={handleOrderChangePage}
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
