import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';

import {
  setIsEditOrderOpen,
  setOrderToEdit
} from '../redux/features/transactions/transactionsSlice';

import AppButton from './AppButton';
import OrderCard from './OrderCard';
import PaymentCard from './PaymentCard';
import styles from '../styles/TransactionsCard.module.css';

const TransactionsContainer = (props) => {
  const { data, isLoading, onLoadMore } = props;
  const { transactions, payments, total_pages, current_page } = data;

  const dispatch = useDispatch();

  const setEditOrderOpen = () => dispatch(setIsEditOrderOpen(true));
  const setOrderEdit = (order) => dispatch(setOrderToEdit(order));
  
  const openEditOrderDialog = (order) => {
    setOrderEdit(order);
    setEditOrderOpen(true);
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
        { transactions ? renderOrdersHeader() : null }
        { payments ? renderPaymentsHeader() : null }
      </div>
      {transactions?.map((order, i) => (
        <OrderCard key={i} order={order} onEdit={openEditOrderDialog} />
      ))}
      {payments?.map((payment, i) => (
        <PaymentCard key={i} payment={payment} />
      ))}
      {
        (current_page < total_pages)
          ? (
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
          )
          : null
      }
    </div>
  );
};

export default TransactionsContainer;
