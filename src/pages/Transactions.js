import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { NOTIFICATIONS } from '../constants';
import { getUserOrders } from '../services/OrdersService';
import { getUserPayments } from '../services/UsersService';

import OrdersTable from '../components/OrdersTable/OrdersTable';
import PaymentsTable from '../components/PaymentsTable';
import ToastNotification from '../components/ToastNotification';
import styles from '../styles/Page.module.css';

const INITIAL_PAYMENTS = {
  total_rows: 0,
  payments: [],
  total_pages: 1,
  current_page: 0
};

// const INITIAL_ORDERS = {
//   total_rows: 0,
//   transactions: [],
//   total_pages: 1,
//   current_page: 0
// };

const Transactions = () => {
  const [rowsPerPage] = useState(8);
  const [paymentsResponse, setPaymentsResponse] = useState(INITIAL_PAYMENTS);
  const [ordersResponse, setOrdersResponse] = useState(getUserOrders(0, rowsPerPage));
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState('ERROR');
  const [paymentsError, setPaymentsError] = useState(false);
  const { userId } = useSelector((state) => state.usersReducer.profile);

  const handlePaymentChangePage = async (page) => {
    const paymentResponse = await getUserPayments(userId, page, rowsPerPage);
    paymentResponse instanceof Error
      ? setIsSnackBarOpen(true)
      : setPaymentsResponse(paymentResponse);
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

  useEffect(async () => {
    const paymentResponse = await getUserPayments(userId, 0, rowsPerPage);
    if (paymentResponse instanceof Error) {
      setIsSnackBarOpen(true);
      setPaymentsError(true);
    } else {
      setPaymentsResponse(paymentResponse);
    }
  }, []);

  return (
    <div className={styles.base}>
      <div className={styles.header}>
        <h5 className={styles.title}>
          Transactions
        </h5>
      </div>
      <OrdersTable
        data={ordersResponse}
        rowsPerPage={rowsPerPage}
        onHandleApiResponse={handleApiResponse}
        onChangePage={handleOrderChangePage}
      />
      <PaymentsTable
        error={paymentsError}
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
