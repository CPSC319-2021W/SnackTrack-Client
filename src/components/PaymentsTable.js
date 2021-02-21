import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';

import React from 'react';
import { DateTime as dt } from 'luxon';
import styles from '../styles/PaymentsTable.module.css';

const PaymentsTable = (props) => {
  const { data, rowsPerPage, onChangePage } = props;
  const { payments } = data;
  const currentPage = data.current_page;
  const totalRows = data.total_rows;
  const totalPages = data.total_pages;

  const emptyRows = () => {
    const rowsToFill = rowsPerPage - payments.length;
    return [...Array(rowsToFill).keys()];
  };

  const columns = [
    {
      id: 'payment_dtm',
      label: 'Payment Date',
      format: (timestamp) => {
        return dt.fromISO(timestamp).toLocaleString(dt.DATETIME_MED);
      }
    },
    {
      id: 'payment_amount',
      label: 'Amount',
      format: (amount) => {
        amount = amount / 100;
        return `$${amount.toFixed(2)}`;
      }
    },
    {
      id: 'created_by',
      label: 'Processed By'
    }
  ];

  return (
    <Card>
      <Table aria-label='Payments Table'>
        <TableHead>
          <TableRow>
            <TableCell className={styles.primaryHeader} colSpan={columns.length}>
              <h3 className={styles.primaryHeader__text}>Payments</h3>
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
          {payments.map((payment, i) => {
            return (
              <TableRow key={i} tabIndex={-1}>
                {columns.map((column) => {
                  const value = payment[column.id];
                  return (
                    <TableCell key={column.id} className={styles.cell}>
                      {column.id === 'payment_amount' || column.id === 'payment_dtm'
                        ? column.format(value)
                        : value}
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

export default PaymentsTable;
