import { React, useEffect, useState } from 'react';
import { getSnacks, getSuggestions } from '../services/SnacksService';
import { useDispatch, useSelector } from 'react-redux';

import { DateTime } from 'luxon';
import { GREETING } from '../constants';
import SuggestionsBox from '../components/SuggestionsBox';
import TopSnacksReport from '../components/TopSnacksReport';
import dashStyles from '../styles/Dashboard.module.css';
import { setSuggestions } from '../redux/features/snacks/snacksSlice';
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
  const [snacks, setSnacks] = useState(null);
  const [activeSnacksLength, setActiveSnacksLength] = useState(0);
  const [inactiveSnacksLength, setInactiveSnacksLength] = useState(0);

  useEffect(async () => {
    const snacksResponse = await getSnacks(false);
    const { snacks } = snacksResponse;
    setSnacks(snacks);

    const suggestionsResponse = await getSuggestions();
    const { suggestions } = suggestionsResponse;
    const suggestionsMap = suggestions.map(suggestion => (
      { id: suggestion.suggestion_id, text: suggestion.suggestion_text, isActive: false }));
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
      {snacks ? <TopSnacksReport snacks={snacks}/> : <></>}
      <SuggestionsBox />
    </div>
  );
};

export default Dashboard;
