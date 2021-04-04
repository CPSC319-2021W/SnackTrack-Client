import {
  Button,
  Collapse,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import {
  setIsEditBatchOpen,
  setSelectedBatch
} from '../redux/features/snacks/snacksSlice';
import { useDispatch, useSelector } from 'react-redux';

import React from 'react';
import classNames from 'classnames';
import { DateTime as dt } from 'luxon';
import styles from '../styles/Table.module.css';

const SnackBatchesSubTable = (props) => {
  const dispatch = useDispatch();
  const { id, snackName, open, colSpan, isLastChild } = props;
  const { snackBatches } = useSelector((state) => state.snacksReducer);
  const today = dt.now().set({ hour: 0, minute: 0 });
  const expiringSoon = dt.now().set({ hour: 0, minute: 0 }).plus({ days: 3 });

  const isBatchExpired = (column, timestamp) => {
    return (
      column === 'expiration_dtm' &&
      expiringSoon > dt.fromISO(timestamp) &&
      dt.fromISO(timestamp) > today
    );
  };

  const isBatchExpiring = (column, timestamp) => {
    return column === 'expiration_dtm' && today > dt.fromISO(timestamp);
  };

  const setEditBatchOpen = () => dispatch(setIsEditBatchOpen(true));
  const setBatchSelect = (batch) => dispatch(setSelectedBatch(batch));

  const handleEditBatch = (batch) => {
    setBatchSelect({ ...batch, snack_name: snackName });
    setEditBatchOpen(true);
  };

  const columns = [
    {
      id: 'snack_batch_id',
      label: 'Batch ID'
    },
    {
      id: 'quantity',
      label: 'Quantity'
    },
    {
      id: 'expiration_dtm',
      label: 'Expiration Date',
      format: (timestamp) => {
        return timestamp ? dt.fromISO(timestamp).toLocaleString(dt.DATE_SHORT) : 'N/A';
      }
    },
    {
      id: 'actions',
      label: 'Actions',
      format: (none, i) => {
        return (
          <Button
            className={styles.button__batch_edit}
            onClick={() => handleEditBatch(snackBatches[i])}
          >
            Edit
          </Button>
        );
      }
    }
  ];

  return (
    <TableRow className={isLastChild && open === id ? styles.row__lastChild__sub : null}>
      <TableCell className={styles.subtable__container} colSpan={colSpan}>
        <Collapse in={open === id} timeout='auto'>
          <Table className={styles.subtable} aria-label='batches'>
            <TableHead>
              <TableRow>
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
              {snackBatches.length > 0 ? (
                snackBatches.map((batch, i) => {
                  return (
                    <TableRow key={i} tabIndex={-1} className={styles.row__sub}>
                      {columns.map((column) => {
                        let value = batch[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            className={classNames({
                              [styles.cell]: true,
                              [styles.cell__small]: true,
                              [styles.date__expiring]: isBatchExpired(column.id, value),
                              [styles.date__expired]: isBatchExpiring(column.id, value)
                            })}
                          >
                            {column.format ? column.format(value, i) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow className={styles.row__sub}>
                  <TableCell colSpan={colSpan}>There is nothing to display.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          { isLastChild ? null : <Divider /> }
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default SnackBatchesSubTable;
