import React, { Fragment, useState } from 'react';
import { CircularProgress } from '@material-ui/core';

import AppButton from './AppButton';
import ConfirmationDialog from './ConfirmationDialog';
import { GENERIC_ERROR } from '../constants';
import OrderCard from './OrderCard';
import PaymentCard from './PaymentCard';
import { cancelOrder } from '../services/TransactionsService';
import dialogStyles from '../styles/Dialog.module.css';
import styles from '../styles/TransactionsCard.module.css';

const TransactionsContainer = (props) => {
  const { data, error, isInitialLoaded, isLoading, onLoadMore, onReload, onHandleApiResponse } = props;
  const { transactions, payments, total_pages, current_page, total_rows } = data;

  const [orderToCancel, setOrderToCancel] = useState(null);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isCancelLoading, setIsCancelLoading] = useState(false);

  const handleOpenDialog = (order) => {
    setOrderToCancel(order);
    setIsCancelDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsCancelDialogOpen(false);
  };

  const handleCancelOrder = async () => {
    setIsCancelLoading(true);
    try {
      const { transaction_id } = orderToCancel;
      const { transaction_amount } = await cancelOrder(transaction_id);
      onReload(transaction_amount);
    } catch (err) {
      console.log(err);
      onHandleApiResponse('ERROR');
    }
    setIsCancelLoading(false);
    setIsCancelDialogOpen(false);
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

  const renderError = () => {
    return (
      <span className={styles.error__message}>
        { GENERIC_ERROR }
      </span>
    );
  };

  const renderTransactions = () => {
    return (
      <Fragment>
        {isInitialLoaded ? (
          transactions?.map((order, i) => (
            <OrderCard key={i} order={order} onCancel={handleOpenDialog} />
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
      </Fragment>
    );
  };

  return (
    <div className={styles.base}>
      <div className={styles.table__header}>
        {transactions ? renderOrdersHeader() : null}
        {payments ? renderPaymentsHeader() : null}
      </div>
      { error ? renderError() : renderTransactions() }
      <ConfirmationDialog
        open={isCancelDialogOpen}
        title={'Wait a sec!'}
        submitText={'Yes, cancel'}
        declineText={'No, keep'}
        isSubmitLoading={isCancelLoading}
        handleClose={handleCloseDialog}
        onDecline={handleCloseDialog}
        onSubmit={handleCancelOrder}
      >
        Are you sure you want to cancel your order of
        <span className={dialogStyles.text__emp}>
          {` ${orderToCancel?.snack_name}`}
        </span>
        ?
      </ConfirmationDialog>
    </div>
  );
};

export default TransactionsContainer;
