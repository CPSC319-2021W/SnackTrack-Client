/* eslint-disable */
import { React, useEffect, useState } from 'react';
import { getUserTransactions, makePayment } from '../services/TransactionsService';

import PaymentsTable from '../components/PaymentsTable';
import TransactionsTable from '../components/TransactionsTable';
import { getPaymentHistory } from '../services/PaymentsService';
import { useSelector } from 'react-redux';

const rowsPerPage = 8;

const Transactions = () => {
  const { username } = useSelector((state) => state.usersReducer);
  const [paymentHistory, setPaymentHistory] = useState(getPaymentHistory(0, rowsPerPage));
  const [paginatedTransactions, setPaginatedTransactions] = useState(
    getUserTransactions(0, rowsPerPage)
  );
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [payForOrdersDisabled, setPayForOrdersDisabled] = useState(true);
  const transactionsOnPage = paginatedTransactions.transactions
    .filter(
      (transaction) => transaction.payment_id == null && transaction.status === 'PR'
    )
    .map((transaction) => {
      return {
        transactionId: transaction.transaction_id,
        total: transaction.transaction_amount
      };
    });
  const transactionsToAdd = paginatedTransactions.transactions
    .filter(
      (transaction) =>
        transaction.payment_id == null &&
        transaction.status === 'PR' &&
        selectedTransactions.indexOf(transaction.transaction_id) === -1
    )
    .map((transaction) => {
      return {
        transactionId: transaction.transaction_id,
        total: transaction.transaction_amount
      };
    });
  const transactionIdsToAdd = transactionsToAdd.map(
    (transaction) => transaction.transactionId
  );
  const transactionIdsOnPage = transactionsOnPage.map(
    (transaction) => transaction.transactionId
  );
  const totalOnPage = transactionsOnPage
    .map((transaction) => transaction.total)
    .reduce((a, b) => a + b, 0);
  const totalToAdd = transactionsToAdd
    .map((transaction) => transaction.total)
    .reduce((a, b) => a + b, 0);

  const handlePaymentChangePage = (page) => {
    setPaymentHistory(getPaymentHistory(page, rowsPerPage));
  };

  const handleTransactionChangePage = (page) => {
    setPaginatedTransactions(getUserTransactions(page, rowsPerPage));
  };

  const removeFromSelectedPage = (page) => {
    const index = selectedPages.indexOf(page);
    let newSelectedPages = [];

    if (index === 0) {
      newSelectedPages = newSelectedPages.concat(selectedPages.slice(1));
    } else if (index === selectedPages.length - 1) {
      newSelectedPages = newSelectedPages.concat(selectedPages.slice(0, -1));
    } else if (index > 0) {
      newSelectedPages = newSelectedPages.concat(
        selectedPages.slice(0, index),
        selectedPages.slice(index + 1)
      );
    }

    return newSelectedPages;
  };

  const handleSelectAllTransactions = (event) => {
    let newSelectedPages = [];
    let newSelectedTransactions = [];
    if (event.target.checked) {
      newSelectedPages = newSelectedPages.concat(
        selectedPages,
        paginatedTransactions.currentPage
      );
      newSelectedTransactions = newSelectedTransactions.concat(
        selectedTransactions,
        transactionIdsToAdd
      );
      setSelectedPages(newSelectedPages);
      setSelectedTransactions(newSelectedTransactions);
      setPaymentAmount(paymentAmount + totalToAdd);
    } else {
      newSelectedPages = removeFromSelectedPage(paginatedTransactions.currentPage);

      newSelectedTransactions = newSelectedTransactions.concat(selectedTransactions);
      let selectedIndex;
      for (const transaction of transactionIdsOnPage) {
        // Refactor into helper for reuse in handleSelectTransaction
        selectedIndex = newSelectedTransactions.indexOf(transaction);

        if (selectedIndex === 0) {
          newSelectedTransactions = newSelectedTransactions.slice(1);
        } else if (selectedIndex === selectedTransactions.length - 1) {
          newSelectedTransactions = newSelectedTransactions.slice(0, -1);
        } else if (selectedIndex > 0) {
          (newSelectedTransactions = selectedTransactions.slice(0, selectedIndex)),
            selectedTransactions.slice(selectedIndex + 1);
        }
      }

      setSelectedPages(newSelectedPages);
      setSelectedTransactions(newSelectedTransactions);
      setPaymentAmount(paymentAmount - totalOnPage);
    }
  };

  const handleSelectTransaction = (event, name, amount) => {
    const selectedIndex = selectedTransactions.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedTransactions, name);
      setPaymentAmount(paymentAmount + amount);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedTransactions.slice(1));
      setPaymentAmount(paymentAmount - amount);
    } else if (selectedIndex === selectedTransactions.length - 1) {
      newSelected = newSelected.concat(selectedTransactions.slice(0, -1));
      setPaymentAmount(paymentAmount - amount);
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedTransactions.slice(0, selectedIndex),
        selectedTransactions.slice(selectedIndex + 1)
      );
      setPaymentAmount(paymentAmount - amount);
    }

    setSelectedTransactions(newSelected);
  };

  const isTransactionSelected = (name) => selectedTransactions.indexOf(name) !== -1;

  const isAllTransactionsSelected = (page) => selectedPages.indexOf(page) !== -1;

  const handlePayForOrders = () => {
    const userId = paginatedTransactions.transactions[0].user_id;
    if (selectedTransactions.length > 0)
      makePayment(userId, selectedTransactions, paymentAmount, username);
  };

  useEffect(() => {
    if (selectedTransactions.length === 0) {
      setPayForOrdersDisabled(true);
    } else {
      setPayForOrdersDisabled(false);
    }
  }, [selectedTransactions]);

  useEffect(() => {
    const selectedIndex = selectedPages.indexOf(paginatedTransactions.currentPage);
    if (transactionIdsToAdd.length === 0 && selectedIndex === -1)
      handleSelectAllTransactions({ target: { checked: true } });
    else if (transactionIdsToAdd.length > 0 && selectedIndex !== -1) {
      const newSelectedPages = removeFromSelectedPage(paginatedTransactions.currentPage);
      setSelectedPages(newSelectedPages);
    }
  }, [selectedTransactions]);

  return (
    <div>
      <p>
        <code>Orders</code>
      </p>

      <TransactionsTable
        data={paginatedTransactions}
        rowsPerPage={rowsPerPage}
        payForOrdersDisabled={payForOrdersDisabled}
        checkIsSelected={isTransactionSelected}
        checkIsAllSelected={isAllTransactionsSelected}
        onChangePage={handleTransactionChangePage}
        onSelectAllTransactions={handleSelectAllTransactions}
        onSelectTransaction={handleSelectTransaction}
        onPayForOrders={handlePayForOrders}
      />
      <PaymentsTable
        data={paymentHistory}
        rowsPerPage={rowsPerPage}
        onChangePage={handlePaymentChangePage}
      />
    </div>
  );
};
export default Transactions;
