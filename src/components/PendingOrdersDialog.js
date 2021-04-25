import {
  Checkbox,
  Dialog,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import AppButton from './AppButton';
import { claimPendingOrders } from '../services/TransactionsService';
import { deselectOne } from '../helpers/CheckboxHelpers';
import dialogStyles from '../styles/Dialog.module.css';
import { DateTime as dt } from 'luxon';
import { setBalance } from '../redux/features/users/usersSlice';
import styles from '../styles/Table.module.css';

const PendingOrdersDialog = (props) => {
  const dispatch = useDispatch();
  const { pendingOrders, open, handleOnClose, handleCloseNotAllowed, onHandleApiResponse } = props;
  const { balance } = useSelector((state) => state.usersReducer.profile);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isApproveDisabled, setIsApproveDisabled] = useState(true);
  const [isApproveLoading, setIsApproveLoading] = useState(false);
  const [isDeclineLoading, setIsDeclineLoading] = useState(false);

  const updateBalance = (balance) => dispatch(setBalance(balance));

  const getAllPendingOrderIds = () => pendingOrders.map((order) => order.transaction_id);

  const selectAllOrders = () => {
    let ordersToSelect = pendingOrders.map((order) => order.transaction_id);
    return [].concat(ordersToSelect);
  };

  const deselectAllOrders = () => {
    let ordersToDeselect = [];
    for (const order of selectedOrders) {
      ordersToDeselect = deselectOne(ordersToDeselect, order);
    }
    return ordersToDeselect;
  };

  const onSelectAllOrders = () => {
    if (isAllSelected) {
      const newOrdersSelected = deselectAllOrders();
      setSelectedOrders(newOrdersSelected);
      setIsAllSelected(false);
    } else {
      const newOrdersSelected = selectAllOrders();
      setSelectedOrders(newOrdersSelected);
      setIsAllSelected(true);
    }
  };

  const checkIsSelected = (orderId) => {
    return selectedOrders.indexOf(orderId) !== -1;
  };

  const selectOneOrder = (orderId) => {
    const newSelectedOrders = selectOrder(orderId);
    setSelectedOrders(newSelectedOrders);
  };

  const selectOrder = (orderId) => {
    const index = selectedOrders.indexOf(orderId);

    const orderIsNotSelected = () => {
      return index === -1;
    };

    const orderIsFirstItem = () => {
      return index === 0;
    };

    const orderIsLastItem = () => {
      return index === selectedOrders.length - 1;
    };

    const orderIsSelected = () => {
      return index > 0;
    };

    if (orderIsNotSelected()) {
      return [].concat(selectedOrders, orderId);
    } else if (orderIsFirstItem()) {
      return [].concat(selectedOrders.slice(1));
    } else if (orderIsLastItem()) {
      return [].concat(selectedOrders.slice(0, -1));
    } else if (orderIsSelected()) {
      return [].concat(selectedOrders.slice(0, index), selectedOrders.slice(index + 1));
    }
  };

  const approveOrders = async () => {
    setIsApproveLoading(true);
    try {
      const pendingOrderIds = getAllPendingOrderIds();
      const declinedOrders = pendingOrderIds.filter(
        (orderId) => !selectedOrders.includes(orderId)
      );
      const selected = pendingOrders.filter(
        (order) => selectedOrders.includes(order.transaction_id)
      );
      const finalTotal = selected.reduce((total, order) => total + order.transaction_amount, 0);
      await claimPendingOrders(selectedOrders, declinedOrders);
      updateBalance(balance + finalTotal);
    } catch (err) {
      console.log(err);
      onHandleApiResponse('PENDING_ORDERS_ERROR');
    }
    setIsApproveLoading(false);
    handleOnClose();
  };

  const declineAllOrders = async () => {
    setIsDeclineLoading(true);
    try {
      const pendingOrderIds = getAllPendingOrderIds();
      await claimPendingOrders([], pendingOrderIds);
    } catch (err) {
      console.log(err);
      onHandleApiResponse('PENDING_ORDERS_ERROR');
    }
    setIsDeclineLoading(false);
    handleOnClose();
  };

  useEffect(() => {
    if (selectedOrders.length > 0) {
      setIsApproveDisabled(false);
    } else {
      setIsApproveDisabled(true);
    }
  }, [selectedOrders]);

  useEffect(() => {
    const allItemsChecked = () => {
      return pendingOrders.length > 0 && pendingOrders.length === selectedOrders.length;
    };

    if (allItemsChecked()) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }
  }, [selectedOrders]);

  const columns = [
    {
      id: 'checkbox',
      label: (
        <Checkbox
          size='small'
          checked={isAllSelected}
          onClick={() => onSelectAllOrders()}
        />
      ),
      format: (i) => {
        return (
          <Checkbox
            size='small'
            checked={checkIsSelected(pendingOrders[i].transaction_id)}
            onClick={() => selectOneOrder(pendingOrders[i].transaction_id)}
          />
        );
      }
    },
    {
      id: 'transaction_dtm',
      label: 'Order Date',
      format: (timestamp) => {
        return dt.fromISO(timestamp).toLocaleString(dt.DATETIME_SHORT);
      }
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
      id: 'transaction_amount',
      label: 'Total',
      format: (amount) => {
        amount = amount / 100;
        return `$${amount.toFixed(2)}`;
      }
    }
  ];

  return (
    <Dialog maxWidth={'md'} open={open} onClose={handleCloseNotAllowed}>
      <div className={styles.header}>
        <div className={styles.primaryHeader}>
          <h4 className={styles.primaryHeader__text}>Pending Orders</h4>
        </div>
      </div>
      <Divider />
      <TableContainer>
        <Table aria-label='Pending Orders'>
          <TableHead>
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
            {pendingOrders.map((order, i) => {
              return (
                <TableRow key={i} tabIndex={-1}>
                  {columns.map((column) => {
                    const value = order[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        className={classNames({
                          [styles.cell]: true,
                          [styles.cell__lastChild]: column.id === 'transaction_amount'
                        })}>
                        {column.id === 'transaction_amount' ||
                        column.id === 'transaction_dtm'
                          ? column.format(value)
                          : column.id === 'checkbox'
                            ? column.format(i)
                            : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
      <div className={dialogStyles.twoButton__footer}>
        <AppButton
          secondary
          disabled={!isApproveDisabled}
          loading={isDeclineLoading}
          onClick={declineAllOrders}
        >
          Decline All
        </AppButton>
        <AppButton
          primary
          disabled={isApproveDisabled}
          loading={isApproveLoading}
          onClick={approveOrders}
        >
          Claim
        </AppButton>
      </div>
    </Dialog>
  );
};

export default PendingOrdersDialog;
