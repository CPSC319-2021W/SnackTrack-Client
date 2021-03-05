/*eslint-disable */
import {
  Button,
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

import { CATEGORIES_LIST } from '../constants';
import React from 'react';
import classNames from 'classnames';
import { DateTime as dt } from 'luxon';
import styles from '../styles/Table.module.css';

const SnackInventoryTable = (props) => {
  const { activeSnacks, data, rowsPerPage, onChangePage } = props;
  const { snacks, current_page, total_rows, total_pages } = data;
  const DEFAULT_ORDER_THRESHOLD = 10;

  const emptyRows = () => {
    const rowsToFill = rowsPerPage - snacks.length;
    return [...Array(rowsToFill).keys()];
  };

  const columns = [
    {
      id: 'snack_name',
      label: 'Name'
    },
    {
      id: 'snack_type_id',
      label: 'Category',
      format: (snackTypeId) => {
        return CATEGORIES_LIST[snackTypeId]?.name;
      }
    },
    {
      id: 'description',
      label: 'Description'
    },
    {
      id: 'price',
      label: 'Price',
      format: (amount) => {
        const price = amount / 100;
        return `$${price.toFixed(2)}`;
      }
    },
    {
      id: 'quantity',
      label: 'Quantity'
    },
    {
      id: 'status',
      label: 'Status',
      format: (quantity, isActive, orderThreshold) => {
        orderThreshold = orderThreshold || DEFAULT_ORDER_THRESHOLD;
        let statusLabel = 'IN STOCK';
        if (isActive === false) {
          statusLabel = 'INACTIVE';
        } else if (quantity === 0) {
          statusLabel = 'OUT OF STOCK';
        } else if (quantity < orderThreshold) {
          statusLabel = 'LOW ON STOCK';
        }
        return (
          <span
            className={classNames({
              [styles.status__bar]: true,
              [styles.status__grey]: !isActive,
              [styles.status__red]: quantity === 0,
              [styles.status__orange]: quantity < orderThreshold,
              [styles.status__green]: isActive && quantity >= orderThreshold
            })}
          >
            {statusLabel}
          </span>
        );
      }
    },
    {
      id: 'last_updated_dtm',
      label: 'Last Updated On',
      format: (timestamp) => {
        return dt.fromISO(timestamp).toLocaleString(dt.DATE_SHORT);
      }
    },
    {
      id: 'last_updated_by',
      label: 'Last Updated By'
    },
    {
      id: 'actions',
      label: 'Actions',
      format: () => (
        <Button className={styles.button__edit} onClick={() => {}}>
          Edit
        </Button>
      )
    }
  ];

  return (
    <Card className={styles.paper}>
      <div className={styles.header}>
        <div className={styles.primaryHeader}>
          <h4 className={styles.primaryHeader__text}>
            {activeSnacks ? 'Active Snacks' : 'Inactive Snacks'}
          </h4>
        </div>
        <div className={styles.cell__pay}>
          <Button className={styles.button__base} onClick={() => {}}>
            Add New Snack
          </Button>
        </div>
      </div>
      <TableContainer>
        <Table className={styles.table} aria-label='Snack Inventory Table'>
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
            {snacks.map((snack, i) => {
              return (
                <>
                  <TableRow key={i} tabIndex={-1} className={styles.row}>
                    {columns.map((column) => {
                      let value;
                      if (column.id === 'status') {
                        value = snack['quantity'];
                      } else {
                        value = snack[column.id];
                      }
                      return (
                        <TableCell
                          key={column.id}
                          className={`${styles.cell} ${styles.cell__small} ${
                            column.label === 'Status' ||
                            column.id === 'snack_name' ||
                            column.id === 'description'
                              ? styles.cell__medium
                              : null
                          }`}
                        >
                          {column.format
                            ? column.format(
                                value,
                                snacks[i].is_active,
                                snacks[i].order_threshold
                              )
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </>
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
                onChangePage={(event, page) => onChangePage(page, activeSnacks)}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default SnackInventoryTable;
