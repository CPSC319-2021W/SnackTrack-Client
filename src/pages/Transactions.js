import { React, useEffect, useState } from 'react';
import { getUserOrders, getUserPayments } from '../services/UsersService';
import {
  setApiResponse,
  setToastNotificationOpen
} from '../redux/features/notifications/notificationsSlice';
import { useDispatch, useSelector } from 'react-redux';

import { NOTIFICATIONS } from '../constants';
import OrdersTable from '../components/OrdersTable/OrdersTable';
import PaymentsTable from '../components/PaymentsTable';
import ToastNotification from '../components/ToastNotification';
import styles from '../styles/Page.module.css';
import TransactionCard from '../components/TransactionCard';

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
  const dispatch = useDispatch();
  const [rowsPerPage] = useState(8);
  const { userId } = useSelector((state) => state.usersReducer.profile);
  const [paymentsResponse, setPaymentsResponse] = useState(INITIAL_PAYMENTS);
  const [ordersResponse, setOrdersResponse] = useState(INITIAL_ORDERS);
  const [paymentsError, setPaymentsError] = useState(false);
  const { isToastNotificationOpen, apiResponse } = useSelector(
    (state) => state.notificationsReducer
  );

  const openToastNotification = (bool) => dispatch(setToastNotificationOpen(bool));

  const onApiResponse = (response) => dispatch(setApiResponse(response));

  const handlePaymentChangePage = async (page) => {
    const paymentResponse = await getUserPayments(userId, page, rowsPerPage);
    paymentResponse instanceof Error
      ? openToastNotification(true)
      : setPaymentsResponse(paymentResponse);
  };

  const handleOrderChangePage = async (page) => {
    const transactionResponse = await getUserOrders(userId, page, rowsPerPage);
    setOrdersResponse(transactionResponse);
  };

  const handleClose = () => {
    openToastNotification(false);
  };

  const handleApiResponse = (response) => {
    onApiResponse(response);
    openToastNotification(true);
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
        openToastNotification(true);
        setPaymentsError(true);
      }
      try {
        const paymentResponse = await getUserPayments(userId, 0, rowsPerPage);
        setPaymentsResponse(paymentResponse);
      } catch (err) {
        openToastNotification(true);
        setPaymentsError(true);
      }
    }
  }, [userId]);

  return (
    <div className={styles.base}>
      <div className={styles.header}>
        <h5 className={styles.title}>Transactions</h5>
      </div>
      <TransactionCard />
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
        open={isToastNotificationOpen}
        notification={NOTIFICATIONS[apiResponse]}
        onClose={handleClose}
      />
    </div>
  );
};

export default Transactions;
