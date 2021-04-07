import { Fragment, React, useEffect, useState } from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { getUserOrders, getUserPayments } from '../services/UsersService';
import {
  setApiResponse,
  setToastNotificationOpen
} from '../redux/features/notifications/notificationsSlice';
import { useDispatch, useSelector } from 'react-redux';

import AppButton from '../components/AppButton';
import { NOTIFICATIONS } from '../constants';
import ToastNotification from '../components/ToastNotification';
import TransactionsContainer from '../components/TransactionsContainer';
import { makePayment } from '../services/TransactionsService';
import { setBalance } from '../redux/features/users/usersSlice';
import styles from '../styles/Page.module.css';

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

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div role='tabpanel' hidden={value !== index} id={`tabpanel-${index}`} {...other}>
      {value === index && <Fragment>{children}</Fragment>}
    </div>
  );
};

const Transactions = () => {
  const dispatch = useDispatch();
  const [rowsPerPage] = useState(8);
  const [paymentsResponse, setPaymentsResponse] = useState(INITIAL_PAYMENTS);
  const [ordersResponse, setOrdersResponse] = useState(INITIAL_ORDERS);
  const [paymentsError, setPaymentsError] = useState(false);
  const [ordersError, setOrdersError] = useState(false);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  const [isListLoading, setIsListLoading] = useState(false);
  const [isPayAllLoading, setIsPayAllLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const { userId, emailAddress, balance } = useSelector((state) => state.usersReducer.profile);
  const { isToastNotificationOpen, apiResponse } = useSelector(
    (state) => state.notificationsReducer
  );

  const updateBalance = (balance) => {
    dispatch(setBalance(balance));
  };

  const onApiResponse = (response) => dispatch(setApiResponse(response));

  const openToastNotification = (bool) => dispatch(setToastNotificationOpen(bool));

  const handleClose = () => {
    openToastNotification(false);
  };

  const handleApiResponse = (response) => {
    onApiResponse(response);
    openToastNotification(true);
  };

  const handleOrdersLoadMore = async (page) => {
    setIsListLoading(true);
    try {
      const response = await getUserOrders(userId, page, rowsPerPage);
      setOrdersResponse((prevState) => ({
        ...prevState,
        current_page: response.current_page,
        transactions: prevState.transactions.concat(response.transactions)
      }));
      setOrdersError(false);
    } catch (err) {
      console.log(err);
      setOrdersError(true);
    }
    setIsListLoading(false);
  };

  const handlePaymentsLoadMore = async (page) => {
    setIsListLoading(true);
    try {
      const response = await getUserPayments(userId, page, rowsPerPage);
      setPaymentsResponse((prevState) => ({
        ...prevState,
        current_page: response.current_page,
        payments: prevState.payments.concat(response.payments)
      }));
      setPaymentsError(false);
    } catch (err) {
      console.log(err);
      setPaymentsError(true);
    }
    setIsListLoading(false);
  };

  const handleMakePayment = async () => {
    setIsPayAllLoading(true);
    try {
      await makePayment(userId, null, null, emailAddress, true);
      updateBalance(0);
      handleApiResponse('PAYMENT_SUCCESS');
    } catch (err) {
      console.log(err);
      handleApiResponse('ERROR');
    }
    resetTransactions();
    setIsPayAllLoading(false);
  };

  const handleChangeTab = (event, value) => {
    setTabValue(value);
    resetTransactions();
  };

  const resetTransactions = async () => {
    if (userId) {
      try {
        const orderResponse = await getUserOrders(userId, 0, rowsPerPage);
        setOrdersResponse(orderResponse);
        setOrdersError(false);
      } catch (err) {
        console.log(err);
        setOrdersError(true);
      }
      try {
        const paymentResponse = await getUserPayments(userId, 0, rowsPerPage);
        setPaymentsResponse(paymentResponse);
        setPaymentsError(false);
      } catch (err) {
        console.log(err);
        setPaymentsError(true);
      }
      setIsInitialLoaded(true);
    }
  };

  const resetAll = (amount) => {
    resetTransactions();
    updateBalance(balance - amount);
  };

  useEffect(async () => {
    await resetTransactions();
  }, [userId]);

  return (
    <div className={styles.base}>
      <div className={styles.header__container}>
        <Tabs
          value={tabValue}
          TabIndicatorProps={{ children: <span /> }}
          onChange={handleChangeTab}
        >
          <Tab disableRipple label='Orders' />
          <Tab disableRipple label='Payments History' />
        </Tabs>
        {tabValue === 0 ? (
          <div className={styles.action__button__container}>
            <AppButton
              primary
              loading={isPayAllLoading}
              disabled={balance === 0 || ordersError}
              onClick={handleMakePayment}
            >
              Pay All
            </AppButton>
          </div>
        ) : null}
      </div>
      <TabPanel value={tabValue} index={0}>
        <TransactionsContainer
          data={ordersResponse}
          error={ordersError}
          rowsPerPage={rowsPerPage}
          isInitialLoaded={isInitialLoaded}
          isLoading={isListLoading}
          onHandleApiResponse={handleApiResponse}
          onLoadMore={handleOrdersLoadMore}
          onReload={resetAll}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <TransactionsContainer
          data={paymentsResponse}
          error={paymentsError}
          rowsPerPage={rowsPerPage}
          isInitialLoaded={isInitialLoaded}
          isLoading={isListLoading}
          onLoadMore={handlePaymentsLoadMore}
        />
      </TabPanel>
      <ToastNotification
        open={isToastNotificationOpen}
        notification={NOTIFICATIONS[apiResponse]}
        onClose={handleClose}
      />
    </div>
  );
};

export default Transactions;
