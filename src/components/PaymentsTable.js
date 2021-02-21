import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';

import React, { Fragment } from 'react';
import { ReactComponent as SadFace } from '../assets/placeholders/sad.svg';
import { DateTime as dt } from 'luxon';
import styles from '../styles/Table.module.css';

const PaymentsTable = (props) => {
  const { error, data, rowsPerPage, onChangePage } = props;
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

  const renderPlaceholder = () => {
    return (
      <TableRow>
        <TableCell colSpan={3} className={styles.placeholder__container}>
          <div className={styles.placeholder__image__container}>
            <SadFace className={styles.placeholder__image} />
            <h6 className={styles.placeholder__text}>
              {'rip'}
            </h6>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  const renderRows = () => {
    return (
      <Fragment>
        {payments.map((payment, i) => {
          return (
            <TableRow key={i} tabIndex={-1} className={styles.row}>
              {columns.map((column) => {
                const value = payment[column.id];
                return (
                  <TableCell key={column.id} className={styles.cell__payments}>
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
                return <TableCell key={column.id} className={styles.cell__payments} />;
              })}
            </TableRow>
          );
        })}
      </Fragment>
    );
  };

  return (
    <Card className={styles.paper}>
      <TableContainer className={styles.container__payments}>
        <Table aria-label='Payments Table'>
          <TableHead>
            <TableRow className={styles.header}>
              <TableCell className={styles.primaryHeader} colSpan={columns.length}>
                <h4 className={styles.primaryHeader__text}>Payments</h4>
              </TableCell>
            </TableRow>
            <TableRow className={styles.header__row}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  className={`${styles.secondaryHeader} ${styles.cell__payments}`}
                >
                  <h6 className={styles.secondaryHeader__text}>{column.label}</h6>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            { error ? renderPlaceholder() : renderRows() }
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
      </TableContainer>
    </Card>
  );
};

export default PaymentsTable;
