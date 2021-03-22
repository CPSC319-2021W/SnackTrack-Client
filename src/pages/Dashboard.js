import { React, useEffect, useState } from 'react';

import { DateTime } from 'luxon';
import { GREETING } from '../constants';
import dashStyles from '../styles/Dashboard.module.css';
import { getSnacks } from '../services/SnacksService';
import styles from '../styles/Page.module.css';
import { useSelector } from 'react-redux';

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
  const { firstName } = useSelector((state) => state.usersReducer.profile);
  const [snacks, setSnacks] = useState(null);
  const [activeSnacksLength, setActiveSnacksLength] = useState(0);
  const [inactiveSnacksLength, setInactiveSnacksLength] = useState(0);

  useEffect(async () => {
    const snacksResponse = await getSnacks(false);
    setSnacks(snacksResponse.snacks);
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
    </div>
  );
};

export default Dashboard;
