import React from 'react';
import { useParams } from 'react-router-dom';

import styles from '../styles/Page.module.css';

const UserAccount = () => {
  const { id } = useParams();

  return (
    <div className={styles.base}>
      <h4>Account: { id }</h4>
    </div>
  );
};

export default UserAccount;
