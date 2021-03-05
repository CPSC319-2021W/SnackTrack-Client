import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NOTIFICATIONS } from '../constants';
import SnackInventoryTable from '../components/SnackInventoryTable';
import ToastNotification from '../components/ToastNotification';
import { fetchSnacks } from '../redux/features/snacks/snacksSlice';
import layoutStyles from '../styles/Layout.module.css';
import { setToastNotificationOpen } from '../redux/features/notifications/notificationsSlice';
import styles from '../styles/Page.module.css';
import { toPaginatedSnacks } from '../helpers/AdminHelpers';

const Inventory = () => {
  const dispatch = useDispatch();
  const rowsPerPage = 10;
  const { snacks } = useSelector((state) => state.snacksReducer);
  const [activeSnacks, setActiveSnacks] = useState({ snacks: [] });
  const [inactiveSnacks, setInactiveSnacks] = useState({ snacks: [] });
  const { isToastNotificationOpen, apiResponse } = useSelector(
    (state) => state.notificationsReducer
  );
  // const { userId, balance } = useSelector((state) => state.usersReducer.profile);
  const openToastNotification = (bool) => dispatch(setToastNotificationOpen(bool));
  // const onApiResponse = (response) => dispatch(setApiResponse(response));

  const handleCloseToastNotification = () => {
    openToastNotification(false);
  };

  useEffect(() => {
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

  useEffect(() => {
    dispatch(fetchSnacks(false));
  }, []);

  return (
    <div className={layoutStyles.content}>
      <div className={styles.header}>
        <h5 className={styles.title}>Inventory</h5>
      </div>
      <SnackInventoryTable
        title='Active Snacks'
        data={activeSnacks}
        rowsPerPage={rowsPerPage}
      />
      <SnackInventoryTable
        title='Inactive Snacks'
        data={inactiveSnacks}
        rowsPerPage={rowsPerPage}
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
