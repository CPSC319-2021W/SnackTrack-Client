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

import React from 'react';
import { DateTime as dt } from 'luxon';
import styles from '../styles/Table.module.css';
import { useSelector } from 'react-redux';

const SnackBatchesSubTable = (props) => {
  const { id, open, colSpan } = props;
  const { snackBatches } = useSelector((state) => state.snacksReducer);

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
      id: 'expiry_dtm',
      label: 'Expiration Date',
      format: (timestamp) => {
        return timestamp ? dt.fromISO(timestamp).toLocaleString(dt.DATE_SHORT) : 'N/A';
      }
    },
    {
      id: 'actions',
      label: 'Actions',
      format: () => (
        <Button className={styles.button__batch_edit} onClick={() => {}}>
          Edit
        </Button>
      )
    }
  ];

  return (
    <TableRow>
      <TableCell className={styles.subtable__container} colSpan={7}>
        <Collapse in={open === id} timeout='auto'>
          <Divider />
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
                    <TableRow key={i} tabIndex={-1} className={styles.row}>
                      {columns.map((column) => {
                        let value = batch[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            className={`${styles.cell} ${styles.cell__small}`}
                          >
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={colSpan}>There is nothing to display.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default SnackBatchesSubTable;
