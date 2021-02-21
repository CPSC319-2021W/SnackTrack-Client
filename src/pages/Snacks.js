import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NOTIFICATIONS } from '../constants';
import PendingOrdersDialog from '../components/PendingOrdersDialog';
import SnacksContainer from '../components/SnacksList/SnacksContainer';
import ToastNotification from '../components/ToastNotification';
import { fetchSnacks } from '../redux/features/snacks/snacksSlice';
import styles from '../styles/Snacks.module.css';

const Snacks = () => {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(true);
  const [toastNotificationOpen, setToastNotificationOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState('CLAIM_ERROR');
  const { snacks, selectedFilters } = useSelector((state) => state.snacksReducer);

  const handleCloseDialog = () => {
    setApiResponse('CLAIM_SUCCESS');
    setDialogOpen(false);
    setToastNotificationOpen(true);
  };

  const handleCloseToastNotification = () => {
    setToastNotificationOpen(false);
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
        pendingOrders={[
          {
            transaction_id: 15,
            transaction_dtm: '2020/01/03',
            snack_name: 'Banana',
            quantity: 12,
            transaction_amount: 300
          },
          {
            transaction_id: 12,
            transaction_dtm: '2020/01/02',
            snack_name: 'Banana',
            quantity: 12,
            transaction_amount: 300
          },
          {
            transaction_id: 2,
            transaction_dtm: '2020/01/01',
            snack_name: 'Banana',
            quantity: 12,
            transaction_amount: 300
          }
        ]}
        open={dialogOpen}
        handleOnClose={handleCloseDialog}
        handleCloseNotAllowed={setToastNotificationOpen}
      />
      <ToastNotification
        open={toastNotificationOpen}
        notification={NOTIFICATIONS[apiResponse]}
        onClose={handleCloseToastNotification}
      />
    </div>
  );
};

export default Snacks;
