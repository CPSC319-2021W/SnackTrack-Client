import { React, useEffect, useState } from 'react';
import { calculateOrdersSum, isPaymentPending } from '../../helpers/OrdersHelpers.js';

import RenderOrdersTable from './RenderOrdersTable';
import { makePayment } from '../../services/OrdersService';
import { useSelector } from 'react-redux';

const Orders = (props) => {
  const { data, rowsPerPage, onChangePage, onHandleApiResponse } = props;
  const { currentPage, transactions } = data;
  const { userId, username } = useSelector((state) => state.usersReducer);

  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);
  const [subtotalAmount, setSubtotalAmount] = useState(0);
  const [payForOrdersDisabled, setPayForOrdersDisabled] = useState(true);
  const uncheckedOrders = transactions.filter(
    (order) =>
      isPaymentPending(order.payment_id, order.status) &&
      selectedOrders.indexOf(order.transaction_id) === -1
  );
  const uncheckedOrdersIds = uncheckedOrders.map((order) => order.transaction_id);

  const handlePayForOrders = async () => {
    if (selectedOrders.length > 0)
      try {
        const payment = await makePayment(
          userId,
          selectedOrders,
          subtotalAmount,
          username
        );
        // TODO: Add to front end's table
        console.log(payment);
        onHandleApiResponse('PAYMENT_SUCCESS');
      } catch (err) {
        onHandleApiResponse('ERROR');
      }
  };

  const handleSelectOneOrder = (name, amount) => {
    const newSelected = selectOneOrder(name, amount);
    setSelectedOrders(newSelected);
  };

  const handleSelectAllOrders = (event) => {
    if (event.target.checked) {
      const uncheckedOrdersAmount = calculateOrdersSum(uncheckedOrders);
      const newSelectedPages = selectAll('pages');
      const newSelectedOrders = selectAll('orders');

      setSelectedPages(newSelectedPages);
      setSelectedOrders(newSelectedOrders);
      setSubtotalAmount(subtotalAmount + uncheckedOrdersAmount);
    } else {
      const unpaidOrders = transactions.filter((order) =>
        isPaymentPending(order.payment_id, order.status)
      );
      const unpaidOrderIds = unpaidOrders.map((order) => order.transaction_id);
      const pageOrdersTotal = calculateOrdersSum(unpaidOrders);
      const newSelectedPages = deselectAll(currentPage, 'pages');
      const newSelectedOrders = deselectAll(unpaidOrderIds, 'orders');

      setSelectedPages(newSelectedPages);
      setSelectedOrders(newSelectedOrders);
      setSubtotalAmount(subtotalAmount - pageOrdersTotal);
    }
  };

  const selectOneOrder = (order, amount) => {
    const index = selectedOrders.indexOf(order);

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
      setSubtotalAmount(subtotalAmount + amount);
      return [].concat(selectedOrders, order);
    } else if (orderIsFirstItem()) {
      setSubtotalAmount(subtotalAmount - amount);
      return [].concat(selectedOrders.slice(1));
    } else if (orderIsLastItem()) {
      setSubtotalAmount(subtotalAmount - amount);
      return [].concat(selectedOrders.slice(0, -1));
    } else if (orderIsSelected()) {
      setSubtotalAmount(subtotalAmount - amount);
      return [].concat(selectedOrders.slice(0, index), selectedOrders.slice(index + 1));
    }
  };

  const selectAll = (type) => {
    if (type === 'orders') {
      return [].concat(selectedOrders, uncheckedOrdersIds);
    } else if (type === 'pages') {
      return [].concat(selectedPages, currentPage);
    }
  };

  const deselectOne = (arr, deselection) => {
    const index = arr.indexOf(deselection);
    let newArray = [];
    if (index === 0) {
      newArray = newArray.concat(arr.slice(1));
    } else if (index === arr.length - 1) {
      newArray = newArray.concat(arr.slice(0, -1));
    } else if (index > 0) {
      newArray = newArray.concat(arr.slice(0, index), arr.slice(index + 1));
    }
    return newArray;
  };

  const deselectAll = (deselection, type) => {
    if (type === 'orders') {
      let ordersToDeselect = selectedOrders;

      for (const order of deselection) {
        ordersToDeselect = deselectOne(ordersToDeselect, order);
      }

      return ordersToDeselect;
    } else if (type === 'pages') {
      return deselectOne(selectedPages, deselection);
    }
  };

  const isOrderSelected = (name) => selectedOrders.indexOf(name) !== -1;

  const isAllOrdersSelected = (page) => selectedPages.indexOf(page) !== -1;

  useEffect(() => {
    if (selectedOrders.length === 0) {
      setPayForOrdersDisabled(true);
    } else {
      setPayForOrdersDisabled(false);
    }
  }, [selectedOrders]);

  useEffect(() => {
    const index = selectedPages.indexOf(currentPage);

    const allItemsChecked = () => {
      return uncheckedOrdersIds.length === 0 && index === -1;
    };

    const someItemsUnchecked = () => {
      return uncheckedOrdersIds.length > 0 && index !== -1;
    };

    if (allItemsChecked()) {
      handleSelectAllOrders({ target: { checked: true } });
    } else if (someItemsUnchecked()) {
      const newSelectedPages = deselectOne(selectedPages, currentPage);
      setSelectedPages(newSelectedPages);
    }
  }, [selectedOrders]);

  return (
    <RenderOrdersTable
      data={data}
      rowsPerPage={rowsPerPage}
      payForOrdersDisabled={payForOrdersDisabled}
      checkIsSelected={isOrderSelected}
      checkIsAllSelected={isAllOrdersSelected}
      onChangePage={onChangePage}
      onSelectAllOrders={handleSelectAllOrders}
      onSelectOrder={handleSelectOneOrder}
      onPayForOrders={handlePayForOrders}
    />
  );
};

export default Orders;
