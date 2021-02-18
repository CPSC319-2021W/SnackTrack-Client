import { React, useEffect, useState } from 'react';
import {
  calculateTransactionsSum,
  isPaymentPending
} from '../helpers/TransactionsHelpers.js';
import { getUserTransactions, makePayment } from '../services/TransactionsService';

import PaymentsTable from '../components/PaymentsTable';
import TransactionsTable from '../components/TransactionsTable';
import { getPaymentHistory } from '../services/PaymentsService';
import { useSelector } from 'react-redux';

const rowsPerPage = 8;

const Transactions = () => {
  const { userId, username } = useSelector((state) => state.usersReducer);
  const [paymentsResponse, setPaymentsResponse] = useState(
    getPaymentHistory(0, rowsPerPage)
  );
  const [transactionsResponse, setTransactionsResponse] = useState(
    getUserTransactions(0, rowsPerPage)
  );
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);
  const [subtotalAmount, setSubtotalAmount] = useState(0);
  const [payForOrdersDisabled, setPayForOrdersDisabled] = useState(true);
  const { currentPage, transactions } = transactionsResponse;
  const uncheckedTransactions = transactions.filter(
    (transaction) =>
      isPaymentPending(transaction.payment_id, transaction.status) &&
      selectedTransactions.indexOf(transaction.transaction_id) === -1
  );
  const uncheckedTransactionsIds = uncheckedTransactions.map(
    (transaction) => transaction.transaction_id
  );

  const handlePaymentChangePage = (page) => {
    setPaymentsResponse(getPaymentHistory(page, rowsPerPage));
  };

  const handleTransactionChangePage = (page) => {
    setTransactionsResponse(getUserTransactions(page, rowsPerPage));
  };

  const handlePayForOrders = () => {
    if (selectedTransactions.length > 0)
      makePayment(userId, selectedTransactions, subtotalAmount, username);
  };

  const handleSelectOneTransaction = (name, amount) => {
    const newSelected = selectOneTransaction(name, amount);
    setSelectedTransactions(newSelected);
  };

  const handleSelectAllTransactions = (event) => {
    if (event.target.checked) {
      const uncheckedTransactionsAmount = calculateTransactionsSum(uncheckedTransactions);
      const newSelectedPages = selectAll('pages');
      const newSelectedTransactions = selectAll('transactions');

      setSelectedPages(newSelectedPages);
      setSelectedTransactions(newSelectedTransactions);
      setSubtotalAmount(subtotalAmount + uncheckedTransactionsAmount);
    } else {
      const unpaidTransactions = transactions.filter((transaction) =>
        isPaymentPending(transaction.payment_id, transaction.status)
      );
      const unpaidTransactionIds = unpaidTransactions.map(
        (transaction) => transaction.transaction_id
      );
      const pageTransactionsTotal = calculateTransactionsSum(unpaidTransactions);
      const newSelectedPages = deselectAll(currentPage, 'pages');
      const newSelectedTransactions = deselectAll(unpaidTransactionIds, 'transactions');

      setSelectedPages(newSelectedPages);
      setSelectedTransactions(newSelectedTransactions);
      setSubtotalAmount(subtotalAmount - pageTransactionsTotal);
    }
  };

  const selectOneTransaction = (transaction, amount) => {
    const index = selectedTransactions.indexOf(transaction);

    const transactionIsNotSelected = () => {
      return index === -1;
    };

    const transactionIsFirstItem = () => {
      return index === 0;
    };

    const transactionIsLastItem = () => {
      return index === selectedTransactions.length - 1;
    };

    const transactionIsSelected = () => {
      return index > 0;
    };

    if (transactionIsNotSelected()) {
      setSubtotalAmount(subtotalAmount + amount);
      return [].concat(selectedTransactions, transaction);
    } else if (transactionIsFirstItem()) {
      setSubtotalAmount(subtotalAmount - amount);
      return [].concat(selectedTransactions.slice(1));
    } else if (transactionIsLastItem()) {
      setSubtotalAmount(subtotalAmount - amount);
      return [].concat(selectedTransactions.slice(0, -1));
    } else if (transactionIsSelected()) {
      setSubtotalAmount(subtotalAmount - amount);
      return [].concat(
        selectedTransactions.slice(0, index),
        selectedTransactions.slice(index + 1)
      );
    }
  };

  const selectAll = (type) => {
    if (type === 'transactions') {
      return [].concat(selectedTransactions, uncheckedTransactionsIds);
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
    if (type === 'transactions') {
      let transactionsToDeselect = selectedTransactions;

      for (const transaction of deselection) {
        transactionsToDeselect = deselectOne(transactionsToDeselect, transaction);
      }

      return transactionsToDeselect;
    } else if (type === 'pages') {
      return deselectOne(selectedPages, deselection);
    }
  };

  const isTransactionSelected = (name) => selectedTransactions.indexOf(name) !== -1;

  const isAllTransactionsSelected = (page) => selectedPages.indexOf(page) !== -1;

  useEffect(() => {
    if (selectedTransactions.length === 0) {
      setPayForOrdersDisabled(true);
    } else {
      setPayForOrdersDisabled(false);
    }
  }, [selectedTransactions]);

  useEffect(() => {
    const index = selectedPages.indexOf(currentPage);

    const allItemsChecked = () => {
      return uncheckedTransactionsIds.length === 0 && index === -1;
    };

    const someItemsUnchecked = () => {
      return uncheckedTransactionsIds.length > 0 && index !== -1;
    };

    if (allItemsChecked()) {
      handleSelectAllTransactions({ target: { checked: true } });
    } else if (someItemsUnchecked()) {
      const newSelectedPages = deselectOne(selectedPages, currentPage);
      setSelectedPages(newSelectedPages);
    }
  }, [selectedTransactions]);

  return (
    <div>
      <p>
        <code>Orders</code>
      </p>

      <TransactionsTable
        data={transactionsResponse}
        rowsPerPage={rowsPerPage}
        payForOrdersDisabled={payForOrdersDisabled}
        checkIsSelected={isTransactionSelected}
        checkIsAllSelected={isAllTransactionsSelected}
        onChangePage={handleTransactionChangePage}
        onSelectAllTransactions={handleSelectAllTransactions}
        onSelectTransaction={handleSelectOneTransaction}
        onPayForOrders={handlePayForOrders}
      />
      <PaymentsTable
        data={paymentsResponse}
        rowsPerPage={rowsPerPage}
        onChangePage={handlePaymentChangePage}
      />
    </div>
  );
};
export default Transactions;
