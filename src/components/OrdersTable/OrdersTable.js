import { React, useEffect, useState } from 'react';
import { calculateOrdersSum, isPaymentPending } from '../../helpers/OrdersHelpers.js';

import RenderOrdersTable from './RenderOrdersTable';
import { deselectOne } from '../../helpers/CheckboxHelpers';
import { makePayment } from '../../services/OrdersService';
import { useSelector } from 'react-redux';

const Orders = (props) => {
  const { data, rowsPerPage, onChangePage, onHandleApiResponse } = props;
  const { current_page, transactions } = data;
  const { userId, username } = useSelector((state) => state.usersReducer.profile);

  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);
  const [subtotalAmount, setSubtotalAmount] = useState(0);
  const [payForOrdersDisabled, setPayForOrdersDisabled] = useState(true);
  const [uncheckedOrders, setUncheckedOrders] = useState([]);
  const [uncheckedOrdersIds, setUncheckedOrdersIds] = useState([]);

  const isCheckboxDisabled = () => {
    return uncheckedOrders.length === 0 && selectedOrders.length === 0;
  };

  const handlePayForOrders = async () => {
    if (selectedOrders.length > 0)
      try {
        const payment = await makePayment(
          userId,
          selectedOrders,
          subtotalAmount,
          username
        );
        console.log(payment);
        onHandleApiResponse('PAYMENT_SUCCESS');
      } catch (err) {
        onHandleApiResponse('ERROR');
      }
  };

  const handleSelectOneOrder = (name, amount) => {
    const newSelected = selectOneOrder(name, amount);
    setSelectedOrders(newSelected);

    const allItemsChecked = () => {
      return newSelected.length === rowsPerPage;
    };

    const someItemsUnchecked = () => {
      return newSelected.length < rowsPerPage;
    };

    if (allItemsChecked()) {
      handleSelectAllOrders({ target: { checked: true } });
    }
    if (someItemsUnchecked()) {
      const newSelectedPages = deselectOne(selectedPages, current_page);
      setSelectedPages(newSelectedPages);
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

  const handleSelectAllOrders = (event) => {
    if (event.target.checked) {
      const uncheckedOrdersAmount = calculateOrdersSum(uncheckedOrders);
      const [newSelectedOrders, newSelectedPages] = selectAll();

      setSelectedPages(newSelectedPages);
      setSelectedOrders(newSelectedOrders);
      setSubtotalAmount(subtotalAmount + uncheckedOrdersAmount);
    } else {
      const unpaidOrders = transactions.filter((order) =>
        isPaymentPending(order.payment_id, order.transaction_type_id)
      );
      const unpaidOrderIds = unpaidOrders.map((order) => order.transaction_id);
      const pageOrdersTotal = calculateOrdersSum(unpaidOrders);
      const newSelectedPages = deselectAll(current_page, 'pages');
      const newSelectedOrders = deselectAll(unpaidOrderIds, 'orders');

      setSelectedPages(newSelectedPages);
      setSelectedOrders(newSelectedOrders);
      setSubtotalAmount(subtotalAmount - pageOrdersTotal);
    }
  };

  const selectAll = () => {
    return [
      [].concat(selectedOrders, uncheckedOrdersIds),
      [].concat(selectedPages, current_page)
    ];
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
    setUncheckedOrders(
      transactions.filter(
        (order) =>
          isPaymentPending(order.payment_id, order.transaction_type_id) &&
          selectedOrders.indexOf(order.transaction_id) === -1
      )
    );
  }, [transactions, selectedOrders]);

  useEffect(() => {
    setUncheckedOrdersIds(uncheckedOrders.map((order) => order.transaction_id));
  }, [uncheckedOrders]);

  useEffect(() => {
    if (selectedOrders.length === 0) {
      setPayForOrdersDisabled(true);
    } else {
      setPayForOrdersDisabled(false);
    }
  }, [selectedOrders]);

  return (
    <RenderOrdersTable
      data={data}
      rowsPerPage={rowsPerPage}
      selectedOrders={selectedOrders}
      payForOrdersDisabled={payForOrdersDisabled}
      checkIsSelected={isOrderSelected}
      checkIsAllSelected={isAllOrdersSelected}
      isCheckboxDisabled={isCheckboxDisabled()}
      onChangePage={onChangePage}
      onSelectAllOrders={handleSelectAllOrders}
      onSelectOrder={handleSelectOneOrder}
      onPayForOrders={handlePayForOrders}
    />
  );
};

export default Orders;
