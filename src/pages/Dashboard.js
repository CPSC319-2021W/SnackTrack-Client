import { DEFAULT_ORDER_THRESHOLD, GREETING, NOTIFICATIONS } from '../constants';
import { React, useEffect, useState } from 'react';
import { deleteAllSuggestions, getSnacks, getSuggestions } from '../services/SnacksService';
import { setApiResponse, setToastNotificationOpen } from '../redux/features/notifications/notificationsSlice';
import { useDispatch, useSelector } from 'react-redux';

import ConfirmationDialog from '../components/ConfirmationDialog';
import { DateTime } from 'luxon';
import StockStatusBoard from '../components/StockStatusBoard';
import SuggestionsBox from '../components/SuggestionsBox';
import ToastNotification from '../components/ToastNotification';
import TopSnacksReport from '../components/TopSnacksReport';
import dashStyles from '../styles/Dashboard.module.css';
import { getUsersAdmin } from '../services/UsersService';
import { setSuggestions } from '../redux/features/snacks/snacksSlice';
import { setUsers } from '../redux/features/users/usersSlice';
import styles from '../styles/Page.module.css';

const today = DateTime.now();
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
  const [activeSnacksLength, setActiveSnacksLength] = useState(0);
  const [inactiveSnacksLength, setInactiveSnacksLength] = useState(0);

  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [isConfirmationLoading, setConfirmationLoading] = useState(false);

  const [suggestionsError, setSuggestionsError] = useState(false);
  const [snacksError, setSnacksError] = useState(false);

  const sortSnacks = (snacks) => {
    return snacks.sort((a, b) => {
      const quantityA = a.quantity;
      const reorderPointA = a.order_threshold || DEFAULT_ORDER_THRESHOLD;
      const quantityLessReorderA = quantityA - reorderPointA;
      
      const quantityB = b.quantity;
      const reorderPointB = b.order_threshold || DEFAULT_ORDER_THRESHOLD;
      const quantityLessReorderB = quantityB - reorderPointB;

      if (quantityA === 0 && quantityB === 0) {
        return 0;
      } else if (quantityA === 0) {
        return -1;
      } else if (quantityB === 0) {
        return 1;
      } else if (quantityLessReorderA < 0 && quantityLessReorderB < 0) {
        if (quantityA < quantityB) {
          return -1;
        } else if (quantityA > quantityB) {
          return 1;
        } else {
          return 0;
        }
      } else if (quantityLessReorderA < quantityLessReorderB) {
        return -1;
      } else if (quantityLessReorderA > quantityLessReorderB) {
        return 1;
      } else {
        return 0;
      }
    });
  };

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
      const sortedSnacks = sortSnacks(snacks);   
      setSnacks(sortedSnacks);
    } catch (err) {
      console.log(err);
      setSnacksError(true);
    }

    try {
      const { suggestions } = await getSuggestions();
      const suggestionsMap = suggestions.map(suggestion => {
        const { suggestion_id, suggestion_text, suggested_by } = suggestion;
        return { id: suggestion_id, text: suggestion_text, userId: suggested_by, isActive: false };
      });
      dispatch(setSuggestions(suggestionsMap));
    } catch (err) {
      console.log(err);
      setSuggestionsError(true);
    }
  }, []);
  
  useEffect(() => {
    if (snacks) {
      const allActiveSnacksLength = snacks.filter((snack) => snack.is_active).length;
      const allInactiveSnacksLength = snacks.filter((snack) => !snack.is_active).length;
      setActiveSnacksLength(allActiveSnacksLength);
      setInactiveSnacksLength(allInactiveSnacksLength);
    }
  }, [snacks]);

  return (
    <div className={styles.base}>
      <div className={styles.header}>
        <h5 className={`${styles.title} ${dashStyles.greeting}`} >{greeting()} {firstName}!</h5>
        <div className={dashStyles.tile}>
          <div className={dashStyles.base}><h5>{activeSnacksLength} </h5><p>Active Snacks</p></div>
          <div className={dashStyles.base}><h5>{inactiveSnacksLength} </h5><p>Inactive Snacks</p></div>
        </div>
      </div>
      <TopSnacksReport />
      <div className={dashStyles.elements__container}>
        <SuggestionsBox error={suggestionsError} handleClearSuggestions={handleClearSuggestions}/>
        <StockStatusBoard snacks={snacks} error={snacksError} />
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
