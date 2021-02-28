import { React, useEffect, useState } from 'react';
import {
  setApiResponse,
  setToastNotificationOpen
} from '../redux/features/notifications/notificationsSlice';
import { useDispatch, useSelector } from 'react-redux';

import { NOTIFICATIONS } from '../constants';
import PendingOrdersDialog from '../components/PendingOrdersDialog';
import SnacksContainer from '../components/SnacksList/SnacksContainer';
import SuggestionDialog from '../components/SuggestionDialog';
import ToastNotification from '../components/ToastNotification';
import { deselectAllFilters } from '../redux/features/snacks/snacksSlice';
import { fetchSnacks } from '../redux/features/snacks/snacksSlice';
import { makeSuggestion } from '../services/UsersService';
import { mockPendingOrders } from '../mockPendingOrders';
import styles from '../styles/Page.module.css';

const Snacks = () => {
  const dispatch = useDispatch();
  const [pendingDialogOpen, setPendingDialogOpen] = useState(false);
  const [pendingOrders, setPendingOrders] = useState([]);
  const { snacks, selectedFilters } = useSelector((state) => state.snacksReducer);
  const { isToastNotificationOpen, apiResponse } = useSelector(
    (state) => state.notificationsReducer
  );
  const { userId, balance } = useSelector((state) => state.usersReducer.profile);
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const [suggestionText, setSuggestionText] = useState('');

  const openToastNotification = (bool) => dispatch(setToastNotificationOpen(bool));

  const onApiResponse = (response) => dispatch(setApiResponse(response));

  const handleCloseSuggestion = () => {
    setIsSuggestionOpen(false);
  };

  const openSuggestion = () => {
    setIsSuggestionOpen(true);
  };

  const handleChangeText = (event) => {
    setSuggestionText(event.target.value);
  };

  const handleSubmit = (event) => {
    const submission = suggestionText.trim();
    if (submission === '') {
      return;
    }
    if (event.key === 'Enter' || event.type === 'click') {
      makeSuggestion(userId, submission);
      setIsSuggestionOpen(false);
      setSuggestionText('');
    }
  };

  const handleCloseDialog = () => {
    onApiResponse('CLAIM_SUCCESS');
    setPendingDialogOpen(false);
    openToastNotification(true);
  };

  const handleCloseToastNotification = () => {
    openToastNotification(false);
  };

  const handleCloseNotAllowed = () => {
    onApiResponse('CLAIM_ERROR');
    openToastNotification(true);
  };

  useEffect(() => {
    dispatch(fetchSnacks());
    return () => {
      dispatch(deselectAllFilters());
    };
  }, [dispatch]);

  useEffect(() => {
    if (balance !== null) {
      setPendingOrders(mockPendingOrders);
      setPendingDialogOpen(true);
    }
  }, []);

  return (
    <div className={styles.base}>
      <div className={styles.header}>
        <h5 className={styles.title}>Choose a snack or a category to start!</h5>
        <div className={styles.suggestBox}>
          <div className={styles.suggestBoxQ}>{"Can't find what you want?"}</div>
          <p className={styles.suggestLabel} onClick={openSuggestion}>
            Suggest a snack!
          </p>
        </div>
      </div>
      <SnacksContainer
        snacks={snacks}
        filters={selectedFilters}
        openToastNotification={openToastNotification}
        onApiResponse={onApiResponse}
      />
      <PendingOrdersDialog
        pendingOrders={pendingOrders}
        open={pendingDialogOpen}
        handleOnClose={handleCloseDialog}
        handleCloseNotAllowed={handleCloseNotAllowed}
      />
      <SuggestionDialog
        open={isSuggestionOpen}
        value={suggestionText}
        handleClose={handleCloseSuggestion}
        onSubmit={handleSubmit}
        onChangeText={handleChangeText}
      />
      <ToastNotification
        open={isToastNotificationOpen}
        notification={NOTIFICATIONS[apiResponse]}
        onClose={handleCloseToastNotification}
      />
      {/* <button onClick={togglePendingOrders}>Toggle Pending Orders</button> */}
    </div>
  );
};

export default Snacks;
