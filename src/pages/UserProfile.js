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
import UserCard from '../components/UserCard/UserCard';
import UserCardSkeleton from '../components/UserCard/UserCardSkeleton';
import { getUserById } from '../services/UsersService';
import styles from '../styles/Page.module.css';
import { useParams } from 'react-router-dom';

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

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const [rowsPerPage] = useState(8);
  const [paymentsResponse, setPaymentsResponse] = useState(INITIAL_PAYMENTS);
  const [ordersResponse, setOrdersResponse] = useState(INITIAL_ORDERS);
  const [paymentsError, setPaymentsError] = useState(false);
  const { isToastNotificationOpen, apiResponse } = useSelector(
    (state) => state.notificationsReducer
  );

  const openToastNotification = (bool) => dispatch(setToastNotificationOpen(bool));

  const onApiResponse = (response) => dispatch(setApiResponse(response));

  const handlePaymentChangePage = async (page) => {
    const paymentResponse = await getUserPayments(id, page, rowsPerPage);
    paymentResponse instanceof Error
      ? openToastNotification(true)
      : setPaymentsResponse(paymentResponse);
  };

  const handleOrderChangePage = async (page) => {
    const transactionResponse = await getUserOrders(id, page, rowsPerPage);
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
    const userResponse = await getUserById(id);
    setUser(userResponse);
  }, []);

  useEffect(async () => {
    if (user) {
      try {
        const orderResponse = await getUserOrders(id, 0, rowsPerPage);
        setOrdersResponse(orderResponse);
      } catch (err) {
        openToastNotification(true);
        setPaymentsError(true);
      }
      try {
        const paymentResponse = await getUserPayments(id, 0, rowsPerPage);
        setPaymentsResponse(paymentResponse);
      } catch (err) {
        openToastNotification(true);
        setPaymentsError(true);
      }
    }
  }, [user]);

  return (
    <div className={styles.base}>
      <div className={styles.header}>
        <h5 className={styles.title}>Back To Users List</h5>
      </div>
      {user ? <UserCard user={user} /> : <UserCardSkeleton />}
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

export default UserProfile;
