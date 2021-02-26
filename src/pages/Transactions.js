import { React, useEffect, useState } from 'react';
import { getUserOrders, getUserPayments } from '../services/UsersService';

import { NOTIFICATIONS } from '../constants';
import OrdersTable from '../components/OrdersTable/OrdersTable';
import PaymentsTable from '../components/PaymentsTable';
import ToastNotification from '../components/ToastNotification';
import styles from '../styles/Page.module.css';
import { useSelector } from 'react-redux';

const INITIAL_PAYMENTS = {
  total_rows: 0,
  payments: [],
  total_pages: 1,
  current_page: 0
};

const INITIAL_ORDERS = {
  total_rows: 0,
  transactions: [],
  total_pages: 1,
  current_page: 0
};

const Transactions = () => {
  const [rowsPerPage] = useState(8);
  const { userId } = useSelector((state) => state.usersReducer.profile);
  const [paymentsResponse, setPaymentsResponse] = useState(INITIAL_PAYMENTS);
  const [ordersResponse, setOrdersResponse] = useState(INITIAL_ORDERS);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState('ERROR');
  const [paymentsError, setPaymentsError] = useState(false);

  const handlePaymentChangePage = async (page) => {
    const paymentResponse = await getUserPayments(userId, page, rowsPerPage);
    paymentResponse instanceof Error
      ? setIsSnackBarOpen(true)
      : setPaymentsResponse(paymentResponse);
  };

  const handleOrderChangePage = async (page) => {
    const transactionResponse = await getUserOrders(userId, page, rowsPerPage);
    setOrdersResponse(transactionResponse);
  };
  const handleClose = () => {
    setIsSnackBarOpen(false);
  };

  const handleApiResponse = (response) => {
    setApiResponse(response);
    setIsSnackBarOpen(true);
  };

  const handleMakePayment = async () => {
    await handleOrderChangePage(0);
    await handlePaymentChangePage(0);
  };

  useEffect(async () => {
    if (userId) {
      try {
        const orderResponse = await getUserOrders(userId, 0, rowsPerPage);
        setOrdersResponse(orderResponse);
      } catch (err) {
        setIsSnackBarOpen(true);
        setPaymentsError(true);
      }
      try {
        const paymentResponse = await getUserPayments(userId, 0, rowsPerPage);
        setPaymentsResponse(paymentResponse);
      } catch (err) {
        setIsSnackBarOpen(true);
        setPaymentsError(true);
      }
    }
  }, [userId]);

  return (
    <div className={styles.base}>
      <div className={styles.header}>
        <h5 className={styles.title}>Transactions</h5>
      </div>
      <OrdersTable
        data={ordersResponse}
        rowsPerPage={rowsPerPage}
        onHandleApiResponse={handleApiResponse}
        onChangePage={handleOrderChangePage}
        onMakePayment={handleMakePayment}
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
