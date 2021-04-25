import {
  Card,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';
import React, { Fragment } from 'react';

import { GENERIC_ERROR } from '../constants';
import classNames from 'classnames';
import { DateTime as dt } from 'luxon';
import styles from '../styles/Table.module.css';

const PaymentsTable = (props) => {
  const { isLoaded, isEmpty, error, data, rowsPerPage, onChangePage } = props;
  const { payments } = data;
  const currentPage = data.current_page;
  const totalRows = data.total_rows;
  const totalPages = data.total_pages;

  const emptyRows = () => {
    const emptyValue = isEmpty ? 1 : 0;
    const rowsToFill = rowsPerPage - payments.length - emptyValue;
    return [...Array(rowsToFill).keys()];
  };

  const DATETIME_MED = {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric'
  };

  const ONE_YEAR = 365 * 24 * 60 * 60 * 1000;

  const columns = [
    {
      id: 'payment_dtm',
      label: 'Payment Date',
      format: (timestamp) => {
        const format = (new Date - new Date(timestamp)) > ONE_YEAR ? dt.DATE_MED : DATETIME_MED;
        return dt.fromISO(timestamp).toLocaleString(format);
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

  const renderError = () => {
    return (
      <TableRow className={styles.error__row}>
        <TableCell colSpan={columns.length}>
          <span className={styles.error__message}>
            { GENERIC_ERROR }
          </span>
        </TableCell>
      </TableRow>
    );
  };

  const renderRows = () => {
    return (
      <Fragment>
        {isLoaded ? (
          payments.map((payment, i) => {
            return (
              <TableRow
                key={i}
                tabIndex={-1}
                className={classNames({
                  [styles.row]: true,
                  [styles.row__lastChild]: i === rowsPerPage - 1
                })}
              >
                {columns.map((column) => {
                  const value = payment[column.id];
                  return (
                    <TableCell
                      key={column.id}
                      className={classNames({
                        [styles.cell]: true,
                        [styles.cell__payments__base]: true,
                        [styles.cell__payments__date]: column.id === 'payment_dtm',
                        [styles.cell__payments__processed]: column.id === 'created_by'
                      })}
                      title={column.id === 'created_by' ? value : null}
                    >
                      {column.id === 'payment_amount' || column.id === 'payment_dtm'
                        ? column.format(value)
                        : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })
        ) : (
          <TableRow tabIndex={-1}>
            <TableCell className={styles.cell} align='center' colSpan={columns.length}>
              <CircularProgress color='secondary' size={30} thickness={5} />
            </TableCell>
          </TableRow>
        )}
        {isLoaded && isEmpty ? (
          <TableRow tabIndex={-1}>
            <TableCell
              className={classNames({
                [styles.cell]: true,
                [styles.cell__payments__base]: true
              })}
              colSpan={columns.length}
            >
              <p>There is nothing to display.</p>
            </TableCell>
          </TableRow>
        ) : null}
        {emptyRows().map((row) => {
          return (
            <TableRow key={row} tabIndex={-1}>
              {columns.map((column) => {
                return (
                  <TableCell
                    key={column.id}
                    className={classNames({
                      [styles.cell]: true,
                      [styles.cell__payments__base]: true,
                      [styles.cell__payments__date]: column.id === 'payment_dtm',
                      [styles.cell__payments__processed]: column.id === 'created_by'
                    })}
                  />
                );
              })}
            </TableRow>
          );
        })}
      </Fragment>
    );
  };

  return (
    <Card className={styles.paper}>
      <div className={styles.header}>
        <div className={styles.primaryHeader}>
          <h4 className={styles.primaryHeader__text}>Payments</h4>
        </div>
      </div>
      <TableContainer className={styles.container__payments}>
        <Table aria-label='Payments Table'>
          <TableHead>
            <TableRow className={styles.header__row}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  className={classNames({
                    [styles.secondaryHeader]: true,
                    [styles.cell]: true,
                    [styles.cell__payments__base]: true,
                    [styles.cell__payments__date]: column.id === 'payment_dtm',
                    [styles.cell__payments__processed]: column.id === 'created_by'
                  })}
                >
                  <h6 className={styles.secondaryHeader__text}>{column.label}</h6>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            { error ? renderError() : renderRows() }
          </TableBody>
        </Table>
      </TableContainer>
      <Table>
        <TableBody>
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
        </TableBody>
      </Table>
    </Card>
  );
};

export default PaymentsTable;
