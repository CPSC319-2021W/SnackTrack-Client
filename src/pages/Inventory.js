import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NOTIFICATIONS } from '../constants';
import SnackInventoryTable from '../components/SnackInventoryTable';
import ToastNotification from '../components/ToastNotification';
import { getSnacks } from '../services/SnacksService';
import { setSnackBatches } from '../redux/features/snacks/snacksSlice';
import { setToastNotificationOpen } from '../redux/features/notifications/notificationsSlice';
import styles from '../styles/Page.module.css';
import { toPaginatedSnacks } from '../helpers/AdminHelpers';

const INITIAL_SNACKS = {
  total_rows: 0,
  snacks: [],
  total_pages: 1,
  current_page: 0
};

const Inventory = () => {
  const dispatch = useDispatch();
  const rowsPerPage = 10;
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [snacks, setSnacks] = useState(null);
  const [paginatedSnacks, setPaginatedSnacks] = useState(INITIAL_SNACKS);
  const { isToastNotificationOpen, apiResponse } = useSelector(
    (state) => state.notificationsReducer
  );
  const { snackBatches } = useSelector((state) => state.snacksReducer);

  const openToastNotification = (bool) => dispatch(setToastNotificationOpen(bool));

  const setBatches = (batches) => {
    dispatch(setSnackBatches(batches));
  };

  const handleCloseToastNotification = () => {
    openToastNotification(false);
  };

  const handleChangePage = (page) => {
    let newSnackPage;
    try {
      newSnackPage = toPaginatedSnacks(snacks, page, rowsPerPage);
    } catch (err) {
      newSnackPage = toPaginatedSnacks(snacks, 0, rowsPerPage);
    }
    setPaginatedSnacks(newSnackPage);
  };

  const handleBatchAddOrEdit = (batch, oldQuantity) => {
    const { snack_id, snack_batch_id, quantity } = batch;
    const newSnacks = [].concat(snacks);
    const index = newSnacks.findIndex((snack) => snack.snack_id === snack_id);
    newSnacks[index].quantity = newSnacks[index].quantity + quantity - oldQuantity;
    setSnacks(newSnacks);
    if (oldQuantity === 0) {
      setBatches(snackBatches.concat([batch]));
    } else {
      const newBatches = [].concat(snackBatches);
      const ind = newBatches.findIndex(
        (batch) => batch.snack_batch_id === snack_batch_id
      );
      const newBatch = { ...snackBatches[ind] };
      newBatch.quantity = newBatches[ind].quantity + quantity - oldQuantity;
      newBatches[ind] = newBatch;
      setBatches(newBatches);
    }
  };

  const handleBatchDelete = (batch) => {
    const { snack_id, snack_batch_id, quantity } = batch;
    const newSnacks = [].concat(snacks);
    const index = newSnacks.findIndex((snack) => snack.snack_id === snack_id);
    newSnacks[index].quantity = newSnacks[index].quantity - quantity;
    setSnacks(newSnacks);
    const newBatches = [].concat(snackBatches);
    const ind = newBatches.findIndex((batch) => batch.snack_batch_id === snack_batch_id);
    newBatches.splice(ind, 1);
    setBatches(newBatches);
  };

  useEffect(async () => {
    handleCloseToastNotification();
    try {
      const snacksResponse = await getSnacks(false);
      setSnacks(snacksResponse.snacks);
      setError(false);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }, []);

  useEffect(() => {
    if (snacks) {
      try {
        setPaginatedSnacks(
          toPaginatedSnacks(snacks, paginatedSnacks.current_page, rowsPerPage)
        );
      } catch (err) {
        setPaginatedSnacks(toPaginatedSnacks(snacks, 0, rowsPerPage));
      }
      setIsLoaded(true);
    }
  }, [snacks]);

  return (
    <div className={styles.base}>
      <div className={styles.header__single}>
        <h5 className={styles.title}>Inventory</h5>
      </div>
      <SnackInventoryTable
        isLoaded={isLoaded}
        isEmpty={paginatedSnacks.snacks.length === 0}
        snacksForAddBatch={snacks ?? []}
        data={paginatedSnacks}
        error={error}
        rowsPerPage={rowsPerPage}
        onAddBatchOrEdit={handleBatchAddOrEdit}
        onDeleteBatch={handleBatchDelete}
        onChangePage={handleChangePage}
      />
      <ToastNotification
        open={isToastNotificationOpen}
        notification={NOTIFICATIONS[apiResponse]}
        onClose={handleCloseToastNotification}
      />
    </div>
  );
};

export default Inventory;
