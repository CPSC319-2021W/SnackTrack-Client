import {
  Button,
  Checkbox,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow
} from '@material-ui/core';
import { React, useEffect, useState } from 'react';

import { claimPendingOrders } from '../services/OrdersService';
import { deselectOne } from '../helpers/CheckboxHelpers';
import dialogStyles from '../styles/PendingOrdersDialog.module.css';
import styles from '../styles/Table.module.css';

const PendingOrdersDialog = (props) => {
  const { pendingOrders, open, handleOnClose, handleCloseNotAllowed } = props;
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isApproveDisabled, setIsApproveDisabled] = useState(true);
  const [isDeclineDisabled, setIsDeclineDisabled] = useState(false);

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

  const approveOrders = () => {
    try {
      const declinedOrders = selectedOrders.filter(
        (orderId) => !pendingOrders.includes(orderId)
      );
      claimPendingOrders(selectedOrders, declinedOrders);
    } catch (err) {
      console.log(err);
      console.log(
        `You have claimed ${selectedOrders.length} of ${pendingOrders.length} orders.`
      );
    }
    handleOnClose();
  };

  const declineAllOrders = () => {
    try {
      claimPendingOrders([], pendingOrders);
    } catch (err) {
      console.log(err);
      console.log('All orders declined!');
    }
    handleOnClose();
  };

  useEffect(() => {
    if (selectedOrders.length > 0) {
      setIsDeclineDisabled(true);
      setIsApproveDisabled(false);
    } else {
      setIsDeclineDisabled(false);
      setIsApproveDisabled(true);
    }
  }, [selectedOrders]);

  useEffect(() => {
    const allItemsChecked = () => {
      return pendingOrders.length === selectedOrders.length;
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
      label: 'Order Date'
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
    <Dialog open={open} onClose={handleCloseNotAllowed}>
      <Table aria-label='Pending Orders'>
        <TableHead>
          <TableRow>
            <TableCell className={styles.primaryHeader} colSpan={columns.length}>
              <h3 className={styles.primaryHeader__text}>Pending Orders</h3>
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
          {pendingOrders.map((order, i) => {
            return (
              <TableRow key={i} tabIndex={-1}>
                {columns.map((column) => {
                  const value = order[column.id];
                  return (
                    <TableCell key={column.id} className={styles.cell}>
                      {column.id === 'transaction_amount'
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
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>
              <Button
                className={`${dialogStyles.button__base} ${dialogStyles.button__decline}`}
                disabled={isDeclineDisabled}
                onClick={declineAllOrders}
              >
                Decline all
              </Button>
            </TableCell>
            <TableCell />
            <TableCell colSpan={2}>
              <Button
                className={`${dialogStyles.button__base} ${dialogStyles.button__approve}`}
                disabled={isApproveDisabled}
                onClick={approveOrders}
              >
                Approve
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Dialog>
  );
};

export default PendingOrdersDialog;
