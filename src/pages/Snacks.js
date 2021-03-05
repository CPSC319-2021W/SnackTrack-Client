import { React, useEffect, useState } from 'react';
import { deselectAllFilters, fetchSnacks } from '../redux/features/snacks/snacksSlice';
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
import { makeSuggestion } from '../services/SnacksService';
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

  const handleSubmit = async (event) => {
    const suggestion = suggestionText.trim();
    if (suggestion === '') {
      return;
    }
    if (event.key === 'Enter' || event.type === 'click') {
      try {
        await makeSuggestion(userId, suggestion);
        setIsSuggestionOpen(false);
        setSuggestionText('');
        onApiResponse('SUGGESTION');
        openToastNotification(true);
      } catch (err) {
        onApiResponse('ERROR');
        openToastNotification(true);
      }
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
    dispatch(fetchSnacks(true));
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
