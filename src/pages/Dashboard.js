import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime as dt } from 'luxon';

import { DEFAULT_ORDER_THRESHOLD, GREETING, NOTIFICATIONS } from '../constants';
import { deleteAllSuggestions, getSnackBatches, getSnacks, getSuggestions } from '../services/SnacksService';
import { setApiResponse, setToastNotificationOpen } from '../redux/features/notifications/notificationsSlice';
import ConfirmationDialog from '../components/ConfirmationDialog';
import ShoppingList from '../components/ShoppingList';
import StockStatusBoard from '../components/StockStatusBoard';
import SuggestionsBox from '../components/SuggestionsBox';
import ToastNotification from '../components/ToastNotification';
import TopSnacksReport from '../components/TopSnacksReport';
import dashStyles from '../styles/Dashboard.module.css';
import { getUsersAdmin } from '../services/UsersService';
import { setSuggestions } from '../redux/features/snacks/snacksSlice';
import { setUsers } from '../redux/features/users/usersSlice';
import { sortSnackInventory } from '../helpers/ListHelpers';
import styles from '../styles/Page.module.css';

const today = dt.now();
const todayReset = dt.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

const greeting = () => {
  if (today.hour < 12) {
    return GREETING.MORNING;
  } else if (today.hour < 17) {
    return GREETING.AFTERNOON;
  } else {
    return GREETING.EVENING;
  }
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { firstName } = useSelector((state) => state.usersReducer.profile);
  const { isToastNotificationOpen, apiResponse } = useSelector(
    (state) => state.notificationsReducer
  );
  const [snacks, setSnacks] = useState([]);
  const [outOfStockSnacks, setOutOfStockSnacks] = useState([]);
  const [fullyStaleSnacks, setFullyStaleSnacks] = useState([]);
  const [lowStockSnacks, setLowStockSnacks] = useState([]);

  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [isConfirmationLoading, setConfirmationLoading] = useState(false);

  const [suggestionsError, setSuggestionsError] = useState(false);
  const [snacksError, setSnacksError] = useState(false);

  const openToastNotification = (bool) => dispatch(setToastNotificationOpen(bool));

  const handleCloseToast = () => {
    openToastNotification(false);
  };

  const handleOpenConfirmation = () => {
    setConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationLoading(false);
    setConfirmationOpen(false);
  };

  const onApiResponse = (response) => dispatch(setApiResponse(response));

  const handleApiResponse = (response) => {
    onApiResponse(response);
    openToastNotification(true);
  };

  const handleClearSuggestions = async () => {
    handleOpenConfirmation();
  };

  const clearSuggestions = async () => {
    setConfirmationLoading(true);
    try {
      await deleteAllSuggestions();
      dispatch(setSuggestions([]));
      handleCloseConfirmation();
      handleApiResponse('SUGGESTIONS_CLEAR_SUCCESS');
    } catch (err) {
      console.err(err);
      handleCloseConfirmation();
      handleApiResponse('ERROR');
    }
  };

  useEffect(async () => {
    try {
      const { users } = await getUsersAdmin();
      dispatch(setUsers(users));
    } catch (err) {
      console.log(err);
      // set users error
    }

    try {
      const { snacks } = await getSnacks(false);
      const { snack_batches } = await getSnackBatches();
      const expiredBatches = snack_batches.filter(
        (batch) => !!batch.expiration_dtm && dt.fromISO(batch.expiration_dtm) <= todayReset
      );
      const batchesMap = expiredBatches.reduce((map, batch) => {
        const { snack_id, quantity } = batch;
        return {...map, [snack_id]: (map[snack_id] || 0) + quantity };
      }, {});
      const mappedSnacks = snacks.map((snack) => {
        const expiredQuantity = batchesMap[snack.snack_id];
        return {
          ...snack,
          expired_quantity: expiredQuantity || 0
        };
      });
      const sortedSnacks = sortSnackInventory(mappedSnacks);
      const outOfStock = sortedSnacks.filter((snack) => snack.quantity === 0);
      const fullyStale = sortedSnacks.filter(
        (snack) => snack.quantity !== 0 && snack.quantity - snack.expired_quantity === 0);
      const lowStock = sortedSnacks.filter(
        (snack) => snack.quantity !== 0
          && snack.quantity !== snack.expired_quantity
          && (snack.quantity - snack.expired_quantity < (snack.order_threshold || DEFAULT_ORDER_THRESHOLD)));
      
      setSnacks(sortedSnacks);
      setOutOfStockSnacks(outOfStock);
      setFullyStaleSnacks(fullyStale);
      setLowStockSnacks(lowStock);
      setSnacksError(false);
    } catch (err) {
      console.log(err);
      setSnacksError(true);
    }

    try {
      const { suggestions } = await getSuggestions();
      const suggestionsMap = suggestions.map((suggestion) => {
        const { suggestion_id, suggestion_text, suggested_by } = suggestion;
        return {
          id: suggestion_id,
          text: suggestion_text,
          userId: suggested_by,
          isActive: false
        };
      });
      dispatch(setSuggestions(suggestionsMap));
      setSuggestionsError(false);
    } catch (err) {
      console.log(err);
      setSuggestionsError(true);
    }
  }, []);

  return (
    <div className={styles.base}>
      <div className={dashStyles.header}>
        <h5 className={`${styles.title} ${dashStyles.greeting}`}>
          {greeting()} {firstName}!
        </h5>
        <div className={dashStyles.tile__container}>
          <div className={`${dashStyles.tile} ${dashStyles.tile__left}`}>
            <h5 className={dashStyles.out__tile}>{outOfStockSnacks.length} </h5>
            <p>{`Out of Stock Snack${outOfStockSnacks.length === 1 ? '' : 's'}`}</p>
          </div>
          <div className={`${dashStyles.tile} ${dashStyles.tile__mid}`}>
            <h5 className={dashStyles.stale__tile}>
              { fullyStaleSnacks.length }
            </h5>
            <p>{`Fully Stale Snack${fullyStaleSnacks.length === 1 ? '' : 's'}`}</p>
          </div>
          <div className={`${dashStyles.tile} ${dashStyles.tile__right}`}>
            <h5 className={dashStyles.low__tile}>
              { lowStockSnacks.length }
            </h5>
            <p>{`Low Stock Snack${lowStockSnacks.length === 1 ? '' : 's'}`}</p>
          </div>
        </div>
      </div>
      <TopSnacksReport />
      <div className={dashStyles.elements__container}>
        <div className={dashStyles.section__one}>
          <ShoppingList snacks={snacks} outOfStock={outOfStockSnacks} />
          <SuggestionsBox
            error={suggestionsError}
            handleClearSuggestions={handleClearSuggestions}
          />
        </div>
        <StockStatusBoard
          snacks={snacks}
          outOfStock={outOfStockSnacks}
          error={snacksError}
        />
        <ToastNotification
          open={isToastNotificationOpen}
          notification={NOTIFICATIONS[apiResponse]}
          onClose={handleCloseToast}
        />
        <ConfirmationDialog
          open={isConfirmationOpen}
          title={'Wait a sec!'}
          submitText={'Yes, clear'}
          declineText={'No, keep'}
          isSubmitLoading={isConfirmationLoading}
          handleClose={handleCloseConfirmation}
          onDecline={handleCloseConfirmation}
          onSubmit={clearSuggestions}
        >
          Are you sure you want to delete all suggestions? This action cannot be undone.
        </ConfirmationDialog>
      </div>
    </div>
  );
};

export default Dashboard;
