import { React, useState } from 'react';

import { NOTIFICATIONS } from '../constants';
import OrdersTable from '../components/OrdersTable/OrdersTable';
import PaymentsTable from '../components/PaymentsTable';
import ToastNotification from '../components/ToastNotification';
import { getPaymentHistory } from '../services/PaymentsService';
import { getUserOrders } from '../services/OrdersService';

const Transactions = () => {
  const [rowsPerPage] = useState(8);
  const [paymentsResponse, setPaymentsResponse] = useState(
    getPaymentHistory(0, rowsPerPage)
  );
  const [ordersResponse, setOrdersResponse] = useState(getUserOrders(0, rowsPerPage));
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState('ERROR');

  const handlePaymentChangePage = (page) => {
    setPaymentsResponse(getPaymentHistory(page, rowsPerPage));
  };

  const handleOrderChangePage = (page) => {
    setOrdersResponse(getUserOrders(page, rowsPerPage));
  };
  const handleClose = () => {
    setIsSnackBarOpen(false);
  };

  const handleApiResponse = (response) => {
    setApiResponse(response);
    setIsSnackBarOpen(true);
  };

  return (
    <div>
      <p>
        <code>Orders</code>
      </p>

      <OrdersTable
        data={ordersResponse}
        rowsPerPage={rowsPerPage}
        onHandleApiResponse={handleApiResponse}
        onChangePage={handleOrderChangePage}
      />
      <PaymentsTable
        data={paymentsResponse}
        rowsPerPage={rowsPerPage}
        setSnackBar={handleApiResponse}
        onChangePage={handlePaymentChangePage}
      />
      <ToastNotification
        open={isSnackBarOpen}
        notification={NOTIFICATIONS[apiResponse]}
        onClose={handleClose}
      />
    </div>
  );
};

export default Transactions;
