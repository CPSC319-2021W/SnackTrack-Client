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
    return GREETING.NIGHT;
  }
};

const Dashboard = () => {  
  const { firstName } = useSelector((state) => state.usersReducer.profile);
  const [snacks, setSnacks] = useState(null);
  const [activeSnacks, setActiveSnacks] = useState(0);
  const [inactiveSnacks, setInactiveSnacks] = useState(0);

  useEffect(async () => {
    const snacksResponse = await getSnacks(false);
    setSnacks(snacksResponse.snacks);
  }, []);
  
  useEffect(() => {
    if (snacks) {
      const allActiveSnacks = snacks.filter((snack) => snack.is_active).length;
      const allInactiveSnacks = snacks.filter((snack) => !snack.is_active).length;
      try {
        setActiveSnacks(allActiveSnacks);
        setInactiveSnacks(allInactiveSnacks); 
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
          <div className={dashStyles.base}><h5>{activeSnacks} </h5><p>Active Snacks</p></div>
          <div className={dashStyles.base}><h5>{inactiveSnacks} </h5><p>Inactive Snacks</p></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
