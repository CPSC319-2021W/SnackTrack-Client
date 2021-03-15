import { React, useEffect, useState } from 'react';
import { getUserOrders, getUserPayments } from '../services/UsersService';
import {
  setApiResponse,
  setToastNotificationOpen
} from '../redux/features/notifications/notificationsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { ReactComponent as ArrowIcon } from '../assets/icons/arrow.svg';
import { NOTIFICATIONS } from '../constants';
import OrdersTable from '../components/OrdersTable/OrdersTable';
import PaymentsTable from '../components/PaymentsTable';
import { ROUTES } from '../constants';
import ToastNotification from '../components/ToastNotification';
import UserCard from '../components/UserCard/UserCard';
import UserCardSkeleton from '../components/UserCard/UserCardSkeleton';
import UserProfileNotFound from '../pages/UserProfileNotFound';
import { getUserById } from '../services/UsersService';
import styles from '../styles/Page.module.css';
import usersStyles from '../styles/UserProfile.module.css';

const INITIAL_PAYMENTS = {
  total_rows: 0,
  payments: [],
  total_pages: 1,
  current_page: 0,
  initial: true
};

const INITIAL_ORDERS = {
  total_rows: 0,
  transactions: [],
  total_pages: 1,
  current_page: 0,
  initial: true
};

const UserProfile = () => {
  const history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
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

  const handleGoBack = () => {
    history.push(ROUTES.USERS);
  };

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

  const updateProfileBalance = (amount) => {
    setUser({ ...user, balance: user.balance - amount });
  };

  useEffect(async () => {
    try {
      const userResponse = await getUserById(id);
      setUser(userResponse);
    } catch (err) {
      setUserNotFound(true);
    }
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
        <h5 className={`${styles.title} ${usersStyles.goBack}`} onClick={handleGoBack}>
          <div className={usersStyles.icon__container}>
            <ArrowIcon />
          </div>
          Back to Users List
        </h5>
      </div>
      {userNotFound ? (
        <UserProfileNotFound />
      ) : (
        <>
          {user ? <UserCard user={user} /> : <UserCardSkeleton />}
          <div className={usersStyles.tables__container}>
            <div className={usersStyles.ordersTable}>
              <OrdersTable
                isLoaded={!ordersResponse.initial}
                isEmpty={ordersResponse.transactions.length === 0}
                data={ordersResponse}
                rowsPerPage={rowsPerPage}
                updateProfileBalance={updateProfileBalance}
                onHandleApiResponse={handleApiResponse}
                onChangePage={handleOrderChangePage}
                onMakePayment={handleMakePayment}
              />
            </div>
            <div className={usersStyles.paymentsTable}>
              <PaymentsTable
                isLoaded={!paymentsResponse.initial}
                isEmpty={paymentsResponse.payments.length === 0}
                error={paymentsError}
                data={paymentsResponse}
                rowsPerPage={rowsPerPage}
                setSnackBar={handleApiResponse}
                onChangePage={handlePaymentChangePage}
              />
            </div>
          </div>
        </>
      )}
      <ToastNotification
        open={isToastNotificationOpen}
        notification={NOTIFICATIONS[apiResponse]}
        onClose={handleClose}
      />
    </div>
  );
};

export default UserProfile;
