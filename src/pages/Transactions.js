import { Fragment, React, useEffect, useState } from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { getUserOrders, getUserPayments } from '../services/UsersService';
import {
  setApiResponse,
  setToastNotificationOpen
} from '../redux/features/notifications/notificationsSlice';
import { useDispatch, useSelector } from 'react-redux';

import AppButton from '../components/AppButton';
import EditOrderDialog from '../components/EditOrderDialog';
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
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  const [isListLoading, setIsListLoading] = useState(false);
  const [isPayAllLoading, setIsPayAllLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const { userId, username } = useSelector((state) => state.usersReducer.profile);
  const { isToastNotificationOpen, apiResponse } = useSelector(
    (state) => state.notificationsReducer
  );
  const { isEditOrderOpen, orderToEdit } = useSelector(
    (state) => state.transactionsReducer
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
    } catch (err) {
      handleApiResponse('ERROR');
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
    } catch (err) {
      handleApiResponse('ERROR');
    }
    setIsListLoading(false);
  };

  const handleMakePayment = async () => {
    setIsPayAllLoading(true);
    try {
      await makePayment(userId, [], null, username);
      updateBalance(0);
      handleApiResponse('PAYMENT_SUCCESS');
    } catch (err) {
      handleApiResponse('ERROR');
    }
    await resetTransactions();
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
      } catch (err) {
        openToastNotification(true);
        handleApiResponse('ERROR');
      }
      try {
        const paymentResponse = await getUserPayments(userId, 0, rowsPerPage);
        setPaymentsResponse(paymentResponse);
      } catch (err) {
        openToastNotification(true);
        handleApiResponse('ERROR');
      }
      setIsInitialLoaded(true);
    }
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
          <Tab disableRipple label='Payments' />
        </Tabs>
        {tabValue === 0 ? (
          <div className={styles.action__button__container}>
            <AppButton primary loading={isPayAllLoading} onClick={handleMakePayment}>
              Pay All
            </AppButton>
          </div>
        ) : null}
      </div>
      <TabPanel value={tabValue} index={0}>
        <TransactionsContainer
          data={ordersResponse}
          rowsPerPage={rowsPerPage}
          isInitialLoaded={isInitialLoaded}
          isLoading={isListLoading}
          onLoadMore={handleOrdersLoadMore}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <TransactionsContainer
          data={paymentsResponse}
          rowsPerPage={rowsPerPage}
          isInitialLoaded={isInitialLoaded}
          isLoading={isListLoading}
          onLoadMore={handlePaymentsLoadMore}
        />
      </TabPanel>
      <EditOrderDialog open={isEditOrderOpen} transaction={orderToEdit} />
      <ToastNotification
        open={isToastNotificationOpen}
        notification={NOTIFICATIONS[apiResponse]}
        onClose={handleClose}
      />
    </div>
  );
};

export default Transactions;
