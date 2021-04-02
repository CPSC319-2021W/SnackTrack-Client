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
import { Fragment, React, useEffect } from 'react';
import {
  setIsAddBatchOpen,
  setIsAddSnackOpen,
  setIsEditSnackOpen,
  setSelectedBatch,
  setSelectedSnackForBatch,
  setSelectedSnackToEdit,
  setSnackBatches
} from '../redux/features/snacks/snacksSlice';
import { useDispatch, useSelector } from 'react-redux';

import AddBatchSelect from '../components/AddBatchSelect';
import AddSnackDialog from './AddSnackDialog';
import AppButton from '../components/AppButton';
import { CATEGORIES_LIST } from '../constants';
import EditSnackDialog from './EditSnackDialog';
import ManageBatchDialog from '../components/ManageBatchDialog';
import SnackBatchesSubTable from './SnackBatchesSubTable';
import classNames from 'classnames';
import { getSnackBatch } from '../services/SnacksService';
import styles from '../styles/Table.module.css';

const SnackInventoryTable = (props) => {
  const dispatch = useDispatch();
  const DEFAULT_ORDER_THRESHOLD = 10;
  const {
    isLoaded,
    isEmpty,
    snacksForAddBatch,
    activeSnacks,
    data,
    rowsPerPage,
    onAddBatchOrEdit,
    onDeleteBatch,
    onChangePage
  } = props;
  const { snacks, current_page, total_rows, total_pages } = data;
  const {
    selectedSnackForBatch,
    selectedBatch,
    isAddBatchOpen,
    isEditBatchOpen,
    isAddSnackOpen,
    isEditSnackOpen
  } = useSelector((state) => state.snacksReducer);

  const setSelectedSnack = (snackId) => {
    dispatch(setSelectedSnackForBatch(snackId));
  };

  const setBatches = (batches) => {
    dispatch(setSnackBatches(batches));
  };

  const setSnackToEdit = (snack) => {
    dispatch(setSelectedSnackToEdit(snack));
  };

  const emptyRows = () => {
    const emptyValue = isEmpty ? 1 : 0;
    const rowsToFill = rowsPerPage - snacks.length - emptyValue;
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

  const handleOpenRow = async (snackId) => {
    if (activeSnacks) {
      await handleGetSnackBatch(snackId);
    }
  };

  const onEditSnack = (snack) => {
    setSnackToEdit(snack);
    setEditSnackOpen();
  };

  const setAddBatchOpen = () => dispatch(setIsAddBatchOpen(true));

  const setBatchSelect = (batch) => dispatch(setSelectedBatch(batch));

  const handleAddBatch = (option) => {
    setBatchSelect({
      snack_id: option.value,
      snack_name: option.label
    });
    setAddBatchOpen(true);
  };

  useEffect(() => {
    setSelectedSnack(false);
  }, []);

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
      format: (snack) => (
        <AppButton
          secondary
          small
          onClick={(e) => {
            e.stopPropagation();
            onEditSnack(snack);
          }}
        >
          Edit
        </AppButton>
      )
    }
  ];

  const setAddSnackOpen = () => dispatch(setIsAddSnackOpen(true));

  const setEditSnackOpen = () => dispatch(setIsEditSnackOpen(true));

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
              <AppButton primary onClick={setAddSnackOpen}>
                Add New Snack
              </AppButton>
            </div>
          </div>
        ) : null}
      </div>
      <TableContainer>
        <Table aria-label='Snack Inventory Table'>
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
            {isLoaded ? (
              snacks.map((snack, i) => {
                return (
                  <Fragment key={i}>
                    <TableRow
                      key={i}
                      tabIndex={-1}
                      className={classNames({
                        [styles.row]: true,
                        [styles.row__selectable]: activeSnacks,
                        [styles.row__selected]:
                          snacks[i].snack_id === selectedSnackForBatch
                      })}
                      onClick={() => handleOpenRow(snacks[i].snack_id)}
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
                              column.label === 'Status' || column.id === 'snack_name'
                                ? styles.cell__medium
                                : null
                            }`}
                            title={column.id === 'snack_name' ? value : null}
                          >
                            {column.id === 'actions'
                              ? column.format(snack)
                              : column.format
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
                    {activeSnacks ? (
                      <SnackBatchesSubTable
                        id={snacks[i]?.snack_id}
                        snackName={snacks[i]?.snack_name}
                        open={selectedSnackForBatch}
                        colSpan={columns.length}
                      />
                    ) : null}
                  </Fragment>
                );
              })
            ) : (
              <TableRow tabIndex={-1}>
                <TableCell
                  className={styles.cell}
                  align='center'
                  colSpan={columns.length}
                >
                  <CircularProgress color='secondary' size={30} thickness={5} />
                </TableCell>
              </TableRow>
            )}
            {isLoaded && isEmpty ? (
              <TableRow tabIndex={-1}>
                <TableCell className={styles.cell} colSpan={columns.length}>
                  <p>There is nothing to display.</p>
                </TableCell>
              </TableRow>
            ) : null}
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
        </Table>
      </TableContainer>
      <Table>
        <TableBody>
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
        </TableBody>
      </Table>
      <AddSnackDialog open={isAddSnackOpen} />
      <EditSnackDialog open={isEditSnackOpen} />
      <ManageBatchDialog
        newSnackBatch
        open={isAddBatchOpen}
        batch={selectedBatch}
        onAddBatchOrEdit={onAddBatchOrEdit}
      />
      <ManageBatchDialog
        open={isEditBatchOpen}
        batch={selectedBatch}
        onDeleteBatch={onDeleteBatch}
        onAddBatchOrEdit={onAddBatchOrEdit}
      />
    </Card>
  );
};

export default SnackInventoryTable;
