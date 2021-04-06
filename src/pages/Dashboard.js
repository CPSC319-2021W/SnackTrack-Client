import { DEFAULT_ORDER_THRESHOLD, GREETING } from '../constants';
import { React, useEffect, useState } from 'react';
import { getSnacks, getSuggestions } from '../services/SnacksService';
import { useDispatch, useSelector } from 'react-redux';

import { DateTime } from 'luxon';
import StockStatusBoard from '../components/StockStatusBoard';
import SuggestionsBox from '../components/SuggestionsBox';
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
  const [snacks, setSnacks] = useState([]);
  const [activeSnacksLength, setActiveSnacksLength] = useState(0);
  const [inactiveSnacksLength, setInactiveSnacksLength] = useState(0);

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

  useEffect(async () => {
    const { users } = await getUsersAdmin();
    dispatch(setUsers(users));

    const { snacks } = await getSnacks(false);
    const sortedSnacks = sortSnacks(snacks);   
    setSnacks(sortedSnacks);

    const { suggestions } = await getSuggestions();
    const suggestionsMap = suggestions.map(suggestion => {
      const { suggestion_id, suggestion_text, suggested_by } = suggestion;
      return { id: suggestion_id, text: suggestion_text, userId: suggested_by, isActive: false };
    });
    dispatch(setSuggestions(suggestionsMap));
  }, []);
  
  useEffect(() => {
    if (snacks) {
      const allActiveSnacksLength = snacks.filter((snack) => snack.is_active).length;
      const allInactiveSnacksLength = snacks.filter((snack) => !snack.is_active).length;
      try {
        setActiveSnacksLength(allActiveSnacksLength);
        setInactiveSnacksLength(allInactiveSnacksLength); 
      } catch (err) {
        console.log(err);
      }  
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
      <div className={dashStyles.elements__container}>
        <TopSnacksReport />
        <SuggestionsBox />
        <StockStatusBoard snacks={snacks} />
      </div>
    </div>
  );
};

export default Dashboard;
