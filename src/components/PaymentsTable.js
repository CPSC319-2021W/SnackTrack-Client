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

import { ReactComponent as SadFace } from '../assets/placeholders/sad.svg';
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

  const renderPlaceholder = () => {
    return (
      <TableRow>
        <TableCell colSpan={columns.length} className={styles.placeholder__container}>
          <div className={styles.placeholder__image__container}>
            <SadFace className={styles.placeholder__image} />
            <h6 className={styles.placeholder__text}>{'rip'}</h6>
          </div>
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
              <TableRow key={i} tabIndex={-1} className={styles.row}>
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

  const columns = [
    {
      id: 'payment_dtm',
      label: 'Payment Date',
      format: (timestamp) => {
        return dt.fromISO(timestamp).toLocaleString(dt.DATE_SHORT);
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
          <TableBody>{error ? renderPlaceholder() : renderRows()}</TableBody>
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
