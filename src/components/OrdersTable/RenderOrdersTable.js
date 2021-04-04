import {
  Card,
  Checkbox,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';
import React, { useState } from 'react';
import { isCancelled, isPaid, isPaymentPending } from '../../helpers/OrdersHelpers';

import AppButton from '../AppButton';
import ConfirmationDialog from '../ConfirmationDialog';
import classNames from 'classnames';
import dialogStyles from '../../styles/Dialog.module.css';
import { DateTime as dt } from 'luxon';
import styles from '../../styles/Table.module.css';

const RenderOrdersTable = (props) => {
  const {
    isLoaded,
    isEmpty,
    data,
    rowsPerPage,
    selectedOrders,
    onChangePage,
    onSelectAllOrders,
    onSelectOrder,
    checkIsSelected,
    checkIsAllSelected,
    balance,
    onPayForOrders,
    onCancelOrder,
    isCheckboxDisabled,
    isPayLoading
  } = props;
  const { transactions, current_page, total_rows, total_pages } = data;
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
    const { transaction_id } = orderToCancel;
    onCancelOrder(transaction_id);
    setIsCancelLoading(false);
    setIsCancelDialogOpen(false);
  };

  const handlePay = async () => {
    if (selectedOrders.length === 0) {
      await onPayForOrders(true);
    } else {
      await onPayForOrders(false);
    }
  };

  const emptyRows = () => {
    const emptyValue = isEmpty ? 1 : 0;
    const rowsToFill = rowsPerPage - transactions.length - emptyValue;
    return [...Array(rowsToFill).keys()];
  };

  const columns = [
    {
      id: 'checkbox',
      label: (
        <Checkbox
          size='small'
          disabled={isCheckboxDisabled}
          checked={checkIsAllSelected(current_page)}
          onClick={(event) => onSelectAllOrders(event)}
        />
      )
    },
    {
      id: 'transaction_dtm',
      label: 'Order Date',
      format: (timestamp) => {
        return dt.fromISO(timestamp).toLocaleString(dt.DATE_SHORT);
      }
    },
    {
      id: 'snack_name',
      label: 'Snack'
    },
    {
      id: 'quantity',
      label: 'Quantity'
    },
    {
      id: 'transaction_type_id',
      label: 'Status',
      format: (status, paymentId) => {
        if (isCancelled(status)) {
          return (
            <span
              className={classNames({
                [styles.status__bar]: true,
                [styles.status__red]: true
              })}
            >
              CANCELLED
            </span>
          );
        } else if (isPaid(paymentId)) {
          return (
            <span
              className={classNames({
                [styles.status__bar]: true,
                [styles.status__green]: true
              })}
            >
              PAID
            </span>
          );
        }
        return (
          <span
            className={classNames({
              [styles.status__bar]: true,
              [styles.status__orange]: true
            })}
          >
            UNPAID
          </span>
        );
      }
    },
    {
      id: 'transaction_amount',
      label: 'Total',
      format: (amount) => {
        amount = amount / 100;
        return `$${amount.toFixed(2)}`;
      }
    },
    {
      id: 'actions',
      label: 'Actions'
    }
  ];

  return (
    <Card className={styles.paper}>
      <div className={styles.header}>
        <div className={styles.primaryHeader}>
          <h4 className={styles.primaryHeader__text}>Orders</h4>
        </div>
        <div className={styles.cell__pay}>
          <AppButton
            primary
            disabled={balance === 0}
            loading={isPayLoading}
            onClick={handlePay}
          >
            {selectedOrders.length === 0
              ? 'Pay All'
              : `Pay for ${selectedOrders.length} Order${
                selectedOrders.length > 1 ? 's' : ''
              }`}
          </AppButton>
        </div>
      </div>
      <TableContainer>
        <Table className={styles.table} aria-label='Orders Table'>
          <TableHead>
            <TableRow className={styles.header__row}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  className={`${styles.secondaryHeader} ${styles.cell}`}
                >
                  <h6 className={styles.secondaryHeader__text}>{column.label}</h6>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoaded ? (
              transactions.map((order, i) => {
                return (
                  <TableRow
                    key={i}
                    tabIndex={-1}
                    className={classNames({
                      [styles.row]: !checkIsSelected(transactions[i].transaction_id),
                      [styles.row__selected]: checkIsSelected(
                        transactions[i].transaction_id
                      )
                    })}
                  >
                    {columns.map((column) => {
                      const value = order[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          className={classNames({
                            [styles.cell]: true,
                            [styles.cell__small]: true,
                            [styles.cell__medium]: column.id !== 'checkbox'
                          })}
                          title={column.id === 'snack_name' ? value : null}
                        >
                          {column.id === 'transaction_type_id'
                            ? column.format(value, order.payment_id)
                            : column.id === 'transaction_amount' ||
                              column.id === 'transaction_dtm'
                              ? column.format(value)
                              : value}
                          {column.id === 'checkbox' &&
                            isPaymentPending(
                              transactions[i].payment_id,
                              transactions[i].transaction_type_id
                            ) ? (
                              <Checkbox
                                size='small'
                                checked={checkIsSelected(transactions[i].transaction_id)}
                                onClick={() =>
                                  onSelectOrder(
                                    transactions[i].transaction_id,
                                    transactions[i].transaction_amount
                                  )
                                }
                              />
                            ) : null}
                          {column.id === 'actions' &&
                            isPaymentPending(
                              transactions[i].payment_id,
                              transactions[i].transaction_type_id
                            ) ? (
                              <AppButton
                                secondary
                                small
                                onClick={() => handleOpenDialog(transactions[i])}
                              >
                                Cancel Order
                              </AppButton>
                            ) : null}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow tabIndex={-1}>
                <TableCell
                  className={styles.cell}
                  align='center'
                  colSpan={columns.length}
                >
                  <CircularProgress color='secondary' size={30} thickness={5} />
                </TableCell>
              </TableRow>
            )}
            {isLoaded && isEmpty ? (
              <TableRow tabIndex={-1}>
                <TableCell className={styles.cell} colSpan={columns.length}>
                  <p>There is nothing to display.</p>
                </TableCell>
              </TableRow>
            ) : null}
            {emptyRows().map((row) => {
              return (
                <TableRow key={row} tabIndex={-1}>
                  {columns.map((column) => {
                    return <TableCell key={column.id} className={styles.cell} />;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TablePagination
              className={styles.pagination}
              count={total_rows}
              page={current_page}
              rowsPerPage={rowsPerPage}
              labelDisplayedRows={({ page }) => `Page ${page + 1} of ${total_pages}`}
              rowsPerPageOptions={[rowsPerPage]}
              onChangePage={(event, page) => onChangePage(page)}
            />
          </TableRow>
        </TableBody>
      </Table>
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
        Are you sure you want to cancel your order of&nbsp;
        <span className={dialogStyles.text__emp}>{orderToCancel?.snack_name}</span>?
      </ConfirmationDialog>
    </Card>
  );
};

export default RenderOrdersTable;
