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
import React, { Fragment, useState } from 'react';
import {
  setIsManageBatchOpen,
  setSelectedBatch,
  setSelectedSnackForBatch,
  setSnackBatches
} from '../redux/features/snacks/snacksSlice';
import { useDispatch, useSelector } from 'react-redux';

import AddBatchSelect from '../components/AddBatchSelect';
import { CATEGORIES_LIST } from '../constants';
import ManageBatchDialog from '../components/ManageBatchDialog';
import ManageSnackDialog from './ManageSnackDialog';
import SnackBatchesSubTable from './SnackBatchesSubTable';
import classNames from 'classnames';
import { getSnackBatch } from '../services/SnacksService';
import styles from '../styles/Table.module.css';

const SnackInventoryTable = (props) => {
  const dispatch = useDispatch();
  const DEFAULT_ORDER_THRESHOLD = 10;
  const { snacksForAddBatch, activeSnacks, data, rowsPerPage, onChangePage } = props;
  const { snacks, current_page, total_rows, total_pages } = data;
  const { selectedSnackForBatch, selectedBatch, isManageBatchOpen } = useSelector(
    (state) => state.snacksReducer
  );
  const [isManageSnackOpen, setIsManageSnackOpen] = useState(false);
  const [snackObj, setSnackObj] = useState({});

  const setSelectedSnack = (snackId) => {
    dispatch(setSelectedSnackForBatch(snackId));
  };

  const setBatches = (batches) => {
    dispatch(setSnackBatches(batches));
  };

  const emptyRows = () => {
    const rowsToFill = rowsPerPage - snacks.length;
    return [...Array(rowsToFill).keys()];
  };

  const handleGetSnackBatch = async (snackId) => {
    if (selectedSnackForBatch === snackId) {
      setSelectedSnack(null);
      setTimeout(() => {
        setBatches([]);
      }, 300);
    } else {
      const { snack_batches } = await getSnackBatch(snackId);
      setBatches(snack_batches);
      setSelectedSnack(snackId);
    }
  };

  const setManageBatchOpen = () => dispatch(setIsManageBatchOpen(true));
  const setBatchSelect = (batch) => dispatch(setSelectedBatch(batch));

  const handleAddBatch = (option) => {
    setBatchSelect({
      snack_id: option.value,
      snack_name: option.label
    });
    setManageBatchOpen(true);
  };

  const columns = [
    { id: 'snack_id', label: 'Snack ID' },
    {
      id: 'snack_name',
      label: 'Name'
    },
    {
      id: 'snack_type_id',
      label: 'Category',
      format: (snackTypeId) => {
        return CATEGORIES_LIST[snackTypeId - 1].name;
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
      id: 'actions',
      label: 'Actions',
      format: () => (
        <Button className={styles.button__edit} onClick={() => {}}>
          Edit
        </Button>
      )
    }
  ];

  const handleCloseManageSnack = () => {
    setIsManageSnackOpen(false);
  };

  const openManageSanck = () => {
    setIsManageSnackOpen(true);
  };

  const handleChangeSnackObj = (event) => {
    setSnackObj(event.target.value);
  };

  const handleSubmit = async (event) => {
    if (snackObj === '') {
      return;
    }
    if (event.key === 'Enter' || event.type === 'click') {
      try {
        setIsManageSnackOpen(false);
        setSnackObj({});
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Card className={styles.paper}>
      <div className={styles.header}>
        <div className={styles.primaryHeader}>
          <h4 className={styles.primaryHeader__text}>
            {activeSnacks ? 'Active Snacks' : 'Inactive Snacks'}
          </h4>
        </div>
        {activeSnacks ? (
          <div className={styles.header__actionContainer}>
            <AddBatchSelect
              data={snacksForAddBatch}
              selectedBatch={selectedBatch}
              handleSelectBatch={handleAddBatch}
            />
            <div className={styles.cell__pay}>
              <Button className={styles.button__base} onClick={() => {
                openManageSanck;
              }}>
                Add New Snack
              </Button>
            </div>
          </div>
        ) : null}
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
                <Fragment key={i}>
                  <TableRow
                    key={i}
                    tabIndex={-1}
                    className={classNames({
                      [styles.row]: true,
                      [styles.row__selected]: snacks[i].snack_id === selectedSnackForBatch
                    })}
                    onClick={() => handleGetSnackBatch(snacks[i].snack_id)}
                  >
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
                  <SnackBatchesSubTable
                    id={snacks[i]?.snack_id}
                    open={selectedSnackForBatch}
                    colSpan={columns.length}
                  />
                </Fragment>
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
      <ManageSnackDialog 
        open={isManageSnackOpen}
        value={snackObj}
        handleClose={handleCloseManageSnack}
        onSubmit={handleSubmit}   
        onChange={handleChangeSnackObj}
      />
      <ManageBatchDialog open={isManageBatchOpen} batch={selectedBatch} />
    </Card>
  );
};

export default SnackInventoryTable;
