import React, { Fragment } from 'react';
import {
  setIsEditOrderOpen,
  setOrderToEdit
} from '../redux/features/transactions/transactionsSlice';

import AppButton from './AppButton';
import { CircularProgress } from '@material-ui/core';
import OrderCard from './OrderCard';
import PaymentCard from './PaymentCard';
import styles from '../styles/TransactionsCard.module.css';
import { useDispatch } from 'react-redux';

const TransactionsContainer = (props) => {
  const { data, isInitialLoaded, isLoading, onLoadMore } = props;
  const { transactions, payments, total_pages, current_page, total_rows } = data;

  const dispatch = useDispatch();

  const setEditOrderOpen = () => dispatch(setIsEditOrderOpen(true));
  const setOrderEdit = (order) => dispatch(setOrderToEdit(order));

  const openEditOrderDialog = (order) => {
    setOrderEdit(order);
    setEditOrderOpen(true);
  };

  const displayEmptyMessage = () => {
    if (isInitialLoaded) {
      if (total_rows === 0) {
        return <p>There is nothing to display.</p>;
      } else {
        return <p>There are no more transactions to display.</p>;
      }
    }
  };

  const renderOrdersHeader = () => {
    return (
      <Fragment>
        <div className={styles.column__field}>
          <p className={styles.column__text}>Order Date</p>
        </div>
        <div className={styles.column__field}>
          <p className={styles.column__text}>Snack Name</p>
        </div>
        <div className={styles.column__field__small}>
          <p className={styles.column__text}>Quantity</p>
        </div>
        <div className={styles.column__field__small}>
          <p className={styles.column__text}>Amount</p>
        </div>
        <div className={styles.column__field__small}>
          <p className={styles.column__text}>Status</p>
        </div>
        <div className={styles.column__field__small}>
          <p className={styles.column__text}>Actions</p>
        </div>
      </Fragment>
    );
  };

  const renderPaymentsHeader = () => {
    return (
      <Fragment>
        <div className={styles.column__field__pay}>
          <p>Payment Date</p>
        </div>
        <div className={styles.column__field__pay}>
          <p>Amount</p>
        </div>
        <div className={styles.column__field__pay}>
          <p>Processed By</p>
        </div>
      </Fragment>
    );
  };

  return (
    <div className={styles.base}>
      <div className={styles.table__header}>
        {transactions ? renderOrdersHeader() : null}
        {payments ? renderPaymentsHeader() : null}
      </div>
      {isInitialLoaded ? (
        transactions?.map((order, i) => (
          <OrderCard key={i} order={order} onEdit={openEditOrderDialog} />
        ))
      ) : (
        <CircularProgress color='secondary' size={30} thickness={5} />
      )}
      {payments?.map((payment, i) => (
        <PaymentCard key={i} payment={payment} />
      ))}
      {isInitialLoaded && current_page + 1 < total_pages ? (
        <div className={styles.load__button__container}>
          <AppButton
            primary
            fullWidth
            loading={isLoading}
            onClick={() => onLoadMore(current_page + 1)}
          >
            Load More
          </AppButton>
        </div>
      ) : (
        displayEmptyMessage()
      )}
    </div>
  );
};

export default TransactionsContainer;
