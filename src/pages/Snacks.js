import { React, useState } from 'react';

import CategoryFilter from '../components/CategoryFilter';
import { NOTIFICATIONS } from '../constants';
import PendingOrdersDialog from '../components/PendingOrdersDialog';
import SnackCard from '../components/SnackCard';
import ToastNotification from '../components/ToastNotification';

const Snacks = () => {
  const [dialogOpen, setDialogOpen] = useState(true);
  const [toastNotificationOpen, setToastNotificationOpen] = useState(false);
  const { CLAIM_ERROR } = NOTIFICATIONS;

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloseToastNotification = () => {
    setToastNotificationOpen(false);
  };

  return (
    <div>
      <p>Snacks Page</p>
      <CategoryFilter />
      <SnackCard
        snack={{
          imageUri:
            'https://www.hersheys.com/content/dam/smartlabelproductsimage/kitkat/00034000002467-0010.png',
          snackName: 'KitKat',
          price: 200
        }}
        onClick={alert}
      />
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
        onClose={handleCloseToastNotification}
        notification={CLAIM_ERROR}
      ></ToastNotification>
    </div>
  );
};

export default Snacks;
