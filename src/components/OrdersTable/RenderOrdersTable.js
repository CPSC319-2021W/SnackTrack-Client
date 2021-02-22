import {
  Button,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';
import { isCancelled, isPaid, isPaymentPending } from '../../helpers/OrdersHelpers';

import React from 'react';
import classNames from 'classnames';
import { DateTime as dt } from 'luxon';
import styles from '../../styles/Table.module.css';

const RenderOrdersTable = (props) => {
  const {
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

  const emptyRows = () => {
    let numRows = 0;
    if (transactions != null) {
      numRows = transactions.length;
    }
    const rowsToFill = rowsPerPage - numRows;
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
                [styles.status__cancelled]: true
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
                [styles.status__paid]: true
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
              [styles.status__pending]: true
            })}
          >
            PENDING
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
      <TableContainer>
        <Table className={styles.table} aria-label='Orders Table'>
          <TableHead>
            <TableRow className={styles.header}>
              <TableCell className={styles.primaryHeader} colSpan={columns.length - 1}>
                <h4 className={styles.primaryHeader__text}>Orders</h4>
              </TableCell>
              <TableCell className={styles.cell__pay}>
                <Button
                  className={styles.button__pay}
                  disabled={payForOrdersDisabled}
                  onClick={() => onPayForOrders()}
                >
                  Pay for
                  {selectedOrders.length > 1
                    ? ` ${selectedOrders.length} Orders`
                    : ' Order'}
                </Button>
              </TableCell>
            </TableRow>
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
            {transactions.map((order, i) => {
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
                        className={`${styles.cell} ${styles.cell__small} ${
                          column.id === 'transaction_type_id' ? styles.cell__large : null
                        } ${column.id !== 'checkbox' ? styles.cell__medium : null}`}
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
                            <Button className={styles.button__edit}>Edit Order</Button>
                          ) : null}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
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
          <TableFooter>
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
          </TableFooter>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default RenderOrdersTable;
