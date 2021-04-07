import { React, useEffect, useState } from 'react';
import { deselectAllFilters, fetchSnacks } from '../redux/features/snacks/snacksSlice';
import {
  setApiResponse,
  setToastNotificationOpen
} from '../redux/features/notifications/notificationsSlice';
import { useDispatch, useSelector } from 'react-redux';

import AppButton from '../components/AppButton';
import { NOTIFICATIONS } from '../constants';
import PendingOrdersDialog from '../components/PendingOrdersDialog';
import SnackSearchBar from '../components/SnackSearchBar';
import SnacksContainer from '../components/SnacksList/SnacksContainer';
import SuggestionDialog from '../components/SuggestionDialog';
import ToastNotification from '../components/ToastNotification';
import { getPendingOrders } from '../services/TransactionsService';
import { isAuthenticated } from '../helpers/AuthHelper';
import { makeSuggestion } from '../services/SnacksService';
import { setSnackSearchValue } from '../redux/features/searchbar/searchbarSlice';
import styles from '../styles/Page.module.css';

const Snacks = () => {
  const dispatch = useDispatch();
  const [pendingDialogOpen, setPendingDialogOpen] = useState(false);
  const [pendingOrders, setPendingOrders] = useState([]);
  const { snacks, selectedFilters } = useSelector((state) => state.snacksReducer);
  const { isToastNotificationOpen, apiResponse } = useSelector(
    (state) => state.notificationsReducer
  );
  const { userId } = useSelector((state) => state.usersReducer.profile);
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const [suggestionText, setSuggestionText] = useState('');
  const [suggestionLength, setSuggestionLength] = useState(0);
  const [suggestionError, setSuggestionError] = useState(null);
  const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);
  const [searchValue, updateSearchValue] = useState('');

  const MAX_CHARACTERS = 32;

  const openToastNotification = (bool) => dispatch(setToastNotificationOpen(bool));

  const onApiResponse = (response) => dispatch(setApiResponse(response));

  const handleApiResponse = (response) => {
    onApiResponse(response);
    openToastNotification(true);
  };

  const handleCloseSuggestion = () => {
    setIsSuggestionOpen(false);
  };

  const openSuggestion = () => {
    setIsSuggestionOpen(true);
  };

  const handleChangeText = (event) => {
    const { value } = event.target;
    setSuggestionLength(value.trim().length);
    setSuggestionText(value);
  };

  useEffect(() => {
    if (suggestionLength > MAX_CHARACTERS) {
      setSuggestionError('That\'s too long! Try something shorter.');
    } else {
      setSuggestionError(null);
    }
  }, [suggestionLength]);

  const handleSubmit = async (event) => {
    const suggestion = suggestionText.trim();
    if (event.key === 'Enter' || event.type === 'click') {
      setIsSuggestionLoading(true);
      try {
        await makeSuggestion(userId, suggestion);
        setIsSuggestionOpen(false);
        setSuggestionText('');
        handleApiResponse('SUGGESTION_SUCCESS');
      } catch (err) {
        console.log(err);
        handleApiResponse('ERROR');
      }
      setIsSuggestionLoading(false);
    }
  };

  const handleCloseDialog = () => {
    handleApiResponse('CLAIM_SUCCESS');
    setPendingDialogOpen(false);
  };

  const handleCloseToastNotification = () => {
    openToastNotification(false);
  };

  const handleCloseNotAllowed = () => {
    handleApiResponse('CLAIM_ERROR');
  };

  const handleClearFilters = () => {
    dispatch(deselectAllFilters());
    dispatch(setSnackSearchValue(''));
    updateSearchValue('');
  };

  useEffect(() => {
    dispatch(fetchSnacks(true));
    return () => handleClearFilters();
  }, []);

  useEffect(async () => {
    const token = isAuthenticated();
    if (token && userId) {
      try {
        const { transactions } = await getPendingOrders(userId);
        if (transactions.length > 0) {
          setPendingOrders(transactions);
          setPendingDialogOpen(true);
        }
      } catch (err) {
        console.log(err);
        handleApiResponse('PENDING_ORDERS_ERROR');
      }
    }
  }, [userId]);

  return (
    <div className={styles.base}>
      <div className={styles.header}>
        <div className={styles.search__container}>
          <SnackSearchBar
            searchValue={searchValue}
            onChangeSearchValue={updateSearchValue}
          />
          <AppButton
            cancel
            onClick={handleClearFilters}
          >
            Clear Filters
          </AppButton>
        </div>
        <div className={styles.suggestBox}>
          <p className={styles.suggestBoxQ}>{"Can't find what you want?"}&nbsp;</p>
          <p className={styles.suggestLabel} onClick={openSuggestion}>
            Suggest a snack!
          </p>
        </div>
      </div>
      <SnacksContainer
        snacks={snacks}
        filters={selectedFilters}
        openToastNotification={openToastNotification}
        onHandleApiResponse={handleApiResponse}
      />
      <PendingOrdersDialog
        pendingOrders={pendingOrders}
        open={pendingDialogOpen}
        handleOnClose={handleCloseDialog}
        handleCloseNotAllowed={handleCloseNotAllowed}
        onHandleApiResponse={handleApiResponse}
      />
      <SuggestionDialog
        open={isSuggestionOpen}
        error={suggestionError}
        isLoading={isSuggestionLoading}
        handleClose={handleCloseSuggestion}
        length={suggestionLength}
        max={MAX_CHARACTERS}
        onSubmit={handleSubmit}
        onChangeText={handleChangeText}
      />
      <ToastNotification
        open={isToastNotificationOpen}
        notification={NOTIFICATIONS[apiResponse]}
        onClose={handleCloseToastNotification}
      />
    </div>
  );
};

export default Snacks;
