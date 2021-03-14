import {
  Button,
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
import { isCancelled, isPaid, isPaymentPending } from '../../helpers/OrdersHelpers';
import {
  setIsEditOrderOpen,
  setOrderToEdit
} from '../../redux/features/transactions/transactionsSlice';

import React from 'react';
import classNames from 'classnames';
import { DateTime as dt } from 'luxon';
import styles from '../../styles/Table.module.css';
import { useDispatch } from 'react-redux';

const RenderOrdersTable = (props) => {
  const dispatch = useDispatch();
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
    onPayForOrders,
    payForOrdersDisabled,
    isCheckboxDisabled
  } = props;
  const { transactions, current_page, total_rows, total_pages } = data;

  const setEditOrderOpen = () => dispatch(setIsEditOrderOpen(true));
  const setOrderEdit = (order) => dispatch(setOrderToEdit(order));

  const openEditOrderDialog = (order) => {
    setOrderEdit(order);
    setEditOrderOpen(true);
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
          <Button
            className={styles.button__base}
            disabled={payForOrdersDisabled}
            onClick={() => onPayForOrders()}
          >
            Pay for
            {selectedOrders.length > 1 ? ` ${selectedOrders.length} Orders` : ' Order'}
          </Button>
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
                              <Button
                                className={styles.button__edit}
                                onClick={() => openEditOrderDialog(transactions[i])}
                              >
                                Edit Order
                              </Button>
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
    </Card>
  );
};

export default RenderOrdersTable;
