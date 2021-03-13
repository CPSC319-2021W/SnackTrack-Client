import React from 'react';
import { useDispatch } from 'react-redux';

import {
  setIsEditOrderOpen,
  setOrderToEdit
} from '../redux/features/transactions/transactionsSlice';

import AppButton from './AppButton';
import OrderCard from './OrderCard';
import PaymentCard from './PaymentCard';
import styles from '../styles/TransactionsContainer.module.css';

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

  return (
    <div className={styles.base}>
      {transactions?.map((order, i) => (
        <OrderCard key={i} order={order} onEdit={openEditOrderDialog} />
      ))}
      {payments?.map((payment, i) => (
        <PaymentCard key={i} payment={payment} />
      ))}
      {
        (current_page < total_pages)
          ? (
            <div className={styles.button__container}>
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