import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NOTIFICATIONS } from '../constants';
import PendingOrdersDialog from '../components/PendingOrdersDialog';
import SnacksContainer from '../components/SnacksList/SnacksContainer';
import ToastNotification from '../components/ToastNotification';
import { fetchSnacks } from '../redux/features/snacks/snacksSlice';
import { mockPendingOrders } from '../mockSnackData';
import styles from '../styles/Snacks.module.css';

const Snacks = () => {
  const dispatch = useDispatch();
  const [pendingDialogOpen, setPendingDialogOpen] = useState(false);
  const [toastNotificationOpen, setToastNotificationOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState('CLAIM_ERROR');
  const [pendingOrders, setPendingOrders] = useState([]);
  const { snacks, selectedFilters } = useSelector((state) => state.snacksReducer);

  const togglePendingOrders = () => {
    if (pendingOrders.length === 0) {
      setPendingOrders(mockPendingOrders);
      setPendingDialogOpen(true);
    } else {
      setPendingDialogOpen(false);
      setPendingOrders([]);
    }
  };

  const handleCloseDialog = () => {
    setApiResponse('CLAIM_SUCCESS');
    setPendingDialogOpen(false);
    setToastNotificationOpen(true);
  };

  const handleCloseToastNotification = () => {
    setToastNotificationOpen(false);
  };

  const handleCloseNotAllowed = () => {
    setToastNotificationOpen(true);
  };

  useEffect(() => {
    dispatch(fetchSnacks());
  }, [dispatch]);

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.leftBox}>
          <p> Snacks </p>
        </div>
        <div className={styles.suggestBox}>
          <div className={styles.suggestBoxQ}>{"Can't find what you want?"}</div>
          <div className={styles.suggestBoxLink}>
            <a className={styles.a} href='http://localhost:3000/'>
              Suggest a snack!
            </a>
          </div>
        </div>
      </div>
      <SnacksContainer snacks={snacks} filters={selectedFilters} />
      <PendingOrdersDialog
        pendingOrders={pendingOrders}
        open={pendingDialogOpen}
        handleOnClose={handleCloseDialog}
        handleCloseNotAllowed={handleCloseNotAllowed}
      />
      <ToastNotification
        open={toastNotificationOpen}
        notification={NOTIFICATIONS[apiResponse]}
        onClose={handleCloseToastNotification}
      />
      <button onClick={togglePendingOrders}>Toggle Pending Orders</button>
    </div>
  );
};

export default Snacks;
