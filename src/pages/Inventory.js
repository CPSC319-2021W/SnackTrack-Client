import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NOTIFICATIONS } from '../constants';
import SnackInventoryTable from '../components/SnackInventoryTable';
import ToastNotification from '../components/ToastNotification';
import { getSnacks } from '../services/SnacksService';
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
  const [snacks, setSnacks] = useState([]);
  const [allActiveSnacks, setAllActiveSnacks] = useState([]);
  const [activeSnacks, setActiveSnacks] = useState(INITIAL_SNACKS);
  const [inactiveSnacks, setInactiveSnacks] = useState(INITIAL_SNACKS);
  const { isToastNotificationOpen, apiResponse } = useSelector(
    (state) => state.notificationsReducer
  );
  // const { userId, balance } = useSelector((state) => state.usersReducer.profile);
  const openToastNotification = (bool) => dispatch(setToastNotificationOpen(bool));
  // const onApiResponse = (response) => dispatch(setApiResponse(response));

  const handleCloseToastNotification = () => {
    openToastNotification(false);
  };

  const handleChangePage = (page, isActive) => {
    isActive = isActive || false;
    const newSnackPage = toPaginatedSnacks(
      snacks.filter((snack) => snack.is_active === isActive),
      page,
      rowsPerPage
    );
    if (isActive) {
      setActiveSnacks(newSnackPage);
    } else {
      setInactiveSnacks(newSnackPage);
    }
  };

  useEffect(async () => {
    const snacksResponse = await getSnacks(false);
    setSnacks(snacksResponse.snacks);
  }, []);

  useEffect(() => {
    setAllActiveSnacks(snacks.filter((snack) => snack.is_active));
    setActiveSnacks(
      toPaginatedSnacks(
        snacks.filter((snack) => snack.is_active),
        0,
        rowsPerPage
      )
    );
    setInactiveSnacks(
      toPaginatedSnacks(
        snacks.filter((snack) => !snack.is_active),
        0,
        rowsPerPage
      )
    );
  }, [snacks]);

  return (
    <div className={styles.base}>
      <div className={styles.header}>
        <h5 className={styles.title}>Inventory</h5>
      </div>
      <SnackInventoryTable
        activeSnacks
        snacksForAddBatch={allActiveSnacks}
        data={activeSnacks}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
      />
      <SnackInventoryTable
        data={inactiveSnacks}
        rowsPerPage={rowsPerPage}
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
