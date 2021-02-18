import {
  Button,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';
import { isCancelled, isPaid, isPaymentPending } from '../helpers/TransactionsHelpers';

import React from 'react';
import styles from '../styles/TransactionsTable.module.css';

const TransactionsTable = (props) => {
  const {
    data,
    rowsPerPage,
    onChangePage,
    onSelectAllTransactions,
    onSelectTransaction,
    checkIsSelected,
    checkIsAllSelected,
    onPayForOrders,
    payForOrdersDisabled
  } = props;
  const { transactions, currentPage, totalRows, totalPages } = data;

  const emptyRows = () => {
    const rowsToFill = rowsPerPage - transactions.length;
    return [...Array(rowsToFill).keys()];
  };

  const columns = [
    {
      id: 'checkbox',
      label: (
        <Checkbox
          size='small'
          checked={checkIsAllSelected(currentPage)}
          onClick={(event) => onSelectAllTransactions(event)}
        />
      )
    },
    {
      id: 'transaction_dtm',
      label: 'Order Date'
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
      id: 'status',
      label: 'Status',
      format: (status, paymentId) => {
        if (isCancelled(status)) {
          return <span className={styles.status__cancelled}>CANCELLED</span>;
        } else if (isPaid(paymentId)) {
          return <span className={styles.status__paid}>PAID</span>;
        }
        return <span className={styles.status__pending}>PAYMENT PENDING</span>;
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
      <Table className={styles.table} aria-label='Transactions Table'>
        <TableHead>
          <TableRow>
            <TableCell className={styles.primaryHeader} colSpan={columns.length - 1}>
              <h3 className={styles.primaryHeader__text}>Orders</h3>
            </TableCell>
            <TableCell className={styles.cell__pay}>
              <Button
                className={styles.button__pay}
                disabled={payForOrdersDisabled}
                onClick={() => onPayForOrders()}
              >
                Pay For Orders
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                className={`${styles.secondaryHeader} ${styles.cell}`}
              >
                <h4 className={styles.secondaryHeader__text}>{column.label}</h4>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction, i) => {
            return (
              <TableRow key={i} tabIndex={-1}>
                {columns.map((column) => {
                  const value = transaction[column.id];
                  return (
                    <TableCell
                      key={column.id}
                      className={`${styles.cell} ${styles.cell__small} ${
                        column.id === 'status' ? styles.cell__large : null
                      } ${column.id !== 'checkbox' ? styles.cell__medium : null}`}
                    >
                      {column.format && typeof value === 'number'
                        ? column.format(value)
                        : column.id === 'status'
                          ? column.format(value, transaction['payment_id'])
                          : value}
                      {column.id === 'checkbox' &&
                      isPaymentPending(
                        transactions[i].payment_id,
                        transactions[i].status
                      ) ? (
                        <Checkbox
                            size='small'
                            checked={checkIsSelected(transactions[i].transaction_id)}
                            onClick={() =>
                              onSelectTransaction(
                                transactions[i].transaction_id,
                                transactions[i].transaction_amount
                              )
                            }
                          />
                        ) : null}
                      {column.id === 'actions' &&
                      isPaymentPending(
                        transactions[i].payment_id,
                        transactions[i].status
                      ) ? (
                        <Button className={styles.button__edit} variant='outlined'>
                            Edit Order
                          </Button>
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
              count={totalRows}
              page={currentPage}
              rowsPerPage={rowsPerPage}
              labelDisplayedRows={({ page }) => `Page ${page + 1} of ${totalPages}`}
              rowsPerPageOptions={[rowsPerPage]}
              onChangePage={(event, page) => onChangePage(page)}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Card>
  );
};

export default TransactionsTable;
